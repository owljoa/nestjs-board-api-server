import { User } from '../entity/user.entity';

export class CreateUserDto {
  email: string;
  name: string;

  toEntity(): User {
    return new User(this.email, this.name);
  }
}
