import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  constructor(title: string, content: string, author: string) {
    super();
    this.title = title;
    this.content = content;
    this.author = author;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  content: string;

  @Column('varchar')
  author: string;
}
