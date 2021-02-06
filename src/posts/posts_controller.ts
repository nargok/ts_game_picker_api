import * as express from 'express'
import { getRepository } from 'typeorm'
// import Post from './post.interface'
import Post from './post.entity'
import CreatePostDto from './post.dto'

class PostsController {
  public path = '/posts'
  public router = express.Router()
  private postRepository = getRepository(Post)

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllPosts)
    this.router.post(this.path, this.createPost)
  }

  private getAllPosts = async (request: express.Request, response: express.Response) => {
    const posts = await this.postRepository.find();
    response.send(posts)
  }

  private createPost = async (request: express.Request, response: express.Response) => {
    const postData: CreatePostDto = request.body
    const newPost = this.postRepository.create(postData)
    await this.postRepository.save(newPost)
    response.send(newPost)
  }
}

export default PostsController;