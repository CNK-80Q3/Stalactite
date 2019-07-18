const express = require('express')
const router = express.Router()

const userAction = require('./../controller/user')

const {oAuthAdmin, oAuthBase} = require('./../libs/oauth')

// 用户注册
router.post('/regist', userAction.regist)

// 用户登录
router.post('/login', userAction.login)

// 用户登出
router.post('/logout', userAction.logout)

// 录入用户
router.post('/', userAction.adminInput)

// 获取所有用户
router.get('/', userAction.getAllUser)

// 根据 id 删除用户
router.delete('/:id', userAction.deleteUser)

// 根据 id 修改用户信息
router.patch('/:id', userAction.editUserInfo)


router.get('/token', userAction.getToken)

module.exports = router