import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser';
import { GetUserDto } from './dto/getUser';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    this.userService.createUser(dto);
  }

  @Get(':id')
  async getUser(@Param('id') userId: number): Promise<GetUserDto> {
    return await this.userService.getUser(userId);
  }

  @Get()
  async getUsers(
    @Query('email') email?: string,
    @Query('name') name?: string,
    @Query('size', new DefaultValuePipe(UserService.DEFAULT_PAGE_SIZE)) size?: number,
    @Query('page', new DefaultValuePipe(UserService.DEFAULT_PAGE)) page?: number,
  ): Promise<GetUserDto[]> {
    return await this.userService.getUsers(email, name, size, page);
  }

  @Patch(':id')
  updateUser(@Param('id') userId: number, @Body() dto: CreateUserDto) {
    this.userService.updateUser(userId, dto);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: number) {
    this.userService.deleteUser(userId);
  }
}
