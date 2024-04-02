import { Post } from '../entity/post.entity';

export class GetPostDto {
  constructor(id: number, title: string, content: string, author: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
  }

  id: number;
  title: string;
  content: string;
  // TODO: user 도메인 추가 이후 작성자 객체로 변경
  author: string;

  static fromEntity(post: Post): GetPostDto {
    return new GetPostDto(post.id, post.title, post.content, post.author);
  }
}
