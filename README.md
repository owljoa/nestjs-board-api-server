## Description

처음 다뤄보는 nest.js

익숙해지기 위한 게시판

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [owljoa](https://github.com/owljoa)

## TODO

- 사용자(user)
  - [x] 사용자 생성
  - [x] 사용자 제거
  - [x] 사용자 정보 수정
  - [x] 사용자 조회
  - 입력값 검증
  - 예외 처리
    - not found
- 게시글(post)
  - [x] 게시글 생성
  - [x] 게시글 제거
  - [x] 게시글 수정
  - [x] 게시글 상세 조회
  - [x] 게시글 전체 조회
  - [x] 게시글 전체 조회 - 페이징
  - [x] 게시글 검색
  - 입력값 검증
  - 예외 처리
    - not found
  - 게시글 캐싱
  - 댓글(comment)
    - 댓글 추가
    - 댓글 제거
    - 댓글 수정
- 인증(authentication)
  - 로그인
  - 로그아웃
- 인가(authorization)
  - 사용자 권한 부여
    - ex1) 게시글 작성자가 게시글 수정/삭제
    - ex2) 댓글 작성자가 댓글 수정/삭제
