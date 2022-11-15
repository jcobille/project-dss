DIGITAL STREAMING SYSTEM
A collection of movies that users can give their reviews on certain movies.

![homepage](./homepage.png)

# Technologies used:

- React - Typescript
- Bootstrap
- HTML - SCSS
- Redux Toolkit
- Loopback 4
- MongoDB
- Sonarqube
- React Testing Library + Jest

# Models

This app has the following models:
- User - a model representing the users of the app.
- Movie - a model representing the movies of the app.
- MovieActor - a model used to connect the movies and the actors.
- Actor - a model representing the actors of the app.
- Review - a model representing the reviews of a user to a movie.

# Controllers

- user - controller to login/register, fetch info, update info and to  delete users
- movie - controller to create, fetch,search, update and delete movies
- actor - controller to create, fetch, update and delete actors
- review - controller to create, fetch, update and delete reviews
- movie-actor - controller to fetch and update connection between movies and actors

# To Run

- Use npm install --force to install dependencies.
- Use npm start to see run the application.

# To Test

- Use npm test to run test on both FE and BE services.
- Use npx jest --coverage to see coverage on both services.
