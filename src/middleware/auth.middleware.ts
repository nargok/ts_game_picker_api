import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import RequestWithUser from '../interfaces/requestWithUser.interface'
import DataStoredInToken from '../interfaces/dataStoredInToken'
import UserModel from '../user/user.entity'
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException'
import AuthenticationTokenMissingExeption from '../exceptions/AuthenticationToeknMissingException'

async function authMiddlleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const headers = request.headers;
  const userRepository = getRepository(UserModel)
  if (headers && headers.authorization) {
    const secret = process.env.JWT_SECRET!
    try {
      const verificationResponse = jwt.verify(headers.authorization, secret) as DataStoredInToken
      const id = verificationResponse.id;
      const user = await userRepository.findOne(id)
      if (user) {
        request.user = user;
        next()
      } else {
        next(new WrongAuthenticationTokenException())
      }
    } catch (err) {
      next(new WrongAuthenticationTokenException())
    }
  } else {
    next(new AuthenticationTokenMissingExeption())
  }
}

export default authMiddlleware;