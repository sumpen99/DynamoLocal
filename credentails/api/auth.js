const response = require("../../responses/response");
const { UnAuthorized } = require("../../credentails/token/exception");
const { generateToken, refreshToken } = require("../../credentails/token/authentication");

const SECRET = require("../../database/supersecret");

module.exports.getAccessToken = async (event) => {
  try {
    const API_KEY = event.headers.API_KEY;
    if(SECRET.APP_KEY === API_KEY) {
      const token = generateToken({ id: "application" });
      return response.sendResponse(200, { token:token });
    } 
    else { UnAuthorized() }
  } catch (error) {
    return response.failed(error);
  }
};

module.exports.refreshAccessToken = async (event) => {
  try {
    const {API_KEY, Authorization } = event.headers;
    if (SECRET.APP_KEY === API_KEY) {
      const token = refreshToken(Authorization);
      return response.sendResponse(200, { token:token });
    } 
    else { UnAuthorized() }
  } catch (error) {
    return response.sendResponse(400, { message:error });
  }
};