import HttpException from './HttpException'

class AuthenticationTokenMissingExeption extends HttpException {
  constructor() {
    super(401, 'Authentication token missing');
  }
}

export default AuthenticationTokenMissingExeption;
