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
import { CreatePostDto } from './post/dto/createPost';
import { GetPostDto } from './post/dto/getPosts';
import { UpdatePostDto } from './post/dto/updatePost';
import { PostService } from './post/service/post.service';

@Controller('board')
export class BoardController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(
    @Query('title') title?: string,
    @Query('content') content?: string,
    @Query('author') author?: string,
    @Query('size', new DefaultValuePipe(PostService.DEFAULT_PAGE_SIZE)) size?: number,
    @Query('page', new DefaultValuePipe(PostService.DEFAULT_PAGE)) page?: number,
  ): Promise<GetPostDto[]> {
    return await this.postService.getPosts(title, content, author, size, page);
  }

  @Get(':id')
  async getPost(@Param('id') postId: number): Promise<GetPostDto> {
    return await this.postService.getPost(postId);
  }

  @Post()
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.createPost(dto);
  }

  @Patch(':id')
  updatePost(@Param('id') postId: number, @Body() dto: UpdatePostDto) {
    this.postService.updatePost(postId, dto);
  }

  @Delete(':id')
  deletePost(@Param('id') postId: number) {
    this.postService.deletePost(postId);
  }
}
