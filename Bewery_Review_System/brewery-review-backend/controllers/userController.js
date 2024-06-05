// authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnAuthenticatedError
} = require('../middlewares/errors.js');

const registerUser = async (req, res) => { 
  const { name, email, password } = req.body;

  if (!name || !email || !password) throw new BadRequestError('Please provide all fields');

  const userExist = await User.findOne({ email });

  if (userExist) throw new ConflictError('User already exists, please login');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.status(StatusCodes.CREATED).json({ success: `New user is created: ${name}` });
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;
  const userExist = await User.findOne({ name });

  if (!userExist) throw new NotFoundError('User does not exist, please signup');

  const verified = await bcrypt.compare(password, userExist.password);
  if (!verified) throw new BadRequestError('Invalid credentials');

  const accessToken = jwt.sign(
    { userID: userExist._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30m' }
  );

  res.status(StatusCodes.OK).json({ accessToken });
};

const refreshTokenHandler = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) throw new UnAuthenticatedError('Invalid user');

  const refreshToken = cookies.jwt;

  const userExist = await User.findOne({ refreshToken });

  if (!userExist) throw new ForbiddenError('User is not allowed to make this request');

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (
      err ||
      !mongoose.Types.ObjectId.isValid(decoded.userID) ||
      !userExist._id.equals(decoded.userID)
    ) throw new ForbiddenError('User is not allowed to make this request');

    const accessToken = jwt.sign(
      { userID: decoded.userID },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );

    res.status(StatusCodes.OK).json({ accessToken });
  });
};

const userLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(StatusCodes.NO_CONTENT);

  const refreshToken = cookies.jwt;

  const userExist = await User.findOne({ refreshToken });

  if (!userExist) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    });
    return res.sendStatus(StatusCodes.NO_CONTENT);
  }

  await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: '' }
  );

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true
  });
  res.sendStatus(StatusCodes.NO_CONTENT);
};

module.exports = {
  registerUser,
  loginUser,
  refreshTokenHandler,
  userLogout
};
