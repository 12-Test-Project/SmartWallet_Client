# TaskApp | Getters de Tareas

## Obtener una tarea por Id

Obtiene una tarea por Id int

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/TaskApp/{id} 
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/TaskApp/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
{
  "id": 0,
  "createDate": "2025-03-19T01:52:09.088Z",
  "lastUpdatedDate": "2025-03-19T01:52:09.088Z",
  "key": "string",
  "isCompleted": true,
  "userId": "string",
  "status": "string",
  "answer": "string",
  "adviceQueryId": 0
}
```

## Lista de Tareas

Obtiene una lista de Dtos de todas las Tareas registradas

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/TaskApp
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/TaskApp' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
[
  {
    "id": 0,
    "createDate": "2025-03-19T01:52:34.701Z",
    "lastUpdatedDate": "2025-03-19T01:52:34.701Z",
    "key": "string",
    "isCompleted": true,
    "userId": "string",
    "status": "string",
    "answer": "string",
    "adviceQueryId": 0
  }
]
```
