const { reject, resolve } = require("bluebird");
const JWT = require("jsonwebtoken");
const { UnAuthorized } = require("../../credentails/token/exception");
const SECRET = require("../../database/supersecret");

const authenticate = (token, secret = SECRET.API_KEY) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, secret, (err, decoded) => {
      if (err) {
        err.data = {}
        err.data.code = 401;
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const generateToken = (payload, secret = SECRET.API_KEY) => {
  let token = JWT.sign(payload, secret);
  return token;
};

const refreshToken = (token) => {
  try {
    if (!token) {
      UnAuthorized();
    }

    let decodedToken, newToken;
    decodedToken = JWT.verify(token, SECRET.API_KEY);
    newToken = JWT.sign({ id: decodedToken.id }, SECRET.API_KEY, {
      expiresIn: "1h",
    });
    return { token: newToken, tokenExpiration: "1h" };
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      const payload = JWT.verify(token, SECRET.API_KEY, { ignoreExpiration: true });
      newToken = JWT.sign({ id: payload.id }, SECRET.API_KEY, {
        expiresIn: "1h",
      });
      return { token: newToken, tokenExpiration: "1h" };
    } else {
      throw error;
    }
  }
};

module.exports = {
  authenticate,
  generateToken,
  refreshToken,
};