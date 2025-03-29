# Account

## Autenticar usuario

Autenticas un usuario en el sistema

Parameters:
```
email: string | required
password: string | required
```

endpoint: 
```sh
/api/Account/authenticate
```

Method: POST

Payload example:

```sh
curl -X 'POST' \
  'http://localhost:5800/api/Account/authenticate?email=nero%40gmail.com&password=Nero1%23' \
  -H 'accept: */*' \
  -d ''
```

Response example:

```sh
{
  "id": "cf9c58bc-98dc-4929-afd8-8d710646dfc8",
  "userName": "nero1",
  "name": "nero1",
  "email": "nero@gmail.com",
  "roles": [
    "Client"
  ],
  "isActive": true,
  "hasError": false,
  "error": null,
  "jwToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuZXJvMSIsImp0aSI6IjY1NTBmNDg3LTRkNjktNDU0Zi05NGE5LWM3OTc0YTcyMTY4MyIsImVtYWlsIjoibmVyb0BnbWFpbC5jb20iLCJyb2xlcyI6IkNsaWVudCIsImV4cCI6MTc0MzI2NDcwNywiaXNzIjoiQ29kZUlkZW50aXR5IiwiYXVkIjoiU21hcnRXYWxsZXRBcGlVc2VyIn0.02lN5X5h5CLkpTKoiITtEXHjtxs5POHNlfJ5Z0bdo_g"
}
```

## Registra a un usuario

Registra a un usuario en el sistema

Parameters:
```
name: string | required
phoneNumber: string | required
role: string | required
userName: string | required
password: string | required
email: string | required
active: boolean | required
```

endpoint: 
```sh
/api/Account/Registro
```

Method: POST

Payload example:

```sh
curl -X 'POST' \
  'http://localhost:5800/api/Account/Registro?name=nero&phoneNumber=0000000000&role=Admin&userName=nero1&password=Nero1%23&email=nero%40gmail.com&active=true' \
  -H 'accept: */*' \
  -d ''
```

Response example:

```sh
200
{
  "hasError": false,
  "error": null,
  "userId": null
}
```