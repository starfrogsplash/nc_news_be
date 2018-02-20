const { expect } = require('chai');
const mongoose = require('mongoose');
const request = require('supertest');
const saveTestData = require('../seed/test.seed.js');
const app = require('../server');

describe('tests for restful api', () => {
  let data;
  before(function () {
    return mongoose.connection.dropDatabase()
      .then(saveTestData)
      .then(savedData => {
        data = savedData;
      });
  });
  after(function (done) {
    mongoose.connection.close();
    done();
  });

  describe('test all end points for topics', () => {
    it('get request to fetch all topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an('array');
          expect(res.body.topics.length).to.equal(3);
        });
    });

    it('get request to grab all articles for a topic', () => {
      return request(app)
        .get(`/api/topics/${data.topics[0].slug}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.articles[0]).to.be.an('object');
          expect(res.body.articles.length).to.equal(1);
        });
    });
  });

  describe('test end points for users', () => {  
    it('tests get request to grab user profile data when searching by username', () => {
      return request(app)
        .get(`/api/users/${data.user.username}`)
        .expect(200)
        .then(res => {
          expect(res.body.users).to.be.an('object');
          expect(res.body.users.name).to.be.an('string');
          expect(res.body.users.avatar_url).to.be.an('string');
        });
    });

    it('returns 404 error is user doesnt exist', () => {
      return request(app)
        .get('/api/users/bumblebee')
        .expect(404)
        .then(res => {
          expect(res.text).to.equal('Not Found!');
        });
    });
  });

  describe('test end points for articles', () => {  
    it('returns all articles', () => {
      return request(app)
        .get('/api/articles')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[1]).to.be.an('object');
          expect(res.body.articles.length).to.equal(2);
        });
    });

    it('recieve approproate error 404 for not finding an article ', () => {
      return request(app)
        .get('/api/articles/5a7d9ee50fc22c35059f3e91')
        .expect(404)
        .then(res => {
          expect(res.text).to.equal('Not Found!');
        });
    });

    it('returns 400 error for invalid Article ID', () => {
      return request(app)
        .get('/api/articles/5a7d9ee50fc22c35059f3e9192829')
        .expect(400)
        .then(res => {
          expect(res.text).to.equal('Invalid ID');
        });
    });

    it('returns 400 for not entering "up" or "down" for query for voting on article', () => {
      return request(app)
        .put(`/api/articles/${data.articles[0]._id}?vote=downuojkasokdoak`)
        .expect(400)
        .then(res => {
          expect(res.text).to.be.an('string');
          expect(res.body.message).to.equal('vote can only be up or down');
        });
    });
  
    it('Updates an articles vote counts if query = up', () => {
      return request(app)
        .put(`/api/articles/${data.articles[0]._id}?vote=up`)
        .then(res => {
          expect(res.body.votes).to.equal(1);
          expect(res.body).to.be.an('object');
        });
    });
  
    it('Updates an articles vote counts if query = down', () => {
      return request(app)
        .put(`/api/articles/${data.articles[0]._id}?vote=down`)
        .then(res => {
          expect(res.body.votes).to.equal(0);
          expect(res.body).to.be.an('object');
        });
    });
  
    it('returns 400 for invalid query for voting on article', () => {
      return request(app)
        .put(`/api/articles/${data.articles[0]._id}?cote=down`)
        .expect(400)
        .then(res => {
          expect(res.text).to.be.an('string');
          expect(res.body.message).to.equal('Please provide a query in the format vote=up or vote=down');
        });
    });
  
    it('returns 400 for not entering "up" or "down" for query for voting on article', () => {
      return request(app)
        .put(`/api/articles/${data.articles[0]._id}?vote=downuojkasokdoak`)
        .expect(400)
        .then(res => {
          expect(res.text).to.be.an('string');
          expect(res.body.message).to.equal('vote can only be up or down');
        });
    });
  });

  describe('test end points for comments', () => {  

    it('returns 400 error for comments belonging to an article if invalid ID is found', () => {
      return request(app)
        .get('/api/articles/5a7d9ee50fc22c35059f3e9192829/comments')
        .expect(400)
        .then(res => {
          expect(res.text).to.equal('Invalid ID');
        });
    });

    it('returns all comments for 1 article', () => {
      return request(app)
        .get(`/api/articles/${data.articles[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.comments[0].created_by).to.be.an('string');
          expect(res.body.comments[0].votes).to.be.an('number');
          expect(res.body.comments.length).to.equal(2);
        });
    });

    it('posts a new comment to an article', () => {
      return request(app)
        .post(`/api/articles/${data.articles[0]._id}/comments`)
        .send({ 'comment': 'This is my new comment' })
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
          expect(res.body.body).to.equal('This is my new comment');
          expect(res.body.belongs_to).to.equal(`${data.articles[0]._id}`);
          expect(res.body.created_at).to.an('number');
          expect(res.body).to.be.an('object');
        });
    });

    it('returns 400 error is user inputs a string instead of an object to POST a comment', () => {
      return request(app)
        .post(`/api/articles/${data.articles[0]._id}/comments`)
        .send('This is a string!!')
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('Please provide message in the form of an object');
        });
    });

    it('return error 404 if comment doesnt exist', () => {
      return request(app)
        .get('/api/comments/5a7d9ee67fc22c35059f3eb8')
        .expect(404)
        .then(res => {
          expect(res.text).to.equal('Not Found!');
        });
    });
  
    it('return error 400 if commentID is invalid', () => {
      return request(app)
        .get('/api/comments/5a7d9ee67fc22c35059f3eb89090')
        .expect(400)
        .then(res => {
          expect(res.text).to.equal('Invalid ID');
        });
    });

    it('Updates an comment vote count if query = up', () => {
      return request(app)
        .put(`/api/comments/${data.comments[0]._id}?vote=up`)
        .then(res => {
          expect(res.body.votes).to.equal(1);
          expect(res.body).to.be.an('object');
        });
    });
  
    it('Updates the comment vote count if query = down', () => {
      return request(app)
        .put(`/api/comments/${data.comments[0]._id}?vote=down`)
        .then(res => {
          expect(res.body.votes).to.equal(0);
          expect(res.body).to.be.an('object');
        });
    });

    it('returns 400 for invalid query for voting on comment', () => {
      return request(app)
        .put(`/api/comments/${data.comments[0]._id}cote=down`)
        .expect(400)
        .then(res => {
          expect(res.text).to.be.an('string');
          expect(res.body.message).to.equal('Please provide a query in the format vote=up or vote=down');
        });
    });

    it(' Delete request a comment to an article', () => {
      return request(app)
        .delete(`/api/articles/${data.comments[1]._id}`)
        .then(res => {
          expect(res.body).to.be.an('object');
        });
    });
  });
});

