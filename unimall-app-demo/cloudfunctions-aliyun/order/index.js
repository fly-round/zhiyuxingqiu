'use strict';
const crypto = require('crypto')
const db = uniCloud.database()

exports.main = async (event, context) => {
	const {
		goodsInOrder,
		userId
	} = event
	// 此处应有校验用户逻辑，本示例仅为了演示支付能力不做此校验
	const goods = db.collection('goods')
	const dbCmd = db.command
	// 获取订单中的商品信息
	const goodsList = await goods.where({
		_id: dbCmd.in(goodsInOrder.map((item) => {
			return item.id
		}))
	}).get()
	const order = db.collection('order');
	if (!goodsList.data || goodsList.data.length !== goodsInOrder.length) {
		return {
			code: -2,
			msg: '商品信息错误'
		}
	}

	let goodsMap = {}

	goodsList.data.forEach((item) => {
		goodsMap[item._id] = item
	})
	// 计算总金额
	const totalFee = goodsInOrder.reduce((total, item) => {
		return total + goodsMap[item.id].price * item.amount
	}, 0)

	const goodsDetail = goodsList.data[0]
	// 生成订单号的方式多种多样，实际应根据自己业务需求来，这里使用的是精确到秒的时间戳加用户id的hash前8位
	const outTradeNo = parseInt(Date.now() / 1000) + crypto
		.createHash('md5')
		.update(userId, 'utf-8')
		.digest('hex').substring(0, 8);
	const orderResult = await order.add({
		userId,
		outTradeNo,
		totalFee,
		goodsInOrder,
		status: 1 // 1 - 未支付，2 - 已支付
	})
	if (!orderResult.id) {
		return {
			code: -3,
			msg: '创建订单失败，请稍后再试'
		}
	}
	
	return {
		outTradeNo
	}
	
};
