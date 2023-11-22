const SERVER = require("./database/dynamodb")

module.exports.handler = async function handler(event) {
  const { PK, SK } = event
  const result = await SERVER.documentClient
    .get({
      TableName: SERVER.TABLES.EXAMPLE,
      Key: { PK:PK, SK:SK },
    })
    .promise()
  return result.Item
}
