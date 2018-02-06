const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);

describe('articles', () => {
    it('respond with json',() => {
      return request
        .get('/api/articles')
         .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
            expect(res.body).to.be.an('Array')
        })
    });
  });