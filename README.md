# 말랑연구소

> **SSAFY 8기 2학기 자율 프로젝트** <br/> 프로젝트 기간 : 2023.04.10(월) ~ 2023.05.19(금)

<div align="center">
<img width="450" alt="image" src="https://github.com/devTaemin/devTaemin/assets/48127239/85b0f1ca-2d4f-42f6-a206-22e00cf71592">
</div>

## 📌 프로젝트 소개

### 말랑 연구소는 게임 기반 실시간 온라인 브레인 스토밍 플랫폼입니다.

#### 사용자

- 전 연령
- 브레인 스토밍이 필요한 개인 또는 단체
- 레크레이션, 오리엔테이션 용도로 활용이 필요한 개인 또는 단체

#### 목적

- **브레인 스토밍**
  - 다양한 시각에서 문제를 바라볼 수 있으며, 기획 회의 단계에서 새로운 아이디어를 도출하는데 도움이 됩니다.
- **협업, 아이스 브레이킹**
  - 서로의 아이디어를 공유하고 발전시키며 자연스러운 분위기 형성과 더불어 팀워크 상승을 도모합니다.
- **참여도 상승**
  - 브레인스토밍을 게이미피케이션을 통해 자연스러운 의견 공유 환경을 조성하며 사용자들의 참여도를 높입니다.

#### 주요 기술

- **WebSocket** 을 활용한 서버 클라이언트 간 실시간 양방향 통신
- **STOMP** 프로토콜을 활용한 메세지 전송
- 메모리 기반 NoSQL, **Redis**를 활용한 데이터 캐싱 및 게임 구현을 위한 데이터 접근 속도 고려
- 관계형 데이터베이스, **MariaDB**를 활용한 서비스 구성 데이터 저장
- **Gitlab**을 통한 버전 관리, **Jenkins**를 활용한 자동 배포 환경 구성
<!-- - _**TODO :** Spring Cloud Gateway, Eureka를 활용한 로드 밸런싱 및 장애 조치_
- _**TODO :** Sonarqube를 활용한 코드 정적 분석_
- _**TODO :** Prometheus, Grafana를 활용한 모니터링_ -->

<br>

## 📺 주요 기능

### 📌 방 만들기 화면 / 방 접속하기 화면

<p align="center">
<img width="400" height="280" src=https://github.com/devTaemin/devTaemin/assets/48127239/da581ddc-945a-4cc7-a3ec-8778bd4fda32>
<img width="400" height="280" src=https://github.com/devTaemin/devTaemin/assets/48127239/6573ecc4-bd34-419f-b87e-3fa9b9c87ce8>
</p>

<br>

### 📌 호스트 게임진행 / 게스트 게임진행

<p align="center">
<img width="400" height="280" src=https://github.com/devTaemin/devTaemin/assets/48127239/ab13d540-e25f-4163-874f-4d8b08d655dd>
<img width="400" height="280" src=https://github.com/devTaemin/devTaemin/assets/48127239/28e09e25-f807-42bd-adfc-efeba9361d99>
</p>

<br>

### 📌 게임 결과 / 시상식

<p align="center">
<img width="400" height="280" src=https://github.com/devTaemin/devTaemin/assets/48127239/80683234-064b-4775-9364-092f70cc8dfe>
<img width="400" height="280" src=>
</p>

<br>

## ⚙️ 기술 스택

### Frontend

![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Redux](https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwind%20css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/visual%20studio%20code-007ACC?style=for-the-badge&logo=react&logoColor=white)

### Backend

![JAVA](https://img.shields.io/badge/java-FFFFFF?style=for-the-badge&logo=java&logoColor=black) ![Spring Boot](https://img.shields.io/badge/spring%20boot-6DB33F?style=for-the-badge&logo=spring%20boot&logoColor=white)
![MariaDB](https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white) ![Redis](https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white) ![IntelliJ](https://img.shields.io/badge/intellij%20idea-000000?style=for-the-badge&logo=intellij%20idea&logoColor=white)
![AWS EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2Sharp&logoColor=white) ![AWS S3](https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white) ![Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Jenkins](https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)

<br>

## 🏗️ 아키텍처

<div align="center" style="border:solid">
<img width="800" alt="image" src="https://github.com/devTaemin/devTaemin/assets/48127239/8d685c33-3874-4cb5-a485-11205d6be86a">
</div>

<br>

## 🏗️ 인프라 구성

<div align="center" style="border:solid">
<img width="800" alt="image" src="https://github.com/devTaemin/devTaemin/assets/48127239/7053bade-aaa2-4167-b28d-c1963882bf06">
</div>

<br>

## :two_men_holding_hands: 협업 환경

### DVCS

- Gitlab

### Communication

- Mattermost
- Cisco Webex

### Record

- Notion
- Google Sheets

### Issue

- Jira

<br>

## 📜 산출물

- [프로젝트 기획서](https://docs.google.com/document/d/1ra7cDZECNfpDP60T9ah8UPP4hVmwBV5nS8tblZlAmjE/edit?usp=sharing)
- [요구사항 정의서](https://canary-capacity-362.notion.site/4926d5145fa74959a2cafd072b7356f0)
- [API 명세서](https://canary-capacity-362.notion.site/API-4c1617137817482cb1cf6f2a4decd8d4)
- [ER 다이어그램](https://canary-capacity-362.notion.site/ER-DB-d5e83ec85bc94c58a3abd01f7c45ea68)
- [시퀀스 다이어그램](https://app.diagrams.net/#G1PAIPK7tyjwd32ytZLTLkMEEVXwW4K3Ur)
- [개발환경 가이드](https://canary-capacity-362.notion.site/db736337de464bdca68b4b38de1673f6)
- [Jira 컨벤션](https://canary-capacity-362.notion.site/Jira-Convention-f61caecb6e2544f4a38c55195b98500b)
- [Git 컨벤션](https://canary-capacity-362.notion.site/Git-Convention-719c6c12fef74e7c8148d94ab79bf25b)
<!-- - [포팅매뉴얼]() -->

<br>

## 🤖 개발팀 소개

|                                                        김유나                                                         |                                                        김지애                                                         |                                                        이동준                                                         |                                                        임태민                                                         |                                                        정여진                                                         |                                                        최지우                                                         |
| :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| <img width="140px" src="https://github.com/devTaemin/devTaemin/assets/48127239/17ab8eb8-8ae5-48e7-b59b-1b660ec8701d"> | <img width="140px" src="https://github.com/devTaemin/devTaemin/assets/48127239/ec4275d4-30a0-445e-a54f-a7fd5241541a"> | <img width="140px" src="https://github.com/devTaemin/devTaemin/assets/48127239/9990b183-58ab-4d7b-a5fe-370ebc4a2d62"> | <img width="140px" src="https://github.com/devTaemin/devTaemin/assets/48127239/d5bf8505-52ac-4efe-8acb-a6132074a891"> | <img width="140px" src="https://github.com/devTaemin/devTaemin/assets/48127239/9d87220c-9542-44f1-83cb-b6a98765f3fd"> | <img width="140px" src="https://github.com/devTaemin/devTaemin/assets/48127239/6b979937-2e28-499d-bb3e-4ab309681cbc"> |
|                                                          FE                                                           |                                                          FE                                                           |                                                          BE                                                           |                                                          BE                                                           |                                                          BE                                                           |                                                          FE                                                           |
|                                                    Frontend Leader                                                    |                                                   Project Assistant                                                   |                                                    Backend Leader                                                     |                                                    Project Manager                                                    |                                                      Team Leader                                                      |                                                  Deputy Team Leader                                                   |
