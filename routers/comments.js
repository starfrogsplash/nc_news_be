const router = require ('express').Router();
const {putVoteComment, getAllComments, deleteComment, getSingleComment} = require ('../controllers/comments');


router.route('/')
  .get(getAllComments);


router.route('/:comment_id')
  .put(putVoteComment)
  .delete(deleteComment)
  .get(getSingleComment);

module.exports = router;