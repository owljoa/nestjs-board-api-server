import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/createPost';

@Injectable()
export class PostService {
  getPosts(title: string): string {
    return title;
  }

  getPost(id: number): string {
    return id.toString();
  }

  createPost(dto: CreatePostDto) {
    console.log(dto);
  }
}
