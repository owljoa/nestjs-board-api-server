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

  static readonly DEFAULT_PAGE_SIZE: number = 2;
  static readonly DEFAULT_PAGE: number = 1;

  async getPosts(
    title?: string,
    content?: string,
    author?: string,
    size?: number,
    page?: number,
  ): Promise<GetPostDto[]> {
    // TODO: 캐싱. 전체 검색 결과 캐싱 후 캐싱된 데이터에 페이징 적용?
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    if (!CommonUtil.isNullOrBlank(title)) {
      queryBuilder.andWhere('post.title like :title', { title: `%${title}%` });
    }

    if (!CommonUtil.isNullOrBlank(content)) {
      queryBuilder.andWhere('post.content like :content', { content: `%${content}%` });
    }

    if (!CommonUtil.isNullOrBlank(author)) {
      queryBuilder.andWhere('post.author = :author', { author: author });
    }

    const limit = CommonUtil.getLimitFromSize(PostService.DEFAULT_PAGE_SIZE, size);
    queryBuilder.limit(limit);

    const offset = CommonUtil.getOffsetFromPage(PostService.DEFAULT_PAGE, limit, page);
    queryBuilder.offset(offset);

    const posts = await queryBuilder.disableEscaping().getMany();
    return posts.map((post): GetPostDto => GetPostDto.fromEntity(post));
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
