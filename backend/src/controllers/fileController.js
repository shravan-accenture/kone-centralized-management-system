const XLSX = require('xlsx');
const { uploadFileToS3 } = require('../services/s3Service');
const { saveFileMetadata } = require('../services/dynamoDbService');
const { saveProduct } = require('../services/productDynamoDbService');
/**
 * Handles spreadsheet uploads.
 * Reads the first worksheet, stores product rows, then saves file metadata.
 */
const uploadFile = async (req, res) => {
  const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const products = XLSX.utils.sheet_to_json(worksheet);

  const s3File = await uploadFileToS3(req.file.buffer, req.file.originalname, req.file.mimetype);

  console.log('S3 Upload Success:', s3File);

  const fileMetadata = await saveFileMetadata(req.file, s3File);

  console.log('DynamoDB Save Success:', fileMetadata);

  for (const product of products) {
    await saveProduct(product);
  }

  return res.json({
    success: true,
    file: req.file,
    products,
  });
};

module.exports = {
  uploadFile,
};
