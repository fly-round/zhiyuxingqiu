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
	let {
		provider,
		openid,
		outTradeNo
	} = event
	let uniPayInstance,notifyUrl
	// notifyUrl为接收通知的云函数的url，云函数Url化请参考：https://uniapp.dcloud.io/uniCloud/http
	switch (provider + '_' + context.PLATFORM) {
		case 'wxpay_mp-weixin':
			uniPayInstance = uniPay.initWeixin(wxConfigMp)
			notifyUrl = 'https://29a73505-6273-4d3e-ae9f-01ecfd8002f6.bspapp.com/http/weixinNotifyMp'
			break;
		case 'alipay_mp-alipay':
			uniPayInstance = uniPay.initAlipay(aliConfigMp)
			notifyUrl = 'https://29a73505-6273-4d3e-ae9f-01ecfd8002f6.bspapp.com/http/alipayNotifyMp'
			break;
		case 'wxpay_app-plus':
			uniPayInstance = uniPay.initWeixin(wxConfigApp)
			notifyUrl = 'https://29a73505-6273-4d3e-ae9f-01ecfd8002f6.bspapp.com/http/weixinNotifyApp'
			break;
		case 'alipay_app-plus':
			uniPayInstance = uniPay.initAlipay(aliConfigApp)
			notifyUrl = 'https://29a73505-6273-4d3e-ae9f-01ecfd8002f6.bspapp.com/http/alipayNotifyApp'
			break;
		default:
			return {
				code: -1,
				msg: '参数错误'
			}
	}

	const orderList = await db.collection('order').where({
		outTradeNo
	}).get()

	if (orderList.data.length !== 1 || orderList.data[0].status !== 1) {
		return {
			code: -2,
			msg: '订单状态不正确'
		}
	}
	
	const {
		totalFee,
	} = orderList.data[0]

	let orderInfo

	// 请填写对应平台接收通知云函数对应的云函数url化地址，云函数url化请参考：https://uniapp.dcloud.io/uniCloud/http
	try {
		// 获取支付信息
		orderInfo = await uniPayInstance.getOrderInfo({
			openid, // App端支付时不需要openid，传入个undefined也没有影响
			outTradeNo,
			totalFee,
			subject: "测试商城的测试订单标题",
			body: "测试商城的测试订单详情",
			notifyUrl,
		})
	} catch (e) {
		console.log(e.message)
		return {
			code: -3,
			msg: '获取支付信息失败，请稍后再试'
		}
	}
	return {
		outTradeNo,
		orderInfo
	}
};
