const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/aws');

const uploadFileToS3 = async (fileBuffer, fileName, contentType) => {
  const key = `uploads/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  return {
    key,
    bucket: process.env.AWS_S3_BUCKET,
  };
};

module.exports = {
  uploadFileToS3,
};
