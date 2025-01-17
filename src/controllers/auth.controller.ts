import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, tokenService } from '../services';
import exclude from '../utils/exclude';
import { Request, Response } from 'express';

const register = catchAsync(async (req: Request, res: Response) => {
  const { user, bmiRecord, medicalConditionIds } = req.body;
  const createdUser = await authService.register(user, bmiRecord, medicalConditionIds);
  const userWithoutPassword = exclude(createdUser, ['password', 'createdAt', 'updatedAt']);
  const tokens = await tokenService.generateAuthTokens(createdUser);
  res.status(httpStatus.CREATED).send({ user: userWithoutPassword, tokens });
});

const registerExpert = catchAsync(async (req: Request, res: Response) => {
  const { user, application } = req.body;
  const createdUser = await authService.registerExpert(user, application);
  const userWithoutPassword = exclude(createdUser, ['password', 'createdAt', 'updatedAt']);
  const tokens = await tokenService.generateAuthTokens(createdUser);
  res.status(httpStatus.CREATED).send({ user: userWithoutPassword, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token as string, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  register,
  registerExpert,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword
};
