# User API Specification

This document describes the API for the user service.

## Register User

Registers a new user.

Endpoint: `POST /api/users`

Request Body :

```json
{
  "username": "alippwd",
  "password": "passwordalippwd",
  "name": "aliffian ilham"
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "alippwd",
    "name": "aliffian ilham"
  }
}
```

Response Body (error) :

```json
{
  "error": {
    "message": "Username already exists"
  }
}
```

## Login User

Endpoint: `POST /api/users/login`

Request Body :

```json
{
  "username": "alippwd",
  "password": "passwordalippwd"
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "alippwd",
    "name": "aliffian ilham",
    "token": "UUID"
  }
}
```

Response Body (error) :

```json
{
  "error": {
    "message": "Invalid username or password"
  }
}
```

## Get User

Endpoint: `GET /api/users/current`

Request Header :

```json
{
  "X-API-TOKE": token
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "alippwd",
    "name": "aliffian ilham"
  }
}
```

Response Body (error) :

```json
{
  "error": {
    "message": "User not found"
  }
}
```

## Update User

Endpoint: `PATCH /api/users/current`

Request Header :

```json
{
  "X-API-TOKE": token
}
```

Request Body :

```json
{
  "password": "passwordalippwd", // tidak wajib
  "name": "aliffian ilham" // tidak wajib
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "alippwd",
    "name": "aliffian ilham"
  }
}
```

Response Body (error) :

```json
{
  "error": {
    "message": "User not found"
  }
}
```

## Logout User

Endpoint: `DELETE /api/users/current`

Request Header :

```json
{
  "X-API-TOKE": token
}
```

Response Body (success) :

```json
{
  "data": "OK"
}
```

Response Body (error) :

```json
{
  "error": {
    "message": "User not found"
  }
}
```
