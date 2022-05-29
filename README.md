# QR Code API

## Assumptions

- Data in QR code is stored as a string, which is either a plain string or stringified JSON.
- Titles must be unique.
- Authenticated users can modify/delete data that they have not created.

## Choice of Tech Stack

- API: Node.js
- Database: MongoDB
- Frontend: React

## How to run

### API

Ensure `.env` is in the `api/` directory before running.

```
cd api/
yarn run start
```

### UI

```
cd ui/
yarn start
```

## API Documentation

### User Login

`POST` `/auth/login`

Request Body:

- email: string (required)
- password: string (required)

Responses:
| Code | Description | | | |
|------|---------------------------------|---|---|---|
| 200 | Successful operation | | | |
| 400 | Invalid email/password provided | | | |
| | | | | |

Example response body on successful operation:

```json
{
  "accessToken": "access_token_string",
  "refreshToken": "refresh_token_string"
}
```

### Get New Access Token

`GET` `/auth/token`

Request Headers:

`"Authorization": "Bearer <refresh_token>"`

Responses:
| Code | Description | | | |
|------|-------------------------------------|---|---|---|
| 200 | Successful operation | | | |
| 400 | Refresh token not found | | | |
| 401 | Refresh token is expired or invalid | | | |

Example response body on successful operation:

```json
"access_token_string"
```

### Upload data via QR code file

`POST` `/qr`

Request Headers:

`"Authorization": "Bearer <refresh_token>"`

Request body:

- qrCode: file (required)
- title: string (optional; used as custom title or to update existing title)

Responses:
| Code | Description | | | |
|------|----------------------------------------------------------------------------------------------------------|---|---|---|
| 201 | Successful operation | | | |
| 400 | QR code file not found or file cannot be parsed (either no QR code found or more than one QR code found) | | | |
| 401 | Unauthorized | | | |

Example response body on successful operation:

```json
// New/updated data document
{
  "title": "epFa2MvTkjnjjBiacPFI",
  "data": "The quick brown fox jumps over the lazy dog",
  "uploadedBy": "629202f755a5e3895cbe7496",
  "_id": "6293b148f1001113e39ea182",
  "createdAt": "2022-05-29T17:45:44.984Z",
  "updatedAt": "2022-05-29T17:45:44.984Z",
  "__v": 0
}
```

### Delete data by title

`DELETE` `/qr`

Request Headers:

`"Authorization": "Bearer <refresh_token>"`

Request Body:

- title: string (required)

Responses:
| Code | Description | | | |
|------|----------------------------------------------------------------|---|---|---|
| 200 | Successful operation | | | |
| 400 | Title missing from request body or title not found in database | | | |
| 401 | Unauthorized | | | |

Example response body on successful operation:

```json
// Deleted data document
{
    "_id": "629344b9a1230062cda17ae1",
    "title": "xZ5Kloz7vnFr0MD_hxQR",
    "data": "The quick brown fox jumps over the lazy dog",
    "uploadedBy": {
        "_id": "629202f755a5e3895cbe7496",
        "email": "davis.britney@runolfsdottir.com"
    },
    "createdAt": "2022-05-29T10:02:33.198Z",
    "updatedAt": "2022-05-29T10:02:33.198Z",
    "__v": 0
},
```

### Search by title

`GET` `/:title` - search data by title

Responses:
| Code | Description | | | |
|------|----------------------|---|---|---|
| 200 | Successful operation | | | |
| 404 | Title not found | | | |
| | | | | |

Example response body on successful operation:

```json
{
  "_id": "6293b475f1001113e39ea186",
  "title": "MDYcZ3AwGaBG2GgY4ECY",
  "data": "hello world",
  "uploadedBy": {
    "_id": "629202f755a5e3895cbe7496",
    "email": "davis.britney@runolfsdottir.com"
  },
  "createdAt": "2022-05-29T17:59:17.488Z",
  "updatedAt": "2022-05-29T17:59:17.488Z",
  "__v": 0
}
```

## MongoDB Schemas

### User Data

```
{
    email: "test123@test.com",
    password: "secure_password"
}
```

### QR Code Data

By default, the `title` field is a unique ID generated at the API side.

The `data` field contains either a plain string or a JSON object.

```
{
    title: "ceaseless-cheese",
    data: <UNDEFINED_SCHEMA>,
    uploadedBy: <User ObjectId>,
    modifiedBy: <User ObjectId>,
    createdAt: "2022-05-28T14:45:53.594+00:00",
    updatedBy: "2022-05-29T18:05:38.144+00:00"
}
```
