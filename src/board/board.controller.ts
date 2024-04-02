import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './post/dto/createPost';
import { GetPostDto } from './post/dto/getPosts';
import { PostService } from './post/service/post.service';

@Controller('board')
export class BoardController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(): Promise<GetPostDto[]> {
    // TODO: 페이징
    return await this.postService.getPosts();
  }

  @Get(':id')
  async getPost(@Param('id') postId: number): Promise<GetPostDto> {
    return await this.postService.getPost(postId);
  }

  @Post()
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.createPost(dto);
  }
}
