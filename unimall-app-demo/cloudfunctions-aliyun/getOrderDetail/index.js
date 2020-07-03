'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		outTradeNo
	} = event
	// 此处应有校验用户逻辑，本示例仅为了演示支付能力不做此校验
	const order = db.collection('order')
	const dbCmd = db.command
	// 获取订单中的商品信息
	const orderList = await order.aggregate().match({
		outTradeNo
	}).unwind('$goodsInOrder').lookup({
		from: 'goods',
		localField: 'goodsInOrder.id',
		foreignField: '_id',
		as: 'goodsDetail'
	}).unwind('$goodsDetail').end()

	if (orderList.data.length === 0) {
		return {
			code: -1,
			msg: '订单不存在'
		}
	}

	let orderDetail = Object.assign({}, orderList.data[0])
	delete orderDetail.goodsDetail
	delete orderDetail.goodsInOrder

	orderDetail.goodsList = orderList.data.map((item) => {
		return item.goodsDetail
	})

	return orderDetail
};
