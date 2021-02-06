import 'dotenv/config'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import App from './app'
import config from './ormconfig'
import PostController from './posts/posts_controller'

(async () => {
  try {
    const connections = await createConnection(config)
  } catch (e) {
    console.log('Error while connecting to the database', e)
    return e
  }
  const app: App = new App(
    [
      new PostController(),
    ],
    Number(process.env.PORT) || 5000,
  )
  app.listen()
})();