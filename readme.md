# PROJECT 3 - Frontend

- **Project Name:** Movie Star
- **Project By:** Christine Wong, Isaac Santacruz, Oleh Kravets
- [**LINK TO GITHUB**](https://github.com/cwon07/project2)
- [**LINK TO DEPLOYED WEBSITE**](https://ga-project-2.onrender.com)
- **List of Technologies used:** HTML, JS, CSS, Node, Express, EJS, Mongo, React
- [**LINK TO TRELLO**](https://trello.com/b/1idSkpyI/movie-star-the-app)

## Description

When grandma's passed-down-for-5-generations, out-of-this-world banana bread recipe needs a digital recipe box so it never gets lost.. Crème de la Crème makes tracking and saving your best of the best recipes super easy! Simply copy and paste the recipe, add images, edit and update. This product is made for anyone such as yours truly, whose favorite recipes are saved in a million different places and struggle to access them just when you need it. 

## Mock UP of UI

 ![Desktop View](/public/images/UI%20Mockup.png)


## List of Backend Endpoints

| ENDPOINT | METHOD | PURPOSE |
|----------|--------|---------|
| / | GET | landing page |
| /recipes | GET | list all recipes |
| /recipes | POST | add new recipe, redirect to /recipes
| / recipes/new | GET | add one recipe |
| /recipes/:id | GET | list one recipe |
| /recipes/:id | PUT | form to edit recipe | 
| /recipes/:id | DELETE | delete one recipe |
| /recipes/:id/edit | GET | edit one recipe |
| /signup | POST | new user sign up page |
| /signup/success | GET | user sign up success, redirect to / |
| /signup/failure | GET | user sign up failure, redirect to /signup |
| /login | GET | login page |
| /login/failure | GET | fail to login, redirect to /login
| /logout | GET | logout page, redirect to / |

## ERD (ENTITY RELATIONSHIP DIAGRAM)

![PICTURE OF ERD](/public/images/ERDv1.png)

- [Free ERD Diagram Tool](https://dbdiagram.io/home)