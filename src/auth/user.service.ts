import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonUtil } from 'src/common/util/commonUtil';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser';
import { GetUserDto } from './dto/getUser';
import { UpdateUserDto } from './dto/updateUser';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  static readonly DEFAULT_PAGE_SIZE: number = 2;
  static readonly DEFAULT_PAGE: number = 1;

  createUser(dto: CreateUserDto) {
    this.userRepository.save(dto.toEntity());
  }

  async getUser(id: number): Promise<GetUserDto> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return GetUserDto.fromEntity(foundUser);
  }

  async getUsers(
    email?: string,
    name?: string,
    size?: number,
    page?: number,
  ): Promise<GetUserDto[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    if (!CommonUtil.isNullOrBlank(email)) {
      queryBuilder.andWhere('user.email like :email', { email: `%${email}%` });
    }

    if (!CommonUtil.isNullOrBlank(name)) {
      queryBuilder.andWhere('user.name like :name', { name: `%${name}%` });
    }

    const limit = CommonUtil.getLimitFromSize(UserService.DEFAULT_PAGE_SIZE, size);
    queryBuilder.limit(limit);

    const offset = CommonUtil.getOffsetFromPage(UserService.DEFAULT_PAGE, limit, page);
    queryBuilder.offset(offset);

    const users = await queryBuilder.disableEscaping().getMany();
    return users.map((user): GetUserDto => GetUserDto.fromEntity(user));
  }

  updateUser(id: number, dto: UpdateUserDto) {
    this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(dto)
      .where('id = :id', { id })
      .execute();
  }

  deleteUser(id: number) {
    this.userRepository.delete({ id: id });
  }
}
