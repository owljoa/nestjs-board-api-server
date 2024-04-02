import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/createPost';
import { Post } from '../entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  getPosts(title: string): string {
    return title;
  }

  getPost(id: number): string {
    return id.toString();
  }

  async createPost(dto: CreatePostDto) {
    const newPost = await this.postRepository.save(dto.toEntity());
    console.log(newPost);
  }
}
