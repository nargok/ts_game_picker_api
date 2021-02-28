import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import Address from '../adress/adress.entity'
import Post from '../posts/post.entity'
import Game from '../games/game.entity'

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column()
  public fullName!: string

  @Column()
  public email!: string

  @Column()
  public password!: string

  @OneToOne(() => Address, (address: Address) => address.user, {
    cascade: true,
    eager: true
  })
  @JoinColumn()
  public address!: Address

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts!: Post[];

  @OneToMany(() => Game, (game: Game) => game.author)
  public games!: Game[];
}

export default User
