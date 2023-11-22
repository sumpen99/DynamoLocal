"use strict";
const fs = require('fs');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const yaml = require('js-yaml');
const cloudformationSchema = require('@serverless/utils/cloudformation-schema');
const SERVERLESS_CONFIG = process.cwd() + '/serverless.yml';
const responses = require("../responses/response");
// __dirname

const ddb = new DynamoDB({
  accessKeyId: 'fake-key',
  endpoint: 'http://localhost:8001',
  region: 'local',
  secretAccessKey: 'fake-secret',
})

const documentClient = new DynamoDB.DocumentClient({
    service: ddb,
})

module.exports = {
    SERVERLESS_CONFIG:SERVERLESS_CONFIG,
    cloudformationSchema:cloudformationSchema,
    yaml:yaml,
    ddb:ddb,
    documentClient:documentClient,
    responses:responses,
    fs:fs,
    TABLES:{
        EXAMPLE:"example",
    },
    GSI:{
        GSI_PRIMARY:"GSI_1"
    }
}


