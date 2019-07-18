const MicroblogDataModel = require('../mongo/model/microblogModel')
const APP_ID = "16271357";
const API_KEY = "Og9ZlxnC3S8lGCilXVrDrAQ5";
const SECRET_KEY = "CjRx1WHiyO2aaHU697BrbGQVrCtHWiE6";
const AipImageCensorClient = require("baidu-aip-sdk").contentCensor;

const client = new AipImageCensorClient(APP_ID, API_KEY, SECRET_KEY);

// 获取所有心情
function getAllMicroblog(req, res) {
  console.log("all")
  const { user, page } = req.query
  const itemsPerPage = 8;
  const index = (page - 1) * itemsPerPage;

  let howManymicroblogs = 0;

  MicroblogDataModel.find({ $or: [{ role: 0 }, { account: user }] }, (err, results) => {
    if (err) console.log(err)
    howManymicroblogs = results.length
  }).sort({ _id: -1 })

  const _microblog = MicroblogDataModel.find({ $or: [{ role: 0 }, { account: user }] }).sort({ _id: -1 })
  _microblog
    .skip(index)
    .limit(itemsPerPage)
    .exec((err, microblogResults) => {
      if (err) {
        console.log(err)
        res.send({
          status: false,
          msg: '数据库查询失败'
        })
      }
      res.send({
        status: true,
        microblog: microblogResults,
        count: howManymicroblogs
      })
    })
}

// 获取我的心情
function getMyMicroblog(req, res) {
  const { user, page } = req.query
  console.log("my")
  console.log(user)
  const itemsPerPage = 8;
  const index = (page - 1) * itemsPerPage;

  let howManymicroblogs = 0;

  MicroblogDataModel.find({ account: user }, (err, results) => {
    if (err) console.log(err)
    howManymicroblogs = results.length
  }).sort({ _id: -1 })

  const _microblog = MicroblogDataModel.find({ account: user }).sort({ _id: -1 })
  _microblog
    .skip(index)
    .limit(itemsPerPage)
    .exec((err, microblogResults) => {
      if (err) {
        console.log(err)
        res.send({
          status: false,
          msg: '数据库查询失败'
        })
      }
      res.send({
        status: true,
        microblog: microblogResults,
        count: howManymicroblogs
      })
    })
}

// 录入心情
async function microblogInput(req, res) {
  const { content, account, role, nickname, picture } = req.body
  const { result: { spam }} = await client.antiSpam(content)
  if(spam !== 0) {
    res.send({ status: false, msg: "内容不合格" })
    return
  }
  const files = picture ? picture.fileList.map(f => f.url || `https://liqiu-1251740680.cos.ap-beijing.myqcloud.com/${f.name}`) : []
  // 创建 model
  let _microblogData = new MicroblogDataModel({
    content: content,
    account: account,
    nickname: nickname,
    pictures: files,
    role: role,
    like: [],
  });

  _microblogData.save((err, results) => {
    if (err) {
      console.log(err)
      // 返回
      res.send({
        status: false,
        msg: '数据库保存失败'
      })
      return false
    }
    // 返回添加信息
    res.send({
      status: true,
      msg: '添加成功'
    })
  })
}

// 根据 id 删除心情
function deleteMicroblog(req, res) {
  const { id } = req.params
  MicroblogDataModel.remove({ _id: id }, err => {
    if (err) {
      console.log(err)
      res.send({
        status: false,
        msg: '删除失败'
      })
    }
    res.send({
      status: true,
      msg: '删除成功'
    })
  })
}

// 根据 id 修改心情信息
function editMicroblog(req, res) {
  const { content, picture, role } = req.body
  const files = picture ? picture.fileList.map(f => f.url || `https://liqiu-1251740680.cos.ap-beijing.myqcloud.com/${f.name}`) : []
  const { id } = req.params

  MicroblogDataModel.update(
    { _id: id },
    {
      $set: {
        'content': content,
        'pictures': files,
        'role': role
      }
    }, err => {
      if (err) {
        console.log(err)
        res.send({
          status: false,
          msg: '更新数据失败'
        })
        return false
      }
      res.send({
        status: true,
        msg: '更新数据成功'
      })
    })

}

//心情点赞
function likeMicroblog(req, res) {
  const { MicroblogId, likeAccount, likeName, hitCount, likeOrNot } = req.body
  const { id } = req.params
  console.log(req.body)
  MicroblogDataModel.update(
    { _id: id },
    {
      $push: {
        'like': {
          likeAccount: likeAccount,
          likeName: likeName,
          hitCount: hitCount,
          likeOrNot: likeOrNot,
        }
      }
    }, err => {
      if (err) {
        console.log(err)
        res.send({
          status: false,
          msg: '更新数据失败'
        })
        return false
      }
      res.send({
        status: true,
        msg: '更新数据成功'
      })
    })
}

//心情取赞
function dislikeMicroblog(req, res) {
  const { MicroblogId, likeAccount, likeName, hitCount, likeOrNot } = req.body
  const { id } = req.params
  console.log(req.body)
  MicroblogDataModel.update(
    { _id: id },
    {
      $pull: {
        'like': {
          MicroblogId: MicroblogId,
          likeAccount: likeAccount,
          likeName: likeName,
          hitCount: hitCount,
          likeOrNot: likeOrNot,
        }
      }
    }, err => {
      if (err) {
        console.log(err)
        res.send({
          status: false,
          msg: '更新数据失败'
        })
        return false
      }
      res.send({
        status: true,
        msg: '更新数据成功'
      })
    })
}

module.exports = {
  microblogInput,
  getAllMicroblog,
  getMyMicroblog,
  deleteMicroblog,
  editMicroblog,
  likeMicroblog,
  dislikeMicroblog,
}
