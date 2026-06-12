const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

const fileRoutes = require('./routes/fileRoutes');

const app = express();

// Global middleware used by every API route.
app.use(cors());
app.use(express.json());

// File upload and spreadsheet import endpoints.
app.use('/api/files', fileRoutes);

// Simple endpoint for confirming that the API process is running.
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend is running',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
