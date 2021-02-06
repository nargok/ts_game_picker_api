import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import Address from '../adress/adress.entity'

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: string;

  @Column()
  public name!: string

  @Column()
  public email!: string

  @Column()
  public poassword!: string

  @OneToOne(() => Address, (address: Address) => address.user, {
    cascade: true,
    eager: true
  })
  @JoinColumn()
  public address!: Address
}

export default User