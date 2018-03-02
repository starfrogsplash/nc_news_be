## Northcoders News API
--------------

### About

A RESTful API for Northcoders News website, built using Node, Express, MongoDB and Mongoose. which is also
deployed on Heroku https://github.com/starfrogsplash/nc_news_be


---------
### Installation

Before running this project, you need to make sure you have these dependencies installed, the links are provided for you.

[NODE](https://nodejs.org/en/download/package-manager/)

[NPM](https://www.npmjs.com/get-npm)

[Git](https://git-scm.com/)

[mongodb](https://docs.mongodb.com/manual/installation/)


To run this project you need to clone to your local machine and install its dependencies.

In the terminal window use the command 'git clone' followed by the the project you want to install

```
git clone https://github.com/starfrogsplash/BE-FT-northcoders-news.git
```

Navigate inside the project and install all its dependancies using :

```
npm install
```

On another terminal run the mongo database by entering the following command

```
mongod
```

Open another terminal window, navigate inside the project folder and enter the following command to populate the database:

```
node seed/seed.js
```

You are now ready to start your server by entering the following command in your terminal

```
npm start
```

This will run the server on port 3000.

---
### Testing

To test the API endpoints, navigate to the project directory and enter the following command in the terminal

```
npm test
```


Testing was carried out using Chai, Mocha and supertest


---
### API Routes
```
GET /api/topics
```
Get all the topics

```
GET /api/topics/:topic_id/articles
```
Returns all articles belonging to a certain topic

```
GET /api/articles
```
Returns all the articles

```
GET /api/articles/:article_id/comments
```
Get all the comments for a individual article

```
POST /api/articles/:article_id/comments
```
Adds a new comment to an article as an object. 
e.g: {"comment": "This is my new comment"}

```
PUT /api/articles/:article_id
```
Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
e.g: /api/articles/:article_id?vote=up

```
PUT /api/comments/:comment_id
```
Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
e.g: /api/comments/:comment_id?vote=down

```
DELETE /api/comments/:comment_id
```
Deletes a comment

```
GET /api/users/:username
```
Returns a JSON object with the profile data for the specified user.
