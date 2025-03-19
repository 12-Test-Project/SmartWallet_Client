# Service | Controlador de Solicitudes

## Obtener un servicio por Id

Obtiene un servicio por Id int

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/Service/{id} 
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/Service/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
{
  "id": 0,
  "createDate": "2025-03-19T01:44:21.351Z",
  "lastUpdatedDate": "2025-03-19T01:44:21.351Z",
  "name": "string",
  "description": "string"
}
```

## Actualiza un servicio

Recibe los parametros para Actualizar un servicio

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/Service/{id} 
```

Method: PUT

Payload example:

```sh
curl -X 'PUT' \
  'http://localhost:5800/api/v1/Service/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "name": "string",
  "description": "string"
}'
```

Response example:

```sh
OK
```

## Elimina un servicio

Recibe el Id (int) de un salario para eliminarla

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/Service/{id} 
```

Method: DELETE

Payload example:

```sh
curl -X 'DELETE' \
  'http://localhost:5800/api/v1/Service/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
No Content
```

## Lista de servicios

Obtiene una lista de Dtos de todos los servicios registrados

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/Service
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/Service' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
[
  {
    "id": 0,
    "createDate": "2025-03-19T01:48:41.933Z",
    "lastUpdatedDate": "2025-03-19T01:48:41.933Z",
    "name": "string",
    "description": "string"
  }
]
```

## Creacion de servicio

Recibe los parametros para registrar un servicio

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/Service 
```

Method: POST

Payload example:

```sh
curl -X 'POST' \
  'http://localhost:5800/api/v1/Service' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "string",
  "description": "string"
}'
```

Response example:

```sh
{
  "id": 0,
  "createDate": "2025-03-19T01:49:16.433Z",
  "lastUpdatedDate": "2025-03-19T01:49:16.433Z",
  "name": "string",
  "description": "string"
}
```