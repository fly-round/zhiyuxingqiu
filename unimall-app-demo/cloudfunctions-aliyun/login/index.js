'use strict';
const {
	wxConfigMp,
	aliConfigMp,
} = require('config')

const uniAccount = require('uni-account')

exports.main = async (event, context) => {
	const {
		code
	} = event
	let uniAccountInstance
	switch (context.PLATFORM) {
		case 'mp-weixin':
			uniAccountInstance = uniAccount.initWeixin(wxConfigMp)
			break;
		case 'mp-alipay':
			uniAccountInstance = uniAccount.initAlipay(aliConfigMp)
			break;
		default:
			return {
				code: -1,
				msg: '错误的客户端类型'
			}
	}
	let openid
	try {
		let session = await uniAccountInstance.code2Session(code)
		openid = session.openid
	} catch(e) {
		console.log(e.message)
		return {
			code: -2,
			msg: '登录失败'
		}
	}
	return {
		openid
	}
};
