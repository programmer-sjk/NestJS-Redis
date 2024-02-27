# NestJS-Redis

- NestJS 프레임워크와 Redis 테스트 저장소
- node v18에서 개발

## 모듈 설명

### redis

- redis와 연동 정보를 가지며, redis가 제공하는 함수들을 직접적으로 호출
- 다른 모듈에서 redis service를 DI 하여 사용

### person

- Redis의 Sorted Set을 이용해 랭킹 추가/조회 기능 제공
