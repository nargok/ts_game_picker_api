
import HttpException from './HttpException'

class GameNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Game with id ${id} not found`)
  }
}

export default GameNotFoundException