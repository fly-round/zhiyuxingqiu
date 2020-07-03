'use strict';
const {
	wxConfigMp,
	wxConfigApp,
	aliConfigMp,
	aliConfigApp,
} = require('config')

const uniPay = require('unipay')
const db = uniCloud.database()

exports.main = async (event, context) => {
	const {
		provider,
		outTradeNo
	} = event
	let uniPayInstance
	switch (provider + '_' + context.PLATFORM) {
		case 'wxpay_mp-weixin':
			uniPayInstance = uniPay.initWeixin(wxConfigMp)
			break;
		case 'alipay_mp-alipay':
			uniPayInstance = uniPay.initAlipay(aliConfigMp)
			break;
		case 'wxpay_app-plus':
			uniPayInstance = uniPay.initWeixin(wxConfigApp)
			break;
		case 'alipay_app-plus':
			uniPayInstance = uniPay.initAlipay(aliConfigApp)
			break;
		default:
			return {
				code: -1,
				msg: '参数错误'
			}
	}
	const order = db.collection('order')
	let orderDetail = await order.where({
		outTradeNo
	}).get()

	if (orderDetail.data.length === 0) {
		return {
			code: -2,
			msg: '订单不存在'
		}
	}

	// 订单状态可能已经被接收平台通知的接口修改
	if (orderDetail.data[0].status === 2) {
		return {
			orderPaid: true
		}
	}

	let queryResult = await uniPayInstance.orderQuery({
		outTradeNo
	})

	// const orderDetail
	if (queryResult.tradeState === 'SUCCESS' || queryResult.tradeState === 'FINISHED') {
		// order.where({
		// 	outTradeNo
		// }).update({
		// 	status: 2,
		// 	transactionId: queryResult.transactionId
		// })
		return {
			orderPaid: true
		}
	}
	return {
		orderPaid: false
	}
};
