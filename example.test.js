const SERVER = require("./database/dynamodb") 
const { nanoid } = require('nanoid')
const { handler } = require('./example')

describe('example handler', () => {
  it('should return an item from DynamoDB specified by key', async () => {
    const testItem = {
      PK: 'test-pk-' + nanoid(),
      SK: 'test-sk-' + nanoid(),
    }
    await SERVER.documentClient
      .put({
        TableName: SERVER.TABLES.EXAMPLE,
        Item: testItem,
      })
      .promise()
    const result = await handler(testItem)
    console.info(result)
    //expect(result).toMatchObject(testItem)
  })
})
