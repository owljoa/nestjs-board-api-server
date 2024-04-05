import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonUtil } from 'src/common/util/commonUtil';
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

  async getPosts(title?: string, content?: string, author?: string): Promise<GetPostDto[]> {
    const queryBuilder = this.postRepository.createQueryBuilder().select('p').from(Post, 'p');

    if (!CommonUtil.isNullOrBlank(title)) {
      queryBuilder.andWhere('p.title like :title', { title: `%${title}%` });
    }

    if (!CommonUtil.isNullOrBlank(content)) {
      queryBuilder.andWhere('p.content like :content', { content: `%${content}%` });
    }

    if (!CommonUtil.isNullOrBlank(author)) {
      queryBuilder.andWhere('p.author = :author', { author: author });
    }

    return queryBuilder.disableEscaping().getMany();
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

  async deletePost(id: number) {
    this.postRepository.delete({ id: id });
  }
}
