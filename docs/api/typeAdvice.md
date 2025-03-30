# TypeAdvice | CRUD de Tipos de avisos

## Obtener un tipo de aviso por Id

Obtiene un tipo de aviso por Id int

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/TypeAdvice/{id} 
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/TypeAdvice/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
{
  "id": 0,
  "createDate": "2025-03-19T01:55:36.233Z",
  "lastUpdatedDate": "2025-03-19T01:55:36.233Z",
  "name": "string",
  "serviceId": 0
}
```

## Actualiza un tipo de aviso

Recibe los parametros para Actualizar un tipo de aviso

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/TypeAdvice/{id} 
```

Method: PUT

Payload example:

```sh
curl -X 'PUT' \
  'http://localhost:5800/api/v1/TypeAdvice/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "name": "string",
  "serviceId": "string"
}'
```

Response example:

```sh
OK
```

## Elimina un tipo de aviso

Recibe el Id (int) de un tipo de aviso para eliminarlo

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/TypeAdvice/{id} 
```

Method: DELETE

Payload example:

```sh
curl -X 'DELETE' \
  'http://localhost:5800/api/v1/TypeAdvice/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
No Content
```

## Lista de Tipos de avisos

Obtiene una lista de Dtos de todas los tipos de avisos registrados

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/TypeAdvice
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/TypeAdvice' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
[
  {
    "id": 0,
    "createDate": "2025-03-19T01:57:29.768Z",
    "lastUpdatedDate": "2025-03-19T01:57:29.768Z",
    "name": "string",
    "serviceId": 0
  }
]
```

## Creacion de tipo de aviso

Recibe los parametros para registrar un tipo de aviso

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/TypeAdvice
```

Method: POST

Payload example:

```sh
curl -X 'POST' \
  'http://localhost:5800/api/v1/TypeAdvice' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "string",
  "serviceId": "string"
}'
```

Response example:

```sh
{
  "id": 0,
  "createDate": "2025-03-19T01:58:22.637Z",
  "lastUpdatedDate": "2025-03-19T01:58:22.637Z",
  "name": "string",
  "serviceId": 0
}
```
