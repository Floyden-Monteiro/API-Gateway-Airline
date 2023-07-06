const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = 'Some thing went wrong while authenticating uswer';

    ErrorResponse.error = new AppError(
      ['Email not found in the incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = 'Some thing went wrong while authenticating uswer';

    ErrorResponse.error = new AppError(
      ['password not found in the incoming request'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateAuthRequest,
};
