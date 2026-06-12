const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');
const dynamoDb = require('../config/dynamoDb');

const saveFileMetadata = async (file, s3File) => {
  const item = {
    id: uuidv4(),
    originalName: file.originalname,
    s3Key: s3File.key,
    bucket: s3File.bucket,
    fileSize: file.size,
    uploadedAt: new Date().toISOString(),
  };

  await dynamoDb.send(
    new PutCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Item: item,
    }),
  );

  return item;
};

module.exports = {
  saveFileMetadata,
};
