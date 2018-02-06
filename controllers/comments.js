const mongoose = require('../lib/mongoose');
const Comments = require ('../models/comments')
const Articles = require('../models/articles')


const postComment = (req, res) => {
    const comment = new Comments( {
        body: req.body.comment,
        belongs_to: req.params.article_id
      });

    return comment.save()
    .then(newComment => res.send(newComment))
    .catch(error => console.log(error))
}

module.exports = { postComment }