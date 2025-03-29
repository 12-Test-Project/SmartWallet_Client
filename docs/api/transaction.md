# Transaction | CRUD de Transacciones

## Obtener una transaccion por Id int

Obtiene una transaccion por Id int

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/Transaction/{id} 
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/Transaction/4' \
  -H 'accept: application/json' \
  -H 'Authorization: {jwt}'
```

Response example:

```sh
{
  "suceded": true,
  "message": "",
  "errors": null,
  "data": {
    "id": 4,
    "createDate": "2025-03-29T15:23:27.764489Z",
    "lastUpdatedDate": null,
    "amount": 124,
    "type": "bono",
    "userId": "cf9c58bc-98dc-4929-afd8-8d710646dfc8"
  }
}
```

## Lista de Transacciones

Obtiene una lista de Dtos de todas las Transacciones registradas

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/Transaction
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://localhost:5800/api/v1/Transaction' \
  -H 'accept: application/json' \
  -H 'Authorization: {jwt}'
```

Response example:

```sh
{
  "suceded": true,
  "message": "",
  "errors": null,
  "data": [
    {
      "id": 2,
      "createDate": "2025-03-20T01:30:41.426423Z",
      "lastUpdatedDate": null,
      "amount": 14,
      "type": "Toy",
      "userId": "f90cdc9a-1ebe-438e-ba23-1356fa001751"
    },
    {
      "id": 4,
      "createDate": "2025-03-29T15:23:27.764489Z",
      "lastUpdatedDate": null,
      "amount": 124,
      "type": "bono",
      "userId": "cf9c58bc-98dc-4929-afd8-8d710646dfc8"
    }
  ]
}
```

## Creacion de transaccion

Recibe los parametros para registrar una transaccion

Parameters:
```
version: string | required
```

endpoint: 
```sh
/api/v{version}/Transaction
```

Method: POST

Payload example:

```sh
curl -X 'POST' \
  'http://localhost:5800/api/v1/Transaction' \
  -H 'accept: application/json' \
  -H 'Authorization: {jwt}' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount": 124,
  "type": "bono",
  "userId": "cf9c58bc-98dc-4929-afd8-8d710646dfc8"
}'
```

Response example:

```sh
{
  "suceded": true,
  "message": "",
  "errors": null,
  "data": {
    "id": 4,
    "createDate": "2025-03-29T15:23:27.7644895Z",
    "lastUpdatedDate": null,
    "amount": 124,
    "type": "bono",
    "userId": "cf9c58bc-98dc-4929-afd8-8d710646dfc8"
  }
}
```

## Actualiza una transaccion

Recibe los parametros para Actualizar una transaccion

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/Transaction/{id}
```

Method: PUT

Payload example:

```sh
curl -X 'PUT' \
  'http://localhost:5800/api/v1/Transaction/4' \
  -H 'accept: */*' \
  -H 'Authorization: {jwt}' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 4,
  "amount": 879793498,
  "type": "bono",
  "userId": "cf9c58bc-98dc-4929-afd8-8d710646dfc8"
}'
```

Response example:

```sh
{
  "suceded": true,
  "message": "",
  "errors": null,
  "data": {
    "id": 4,
    "createDate": "2025-03-29T15:29:51.6261379Z",
    "lastUpdatedDate": null,
    "amount": 879793498,
    "type": "bono",
    "userId": "cf9c58bc-98dc-4929-afd8-8d710646dfc8"
  }
}
```

## Elimina una transaccion

Recibe el Id (int) de una transaccion para eliminarla

Parameters:
```
id: integer | required
version: string | required
```

endpoint: 
```sh
/api/v{version}/Transaction/{id}
```

Method: DELETE

Payload example:

```sh
curl -X 'DELETE' \
  'http://localhost:5800/api/v1/Transaction/4' \
  -H 'accept: */*' \
  -H 'Authorization: {jwt}'
```

Response example:

```sh
204
```