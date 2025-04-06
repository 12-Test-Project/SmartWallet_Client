// Service for AI advisor API calls
const API_BASE_URL = "http://localhost:8000"; // Updated to match the API URL in your screenshot

export const advisorService = {
	// Request advice
	async getAdvice(userId, adviceType, prompt) {
		try {
			const url = `${API_BASE_URL}/advice/${adviceType}?user_id=${encodeURIComponent(userId)}&prompt=${encodeURIComponent(prompt)}`;
			console.log("Requesting advice:", url);

			const response = await fetch(url, {
				method: "GET",
				headers: {
					"accept": "application/json",
				},
				mode: 'cors' // Explicitly enable CORS
			});

			if (!response.ok) return console.log(`Error: ${response.status}`)

			const data = await response.json();
			console.log("Advice response:", data);
			return data;
		} catch (error) {
			console.error("Error requesting advice:", error);
			throw error;
		}
	},

	// Check advice status
	async checkAdviceStatus(taskId) {
		try {
			const url = `${API_BASE_URL}/advice/status/${encodeURIComponent(taskId)}`;
			console.log("Checking status:", url);

			const response = await fetch(url, {
				method: "GET",
				headers: {
					"accept": "application/json",
				},
				mode: 'cors' // Explicit CORS mode
			});

			if (!response.ok) return console.log(`Error: ${response.status}`)

			const data = await response.json();
			console.log("Status response:", data);
			return data;
		} catch (error) {
			console.error("Error checking advice status:", error);
			throw error;
		}
	},
};

export default advisorService;
