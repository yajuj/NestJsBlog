## Description

API Для блога На NestJS
На основании .env.example создать .env фаил и запустить.

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

## 1.POST

- 1./auth/signup {"username":"username","$password":"$password"} вернет {
  "refresh_token": "$token",
  "access_token": "$token"
  }
-
- 2./auth/signin {"username":"$username","password":"$password"} вернет {
  "refresh_token": "$token",
  "access_token": "$token"
  }
-
- 3./auth/logout headers.Authorization "Bearer $token"
-
- 4./posts headers.Authorization "Bearer $token"
  {"message":"$message", "photo"?: "$photo", "video"?:"$video"}
  or
  multipart/form [photo? : %filename%, video?: %filename%, message:"$message"]
-
- 5./media multipart/form file : %filename%

## 2.GET

- 1./posts
- 
- 2./posts/{id}
- 
- 3./media/{mediaId}
- 
- 4./auth/refresh headers.Authorization "Bearer $token" вернет {
  "refresh_token": "$token",
  "access_token": "$token"
  }
-
  5./auth/me headers.Authorization "Bearer ..." вернет {
  "id": "$user_id",
  "username": "$username"
  }

  3.PATCH

- 1./posts/{id} headers.Authorization "Bearer ..." {"message":"$message", "photo"?: "$photo", "video"?:"$video"}
  or
  multipart/form [photo? : %filename%, video?: %filename%, message:"$message"]

## 4.DELETE

- 1./posts/{id} headers.Authorization "Bearer ..."
- 
## 4.PATCH

- 1./posts/{id} headers.Authorization "Bearer ..." {"message?":"$message", "photo"?: "$photo", "video"?:"$video"}
  or
 multipart/form [photo? : %filename%, video?: %filename%, message:"$message"] 
