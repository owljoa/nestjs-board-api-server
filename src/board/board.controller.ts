import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePostDto } from './post/dto/createPost';
import { PostService } from './post/service/post.service';

@Controller('board')
export class BoardController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts(@Query('title') title: string): string {
    return this.postService.getPosts(title);
  }

  @Get(':id')
  getPost(@Param('id') postId: number): string {
    return this.postService.getPost(postId);
  }

  @Post()
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.createPost(dto);
  }
}
