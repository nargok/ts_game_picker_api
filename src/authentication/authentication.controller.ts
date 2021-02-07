import * as bcrypt from 'bcrypt';
import * as express from 'express';
import { getRepository } from 'typeorm';

import Controller from '../interfaces/controller.interface'
import userModel from '../user/user.entity'
import CreateUserDto from '../user/user.dto'
import LogInDto from './login.dto'

class AuthenticationController implements Controller {
  public path = '/auth'
  public router = express.Router()
  private userRepository = getRepository(userModel)

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.registration)
  }

  private registration = async(request: express.Request, response: express.Response, next: express.NextFunction) {
    const userData: CreateUserDto = request.body
    if (await this.userRepository.findOne({ email: userData.email })) {
      // TODO 後で例外処理に切り替える
      throw Error('User is already existing')
    } else {
      const hashedPasword = await bcrypt.hash(userData.password, 10)
      const user = await this.userRepository.create({
        ...userData,
        password: hashedPasword
      })
      await this.userRepository.save(user)
      user.password = ''
      response.send(user)
    }
  }

  private loggingIn = async(request: express.Request, response: express.Response, next: express.NextFunction) {
    const logInData: LogInDto = request.body
    const user = await this.userRepository.findOne({ email: logInData.email })
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password)
      if (isPasswordMatching) {
        user.password = ''
        response.send(user)
      } else {
        // TODO 後で例外処理に変える
        throw Error('Wrong credeintials')
      } 
    } else {
      throw Error('Wrong credeitials')
    }
  }
}

export default AuthenticationController;