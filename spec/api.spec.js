const { expect } = require('chai');
const app = require('../server');
const request = require('supertest');

describe('articles', () => {
    it('returns all articles',() => {
      return request (app)
        .get('/api/articles')
         .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
            expect(res.body).to.be.an('array')
        })
    });
    it ('returns all comments for 1 article',() =>{
       return  request (app)
        .get('/api/articles/5a78820b749a53169b319a50/comments')
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
            })
        })
        it ('Add a new comment to an article',() =>{
            return request (app)
            .post('/api/articles/5a78820b749a53169b319a50/comments')
            .send({"comment": "This is my new comment"})
            .set('Accept', 'application/json')
                .expect(200)
                .then(res => {
                    // res.body = {comment: {body: 'this is my new comment', belongs_to: 'fdjksj4r', etc etc}}
                    
                    expect(res.body.body).to.equal("This is my new comment")
                    expect(res.body.belongs_to).to.equal("5a78820b749a53169b319a50")
                    expect(res.body.created_at).to.an('number')
                    expect(res.body).to.be.an('object')
                })
            })   
});

