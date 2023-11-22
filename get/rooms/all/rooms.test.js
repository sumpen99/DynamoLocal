const { handler } = require('./rooms')

describe('all rooms', () => {
  it('should return 20 hotelrooms from DynamoDB...', async () => {
    const result = await handler()
    console.info(`badam da dam we got: ${result}`)
    //expect(result).toMatchObject(testItem)
  })
})