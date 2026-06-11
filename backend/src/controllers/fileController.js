const XLSX = require('xlsx');
const db = require('../config/database');

/**
 * Handles spreadsheet uploads.
 * Reads the first worksheet, stores product rows, then saves file metadata.
 */
const uploadFile = (req, res) => {
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
      [product['Product ID'], product['Product Name'], product['Price'], product['Region']],
    );
  });

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
    [req.file.originalname, req.file.filename, req.file.path, req.file.size],
    function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        id: this.lastID,
        file: req.file,
        products: products,
      });
    },
  );
};

module.exports = {
  uploadFile,
};
