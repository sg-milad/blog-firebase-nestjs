### this project was done for [devotel](devotel.io)

# NestJS ![nestjs32x32](https://github.com/imanhpr/nest-assignment/assets/56130647/facef099-7c17-4d9c-ae36-84265b05e31a)

### task

- Develop a secure RESTful API for a blog application with Firebase Authentication. The
  API should allow users to perform basic CRUD operations (Create, Read, Update, Delete)
  on blog posts, and access should be secured using Firebase Authentication.

## How To Run The Project ?

please get your firebase service account from [here](https://console.firebase.google.com/u/0/)
and past the config in /src/configs after that

please copy and past these commands

```
~ cp .env.example .env
~ docker compose up
```

and wait a couple of minutes to build the project. after build please open [localhost](http://localhost:3000/docs).
if you don't like using swagger please insert docs-json.json to postman and enjoy.

## screenshots

![screenshot](./screenshots/Screenshot%20from%202024-12-17%2015-37-31.png)
![screenshot](./screenshots/Screenshot%20from%202024-12-17%2015-54-15.png)
![screenshot](./screenshots/Screenshot%20from%202024-12-17%2015-54-22.png)
![screenshot](./screenshots/Screenshot%20from%202024-12-17%2015-24-46.png)

### Todo

- add more tests
- add logger
