# 아스모(아마추어 스포츠의 모임)

---

## 큰 주제

---

## 대략적인 생각

- 현재 축구를 할 때 본인 팀의 평가를 본인들이 한다. 이 부분에 있어 불편함이 있어 개선하고자 함
- 매칭 (팀 단위 경기 기록)
- 랭킹 (mmr 느낌)
- 매너점수 (용병, 팀)

---

## MVP 도메인

- 유저 (용병)
- 팀
- 전적

---

## 해결하고 싶은 문제

- 적당한 수준의 나의 상대를 만나고 싶다.

---

## 비슷한 와꾸 (네이버 밴드)

유저

팀

매치 (경기를 신청하는 작업)

전적

레이팅


---

# Backend

## How to develop

### Prerequisites

- Java 21
- Docker, Docker-Compose

### Run

1. Run docker-compose
```shell
docker-compose up -d
```

2. Run Spring Boot Application

    2.1 macOS
    ```shell
    ./gradlew bootRun --args='--spring.profiles.active=local'
    ```
