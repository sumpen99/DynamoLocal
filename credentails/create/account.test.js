const { handler } = require('./account')

describe('createaccount handler', () => {
  it('should create account and return success', async () => {
    const user = {
        username: "sumpen99",
        password: "hejhoppitrollskogen",
        firstname: "Fredrik",
        lastname: "Sundström"
    }
    const result = await handler(user);
    console.info(result)
    //expect(result).toMatchObject(user)
  })
})