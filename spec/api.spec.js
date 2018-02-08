console.log(process.env.NODE_ENV)
const { expect } = require('chai');
const mongoose = require('mongoose')
const request = require('supertest');
const saveTestData = require('../seed/test.seed.js')
const app = require('../server');


describe('articles', () => {
    let data;
    before(function () {
        return mongoose.connection.dropDatabase()
            .then(saveTestData)
            .then(savedData => {
                data = savedData
                //console.log(data)
            })
    })
    after(function (done) {
        mongoose.connection.close()
        done()
    })

    it('returns all articles', () => {
        return request(app)
            .get('/api/articles')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(2);
            })
    });

    it('returns all comments for 1 article', () => {
        return request(app)
            .get(`/api/articles/${data.articles[0]._id}/comments`)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(2);
            })
    })

    it('Add a new comment to an article', () => {
        return request(app)
            .post(`/api/articles/${data.articles[0]._id}/comments`)
            .send({ "comment": "This is my new comment" })
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body.body).to.equal("This is my new comment")
                 expect(res.body.belongs_to).to.equal(`${data.articles[0]._id}`)
                 expect(res.body.created_at).to.an('number')
                 expect(res.body).to.be.an('object')
            })
    })

    it('increases vote count in comment', () => {
        return request(app)
            .get(`/api/comments/${data.comments[0]._id}`)
            .then(res => {
                let voteScore = res.body.votes
                return request(app)
                    .put(`/api/comments/${data.comments[0]._id}?vote=up`) // put request
                    .expect(200)
                    .then(res => {
                        return request(app)
                            .get(`/api/comments/${data.comments[0]._id}`)
                            .then(res => {
                                //console.log (res)
                                expect(res.body).to.an('object')
                                expect(voteScore + 1).to.equal(res.body.votes)
                            })
                    })
            })
    })

    it('decreases the vote count in comment', () => {
        return request(app)
            .get(`/api/comments/${data.comments[0]._id}`)
            .then(res => {
                let voteScore = res.body.votes
                //console.log(voteScore)
                return request(app)
                    .put(`/api/comments/${data.comments[0]._id}?vote=down`)
                    .expect(200)
                    .then(res => {
                        return request(app)
                            .get(`/api/comments/${data.comments[0]._id}`)
                            .then(res => {
                                //console.log(res.body)
                                expect(res.body).to.be.an('object')
                                expect(voteScore - 1).to.equal(res.body.votes)
                            })
                    })
            })
    })

    it ('Delete a comment to an article, returns an object', () => {
        return request (app)
        .get ('/api/comments')
        .then ( res => {
            //console.log (res.body.length)
            let Selectedcomment = res.body[0]._id
            return request (app)
             .delete ('/api/comments/'+Selectedcomment)   
             .expect(200)
             .then(res => {
                 //console.log(res.body)
                return request (app)
                 .get('/api/comments')
                    .then(res => {
                       // console.log(res.body)
                        expect(res.body).to.be.an('array')
                       // process.exit()
                    })
             })
            //     expect(res.body.length).to.equal(res.body.length -1)
            })
        })
});

