const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../config/database.config');
const errorResponse = require('../utils/errorResponse');

const User = db.model.user;

verifyToken = (req, res, next) => {
  try {
    const authBearerToken = req?.headers?.authorization;
    console.log(`authBearerToken:`, authBearerToken);

    if (!authBearerToken) {
      return res.status(401).send({
        error: 'Unauthorise Access',
        message: 'authBearerToken not found at verifyToken function',
      });
    }
    // verifyToken
    const token = authBearerToken.split(' ')[1];
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(403).send({
          error: 'Forbidden Access',
          message: 'Error found at matching token & ACCESS_TOKEN_SECRET_KEY',
        });
      }
      req.decodedData = decoded;
      // console.log('Decoded', req.decoded);
      next();
    });
  } catch (error) {
    errorResponse(
      500,
      'ERROR',
      error.message || 'Some error occurred while Verifying Token',
      res
    );
  }
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
