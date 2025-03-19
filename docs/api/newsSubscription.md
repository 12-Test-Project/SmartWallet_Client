# NewsSubscription | CRUD de Tareas

## Obtener una suscripcion por Id

Obtiene una suscripción por Id int

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/NewsSubscription/{id}
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/NewsSubscription/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
{
  "id": 0,
  "createDate": "2025-03-19T01:33:13.229Z",
  "lastUpdatedDate": "2025-03-19T01:33:13.229Z",
  "subscribed": true,
  "userId": "string"
}
```

## Actualiza una suscripcion

Recibe los parametros para Actualizar una suscripción

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/NewsSubscription/{id}
```

Method: PUT

Payload example:

```sh
curl -X 'PUT' \
  'http://localhost:5800/api/v1/NewsSubscription/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "subscribed": true,
  "userId": "string"
}'
```

Response example:

```sh
OK
```

## Elimina una tarea

Recibe el Id (int) de una tarea para eliminarla

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/NewsSubscription/{id}
```

Method: DELETE

Payload example:

```sh
curl -X 'DELETE' \
  'http://localhost:5800/api/v1/NewsSubscription/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
No Content
```

## Lista de Suscripciones

Obtiene una lista de Dtos de todas las suscripciones registradas

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/NewsSubscription
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/NewsSubscription' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'
```

Response example:

```sh
[
  {
    "id": 0,
    "createDate": "2025-03-19T01:39:21.107Z",
    "lastUpdatedDate": "2025-03-19T01:39:21.107Z",
    "subscribed": true,
    "userId": "string"
  }
]
```

## Creacion de suscripcion

Recibe los parametros para realizar una suscripción

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/NewsSubscription
```

Method: GET

Payload example:

```sh
curl -X 'POST' \
  'http://localhost:5800/api/v1/NewsSubscription' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -d '{
  "subscribed": 0,
  "userId": "string"
}'
```

Response example:

```sh
{
  "id": 0,
  "createDate": "2025-03-19T01:42:12.034Z",
  "lastUpdatedDate": "2025-03-19T01:42:12.034Z",
  "subscribed": true,
  "userId": "string"
}
```