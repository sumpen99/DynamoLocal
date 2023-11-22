const { handler } = require('./user')

describe('login handler', () => {
  it('should login on account created', async () => {
    const user = {
      username: "sumpen99",
      password: "hejhoppitrollskogen",
    }
    const result = await handler(user);
    console.info(result)
    //expect(result).toMatchObject(testItem)
  })
})