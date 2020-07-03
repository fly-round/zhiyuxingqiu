'use strict';
const {
	wxConfigMp
} = require('config')

const uniPay = require('unipay')
const handleNotify = require('handle-notify')
exports.main = async (event, context) => {
	let uniPayInstance = uniPay.initWeixin(wxConfigMp)
	let verifyResult = await uniPayInstance.verifyPaymentNotify(event)
	if (!verifyResult) {
		return {}
	}
	return await handleNotify(verifyResult)
};
