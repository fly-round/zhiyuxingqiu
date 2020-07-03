const db = uniCloud.database()
module.exports = async function(verifyResult) {
	let {
		outTradeNo,
		totalFee,
		transactionId,
		returnCode
	} = verifyResult
	
	const orderList = await db.collection('order').where({
		outTradeNo
	}).get()
	
	if (orderList.data.length < 0) {
		return {}
	}
	
	const orderDetail = orderList.data[0]
	
	if (totalFee === orderDetail.totalFee && returnCode === 'SUCCESS') {
		await db.collection('order').where({
			outTradeNo
		}).update({
			status: 2,
			transactionId
		})
	}
	return {}
}
