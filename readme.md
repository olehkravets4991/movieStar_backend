# PROJECT 3 - Backend

- **Project Name:** Movie Star
- **Project By:** Christine Wong, Isaac Santacruz, Oleh Kravets
- [**LINK TO GITHUB**](https://github.com/cwon07/movieStar_backend)
- [**LINK TO DEPLOYED WEBSITE**](https://ga-project-2.onrender.com)
- **List of Technologies used:** HTML, JS, CSS, Node, Express, EJS, Mongo, React
- [**LINK TO TRELLO**](https://trello.com/b/1idSkpyI/movie-star-the-app)

## Description

The Movie Star app allows you to save your favorite movies in your account with information such as title, year released, poster image, and your own rating of the  movie. 



## Routes

| ENDPOINT | METHOD | PURPOSE |
|----------|--------|---------|
| / | GET | landing page |
| /movies | GET | list all movies |
| /movies | POST | add new movie, redirect to /movies
| /movies/:id | GET | list one movie |
| /movies/:id | PUT | form to edit movie | 
| /movies/:id | DELETE | delete one movie |
| /movies/:id | GET | update one movie |
| /signup | POST | new user sign up page |
| /login | POST | login page |
| /logout | GET | logout page, redirect to / |

## ERD (ENTITY RELATIONSHIP DIAGRAM)

![ERD](/public/images/ERD.png)
- [Free ERD Diagram Tool](https://dbdiagram.io/home)