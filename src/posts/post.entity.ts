import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import User from '../user/user.entity'
import Category from '../category/category.entity'

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title!: string;

  @Column()
  public content!: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author!: User

  @ManyToMany(() => Category)
  @JoinTable()
  categories!: Category[];
}

export default Post;