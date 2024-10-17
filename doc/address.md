# Adrress API Specification

## Create Address

Endpoint: `POST /api/contacts/:idContact/addresses`

Request Header :

```json
{
  "X-API-TOKEN": token
}
```

Request Body :

```json
{
  "street": "Jl. Jalan",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "country": "Indonesia",
  "postal_code": "12345"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Jalan",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "12345"
  }
}
```

Response Body (Error) :

```json
{
  "error": {
    "message": "Invalid request"
  }
}
```

## Get Address

Endpoint: `GET /api/contacts/:idContact/addresses/:idAddress`

Request Header :

```json
{
  "X-API-TOKEN": token
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Jalan",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "12345"
  }
}
```

Response Body (Error) :

```json
{
  "error": {
    "message": "Invalid request"
  }
}
```

## Update Address

Endpoint: `PUT /api/contacts/:idContact/addresses/:idAddress`

Request Header :

```json
{
  "X-API-TOKEN": token
}
```

Request Body :

```json
{
  "street": "Jl. Jalan",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "country": "Indonesia",
  "postal_code": "12345"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Jalan",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "12345"
  }
}
```

Response Body (Error) :

```json
{
  "error": {
    "message": "Invalid request"
  }
}
```

## Delete Address

Endpoint: `DELETE /api/contacts/:idContact/addresses/:idAddress`

Request Header :

```json
{
  "X-API-TOKEN": token
}
```

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Error) :

```json
{
  "error": {
    "message": "Address is not found"
  }
}
```

## List Address

Endpoint: `GET /api/contacts/:idContact/addresses`

Request Header :

```json
{
  "X-API-TOKEN": token
}
```

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jl. Jalan",
      "city": "Jakarta",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "12345"
    },
    {
      "id": 2,
      "street": "Jl. Jalan",
      "city": "Jakarta",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "12345"
    }
  ]
}
```

Response Body (Error) :

```json
{
  "error": {
    "message": "contact is not found"
  }
}
```
