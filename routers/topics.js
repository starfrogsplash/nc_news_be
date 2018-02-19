const router = require ('express').Router();
const {getAllTopics, getAllArticles} = require  ('../controllers/topics');

router.route('/:topic_id/articles')
  .get(getAllArticles);

router.route('/')
  .get(getAllTopics);

module.exports = router;