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

- 1./auth/signup {"username":"username","password":"password"} вернет {
  "refresh_token": "...",
  "access_token": "..."
  }
- 2./auth/signin {"username":"username","password":"password"} вернет {
  "refresh_token": "...",
  "access_token": "..."
  }
- 3./auth/logout headers.Authorization "Bearer ..."
- 4./auth/refresh headers.Authorization "Bearer ..." вернет {
  "refresh_token": "...",
  "access_token": "..."
  }
- 5./posts headers.Authorization "Bearer ..."

## 2.GET

- 1./posts
- 2./posts/{id}
- 3./media/{mediaId}

  3.PATCH

- 1./posts/{id} headers.Authorization "Bearer ..." {"message":"message"}

 ## 4.DELETE

- 1./posts/{id} headers.Authorization "Bearer ..."
