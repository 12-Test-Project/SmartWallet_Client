# AI

## General Advice

Parameters:
```
advice_type: string | required
user_id: string | required
prompt: string | required
```

endpoint: 
```sh
/advice/{advice_type}
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://0.0.0.0:8000/advice/life?user_id=a193ad5e-583d-4940-97e7-c4bef2c54899&prompt=Give%20me%20a%20quote%20about%20personal%20growth' \
  -H 'accept: application/json'
```

Response example:

```sh
{
  "Key": "77ebb23d-8760-496b-81ef-7dd57d17106e"
}
```

## Get Advice Status

Parameters:
```
task_id: string | required
```

endpoint: 
```sh
curl -X 'GET' \
  'http://0.0.0.0:8000/advice/status/77ebb23d-8760-496b-81ef-7dd57d17106e' \
  -H 'accept: application/json'
```

Method: GET

Payload example:

```sh
curl -X 'GET' \
  'http://0.0.0.0:8000/advice/status/77ebb23d-8760-496b-81ef-7dd57d17106e' \
  -H 'accept: application/json'
```

Response example:

If the task is still in process
```sh
{
  "task_id": "77ebb23d-8760-496b-81ef-7dd57d17106e",
  "status": "STARTED",
  "result": null,
  "error": null
}
```

If the task is complete
```sh
{
  "task_id": "77ebb23d-8760-496b-81ef-7dd57d17106e",
  "status": "SUCCESS",
  "result": {
    "advice": " Antes de que te pongas a trabajar en tu cuenta bancaria, revisa el siguiente análisis financiero para verificar si realmente necesitas un plan de ahorros. Ahora, veamos cómo se pueden mejorar tus habilidades financieras con un plan de ahorro. ¿Qué es un plan de ahorro? Un plan de ahorro es una estrategia que te ayuda a mantener tu dinero en el banco para evitar la necesidad de buscar prestamistas, como los bancos y las empresas de crédito. Además, te ayudará a tener más dinero cuando te gustaría comprar algo o hacer una inversión. ¿Cuál es el plan de ahorro? El plan de ahorro se divide en tres etapas: 1) Ahorrar para la emergencia; 2) Ahorrar para las necesidades básicas (como la vivienda, la comida y el transporte); y 3) Ahorrar para los objetivos personales. ¿Cómo funciona un plan de ahorro? Primero, debes identificar tus necesidades básicas y establecer un presupuesto. Luego, puedes utilizar el dinero que ya tenías en tu cuenta bancaria o ahorrar para cubrir dichas necesidades. ¿Cómo se pueden mejorar tus habilidades financieras con un plan de ahorro? 1) Ahorrar para la emergencia: si alguna vez te encuentras en una situación donde no puedes pagar tu factura, tendrás suficiente dinero para cubrir las necesidades básicas. 2) Ahorrar para las necesidades básicas: con un presupuesto y un plan de ahorro, podrías comprar"
  },
  "error": null
}
```