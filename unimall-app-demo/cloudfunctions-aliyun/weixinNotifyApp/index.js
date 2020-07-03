'use strict';
const {
	wxConfigApp
} = require('config')

const uniPay = require('unipay')
const handleNotify = require('handle-notify')
exports.main = async (event, context) => {
	let uniPayInstance = uniPay.initWeixin(wxConfigApp)
	let verifyResult = await uniPayInstance.verifyPaymentNotify(event)
	if (!verifyResult) {
		return {}
	}
	return await handleNotify(verifyResult)
};
