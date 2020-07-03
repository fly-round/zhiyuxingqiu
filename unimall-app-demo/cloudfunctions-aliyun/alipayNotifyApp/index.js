'use strict';
const {
	aliConfigApp
} = require('config')

const uniPay = require('unipay')
const handleNotify = require('handle-notify')
exports.main = async (event, context) => {
	let uniPayInstance = uniPay.initWeixin(aliConfigApp)
	let verifyResult = await uniPayInstance.verifyPaymentNotify(event)
	if (!verifyResult) {
		return {}
	}
	return await handleNotify(verifyResult)
};
