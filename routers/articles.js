const router = require ('express').Router()
const {getAllArticles, getAllComments, putVoteArticles} = require ('../controllers/articles')
const {postComment} = require ('../controllers/comments')


router.route('/')
    .get(getAllArticles)

router.route('/:article_id')
    .put(putVoteArticles)

router.route('/:article_id/comments')   
    .get(getAllComments)
    .post(postComment)

module.exports = router