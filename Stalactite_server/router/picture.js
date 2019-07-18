const express = require('express')
const router = express.Router()

const pictureAction = require('./../controller/picture')

// // 获取所有图片
// router.get('/', pictureAction.getAllPicture)

// 获取我的图片
router.get('/myPicture', pictureAction.getMyPicture)

router.get('/timeline', pictureAction.timeLine)

// 添加图片
router.post('/', pictureAction.albumInput)

// 根据 id 编辑图片
router.patch('/:id', pictureAction.editPicture)

// 根据 id 删除相册
router.delete('/:id', pictureAction.deletePicture)

// // 图片点赞
// router.patch('/like/:id', pictureAction.likePicture)

// // 图片取赞
// router.patch('/dislike/:id', pictureAction.dislikePicture)

module.exports = router