const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/fileController');

const router = express.Router();

// Multer writes uploaded files to the local uploads folder with a timestamped name.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Accepts a single spreadsheet file in the multipart field named "file".
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
