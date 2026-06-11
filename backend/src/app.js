const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const db = require("./config/database");
const XLSX = require("xlsx");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post(
  "/api/files/upload",
  upload.single("file"),
  (req, res) => {
console.log('%%%%%%%% ',req.file);
console.log('$$$$$$$',req.file.path);
    const workbook = XLSX.readFile(req.file.path);

const sheetName = workbook.SheetNames[0];

const worksheet = workbook.Sheets[sheetName];

const products = XLSX.utils.sheet_to_json(worksheet);
products.forEach((product) => {
  db.run(
    `
    INSERT INTO products
    (
      product_id,
      product_name,
      price,
      region
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      product["Product ID"],
      product["Product Name"],
      product["Price"],
      product["Region"]
    ]
  );
});

console.log(products);
    db.run(
      `
      INSERT INTO files
      (
        original_name,
        stored_name,
        file_path,
        file_size
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        req.file.originalname,
        req.file.filename,
        req.file.path,
        req.file.size
      ],
      function (err) {

        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }

       res.json({
  success: true,
  id: this.lastID,
  file: req.file,
  products: products
});
      }
    );
  }
);


app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});