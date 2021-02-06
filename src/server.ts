import 'dotenv/config'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import App from './app'
import config from './ormconfig'
import PostController from './posts/posts_controller'

const app = new App(
  [
    new PostController(),
  ],
  5000
)

app.listen()

// (async () => {
//   try {
//     const connections = await createConnection(config)
//   } catch (e) {
//     console.log('Error while connecting to the database', e)
//     return e
//   }
// })