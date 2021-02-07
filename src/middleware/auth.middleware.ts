import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import RequestWithUser from '../interfaces/requestWithUser.interface'
import DataStoredInToken from '../interfaces/dataStoredInToken'
import UserModel from '../user/user.entity'

async function authMiddlleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const cookies = request.cookies;
  const userRepository = getRepository(UserModel)
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET!
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken
      const id = verificationResponse.id;
      const user = await userRepository.findOne(id)
      if (user) {
        request.user = user;
        next()
      } else {
        // TODO 後で例外処理に変える
        throw Error('WrongAuthenticationTokenException')
      }
    } catch (err) {
        // TODO 後で例外処理に変える
      throw Error('WrongAuthenticationTokenException')
    }
  } else {
    // TODO 後で例外処理に変える
    throw Error('AuthenticationTokenMissingExeption')
  }
}

export default authMiddlleware;