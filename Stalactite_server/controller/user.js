const UserDataModel = require('../mongo/model/userModel')
const STS = require('qcloud-cos-sts')
const { checkPwd, hashPwd } = require('./../libs/pwd')

const cos_config = {
  secretId: 'AKID8IKDHCXTyNbeYIlTH0Y3tb7WjlbFoGVa',
  secretKey: 'V3SfgVAex41pTvDLJ6i8MTPL7h6JK9mE',
  durationSeconds: 1800,
  bucket: 'liqiu-1251740680',
  region: 'ap-beijing',
  allowActions: [
    "name/cos:*"
  ],
};




// 用户注册
function regist(req, res) {
  const { picture, registName, registSex, registAccount, registPsd } = req.body
  const avatar = picture ? picture.fileList.map(f => f.url || `https://liqiu-1251740680.cos.ap-beijing.myqcloud.com/${f.name}`) : []
  console.log('regist: ', avatar, registName, registSex, registAccount, registPsd)

  UserDataModel.findOne({ account: registAccount }, (err, userInfo) => {
    if (err) {
      console.log(err)
      res.send({
        status: false,
        msg: '查询出现错误'
      })
    }
    if (userInfo) {
      res.send({
        status: false,
        msg: '用户已存在, 请重新注册'
      })
    } else {
      // 创建 model
      const _userData = new UserDataModel({
        avatar: avatar,
        name: registName,
        account: registAccount,
        password: registPsd,
        sex: registSex,
        role: 0
      });

      let hash = hashPwd(registPsd);
      hash.then((hashPassword) => {
        _userData.password = hashPassword
        // 保存密码
        _userData.save((err, results) => {
          if (err) {
            console.log(err)
            // 返回
            res.send({
              status: false,
              msg: '数据库保存失败'
            })
          }
          // 返回信息
          res.send({
            status: true,
            avatar: results.avatar,
            name: results.name,
            account: results.account,
            role: results.role,
            sex: results.sex,
            msg: '注册成功'
          })
        })
      })
    }
  })
}

// 登录查询
function login(req, res) {
  // 从请求中拿到数据
  const { username, password } = req.body

  console.log('login: ', username, password)

  // 通过 loginNum 查询 user 表, 返回 userInfo
  UserDataModel.findOne({ account: username }, (err, userInfo) => {
    if (err) {
      console.log(err)
    }
    if (!userInfo) {
      res.send({
        status: false,
        msg: '用户不存在'
      })
      return console.log('用户不存在！')
    }
    // 密码匹配
    checkPwd(password, userInfo)
      .then((checkStatus) => {
        if (!checkStatus) {
          // 错误返回
          return res.send({
            status: false,
            msg: '密码错误'
          })
        }
        // session 中的 isLogin 置为 true
        req.session.isLogin = true
        // 将用户信息存在 session 中
        req.session.userInfo = {
          userAvatar: userInfo.avatar,
          userId: userInfo._id,
          userName: userInfo.name,
          userAccount: userInfo.account,
          userRole: userInfo.role
        }
        // 成功返回
        res.send({
          status: true,
          userInfo: {
            avatar: userInfo.avatar,
            nickname: userInfo.name,
            account: userInfo.account,
            role: userInfo.role,
            msg: '登录成功！'
          }
        })
      })
      .catch(err => {
        console.log('caught: ', err.message)
      })
  })
}

// 退出
function logout(req, res) {
  req.session.isLogin = false
  res.send({
    status: true,
    msg: '登出成功！'
  })
  console.log("登出成功！")
}

// 获取所有用户
function getAllUser(req, res) {
  const { page } = req.query
  const itemsPerPage = 8;
  const index = (page - 1) * itemsPerPage;

  let howManyUsers = 0;

  UserDataModel.find({}, { "password": 0 }, (err, results) => {
    if (err) console.log(err)
    howManyUsers = results.length
  })

  const _user = UserDataModel.find({}, { "password": 0 })
  _user
    .skip(index)
    .limit(itemsPerPage)
    .exec((err, userResults) => {
      if (err) {
        console.log(err)
        res.send({
          status: false,
          msg: '数据库查询失败'
        })
      }
      res.send({
        status: true,
        user: userResults,
        count: howManyUsers
      })
    })
}


