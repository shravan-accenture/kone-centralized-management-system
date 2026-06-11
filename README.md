# KONE Centralized Management System

A proof-of-concept full-stack application for uploading product spreadsheets, storing file metadata, importing product rows into SQLite, and previewing uploaded product data in the browser.

## Tech Stack

### Frontend

- React
- Webpack
- Babel
- Bootstrap
- Tailwind CSS utilities
- Axios

### Backend

- Node.js
- Express.js
- Multer
- SQLite
- xlsx

## Project Structure

```text
kone-centralized-management-system/
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- pages/
|   |   |-- App.jsx
|   |   |-- index.jsx
|   |   `-- styles.css
|   |-- package.json
|   `-- webpack.config.js
|
|-- backend/
|   |-- database/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- routes/
|   |   `-- app.js
|   |-- uploads/
|   `-- package.json
|
`-- README.md
```

## Getting Started

Install and run the backend first:

```bash
cd backend
npm install
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

In a second terminal, install and run the frontend:

```bash
cd frontend
npm install
npm start
```

The web app runs on:

```text
http://localhost:3000
```

## Available Scripts

### Backend

- `npm run dev` starts the Express API with Nodemon.
- `npm run lint` checks backend JavaScript with ESLint.
- `npm run lint:fix` fixes supported ESLint issues.
- `npm run format` formats backend files with Prettier.

### Frontend

- `npm start` starts the Webpack development server.
- `npm run build` creates a production build.
- `npm run lint` checks frontend JavaScript and JSX with ESLint.
- `npm run lint:fix` fixes supported ESLint issues.
- `npm run format` formats frontend files with Prettier.

## API Reference

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "OK",
  "message": "Backend is running"
}
```

### Upload Product File

```http
POST /api/files/upload
Content-Type: multipart/form-data
```

Form field:

- `file`: spreadsheet file uploaded from the frontend.

The backend reads the first worksheet and expects these column names:

- `Product ID`
- `Product Name`
- `Price`
- `Region`

Example success response:

```json
{
  "success": true,
  "id": 1,
  "file": {
    "originalname": "products.xlsx",
    "filename": "1781185784520-products.xlsx"
  },
  "products": [
    {
      "Product ID": "P001",
      "Product Name": "Sample Product",
      "Price": 100,
      "Region": "West"
    }
  ]
}
```

## Database

The backend uses SQLite at `backend/database/app.db`.

Tables are created automatically when the backend starts:

- `files` stores uploaded file metadata.
- `products` stores product rows imported from uploaded spreadsheets.

## Upload Flow

1. The user selects a spreadsheet in the frontend.
2. `UploadPage.jsx` sends the file to `POST /api/files/upload`.
3. Multer saves the file in `backend/uploads/`.
4. The backend reads the first worksheet using `xlsx`.
5. Product rows are inserted into SQLite.
6. File metadata is inserted into SQLite.
7. The imported product rows are returned to the frontend and shown in a table.

## Notes

- Uploaded files and the local SQLite database are development artifacts.
- The API URL is currently hardcoded in the frontend as `http://localhost:5000`.
- The current implementation is a proof of concept and does not include authentication or file validation yet.

## Planned Improvements

- Add spreadsheet file validation.
- Add better upload error handling.
- Add file listing and download endpoints.
- Move API base URL into environment configuration.
- Add authentication before production use.

## Author

Shravan Bodhe
