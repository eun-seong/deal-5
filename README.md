# deal-5 우아마켓
<p align="center">
<img src="https://user-images.githubusercontent.com/38929712/126736265-c21f1baa-3686-4ac5-b533-71e683b80779.jpeg" height="300" />

<center>

[Demo - 우아마켓](http://ec2-13-125-215-98.ap-northeast-2.compute.amazonaws.com/) 

</center>


<center>

# Stack

<img src="https://img.shields.io/badge/-Typescript-4075bb?&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/-Babel-F9DC3E?&logo=Babel&logoColor=white"> <img src="https://img.shields.io/badge/-Webpack-8DD6F9?&logo=Webpack&logoColor=black"> <img src="https://img.shields.io/badge/-MySQL-4479A1?&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/-Amazon AWS-232F3E?&logo=Amazon AWS&logoColor=white"> <img src="https://img.shields.io/badge/-Express-000000?&logo=Express&logoColor=white"> <img src="https://img.shields.io/badge/-Prettier-F7B93E?&logo=Prettier&logoColor=white"> <img src="https://img.shields.io/badge/-ESLint-4B32C3?&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/-Sass-CC6699?&logo=Sass&logoColor=white"> <img src="https://img.shields.io/badge/-JSON Web Tokens-000000?&logo=JSON Web Tokens&logoColor=white">

</center>
</p>



## 팀원

- 이은성 [@eun-seong](https://github.com/eun-seong)
- 김한철 [@hancheo](https://github.com/HanCheo)   

## Set Dot env
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=


JWT_SECRET=
```




## 디렉토리 구조

```
Client
.
└── src
    ├── apis                api동작 요청용 폴더
    ├── assets
    │   ├── data            테스트용데이터
    │   ├── imgs            테스트용이미지
    │   └── utils           자주쓰이고 반복적인 함수
    ├── components          
    │   ├── ChatDetail      채팅방페이지
    │   ├── CheckAccount    유저 확인용 컴포넌트
    │   ├── ItemDetail      상품상세페이지
    │   ├── Location        위치변경페이지
    │   ├── MyAccount       내 계정 페이지
    │   ├── NewPost         상품추가페이지
    │   ├── Register        회원가입페이지
    │   ├── Share           공용컴포넌트 모음
    │   ├── core            라우터
    │   ├── login           로그인페이지
    │   └── main            메인페이지
    ├── interfaces          클래스 인터페이스
    └── scss                스타일폴더
```

```
Server
.
├── action     페이지별 쿼리실행 파일모음
├── chat       웹소켓 클래스 설정 폴더
├── db         db설정 폴더
├── query      쿼리문 작성 폴더
├── routers    app Router 등록
├── uploads    이미지 업로드용 폴더
└── utils      공용 유틸 폴더

```


## 실행

```
$ git clone https://github.com/woowa-techcamp-2021/deal-5

-클라이언트 실행
$ cd deal-5/client
$ npm install
$ npm run start 

-서버 실행
$ cd ../deal-5/server
$ npm install
$ npm run start
```