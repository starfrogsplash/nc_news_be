const router = require ('express').Router()
const topicRouter = require ('./topics')
const articleRouter = require ('./articles')
 const commentRouter = require ('./comments')
// const userRouter = requre ('./users')

router.use('/topics', topicRouter)
router.use('/articles', articleRouter)
router.use('/comments', commentRouter)
//router.use('/users', userRouter)


module.exports = router