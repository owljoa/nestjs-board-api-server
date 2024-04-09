import { User } from '../entity/user.entity';

export class GetUserDto {
  constructor(id: number, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  id: number;
  email: string;
  name: string;

  static fromEntity(user: User): GetUserDto {
    return new GetUserDto(user.id, user.email, user.name);
  }
}
