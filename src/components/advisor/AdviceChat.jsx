import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import { useDatabase } from "../../contexts/DatabaseContext";
import advisorService from "../../services/advisorService";

const AdviceChat = () => {
	const { t } = useTranslation();
	const { user } = useAuth();
	const { dbService, isOnline } = useDatabase();
	const [prompt, setPrompt] = useState("");
	const [adviceType, setAdviceType] = useState("financial");
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const messagesEndRef = useRef(null);
	const pollingTimersRef = useRef({});

	// Load previous messages from IndexedDB and check their status
	useEffect(() => {
		const loadMessages = async () => {
			try {
				setIsInitialLoading(true);
				const adviceQueries = await dbService.getAll("adviceQuery");
				const userQueries = adviceQueries.filter(
					(query) => query.userId === user.id,
				);

				// Sort by date (newest first)
				userQueries.sort(
					(a, b) => new Date(b.timestamp) - new Date(a.timestamp),
				);

				setMessages(userQueries);

				if (isOnline) {
					// Check status for recent messages that might need updates
					const messagesToCheck = userQueries
						.filter((msg) => {
							// Check messages that:
							// 1. Have a taskId
							// 2. Are either pending/started OR were updated in the last 24 hours
							const isRecent =
								new Date(msg.timestamp) >
								new Date(Date.now() - 24 * 60 * 60 * 1000);
							return (
								msg.taskId &&
								(msg.status === "PENDING" ||
									msg.status === "STARTED" ||
									(isRecent && msg.status !== "COMPLETED"))
							);
						})
						.slice(0, 10); // Limit to 10 most recent to avoid too many requests

					console.log(
						`Checking status for ${messagesToCheck.length} recent messages`,
					);

					// Check status for each message
					for (const message of messagesToCheck) {
						try {
							await checkMessageStatus(message);
						} catch (error) {
							console.error(
								`Error checking status for message ${message.id}:`,
								error,
							);
						}
					}

					// Resume polling for any still-pending messages
					const stillPendingMessages = messagesToCheck.filter(
						(msg) => msg.status === "PENDING" || msg.status === "STARTED",
					);

					stillPendingMessages.forEach((message) => {
						pollAdviceStatus(message.taskId, message);
					});
				}
			} catch (error) {
				console.error("Error loading advice history:", error);
			} finally {
				setIsInitialLoading(false);
			}
		};

		if (user?.id) {
			loadMessages();
		}

		// Cleanup polling timers on unmount
		return () => {
			Object.values(pollingTimersRef.current).forEach((timer) =>
				clearTimeout(timer),
			);
		};
	}, [user, dbService, isOnline]);

	// Check status for a specific message
	const checkMessageStatus = async (message) => {
		if (!message.taskId || !isOnline) return message;

		try {
			console.log(
				`Checking status for message ${message.id} with task ${message.taskId}`,
			);
			const response = await advisorService.checkAdviceStatus(message.taskId);

			if (response.status === "SUCCESS" && response.result?.advice) {
				// Update message with advice
				const updatedMessage = {
					...message,
					status: "COMPLETED",
					response: response.result.advice,
					completedAt: new Date().toISOString(),
				};

				// Update in state
				setMessages((prev) =>
					prev.map((msg) => (msg.id === message.id ? updatedMessage : msg)),
				);

				// Update in IndexedDB
				await dbService.update("adviceQuery", updatedMessage);

				return updatedMessage;
			} else if (response.status === "FAILURE") {
				// Update with error
				const updatedMessage = {
					...message,
					status: "ERROR",
					error: response.error || "Failed to get advice",
				};

				setMessages((prev) =>
					prev.map((msg) => (msg.id === message.id ? updatedMessage : msg)),
				);

				await dbService.update("adviceQuery", updatedMessage);

				return updatedMessage;
			} else if (response.status !== message.status) {
				// Update status if changed
				const updatedMessage = { ...message, status: response.status };

				setMessages((prev) =>
					prev.map((msg) => (msg.id === message.id ? updatedMessage : msg)),
				);

				await dbService.update("adviceQuery", updatedMessage);

				return updatedMessage;
			}
		} catch (error) {
			console.error(`Error checking status for message ${message.id}:`, error);
		}

		return message;
	};

	// Scroll to bottom when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Poll for advice status
	const pollAdviceStatus = async (taskId, message) => {
		try {
			console.log(`Polling for task ${taskId}...`);

			// Clear any existing timer for this task
			if (pollingTimersRef.current[taskId]) {
				clearTimeout(pollingTimersRef.current[taskId]);
			}

			// If offline, stop polling and save to IndexedDB
			if (!isOnline) {
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === message.id ? { ...msg, status: "PENDING_ONLINE" } : msg,
					),
				);
				await dbService.update("adviceQuery", {
					...message,
					status: "PENDING_ONLINE",
				});
				return;
			}

			const response = await advisorService.checkAdviceStatus(taskId);
			console.log("Status response:", response);

			if (response.status === "SUCCESS") {
				console.log("Task completed successfully!");
				// Update message with advice
				const updatedMessage = {
					...message,
					status: "COMPLETED",
					response: response.result.advice,
					completedAt: new Date().toISOString(),
				};

				// Update in state
				setMessages((prev) =>
					prev.map((msg) => (msg.id === message.id ? updatedMessage : msg)),
				);

				// Update in IndexedDB
				await dbService.update("adviceQuery", updatedMessage);
			} else if (response.status === "FAILURE") {
				console.error("Task failed:", response.error);
				throw new Error(response.error || "Failed to get advice");
			} else if (
				response.status === "STARTED" ||
				response.status === "PENDING"
			) {
				console.log("Task still in progress, continuing to poll...");
				// Update status in state if it changed
				if (message.status !== response.status) {
					const updatedMessage = { ...message, status: response.status };
					setMessages((prev) =>
						prev.map((msg) => (msg.id === message.id ? updatedMessage : msg)),
					);
					await dbService.update("adviceQuery", updatedMessage);
				}

				// Continue polling after a delay
				pollingTimersRef.current[taskId] = setTimeout(() => {
					pollAdviceStatus(taskId, message);
				}, 2000);
			}
		} catch (error) {
			console.error("Error polling advice status:", error);

			// Update message with error
			const updatedMessage = {
				...message,
				status: "ERROR",
				error: error.message || "Unknown error",
			};

			setMessages((prev) =>
				prev.map((msg) => (msg.id === message.id ? updatedMessage : msg)),
			);

			// Update in IndexedDB
			await dbService.update("adviceQuery", updatedMessage);
		}
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!prompt.trim()) return;

		setIsLoading(true);
		setError(null);

		try {
			// Create new message
			const newMessage = {
				userId: user.id,
				type: adviceType,
				prompt: prompt.trim(),
				timestamp: new Date().toISOString(),
				status: "PENDING",
			};

			// Save to IndexedDB
			const messageId = await dbService.add("adviceQuery", newMessage);
			const messageWithId = { ...newMessage, id: messageId };

			// Add to messages
			setMessages((prev) => [messageWithId, ...prev]);

			// Clear input
			setPrompt("");

			if (isOnline) {
				// Request advice from API
				const response = await advisorService.getAdvice(
					user.id,
					adviceType,
					prompt.trim(),
				);

				if (response && response.Key) {
					console.log("Got task ID:", response.Key);
					// Update message with task ID
					const updatedMessage = {
						...messageWithId,
						taskId: response.Key,
					};

					// Update in state
					setMessages((prev) =>
						prev.map((msg) => (msg.id === messageId ? updatedMessage : msg)),
					);

					// Update in IndexedDB
					await dbService.update("adviceQuery", updatedMessage);

					// Poll for status
					pollAdviceStatus(response.Key, updatedMessage);
				}
			} else {
				// Mark as pending online
				const updatedMessage = {
					...messageWithId,
					status: "PENDING_ONLINE",
				};

				// Update in state
				setMessages((prev) =>
					prev.map((msg) => (msg.id === messageId ? updatedMessage : msg)),
				);

				// Update in IndexedDB
				await dbService.update("adviceQuery", updatedMessage);
			}
		} catch (error) {
			console.error("Error requesting advice:", error);
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	// Retry failed message
	const handleRetry = async (message) => {
		try {
			// Update message status
			const updatedMessage = {
				...message,
				status: "PENDING",
				timestamp: new Date().toISOString(),
			};

			// Update in state
			setMessages((prev) =>
				prev.map((msg) => (msg.id === message.id ? updatedMessage : msg)),
			);

			// Update in IndexedDB
			await dbService.update("adviceQuery", updatedMessage);

			if (isOnline) {
				// Request advice from API
				const response = await advisorService.getAdvice(
					user.id,
					message.type,
					message.prompt,
				);

				if (response && response.Key) {
					// Update message with task ID
					const messageWithTaskId = {
						...updatedMessage,
						taskId: response.Key,
					};

					// Update in state
					setMessages((prev) =>
						prev.map((msg) =>
							msg.id === message.id ? messageWithTaskId : msg,
						),
					);

					// Update in IndexedDB
					await dbService.update("adviceQuery", messageWithTaskId);

					// Poll for status
					pollAdviceStatus(response.Key, messageWithTaskId);
				}
			} else {
				// Mark as pending online
				const pendingMessage = {
					...updatedMessage,
					status: "PENDING_ONLINE",
				};

				// Update in state
				setMessages((prev) =>
					prev.map((msg) => (msg.id === message.id ? pendingMessage : msg)),
				);

				// Update in IndexedDB
				await dbService.update("adviceQuery", pendingMessage);
			}
		} catch (error) {
			console.error("Error retrying advice:", error);
			setError(error.message);
		}
	};

	// Function to manually check status for a specific message
	const handleCheckStatus = async (message) => {
		if (!message.taskId || !isOnline) return;

		try {
			// Update UI to show checking
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === message.id ? { ...msg, status: "CHECKING" } : msg,
				),
			);

			// Check status
			await checkMessageStatus(message);

			// If still pending or started, resume polling
			const updatedMessage = messages.find((msg) => msg.id === message.id);
			if (
				updatedMessage &&
				(updatedMessage.status === "PENDING" ||
					updatedMessage.status === "STARTED")
			) {
				pollAdviceStatus(message.taskId, updatedMessage);
			}
		} catch (error) {
			console.error("Error checking status:", error);
		}
	};

	return (
		<div className="flex flex-col h-full">
			{/* Initial loading indicator */}
			{isInitialLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
					<div className="flex flex-col items-center">
						<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2" />
						<div className="text-blue-600">{t("advisor.initialLoading")}</div>
					</div>
				</div>
			)}

			{/* Messages */}
			<div className="flex-1 overflow-y-auto mb-4 space-y-4">
				{messages.length === 0 ? (
					<div className="text-center text-gray-500 py-8">
						{t("advisor.noHistory")}
					</div>
				) : (
					messages.map((message) => (
						<div key={message.id} className="bg-white rounded-lg shadow p-4">
							<div className="flex items-start justify-between mb-2">
								<div className="flex items-center">
									<div className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs mr-2">
										{t(`advisor.adviceTypes.${message.type}`)}
									</div>
									<div className="text-gray-500 text-xs">
										{new Date(message.timestamp).toLocaleString()}
									</div>
								</div>

								{/* Status indicator with refresh button for pending/started */}
								{(message.status === "PENDING" ||
									message.status === "STARTED") &&
									message.taskId && (
										<button
											type="button"
											onClick={() => handleCheckStatus(message)}
											className="text-blue-600 hover:text-blue-800 text-xs flex items-center"
											title={t("advisor.checkStatus")}
										>
											<i className="feather-refresh-cw mr-1" />
											{t("advisor.refresh")}
										</button>
									)}
							</div>

							<div className="font-medium mb-2">{message.prompt}</div>

							{message.status === "PENDING" ||
							message.status === "STARTED" ||
							message.status === "CHECKING" ? (
								<div className="flex items-center text-gray-500">
									<div className="animate-pulse mr-2">⏳</div>
									{t("advisor.loading")}
								</div>
							) : message.status === "PENDING_ONLINE" ? (
								<div className="flex items-center text-yellow-500">
									<div className="mr-2">📶</div>
									{t("offline.status")}
								</div>
							) : message.status === "ERROR" ? (
								<div>
									<div className="text-red-500 mb-2">
										{t("advisor.error")}: {message.error}
									</div>
									<button
										type="button"
										onClick={() => handleRetry(message)}
										className="text-blue-600 hover:text-blue-800"
									>
										{t("advisor.retry")}
									</button>
								</div>
							) : message.status === "COMPLETED" ? (
								<div className="bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
									{message.response}
								</div>
							) : null}
						</div>
					))
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input form */}
			<form onSubmit={handleSubmit} className="mt-auto">
				<div className="flex flex-wrap items-center gap-2">
					<select
						value={adviceType}
						onChange={(e) => setAdviceType(e.target.value)}
						className="bg-gray-200 border border-gray-300 rounded-lg px-3 py-2"
					>
						<option value="financial">
							{t("advisor.adviceTypes.financial")}
						</option>
						<option value="savings">{t("advisor.adviceTypes.savings")}</option>
						<option value="investment">
							{t("advisor.adviceTypes.investment")}
						</option>
						<option value="budget">{t("advisor.adviceTypes.budget")}</option>
						<option value="debt">{t("advisor.adviceTypes.debt")}</option>
						<option value="general">{t("advisor.adviceTypes.general")}</option>
					</select>

					<input
						type="text"
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						placeholder={t("advisor.askPlaceholder")}
						className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2"
						disabled={isLoading}
					/>

					<button
						type="submit"
						disabled={isLoading || !prompt.trim()}
						className="bg-blue-600 text-white rounded-lg px-4 py-2 disabled:bg-blue-300"
					>
						{isLoading ? t("advisor.loading") : t("advisor.send")}
					</button>
				</div>

				{error && (
					<div className="text-red-500 mt-2">
						{t("advisor.error")}: {error}
					</div>
				)}
			</form>
		</div>
	);
};

export default AdviceChat;
