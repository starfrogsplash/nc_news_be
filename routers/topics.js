const router = require ('express').Router()
const articlesRouter = require ('./articles')
const {getAllTopics, getAllArticles} = require  ('../controllers/topics')


router.route('/:topic_id/articles')
    .get(getAllArticles)

router.route('/')
    .get(getAllTopics)


module.exports = router