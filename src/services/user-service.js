const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const userRepository = new UserRepository();
const { Auth } = require('../utils/common');

async function create(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    if (
      error.name == 'SequelizeValidationError' ||
      error.name == 'SequelizeUniqueConstraintError'
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      'Cannot create a new user object',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new AppError(
        'No user found for the give email',
        StatusCodes.NOT_FOUND
      );
    }

    const passwordMatch = Auth.checkPassword(data.password, user.password);
    if (!passwordMatch) {
      throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
    }

    const jwt = Auth.createToken({ id: user.id, email: user.email });

    return jwt;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.log(error);
    throw new AppError(
      'Something went wrong',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAuthenticated(token) {
  try {
   
    if (!token) {
      throw new AppError('Missing jwt token', StatusCodes.BAD_REQUEST);
    }
    const response = Auth.verifyToken(token);
    const user = await userRepository.get(response.id);
    if (!user) {
      throw new AppError('No user found token', StatusCodes.BAD_REQUEST);
    }
    return user.id;
  } catch (error) {
    if (error instanceof AppError) throw error;

    if (error.name == 'JsonWebTokenError') {
      throw new AppError('Invalid jwt token', StatusCodes.BAD_REQUEST);
    }
    throw new AppError('something went wrong', StatusCodes.BAD_REQUEST);
  }
}

module.exports = {
  create,
  signin,
  isAuthenticated,
};
