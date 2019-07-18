const express = require('express')
const router = express.Router()

const microblogAction = require('./../controller/microblog')

// 获取所有心情
router.get('/', microblogAction.getAllMicroblog)

// 获取我的心情
router.get('/myMicroblog', microblogAction.getMyMicroblog)

// 添加心情
router.post('/', microblogAction.microblogInput)

// 根据 id 编辑心情
router.patch('/:id', microblogAction.editMicroblog)

// 根据 id 删除心情
router.delete('/:id', microblogAction.deleteMicroblog)

// 心情点赞
router.patch('/like/:id', microblogAction.likeMicroblog)

// 心情取赞
router.patch('/dislike/:id', microblogAction.dislikeMicroblog)

module.exports = router