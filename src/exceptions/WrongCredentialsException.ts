import HttpException from './HttpException'

class WrongCredeitialsException extends HttpException {
  constructor() {
    super(401, 'Wrong credentials provided')
  }
}

export default WrongCredeitialsException;
