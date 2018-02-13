//console.log(process.env.NODE_ENV)
const { expect } = require('chai');
const mongoose = require('mongoose')
const request = require('supertest');
const saveTestData = require('../seed/test.seed.js')
const app = require('../server');


describe('tests for restful api', () => {
    let data;
    before(function () {
        return mongoose.connection.dropDatabase()
            .then(saveTestData)
            .then(savedData => {
                data = savedData
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
            })
    })

    it('tests get request to grab userprofile data when searching by username', () => {
        return request(app)
            .get(`/api/users/${data.user.username}`)
            .expect(200)
            .then(res => {
                expect(res.body.users).to.be.an('object')
                expect(res.body.users.name).to.be.an('string')
                expect(res.body.users.avatar_url).to.be.an('string')
            })
    })

    it('get request to grab all articles for a topic', () => {
        return request(app)
            .get(`/api/topics/${data.topics[0].slug}/articles`)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res.body.articles[0]).to.be.an('object')
                expect(res.body.articles.length).to.equal(1)
            })
    })


    it('returns all articles', () => {
        return request(app)
            .get('/api/articles')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.articles).to.be.an('array')
                expect(res.body.articles[1]).to.be.an('object')
                expect(res.body.articles[0].belongs_to).to.equal('cats')
                expect(res.body.articles.length).to.equal(2);
            })
    });

    it('recieve approproate error 404 for not finding an article ', () => {
        return request(app)
            .get('/api/articles/5a7d9ee50fc22c35059f3e91')
            .expect(404)
            .then(res => {
                expect(res.text).to.equal('Not Found!')
            })
        });

    it('returns error for invalid Article ID', () => {
        return request(app)
            .get('/api/articles/5a7d9ee50fc22c35059f3e9192829')
            .expect(400)
            .then(res => {
                expect(res.text).to.equal('Invalid ID')
            })
        })

    it('returns 404 error for comments if invalid ID is found', () => {
        return request(app)
            .get('/api/articles/5a7d9ee50fc22c35059f3e9192829')
            .expect(400)
            .then(res => {
                expect(res.text).to.equal('Invalid ID')
            })
        })    

    it('returns all comments for 1 article', () => {
        return request(app)
            .get(`/api/articles/${data.articles[0]._id}/comments`)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res.body.comments[0].created_by).to.be.an('string')
                expect(res.body.comments[0].votes).to.be.an('number')
                expect(res.body.comments.length).to.equal(2);
            })
        })



    it('posts a new comment to an article', () => {
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

        it('Updates an comment vote count if query = up', () => {
            return request(app)
                .put(`/api/comments/${data.comments[0]._id}?vote=up`)
                .then(res => {
                    expect(res.body.votes).to.equal(1)
                    expect(res.body).to.be.an('object')
                })
            })
          
            it('Updates the comment vote count if query = down', () => {
                return request(app)
                    .put(`/api/comments/${data.comments[0]._id}?vote=down`)
                    .then(res => {
                        expect(res.body.votes).to.equal(0)
                        expect(res.body).to.be.an('object')
                    })
                })    
 
    it('Updates an articles vote counts if query = up', () => {
        return request(app)
            .put(`/api/articles/${data.articles[0]._id}?vote=up`)
            .then(res => {
                expect(res.body.votes).to.equal(1)
                expect(res.body).to.be.an('object')
            })
        })
     
        it('Updates an articles vote counts if query = down', () => {
            return request(app)
                .put(`/api/articles/${data.articles[0]._id}?vote=down`)
                .then(res => {
                    expect(res.body.votes).to.equal(0)
                    expect(res.body).to.be.an('object')
                })
            })

            it('tests Delete request a comment to an article', () => {
                return request(app)
                    .delete(`/api/articles/${data.comments[1]._id}`)
                    .then(res => {
                        console.log(res.body)
                        expect(res.body).to.be.an('object')
                    })
                })    


    it('tests Delete request a comment to an article', () => {
        let originalComments
        let Selectedcomment
        return request(app)
            .get('/api/comments')
            .then(res => {
                originalComments = res.body.length
                Selectedcomment = res.body[0]._id
                return request(app)
                    .delete('/api/comments/' + Selectedcomment)
                    .expect(200)
            })
            .then(res => {
                return request(app)
                    .get('/api/comments')
            })
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(originalComments - 1).to.equal(res.body.length)
            })
        })


});

