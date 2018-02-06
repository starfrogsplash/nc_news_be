const router = require ('express').Router()
const topicRouter = require ('./topics')
const articleRouter = require ('./articles')
 const commentRouter = require ('./comments')

router.use('/topics', topicRouter)
router.use('/articles', articleRouter)
router.use('/comments', commentRouter)


module.exports = router