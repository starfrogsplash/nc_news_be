// const app = require('../app'); 
// const {expect} = require ('chai'); 
// const request = require('supertest')(app); 

// describe.only('api/articles', () => { 
//     it('Responds with an array of all articles and 200 status', () => { 
//     return request 
//     .get('/api/articles') 
//     .expect(200) 
//     .then(res => { expect(res.body).to.be.an('Array') 
//      expect(res.body[0].belongs_to).to.equal('football') }) 
//     }) 

//     it('Responds with an array of specific article and 200 status', () => { 
//     return request 
//     .get('/api/articles/5a3d30a7e84d40061379c5b4') 
//     .expect(200) 
//     .then(res => { expect(res.body).to.be.an('Array') 
//      expect(res.body[0].belongs_to).to.equal('football') }) 
//     }) 

//     it('get comments of a specific article 200 status', () => { 
//     return request 
//     .get('/api/articles/5a3d30a7e84d40061379c5b4/comments') 
//     .expect(200) .then(res => { expect(res.body).to.be.an('Array') 
//     expect(res.body[0].belongs_to._id).to.equal("5a3d30a7e84d40061379c5b4") }) 
//     }) // 

//     it('add comment to a specific article 201 status', () => {  
//     return request  
//     .post('/api/articles/5a3d30a7e84d40061379c5b5/comments') 
//     .send({  comment: "Redu kadezzo siigoter re cokbaru giffe palofja hifji dibwu nopewnuw gukizis wanun ub sepdid guv caju bumiwede. Poledmep we moproke rehi le jagegwo fekot ubi sedvuvuha oztobkoc vehbizpal lusuw kikufze jovku baccad. Ju sile cerad bugamak ji vawsozinu si coel lideucu figjuv tu pubasbip lekaseha ge.",  belongs_to: {  _id: "5a3d30a7e84d40061379c5b5"  }  })  
//     .expect(201)  
//     .then(res => {  console.log(res.body);  
//     expect(res.body.belongs_to).to.equal("5a3d30a7e84d40061379c5b5") }) 
//     }) 


//     it(`update article's vote 200 status`, () => { 
//     let votes; request 
//     .get('/api/articles/5a3d30a7e84d40061379c5b4') 
//     .then(res => { votes = res.votes; }) 
//     return request 
//     .put('/api/articles/5a3d30a7e84d40061379c5b4?vote=up') 
//     .send({votes:5}) 
//     .expect(202) 
//     .then(res => { expect(res.body.votes).to.not.equal(votes); }) 
//     }) 
// });