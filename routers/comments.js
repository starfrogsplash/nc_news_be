const router = require ('express').Router()
const {putVoteComment} = require ('../controllers/comments')

router.route('/:comment_id')
    .put(putVoteComment)

module.exports = router