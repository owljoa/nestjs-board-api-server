import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './service/post.service';

@Module({
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
