import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import Controller from '../interfaces/controller.interface';
import UserModel from '../user/user.entity';
import CreateUserDto from '../user/user.dto';
import LogInDto from './login.dto';
import TokenData from '../interfaces/tokenData.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import WrongCredeitialsException from '../exceptions/WrongCredentialsException';
import UserWithThatEmailAlreadyExistsExeption from '../exceptions/UserWithThatEmailAlreadyExistsExeption'

class AuthenticationController implements Controller {
  public path = '/auth'
  public router = express.Router()
  private userRepository = getRepository(UserModel)

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.registration)
    this.router.post(`${this.path}/login`, this.loggingIn)
    this.router.post(`${this.path}/logout`, this.loggingOut)
  }

  private registration = async(request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userData: CreateUserDto = request.body
    if (await this.userRepository.findOne({ email: userData.email })) {
      next(new UserWithThatEmailAlreadyExistsExeption(userData.email))
    } else {
      const hashedPasword = await bcrypt.hash(userData.password, 10)
      const user = await this.userRepository.create({
        ...userData,
        password: hashedPasword
      })
      await this.userRepository.save(user)
      user.password = ''
      const tokenData = this.createToken(user)
      response.setHeader('Set-Cookie', [this.createCookie(tokenData)])
      response.send(user)
    }
  }

  private loggingIn = async(request: express.Request, response: express.Response, next: express.NextFunction) => {
    const logInData: LogInDto = request.body
    const user = await this.userRepository.findOne({ email: logInData.email })
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password)
      if (isPasswordMatching) {
        user.password = ''
        const tokenData = this.createToken(user)
        // response.setHeader('Set-Cookie', [this.createCookie(tokenData)])
        // response.send(user)
        response.send({...user, token: tokenData.token })
      } else {
        next(new WrongCredeitialsException())
      }
    } else {
      next(new WrongCredeitialsException())
    }
  }

  private loggingOut = (request: express.Request, response: express.Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0'])
    response.sendStatus(200)
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`
  }

  private createToken(user: UserModel): TokenData {
    const expiresIn = 60 * 60
    const secret = process.env.JWT_SECRET!
    const dataStoredInToken: DataStoredInToken = {
      id: user.id!
    }
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    }
  }
}

export default AuthenticationController;
