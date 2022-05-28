# System Design and Documentation

## Assumptions

- Data in QR code is in JSON format with the following structure. For simplicity, the title field is a uuid generated at the API side and is returned as part of the response body. The data field contains a nested JSON object with undefined structure.

```
{
    "title": "<TITLE>",
    "data": {
        <UNDEFINED_SCHEMA>
    }
}
```

- Titles must be unique

## Choice of Tech Stack

- API: Node.js ->
- Database: MongoDB -> Provides support for schemaless data
- Frontend: React ->
