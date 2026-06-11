# KONE Centralized Management System

A proof of concept application built using React, Express.js, and Node.js.

## Project Structure

```text
kone-centralized-management-system/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── webpack.config.js
│   └── package.json
│
├── backend/
│   ├── src/
│   └── package.json
│
└── README.md
```

## Tech Stack

### Frontend

* React
* Webpack
* Babel

### Backend

* Node.js
* Express.js

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm start
```

Application runs on:

```text
http://localhost:3000
```

### Backend

```bash
cd backend
npm install
npm run dev
```

API runs on:

```text
http://localhost:5000
```

### Health Check

```http
GET /health
```

Response:

```json
{
  "status": "OK",
  "message": "Backend is running"
}
```

## Planned Features

* File Upload
* File Metadata Storage
* AWS S3 Integration
* DynamoDB Integration
* File Listing
* File Download
* Error Handling
* Authentication

## Author

Shravan Bodhe
