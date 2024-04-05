import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/createPost';
import { GetPostDto } from '../dto/getPosts';
import { UpdatePostDto } from '../dto/updatePost';
import { Post } from '../entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getPosts(): Promise<GetPostDto[]> {
    const foundPosts = await this.postRepository.find();
    const dtos = foundPosts.map((post: Post): GetPostDto => GetPostDto.fromEntity(post));
    return dtos;
  }

  async getPost(id: number): Promise<GetPostDto> {
    const foundPost = await this.postRepository.findOne({
      where: {
        id: id,
      },
    });
    return GetPostDto.fromEntity(foundPost);
  }

  async createPost(dto: CreatePostDto) {
    const newPost = await this.postRepository.save(dto.toEntity());
    console.log(newPost);
  }

  async updatePost(id: number, dto: UpdatePostDto) {
    this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set(dto)
      .where('id = :id', { id })
      .execute();
  }
}
