import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePostDto } from './post/dto/createPost';
import { GetPostDto } from './post/dto/getPosts';
import { UpdatePostDto } from './post/dto/updatePost';
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

  @Patch(':id')
  updatePost(@Param('id') postId: number, @Body() dto: UpdatePostDto) {
    this.postService.updatePost(postId, dto);
  }

  @Delete(':id')
  deletePost(@Param('id') postId: number) {
    this.postService.deletePost(postId);
  }
}
