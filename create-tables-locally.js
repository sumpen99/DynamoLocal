const SERVER = require("./database/dynamodb")

async function getDynamoDBTableResources() {
  const tables = Object.entries(
    SERVER.yaml.loadAll(SERVER.fs.readFileSync(SERVER.SERVERLESS_CONFIG), {
      schema: SERVER.cloudformationSchema,
    })[0].resources.Resources,
  ).filter(
    ([, resource]) =>
      resource.Type === 'AWS::DynamoDB::Table',
  )
  return tables
}
;(async function main() {
  console.info('Setting up local DynamoDB tables')
  console.info(process.env.AWS_ACCESS_KEY_ID)
  const tables = await getDynamoDBTableResources()
  const existingTables = (await SERVER.ddb.listTables().promise())
    .TableNames
  for await ([logicalId, definition] of tables) {
    const {
      Properties: {
        BillingMode,
        TableName,
        AttributeDefinitions,
        KeySchema,
        GlobalSecondaryIndexes,
        LocalSecondaryIndexes,
      },
    } = definition
    if (
      existingTables.find((table) => table === TableName)
    ) {
      console.info(
        `${logicalId}: DynamoDB Local - Table already exists: ${TableName}. Skipping..`,
      )
      continue
    }
    const result = await SERVER.ddb
      .createTable({
        AttributeDefinitions,
        BillingMode,
        KeySchema,
        LocalSecondaryIndexes,
        GlobalSecondaryIndexes,
        TableName,
      })
      .promise()
    console.info(
      `${logicalId}: DynamoDB Local - Created table: ${TableName} - Result: ${result}`,
    )
  }
})()