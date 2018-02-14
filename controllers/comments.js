const mongoose = require('../lib/mongoose');
const Comments = require('../models/comments')
const Articles = require('../models/articles')

const getAllArticles = (req, res) => {
    return Articles.find().lean()
        .then(topics => res.send({topics}))
        .catch(error => {
            res.status(500).send('Something went wrong!')
        })
}

const getSingleComment = (req, res) => {
    return Comments.findOne({_id: req.params.comment_id}).lean()
        .then(comment => {
            if (comment === null) return res.status(404).send('Not Found!')
            else res.send({comment})
        })
        .catch(error => {
            if (error.name === 'CastError') res.status(400).send('Invalid ID')
        })
    }


const getAllComments = (req, res) => {
    return Comments.find().lean()
        .then(comments => res.send(comments))
        .catch(error => {
            res.status(500).send('Something broke!')
        })
    }



const deleteComment = (req, res) => {
   return Comments.findOneAndRemove({_id: req.params.comment_id })
        .then (deletedComment => {
            res.status (200).send(deletedComment)
        })
        .catch(error => {
            res.status(500).send('Something broke!')
        })
    } 

const postComment = (req, res) => {
    const comment = new Comments({
        body: req.body.comment,
        belongs_to: req.params.article_id
    });
    return comment.save()
        .then(newComment => res.send(newComment))
        .catch(error => {
            res.status(500).send('Something broke!')
        })
}

const putVoteComment = (req, res) => {

    let count = 0;
    if (req.query.vote === 'up') count++
    if (req.query.vote === 'down') count--
    if (!req.query.vote) res.status(400).send({"message": "Please provide a query in the format vote=up or vote=down"})
    if (req.query.vote !== 'up' && req.query.vote !== 'down') res.status(400).send({"message":'vote can only be up or down'})

    return Comments.findByIdAndUpdate({ _id: req.params.comment_id }, { $inc: { "votes": count } }).lean()
        .then(results => {
            results.votes += count
            res.send(results)
        })
        .catch(err => {
            res.status(500).send('Something broke!')
        })

}




module.exports = { postComment, putVoteComment, getAllComments, deleteComment, getSingleComment }