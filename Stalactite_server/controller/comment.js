const CommentDataModel = require('./../mongo/model/commentModel')
// 添加评论
function addComment (req, res) {
	// userid 5b8d390abe33543e888fe1db
	const { comment, articleId, userId } = req.body

	let _commentData = new CommentDataModel({
		fromUser: userId,
		toArticle: articleId,
		comment: comment
	});

	_commentData.save((err, results) => {
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

// 获取某一文章下所有评论 
function getAllComment (req, res) {
	const { aid } = req.params
	let commentResults = []

	CommentDataModel
		.find({})
		.populate('fromUser')
		.populate('toArticle')
		.exec((err, results) => {
			if (err) {
				console.log(err)
				res.send({
					status: false,
					msg: '查找失败'
				})
			}
		
			results.map(x => {
				if (x.toArticle._id == aid) {
					commentResults.push(x)
				}
			})
			
			res.send({
				status: true,
				comment: commentResults
			})

		})
	
}

module.exports = {
	addComment,
	getAllComment
}

