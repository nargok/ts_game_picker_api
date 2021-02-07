import express from 'express';
import { NextFunction, Request, Response } from 'express';
import HttpException from './exceptions/HttpException';
import cookieParser from 'cookie-parser';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeControllers(controllers)
  }

  private initializeMiddleware() {
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
      console.log(err)
      res.status(err.statusCode || 500).json({ error: err.message })
    })
  }

  private initializeControllers(controllers: Array<any>) {
    controllers.forEach((controller: { router: any; }) => {
      this.app.use('/', controller.router)
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`)
    })
  }
}

export default App
