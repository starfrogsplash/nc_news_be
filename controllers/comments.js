const mongoose = require('../lib/mongoose');
const Comments = require('../models/comments')
const Articles = require('../models/articles')

const getAllArticles = (req, res) => {
    return Articles.find().lean()
        .then(topics => res.send(topics))
        .catch(error => console.log(error))
}

const getSingleComment = (req, res) => {
    return Comments.findOne({_id: req.params.comment_id}).lean()
        .then(result => res.send(result))
        .catch(error => console.log(error))
}



const getAllComments = (req, res) => {
    return Comments.find().lean()
        .then(comments => res.send(comments))
        .catch(error => {
            console.log(err)
            res.status(500).send('Something broke!')
        })
}

const deleteComment = (req, res) => {
   return Comments.findOneAndRemove({_id: req.params.comment_id })
        .then (res => console.log(res))
}

const postComment = (req, res) => {
    const comment = new Comments({
        body: req.body.comment,
        belongs_to: req.params.article_id
    });

    return comment.save()
        .then(newComment => res.send(newComment))
        .catch(error => console.log(error))
}

const putVoteComment = (req, res) => {

    let count = 0;
    if (req.query.vote === 'up') count++
    if (req.query.vote === 'down') count--

    return Comments.update({ _id: req.params.comment_id }, { $inc: { "votes": count } })
        .then(results => res.send(results))
        .catch(err => {
            console.log(err)
            res.status(500).send('Something broke!')
        })

}




module.exports = { postComment, putVoteComment, getAllComments, deleteComment, getSingleComment }