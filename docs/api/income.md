# Income | CRUD de Salario (Income)

## Obtener un salario por Id

Obtiene un salario por Id int

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/Income/{id}
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/Income/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
{
  "id": 0,
  "amount": 0,
  "timeLapse": "string",
  "createDate": "2025-03-19T01:24:08.601Z",
  "lastUpdatedDate": "2025-03-19T01:24:08.601Z",
  "current": true,
  "userId": "string"
}
```

## Actualiza un salario

Recibe los parametros para Actualizar un salario

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/Income/{id}
```

Method: PUT

Payload example:

```sh
curl -X 'PUT' \
  'http://localhost:5800/api/v1/Income/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "amount": 0,
  "timeLapse": "string",
  "current": true,
  "userId": "string"
}'
```

Response example:

```sh
OK
```

## Elimina un salario

Recibe el Id (int) de un salario para eliminarla

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/Income/{id}
```

Method: DELETE

Payload example:

```sh
curl -X 'DELETE' \
  'http://localhost:5800/api/v1/Income/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
No Content
```

## Lista de Transacciones

Obtiene una lista de Dtos de todas las Transacciones registradas

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/Income
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/Income' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
[
  {
    "id": 0,
    "amount": 0,
    "timeLapse": "string",
    "createDate": "2025-03-19T01:30:31.452Z",
    "lastUpdatedDate": "2025-03-19T01:30:31.452Z",
    "current": true,
    "userId": "string"
  }
]
```

## Creacion de salario

Recibe los parametros para registrar un salario

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/Income
```

Method: POST

Payload example:

```sh
curl -X 'POST' \
  'http://localhost:5800/api/v1/Income' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount": 0,
  "timeLapse": "string",
  "current": true,
  "userId": "string"
}'
```

Response example:

```sh
{
  "id": 0,
  "amount": 0,
  "timeLapse": "string",
  "createDate": "2025-03-19T01:31:42.722Z",
  "lastUpdatedDate": "2025-03-19T01:31:42.722Z",
  "current": true,
  "userId": "string"
}
```