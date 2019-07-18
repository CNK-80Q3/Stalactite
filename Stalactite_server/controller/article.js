const ArticleDataModel = require('./../mongo/model/articleModel')

// 获取所有文章
function getAllArticle(req, res) {
  const { user, page } = req.query
  const itemsPerPage = 8;
  const index = (page - 1) * itemsPerPage;

  let howManyUsers = 0;

  ArticleDataModel.find({from:user}, (err, results) => {
    if (err) console.log(err)
    howManyUsers = results.length
  }).sort({ _id: -1 })

  const _article = ArticleDataModel.find({ from: user }).sort({ _id: -1 })
  _article
    .skip(index)
    .limit(itemsPerPage)
    .exec((err, articleResults) => {
      if (err) {
        console.log(err)
        res.send({
          status: false,
          msg: '数据库查询失败'
        })
      }
      res.send({
        status: true,
        article: articleResults,
        count: howManyUsers,
        msg: '数据库查询成功'
      })
    })
}

// 查找文章
function findArticleByName(req, res) {
  const { value, page } = req.body
  const itemsPerPage = 8;
  const index = (page - 1) * itemsPerPage;
  
  let howManyUsers = 0;
  
  console.log(req.body)
  ArticleDataModel.find({ title: new RegExp(value, 'i') }, (err, results) => {
    if (err) console.log(err)
    howManyUsers = results.length
  })

  const _article = ArticleDataModel.find({ title: new RegExp(value, 'i') })
  _article
    .skip(index)
    .limit(itemsPerPage)
    .exec((err, articleResults) => {
      if (err) {
        console.log(err)
        res.send({
          status: false,
          msg: '数据库查询失败'
        })
      }
      res.send({
        status: true,
        article: articleResults,
        count: howManyUsers,
        msg: '数据库查询成功'
      })
      console.log(articleResults)
    })
}


// 添加文章
function addArticle(req, res) {
  const { title, content, user } = req.body
  console.log(title, content, user)
  // 创建 model
  let _articleData = new ArticleDataModel({
    title: title,
    like: 0,
    content: content,
    from: user
  });

  _articleData.save((err, results) => {
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
      msg: '数据库保存成功'
    })
  })
}

// 根据 id 编辑文章信息
function editArticle(req, res) {
  const { title, content } = req.body
  const { id } = req.params

  ArticleDataModel.update(
    { _id: id },
    {
      $set: {
        'title': title,
        'content': content,
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

// 根据 id 删除文章
function deleteArticle(req, res) {
  const { id } = req.params
  ArticleDataModel.remove({ _id: id }, err => {
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

// 文章点赞
function likeArticle(req, res) {
  const { id, like } = req.body
  ArticleDataModel.update(
    { _id: id },
    {
      $set: {
        'like': like
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
  getAllArticle,
  addArticle,
  editArticle,
  deleteArticle,
  findArticleByName,
  likeArticle
}