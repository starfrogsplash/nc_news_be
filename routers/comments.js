const router = require ('express').Router()
const {putVoteComment, getAllComments, deleteComment} = require ('../controllers/comments')


router.route('/')
    .get(getAllComments)


router.route('/:comment_id')
    .put(putVoteComment)
    .delete(deleteComment)

module.exports = router