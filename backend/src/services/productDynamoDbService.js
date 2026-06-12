const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const dynamoDb = require('../config/dynamoDb');

const saveProduct = async (product) => {
  await dynamoDb.send(
    new PutCommand({
      TableName: 'Products',
      Item: {
        productId: String(product['Product ID']),
        productName: product['Product Name'],
        price: Number(product['Price']),
        region: product['Region'],
      },
    }),
  );
};

module.exports = {
  saveProduct,
};
