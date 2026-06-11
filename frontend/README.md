# Frontend

React interface for uploading product spreadsheets and previewing imported product rows.

## Responsibilities

- Shows the application header.
- Lets the user select a spreadsheet file.
- Sends the selected file to the backend upload API.
- Displays the product rows returned by the backend.

## Run Locally

```bash
npm install
npm start
```

The app runs on:

```text
http://localhost:3000
```

## Main Files

- `src/index.jsx` mounts the React app.
- `src/App.jsx` renders the shared page shell.
- `src/pages/UploadPage.jsx` manages file selection, upload, and product preview.
- `src/styles.css` loads Tailwind CSS utilities.
- `webpack.config.js` configures the development server and build pipeline.

## Backend Dependency

The upload screen posts files to:

```text
http://localhost:5000/api/files/upload
```

Start the backend before uploading files from the frontend.
