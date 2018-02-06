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

module.exports = {getAllArticles, getAllComments}