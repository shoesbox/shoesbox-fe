# Mini Project #2 Music Picky
### 프로젝트 기간 및 구성원 🎈
- 기간 : 22년 8월 12일 ~ 18일
- 프론트엔드 : 박혜정, 황선하 **(React)**
- 백엔드 : 구본주, 김시원, 이동욱 **(Spring)**

🌈 잠시간 노래 들으며 영상 구경하기 ▶ https://youtu.be/wHhqUD268r8

![test](https://user-images.githubusercontent.com/97497201/185758458-d4fca82e-c5ae-4789-b182-c89b49f5f5a4.png)

### 기획 소개 ✨
- 추억이 담긴 노래를 공유하는 커뮤니티
### 핵심 기능 🕶
- 노래 공유 시 YouTube URL를 기재하고 앨범 커버 이미지를 업로드
- 게시글 선택 시 모달 팝업을 통한 유튜브 플레이어 노출
### 사용 기술 🎃
- yarn add react-bootstrap bootstrap
- yarn add styled-component
- yarn add axios
- yarn add react-redux @reduxjs/toolkit
- yarn add react-player

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

---

### 업무분장 💕

 ![sample](https://user-images.githubusercontent.com/97497201/185758977-729aae3b-2e27-403f-9ddb-d7663e55601e.png)
 
**박혜정**
- 메인페이지에 모든 포스트 목록 r
- 마이페이지에 내 컨텐츠 목록 r
- jwt 토큰 기반의 로그인, 회원가입 페이지 및 기능

**황선하**
- 포스트 게시 페이지 cud 기능
- 포스트 클릭 시 상세보기 r
- 상세보기 내 댓글 crud 기능 및 좋아요 토글
---
### 2022. 08. 12 (금)
- 화면설계 후 프론트는 뷰 짜기, 백은 기능명세 작성하기
- 폴더 구조 세팅
- 상단 네비바 헤더 작업
- 메인페이지 카드 뿌려주기 뷰 완성
- 로그인/회원가입 클릭 시 모달 팝업 임시 작성
- router 메인, 장르별, 마이페이지 등 경로 설정
- 메인페이지에 포지션 고정값으로 포스팅 버튼 추가
- margin 고정값에서 비율로 변경, 반응형 width 별 노출되는 카드 grid 조절
- 뷰는 대다수 완성, 데이터 바인딩 x 상태
### 2022. 08. 13 (토)
- 404 페이지 만들고 라우터 추가 설정
- 회원가입 유효성 테스트, 변수명 api 명세 맞춰 수정
- json-server 추가 및 더미 db 작업
- ~~redux-toolkit 야심차게 시도 : slice만 추가 (최종 실패ㅜ)~~
- mock api로 axios 호출 및 데이터 바인딩 테스트
- 틈틈이 거슬리는 css 지속 수정
### 2022. 08. 14 (일)
- 헤더 메뉴 장르 별 데이터 요청 테스트
- 메인페이지 카드 클릭 시 상세페이지 id로 라우터 연결
- 상세페이지 (선하님 담당이지만ㅎ 복사 후) 개인 연습
- 메인페이지 카드 길어지는 글 ... 생략 함수 설정하여 처리
### 2022. 08. 15 (월)
- 메인페이지 state로 axios 로딩 시 문구 노출 처리
- 테스터 db에 더미 데이터 추가 작업 (노가다 ㅜㅜ)
- 장르 별 페이지에서 등록 게시글 없을 경우 문구 노출 처리
- 리덕스 툴킷 개념 잡기 + jwt 관련 개념 공부하기 ~~좌절하기~~
### 2022. 08. 16 (화)
- Cookie 관련 get, set 처리 방법 이해하기 **
- api.interceptors 개념 이해하려고 용쓰기..
- 헤더에 access, refresh 토큰 넣으려고 울어보기
- 쿠키 저장하기 성공 == 로그인 성공 !!!! (집단지성 감사합니다 🙏)
- 로그 여부에 따라 헤더 네비바 메뉴 노출 삼항연산자 처리
- 회원가입 기능 구현 완료 ㅜㅜㅜㅜ
### 2022. 08. 17 (수)
- 회원가입 시 에러 케이스 처리 실패 **
- 로그아웃 시 쿠키 삭제 처리
- 마이페이지 내 컨텐츠(게시글, 댓글, 좋아요)들 api 호출 테스트
- 내 컨텐츠들 데이터 바인딩 o, 카드 컴포넌트 재사용으로 렌더링 o
- 회원가입 시 에러메시지 응답에서 꺼내오기 o
- 인증 필요한 요청 접근 시 경로 강제이동 처리
- 틈틈이 css 세부 수정 2 + 폰트 적용
- 정작 로그인 상태 시 장르 별 데이터 없다고 나오던 문제 수정 **
### 2022. 08. 18 (목)
- 마이페이지 내 댓글카드 응답에서 데이터 바인딩 .. 성공!
- 긴 글 ... 생략처리 js 함수에서 css로 처리방법 변경
- favicon 원하는 이미지 아이콘 처리 및 배포 준비
- firebase로 배포 1차 테스트
- 배포는 완료하였으나 응답 에러 (아마 cors였던 것으로 추정,,)
- 시간 임박으로 AWS EC2로 배포 시도.......
- 얼레벌레 express로 서버 구축 및 배포 성공 ㅠㅠㅠㅠ
---
### 문제사항과 해결법
- Cookie 관련 get, set 처리 방법 이해하기,,
- 회원가입 시 에러 케이스 처리 실패 : 겉200 속에러
- 정작 로그인 상태 시 장르 별 데이터 없다고 나오던 문제 : useEffect 내 함수 실행 순서
- 그 외 아쉬운 점 간략히 정리.... 이거 회고 포스팅을,, 할수있을랑가.. 포스팅하고 링크 달까...... 우우 ㅠㅠㅠ
