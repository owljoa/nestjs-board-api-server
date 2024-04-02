import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql', // DB 종류
      url: '',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'study', // 연결할 데이터베이스 이름
      synchronize: true, // 스키마 자동 동기화 여부 (production에서는 false)
      dropSchema: false, // 어플리케이션 실행 시 기존 스키마 삭제 여부
      keepConnectionAlive: true, // 어플리케이션 재시작 시 연결 유지
      logging: true, // 데이터베이스 쿼리 로깅 여부
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'], // 앤티티 클래스 경로
      extra: {
        max: 100, // 최대 커넥션
      },
    } as TypeOrmModuleOptions;
  }
}
