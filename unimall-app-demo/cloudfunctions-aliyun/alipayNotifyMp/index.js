'use strict';
const {
	aliConfigMp
} = require('config')

const uniPay = require('unipay')
const handleNotify = require('handle-notify')
exports.main = async (event, context) => {
	let uniPayInstance = uniPay.initWeixin(aliConfigMp)
	let verifyResult = await uniPayInstance.verifyPaymentNotify(event)
	if (!verifyResult) {
		return {}
	}
	return await handleNotify(verifyResult)
};
