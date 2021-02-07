import { IsOptional, IsString, ValidateNested } from 'class-validator'
import CreateAddressDto from '../adress/address.dto'

class CreateUserDto {
  @IsString()
  public name!: string;

  @IsString()
  public email!: string;

  @IsString()
  public password!: string;

  @IsOptional()
  @ValidateNested()
  public address?: CreateAddressDto
}

export default CreateUserDto