import express from 'express';
import errorMiddleware from './middleware/error.middleware'
import cookieParser from 'cookie-parser';
import cors from 'cors';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeControllers(controllers);
    // this.initializeErrorHandling(); // TODO ここに何かしらのエラーがあった..
  }

  private initializeMiddleware() {
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(cors({
      origin: 'http://localhost:8081', //アクセス許可するオリジン
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200 //レスポンスstatusを200に設定
    }))
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
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
