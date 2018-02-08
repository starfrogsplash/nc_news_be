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
                console.log(data)
            })
    })
    after(function (done) {
        mongoose.connection.close()
        done()
    })


    it('get request to fetch all topics', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(res => {
                expect(res.body.topics).to.be.an('array')
                expect(res.body.topics.length).to.equal(3)
                expect(res.body.topics[0].title).to.equal('Football')
            })
    })


    it('get request to grab all articles for a topic', () => {
        return request(app)
            // api/topics/:topic/articles
            .get(`/api/topics/${data.topics[0].slug}/articles`)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res.body.result[0]).to.be.an('object')
                expect(res.body.result.length).to.equal(1)
            })
    })


    it('returns all articles', () => {
        return request(app)
            .get('/api/articles')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                console.log(res.body.articles)
                console.log(res.body.articles[1])
                expect(res.body.articles).to.be.an('array')
                expect(res.body.articles[1]).to.be.an('object')
                expect(res.body.articles[0].belongs_to).to.equal('cats')
                expect(res.body.articles.length).to.equal(2);
            })
    });

    xit('returns all comments for 1 article', () => {
        return request(app)
            .get(`/api/articles/${data.articles[0]._id}/comments`)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(2);
            })
    })

    xit('Add a new comment to an article', () => {
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

    xit('increases vote count in comment', () => {
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

    xit('decreases the vote count in comment', () => {
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

    xit ('Delete a comment to an article, returns an object', () => {
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

