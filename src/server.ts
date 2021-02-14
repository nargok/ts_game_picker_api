import 'dotenv/config'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import App from './app'
import config from './ormconfig'
import PostController from './posts/posts_controller'
import AuthenticationController from './authentication/authentication.controller'

(async () => {
  try {
    const connection = await createConnection(config);
    await connection.runMigrations();
  } catch (e) {
    console.log('Error while connecting to the database', e)
    return e
  }
  const app: App = new App(
    [
      new PostController(),
      new AuthenticationController(),
    ],
    Number(process.env.PORT) || 5000,
  )
  app.listen()
})();