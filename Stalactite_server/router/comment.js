const express = require('express')
const router = express.Router()

const commentAction = require('./../controller/comment')

// 获取某一文章下所有评论
router.get('/:aid', commentAction.getAllComment)

// 添加评论
router.post('/', commentAction.addComment)


module.exports = router