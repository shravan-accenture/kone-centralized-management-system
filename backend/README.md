# Backend

Express API for the KONE Centralized Management System proof of concept.

## Responsibilities

- Exposes the API health check.
- Accepts spreadsheet uploads.
- Saves uploaded files in `uploads/`.
- Parses the first worksheet from each spreadsheet.
- Stores uploaded file metadata and product rows in SQLite.

## Run Locally

```bash
npm install
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

## Main Files

- `src/app.js` configures Express, middleware, routes, and the health check.
- `src/routes/fileRoutes.js` defines upload routing and local file storage.
- `src/controllers/fileController.js` parses spreadsheets and writes data to SQLite.
- `src/config/database.js` opens the SQLite database and creates required tables.

## Endpoints

### Health Check

```http
GET /health
```

### Upload File

```http
POST /api/files/upload
```

Send a multipart form request with a single field named `file`.

Expected spreadsheet columns:

- `Product ID`
- `Product Name`
- `Price`
- `Region`

## Database Tables

- `files`: stores uploaded file metadata.
- `products`: stores rows imported from spreadsheets.
