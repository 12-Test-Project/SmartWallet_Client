# AdviceQuery | Controlador de Solicitudes

## Obtener una solicitud por Id

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/AdviceQuery/{id} 
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/AdviceQuery/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
{
  "id": 0,
  "prompt": "string",
  "userId": "string",
  "serviceId": 0,
  "typeAdviceId": 0,
  "createDate": "2025-03-19T00:29:36.898Z",
  "lastUpdatedDate": "2025-03-19T00:29:36.898Z"
}
```

## Lista de Tareas

Obtiene una lista de Dtos de todas las solicitudes registradas

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/AdviceQuery
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/AdviceQuery' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
[
  {
    "id": 0,
    "prompt": "string",
    "userId": "string",
    "serviceId": 0,
    "typeAdviceId": 0,
    "createDate": "2025-03-19T01:10:16.664Z",
    "lastUpdatedDate": "2025-03-19T01:10:16.664Z"
  }
]
```

## Creacion de una solicitud

Recibe los parametros para registrar una solicitud

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/AdviceQuery
```

Method: POST

Payload example:

```sh
curl -X 'POST' \
  'http://localhost:5800/api/v1/AdviceQuery' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -d '{
  "prompt": "string",
  "userId": "string",
  "serviceId": 0,
  "typeAdviceId": 0
}'
```

Response example:

```sh
{
  "id": 0,
  "prompt": "string",
  "userId": "string",
  "serviceId": 0,
  "typeAdviceId": 0,
  "createDate": "2025-03-19T01:13:12.775Z",
  "lastUpdatedDate": "2025-03-19T01:13:12.775Z"
}
```