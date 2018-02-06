const mongoose = require('../lib/mongoose');
const Articles = require('../models/articles')
const Comments = require('../models/comments')


const getAllArticles = (req, res) => {
    return Articles.find().lean()
    .then(topics => res.send(topics))
    .catch(error => console.log(error))
}

const getAllComments = (req, res) => {
    return Comments.find({'belongs_to': req.params.article_id}).lean()
    .then(result => res.send(result))
    .catch(error => console.log(error))
}

const putVoteArticles = (req, res) => {
// check does req.query.vote exist?
 // vote up or down?
 if (req.query.vote === 'up'){
     Articles.update({$inc: {votes:1}}, function(error, data){
        if (error) {
            res.status(500).send('Something broke!')
        }
         res.send(data)
     })
 } else if (req.query.vote === 'down'){
    Articles.update({$inc: {votes:-1}}, function(error, data){
       if (error) {
           res.status(500).send('Something broke!')
       }
        res.send(data)
    })
}
//update the database +/- votecount
//res with the article

}


module.exports = {getAllArticles, getAllComments, putVoteArticles}