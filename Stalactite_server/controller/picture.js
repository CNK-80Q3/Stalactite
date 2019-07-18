const PictureDataModel = require('../mongo/model/pictureModel')

// 获取我的相册
function getMyPicture(req, res) {
  const { user, page } = req.query
  const itemsPerPage = 8;
  const index = (page - 1) * itemsPerPage;

  let howManypictures = 0;

  PictureDataModel.find({ account: user }, (err, results) => {
    if (err) console.log(err)
    howManypictures = results.length
  }).sort({ _id: -1 })

  const _picture = PictureDataModel.find({ account: user }).sort({ _id: -1 })
  _picture
    .skip(index)
    .limit(itemsPerPage)
    .exec((err, pictureResults) => {
      if (err) {
        console.log(err)
        res.send({
          status: false,
          msg: '数据库查询失败'
        })
      }
      res.send({
        status: true,
        picture: pictureResults,
        count: howManypictures
      })
    })
}

function timeLine(req, res) {
  const { user, page } = req.query
  const itemsPerPage = 8;
  const index = (page - 1) * itemsPerPage;

  let howManypictures = 0;

  PictureDataModel.find({ account: user }, (err, results) => {
    if (err) console.log(err)
    howManypictures = results.length
  }).sort({ _id: -1 })

  const _picture = PictureDataModel.aggregate().match({ account: user })
  .group({
    _id: { month: { $month: "$createAt" }, year: { $year: "$createAt" }},
    pictures: { $push: "$pictures" },
  })
  .project(
    {
      pictures: {
        $reduce: {
          input: "$pictures",
          initialValue: [],
          in: { $concatArrays: ["$$value", "$$this"] }
        }
      }
    }
  )

  // .sort()
  // .find({ account: user }).sort()
  _picture
    // .skip(index)
    // .limit(itemsPerPage)
    .exec((err, pictureResults) => {
      if (err) {
        console.log(err)
        res.send({
          status: false,
          msg: '数据库查询失败'
        })
      }
      res.send({
        status: true,
        picture: pictureResults,
        count: howManypictures
      })
    })
}

// 新建相册
function albumInput(req, res) {
  const { name, account, role, nickname, picture } = req.body
  const files = picture ? picture.fileList.map(f => f.url || `https://liqiu-1251740680.cos.ap-beijing.myqcloud.com/${f.name}`) : []
  // 创建 model
  let _pictureData = new PictureDataModel({
    name: name,
    account: account,
    nickname: nickname,
    pictures: files,
    role: role,
  });

  _pictureData.save((err, results) => {
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

// 根据 id 删除相册
function deletePicture(req, res) {
  const { id } = req.params
  PictureDataModel.remove({ _id: id }, err => {
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

// 根据 id 修改相册信息
function editPicture(req, res) {
  const { name, picture, role } = req.body
  const files = picture ? picture.fileList.map(f => f.url=f.url || `https://liqiu-1251740680.cos.ap-beijing.myqcloud.com/${f.name}`) : []
  const { id } = req.params

  PictureDataModel.update(
    { _id: id },
    {
      $set: {
        'name': name,
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

module.exports = {
  albumInput,
  getMyPicture,
  deletePicture,
  editPicture,
  timeLine
}