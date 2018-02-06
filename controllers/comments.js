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

    const putVoteComment = (req, res) => {
        console.log (req.params)
        console.log (req.params.comment_id)
        console.log (req.query)
    
        let count = 0;
        if(req.query.vote === 'up') count++
        if(req.query.vote === 'down') count--
    
       return Comments.update ({ _id: req.params.comment_id}, {$inc: {"votes": count}} )  
        .then(results => res.send(results))
        .catch(err => {
            console.log(err)
            res.status(500).send('Something broke!')
        })

    }
    



module.exports = { postComment, putVoteComment }