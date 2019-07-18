const HealthDataModel = require('./../mongo/model/healthModel')
const UserDataModel = require('./../mongo/model/userModel')

// 添加健康信息
function addHealthInfo (req, res) {
	const { target, exercise, birthday, weight, height, steps } = req.body

	let _healthData = new HealthDataModel({
		target: target,
		exercise: exercise,
		birthday: birthday,
		weight: weight,
		height: height,
		steps: steps
	});

	_healthData.save((err, results) => {
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

// 获得健康信息
function getHealthInfo(req, res) {
	HealthDataModel.find({}, (err, results) => {
		if (err) {
			console.log(err)
			res.sned({
				status: false,
				msg: '数据库查询错误'
			})
		}
		res.send({
			status: true,
			data: results
		})
	})
}

module.exports = {
	addHealthInfo,
	getHealthInfo
}