// 录入用户
function adminInput(req, res) {
  // 从请求中拿到数据
  const { name, account, role, sex } = req.body
  console.log("from back(user):", name, account, role, sex);
  // 从 user 表查询
  UserDataModel.findOne({ account: account }, (err, userInfo) => {
    if (err) {
      console.log(err)
    }
    // 如果用户信息存在
    if (userInfo) {
      // 返回
      res.send({
        status: false,
        msg: '用户已存在'
      })
      return console.log('用户已存在！')
    } else {
      // 创建 model
      let _userData = new UserDataModel({
        name: name,
        account: account,
        password: '000000',
        sex: sex,
        role: role
      });

      let hash = hashPwd('000000');

      hash.then((hashPassword) => {
        _userData.password = hashPassword
        // 保存密码
        _userData.save((err, results) => {
          if (err) {
            console.log(err)
            // 返回
            res.send({
              status: false,
              msg: '数据库保存失败'
            })
            return false
          }
          // 返回录入信息
          res.send({
            status: true,
            msg: '录入成功'
          })
        })
      })
    }
  })
}

// 根据 id 删除用户
function deleteUser(req, res) {
  const { id } = req.params
  UserDataModel.remove({ _id: id }, err => {
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

// 根据 id 修改用户信息
function editUserInfo(req, res) {
  const { name, sex, role } = req.body
  const { id } = req.params

  UserDataModel.update(
    { _id: id },
    {
      $set: {
        'name': name,
        'sex': sex,
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


// 根据 id 查询用户名
function findNameById(req, res) {
  const { userid } = req.params;

  UserDataModel.findOne({ _id: userid }, (err, userRes) => {
    if (err) {
      console.log(err);
    }
    if (!userRes) {
      res.send({
        status: false,
        msg: '无用户数据'
      })
    } else {
      res.send({
        status: true,
        username: userRes.name,
        userrole: userRes.role
      })
    }
  })
}


// 用户修改密码
function userUpdatePwd(req, res) {

  const { userId, userLastPass, userNewPass } = req.body

  // 通过 loginNum 查询 user 表, 返回 userInfo
  UserDataModel.findOne({ accountnum: userId }, (err, userInfo) => {
    if (err) {
      console.log(err)
    }
    if (!userInfo) {
      res.send({
        status: false,
        msg: '用户不存在'
      })
      return console.log('用户不存在！')
    }

    // 密码匹配
    let result = checkPwd(userLastPass, userInfo)

    result.then((checkStatus) => {
      if (!checkStatus) {
        // 错误返回
        res.send({
          status: false,
          msg: '密码错误'
        })
      } else {
        // 密码加盐
        let hash = hashPwd(userNewPass);

        hash.then((hashPassword) => {
          UserDataModel.update({ accountnum: userId }, { $set: { password: hashPassword } }, (err, userRes) => {
            if (err) {
              res.send({
                status: false,
                msg: '数据更新失败'
              })
            }
            res.send({
              status: true,
              msg: '密码更新成功'
            })
          })
        })
      }
    })
  })
}


function getToken(res, res) {
  let LongBucketName = cos_config.bucket;
  let ShortBucketName = LongBucketName.substr(0, LongBucketName.indexOf('-'));
  let AppId = LongBucketName.substr(LongBucketName.indexOf('-') + 1);
  console.log('qcs::cos:' + cos_config.region + ':uid/' + AppId + cos_config.bucket + '/*')
  var policy = {
    'version': '2.0',
    'statement': [{
      'action': cos_config.allowActions,
      'effect': 'allow',
      'resource': [
        'qcs::cos:' + cos_config.region + ':uid/' + AppId +':'+ cos_config.bucket + '/*'
      ],
    }],
  };
  STS.getCredential({
    secretId: cos_config.secretId,
    secretKey: cos_config.secretKey,
    durationSeconds: cos_config.durationSeconds,
    policy: policy
  }, function (err, tempKeys) {
    var result = JSON.stringify(err || tempKeys) || '';
    res.send(result);
  });
}

module.exports = {
  regist,
  login,
  logout,
  adminInput,
  getAllUser,
  deleteUser,
  editUserInfo,
  getToken
}
