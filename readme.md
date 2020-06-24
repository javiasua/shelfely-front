# Project Name
Shelfely
## Description
Virtual bookshelf where users can keep a record of the books they have read,and any books they want to read in the future 

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start saving books
-  **Login:** As a user I can login to the platform so that I can see my bookshelf 
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Books** As a user I can add a book that either I have read or that I want to read
-  **Edit Books** As a user I can edit a book 
-  **List Books** As a user I want to see the books so that I can remind myself which books I have read and/or the books I am planning on reading + filtering out books by category etc
-  **Search Books** As a user I want to search book by name so that I know if it is already on my list or to add a new book to the list 
-  **See my favorites** As a user I want to see my favorite books so that I can see the ones I liked the most

## Backlog

User profile:
- Allow users to purchase ebooks
- Create a community so that users can interact with each other 
  
# Client

## Routes

- / - Homepage
- /auth/signup - Signup form
- /auth/sign-in - Login form
- /books - books list
- /books/create - create a book object
- /books/:id - book information (author,title,date etc)
- /search - search for a book from an external api
- /profile - my details and favorite books
- 404

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Books List Page (private only)
- Book Create (private only)
- Book Search (private only)
- Book Detail Page (private only)
- My Profile Page (private only)
- 404 Page (public)

## Components

- Sign in
- Sign Up
- Nav 
- Add Book
- Book list 
- Edit book
- Book Detail 
- Search book
- Results



## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Book Service
  - books.list()
  - books.create(data)
  - books.detail(id)
  - books.toList(id)
  - books.removeFromList(id)   

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
```

Book model

```
owner - ObjectID<User> // required
title - String // required
author - String // required
published_date - String
image - String
description - String
category - String
```

## API Endpoints/Backend Routes

- GET /auth/user
- POST /auth/signup
  - body:
    - username
    - email
    - password
- POST /auth/login
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)
- POST /user/me/favorite
  - body:
    - bookId
- DELETE /user/:bookId
  - body: (empty)
- GET /book
- POST /book
  - body:
    - title
    - author
    - published_date
    - image 
    - description 
    - category
- GET /book/:id

  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/sqoioQra/shelfely) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)