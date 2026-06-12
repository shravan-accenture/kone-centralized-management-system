const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/fileController');

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

// Accepts a single spreadsheet file in the multipart field named "file".
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
