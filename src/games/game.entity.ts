
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import User from '../user/user.entity'

@Entity({ name: 'games' })
class Game {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column()
  public url!: string;

  @Column()
  public price?: number;

  @Column({ nullable: true, type: 'text' })
  public memo?: string;

  @ManyToOne(() => User, (author: User) => author.games)
  public author!: User
}

export default Game;