export class UpdatePostDto {
  title?: string;
  content?: string;
  // TODO: user 도메인 추가 이후 작성자 객체로 변경
  author?: string;
}
