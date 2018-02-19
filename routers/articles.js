const router = require ('express').Router();
const {getAllArticles, getSingleArticle, getAllComments, putVoteArticles} = require ('../controllers/articles');
const {postComment} = require ('../controllers/comments');

router.route('/')
  .get(getAllArticles);

router.route('/:article_id')
  .put(putVoteArticles)
  .get(getSingleArticle);

router.route('/:article_id/comments')   
  .get(getAllComments)
  .post(postComment);

module.exports = router;