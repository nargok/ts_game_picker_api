import * as express from 'express'
import { getRepository } from 'typeorm'
import Post from './post.entity'
import CreatePostDto from './post.dto'
import PostNotFoundException from '../exceptions/PostNotFoundException'
import Controller from '../interfaces/controller.interface'

// TODO 後で型定義する
interface RequestWithUser extends express.Request {
  user: any
}

class PostsController implements Controller {
  public path = '/posts'
  public router = express.Router()
  private postRepository = getRepository(Post)

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllPosts)
    this.router.get(`${this.path}/:id`, this.getPostById)
    this.router.post(this.path, this.createPost)
    this.router.put(`${this.path}/:id`, this.modifyPost)
    this.router.delete(`${this.path}/:id`, this.deletePost)
  }

  private getAllPosts = async (request: express.Request, response: express.Response) => {
    const posts = await this.postRepository.find();
    response.send(posts)
  }

  private getPostById = async(request: express.Request, response: express.Response, next: express.NextFunction)  => {
    const id = request.params.id
    const post = await this.postRepository.findOne(id)
    if (post) {
      response.send(post)
    } else {
      next(new PostNotFoundException(id));
    }
  }

  private createPost = async (request: RequestWithUser, response: express.Response) => {
    const postData: CreatePostDto = request.body
    const newPost = this.postRepository.create({
      ...postData,
      author: request.user,
    })
    await this.postRepository.save(newPost)
    response.send(newPost)
  }

  private modifyPost = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id
    const postData: CreatePostDto = request.body
    await this.postRepository.update(id, {
      ...postData,
      author: request.user
    })
    const updatedPost = await this.postRepository.findOne(id)
    if (updatedPost) {
      response.send(updatedPost)
    } else {
      next(new PostNotFoundException(id));
    }
  }
  
  private deletePost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id
    const deleteResponse = await this.postRepository.delete(id)
    if (deleteResponse.affected === 1) {
      response.sendStatus(200)
    } else {
      next(new PostNotFoundException(id));
    }
  }
}

export default PostsController;