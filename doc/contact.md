# Contact API Specification

## Create Contact

Endpoint: `POST /api/contacts`

Request Header :

```json
{
  "X-API-TOKEN": token
}
```

Request Body :

```json
{
  "first_name": "aliffian",
  "last_name": "ilham",
  "email": "alif@email.com",
  "phone": "08123456789"
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "aliffian",
    "last_name": "ilham",
    "email": "alif@email.com",
    "phone": "08123456789"
  }
}
```

Reponse Body (error) :

```json
{
  "error": {
    "message": "Invalid request"
  }
}
```

## Get Contact

Endpoint: `GET /api/contacts/:id`

Request Header :

```json
{
  "X-API-TOKEN": token
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "aliffian",
    "last_name": "ilham",
    "email": "alif@email.com",
    "phone": "08123456789"
  }
}
```

Reponse Body (error) :

```json
{
  "error": {
    "message": "Invalid request"
  }
}
```

## Update Contact

Endpoint: `PUT /api/contacts/:id`

Request Header :

```json
{
  "X-API-TOKEN": token
}
```

Request Body :

```json
{
  "first_name": "aliffian",
  "last_name": "ilham",
  "email": "alif@email.com",
  "phone": "08123456789"
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "aliffian",
    "last_name": "ilham",
    "email": "alif@email.com",
    "phone": "08123456789"
  }
}
```

Reponse Body (error) :

```json
{
  "error": {
    "message": "Invalid request"
  }
}
```

## Delete Contact

Endpoint: `DELETE /api/contacts/:id`

Request Header :

```json
{
  "X-API-TOKEN": token
}
```

Response Body (success) :

```json
{
  "data": "OK"
}
```

Reponse Body (error) :

```json
{
  "error": {
    "message": "Invalid request"
  }
}
```

## List Contact

Endpoint: `GET /api/contacts`

Query Parameter :

- name : string , contact first name or last name (optional)
- phone : string , contact phone number (optional)
- email : string , contact email (optional)
- page : integer , page number default 1 (optional)
- per_page : integer , number of contact per page default 10 (optional)

Request Header :

```json
{
  "X-API-TOKEN": token
}
```

Response Body (success) :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "aliffian",
      "last_name": "ilham",
      "email": "alif@email.com",
      "phone": "08123456789"
    },
    {
      "id": 2,
      "first_name": "aliffian",
      "last_name": "ilham",
      "email": "alif@email.com",
      "phone": "08123456789"
    }
  ],
  "pagging": {
    "page": 1,
    "per_page": 10,
    "total_data": 100
  }
}
```

Reponse Body (error) :

```json
{
  "error": {
    "message": "Invalid request"
  }
}
```
