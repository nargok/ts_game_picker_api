
import * as express from 'express'
import { getRepository } from 'typeorm'
import authMiddleware from '../middleware/auth.middleware'
import CreateGameDto from './game.dto'
import GameNotFoundException from '../exceptions/GameNotFoundException'
import Controller from '../interfaces/controller.interface'
import Game from './game.interface'
import GameModel from './game.entity'
import RequestWithUser from '../interfaces/requestWithUser.interface'

class GamesController implements Controller {
  public path = '/games'
  public router = express.Router()
  private gameRepository = getRepository(GameModel)

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(this.path, authMiddleware, this.getAllGames) 
    this.router.get(`${this.path}/:id`, authMiddleware, this.getGameById)
    this.router
      .put(`${this.path}/:id`, authMiddleware, this.modifyGame)
      .delete(`${this.path}/:id`, authMiddleware, this.deleteGame)
      .post(this.path, authMiddleware, this.createGame)
  }

  private getAllGames = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const games = await this.gameRepository.find();
    response.send(games);
  }
  
  private getGameById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const game = await this.gameRepository.findOne(id);
    if (game) {
      response.send(game);
    } else {
      next(new GameNotFoundException(id));
    }
  }

  private createGame = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
    const gameData: CreateGameDto = request.body;
    const newGame = this.gameRepository.create({
      ...gameData,
      author: request.user,
    });
    await this.gameRepository.save(newGame);
    newGame.author.password = '';
    response.send(newGame);
    return
  }

  private modifyGame = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id
    const gameData: Game = request.body
    await this.gameRepository.update(id, gameData)
    const updatedGame = await this.gameRepository.findOne(id)
    if (updatedGame) {
      response.send(updatedGame)
    } else {
      next(new GameNotFoundException(id));
    }
  }

  private deleteGame = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id
    const deleteResponse = await this.gameRepository.delete(id)
    if (deleteResponse.affected === 1) {
      response.sendStatus(200)
    } else {
      next(new GameNotFoundException(id));
    }
  }

}

export default GamesController;