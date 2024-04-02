import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { Post } from './post/entity/post.entity';
import { PostService } from './post/service/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService],
  controllers: [BoardController],
})
export class BoardModule {}
