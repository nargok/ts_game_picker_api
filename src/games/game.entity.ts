
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import User from '../user/user.entity'

@Entity()
class Game {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title!: string;

  @Column()
  public url!: string;

  @Column()
  public price?: number;

  @Column()
  public memo?: string;

  @ManyToOne(() => User, (author: User) => author.games)
  public author!: User
}

export default Game;