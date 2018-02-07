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
                    expect(res.body.body).to.equal("This is my new comment")
                    expect(res.body.belongs_to).to.equal("5a78820b749a53169b319a50")
                    expect(res.body.created_at).to.an('number')
                    expect(res.body).to.be.an('object')
                })
            })
            it ('updates vote count in comment',() => {
                return request (app)
                .get('/api/comments/5a78820b749a53169b319a75')
                .then(res => {
                    let voteScore =  res.body.votes
                    console.log(voteScore)
                    return request (app)
                     .put('/api/comments/5a78820b749a53169b319a75?vote=up') // put request
                        .expect(200) //Accepted
                        return request (app)
                        .get('/api/comments/5a78820b749a53169b319a75')
                        .then(res => {
                           expect(res.body.votes).to.equal(voteScore+1)
                        })
                })    
            })

});

