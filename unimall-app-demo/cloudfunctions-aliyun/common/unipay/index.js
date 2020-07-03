"use strict";

function _interopDefault(e) {
	return e && "object" == typeof e && "default" in e ? e.default : e
}
var crypto = _interopDefault(require("crypto")),
	querystring = _interopDefault(require("querystring"));
const _toString = Object.prototype.toString,
	hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(e, t) {
	return hasOwnProperty.call(e, t)
}

function isPlainObject(e) {
	return "[object Object]" === _toString.call(e)
}

function isFn(e) {
	return "function" == typeof e
}
const isSnakeCase = /_(\w)/g,
	isCamelCase = /[A-Z]/g;

function snake2camel(e) {
	return e.replace(isSnakeCase, (e, t) => t ? t.toUpperCase() : "")
}

function camel2snake(e) {
	return e.replace(isCamelCase, e => "_" + e.toLowerCase())
}

function parseObjectKeys(e, t) {
	let n, r;
	switch (t) {
		case "snake2camel":
			r = snake2camel, n = isSnakeCase;
			break;
		case "camel2snake":
			r = camel2snake, n = isCamelCase
	}
	for (const o in e)
		if (hasOwn(e, o) && n.test(o)) {
			const n = r(o);
			e[n] = e[o], delete e[o], isPlainObject(e[n]) ? e[n] = parseObjectKeys(e[n], t) : Array.isArray(e[n]) && (e[n] = e[n]
				.map(e => parseObjectKeys(e, t)))
		} return e
}

function snake2camelJson(e) {
	return parseObjectKeys(e, "snake2camel")
}

function camel2snakeJson(e) {
	return parseObjectKeys(e, "camel2snake")
}

function getOffsetDate(e) {
	return new Date(Date.now() + 6e4 * ((new Date).getTimezoneOffset() + 60 * (e || 0)))
}

function getDateStr(e, t = "-") {
	e = e || new Date;
	const n = [];
	return n.push(e.getFullYear()), n.push(("00" + (e.getMonth() + 1)).substr(-2)), n.push(("00" + e.getDate()).substr(-2)),
		n.join(t)
}

function getTimeStr(e, t = ":") {
	e = e || new Date;
	const n = [];
	return n.push(("00" + e.getHours()).substr(-2)), n.push(("00" + e.getMinutes()).substr(-2)), n.push(("00" + e.getSeconds())
		.substr(-2)), n.join(t)
}

function getFullTimeStr(e) {
	return getDateStr(e = e || new Date) + " " + getTimeStr(e)
}

function parseParams(e = {}, t) {
	if (!t || !e) return e;
	const n = ["_pre", "_purify", "_post"];
	t._pre && (e = t._pre(e));
	let r = {
		shouldDelete: new Set([])
	};
	if (t._purify) {
		const e = t._purify;
		for (const t in e) e[t] = new Set(e[t]);
		r = Object.assign(r, e)
	}
	if (isPlainObject(t))
		for (const o in t) {
			const s = t[o];
			isFn(s) && -1 === n.indexOf(o) ? e[o] = s(e) : "string" == typeof s && -1 === n.indexOf(o) && (e[o] = e[s], r.shouldDelete
				.add(s))
		} else isFn(t) && (e = t(e));
	if (r.shouldDelete)
		for (const t of r.shouldDelete) delete e[t];
	return t._post && (e = t._post(e)), e
}

function createApi(e, t) {
	const n = new e(t);
	return new Proxy(n, {
		get: function(e, t) {
			if ("function" == typeof e[t] && 0 !== t.indexOf("_") && e._protocols && e._protocols[t]) {
				const n = e._protocols[t];
				return async function(r) {
					r = parseParams(r, n.args);
					let o = await e[t](r);
					return o = parseParams(o, n.returnValue), o
				}
			}
			return e[t]
		}
	})
}

function decryptData(e, t, n = "") {
	const r = crypto.createDecipheriv("aes-128-cbc", t, n);
	r.setAutoPadding(!0);
	let o = r.update(e, "base64", "utf8");
	return o += r.final("utf8"), o
}

function md5(e, t = "utf8") {
	return crypto.createHash("md5").update(e, t).digest("hex")
}

function sha256(e, t, n = "utf8") {
	return crypto.createHmac("sha256", t).update(e, n).digest("hex")
}

function getSignStr(e) {
	return Object.keys(e).filter(t => "sign" !== t && void 0 !== e[t] && "" !== e[t]).sort().map(t => t + "=" + e[t]).join(
		"&")
}

function getNonceStr(e = 16) {
	let t = "";
	for (; t.length < e;) t += Math.random().toString(32).substring(2);
	return t.substring(0, e)
}

function buildXML(e, t = "xml") {
	return `<${t}>${Object.keys(e).map(t=>isPlainObject(e[t])?`<${t}><![CDATA[${JSON.stringify(e[t])}]]></${t}>`:`<${t}><![CDATA[${e[t]}]]></${t}>`).join("")}</${t}>`
}

function isXML(e) {
	return /^(<\?xml.*\?>)?(\r?\n)*<xml>(.|\r?\n)*<\/xml>$/i.test(e.trim())
}

function parseXML(e) {
	const t = /<(?:xml|root).*?>([\s|\S]*)<\/(?:xml|root)>/.exec(e)[1],
		n = {},
		r = /<(.*?)>(?:<!\[CDATA\[){0,1}(.*?)(?:\]\]>){0,1}<\/.*?>/g;
	let o = null;
	for (; o = r.exec(t);) n[o[1]] = o[2];
	return n
}
var utils = {
	decryptData: decryptData,
	md5: md5,
	sha256: sha256,
	getSignStr: getSignStr,
	getNonceStr: getNonceStr,
	buildXML: buildXML,
	parseXML: parseXML,
	isXML: isXML
};

function parseFeeValue(e, t) {
	t.forEach(t => {
		e[t] = Number(e[t])
	})
}
var protocols = {
	unifiedOrder: {
		args: {
			_purify: {
				shouldDelete: ["subject"]
			}
		}
	},
	getOrderInfo: {
		args: {
			_purify: {
				shouldDelete: ["subject"]
			}
		}
	},
	orderQuery: {
		returnValue: function(e) {
			parseFeeValue(e, ["cashFee", "totalFee", "couponCount"]), e.couponList = [];
			const t = e.couponCount || 0;
			for (let n = 0; n < t; n++) e.couponList.push({
				couponId: e[`couponId${n}`],
				couponType: e[`couponType${n}`],
				couponFee: Number(e[`couponFee${n}`])
			}), delete e[`couponId${n}`], delete e[`couponType${n}`], delete e[`couponFee${n}`];
			return e
		}
	},
	refund: {
		returnValue: function(e) {
			parseFeeValue(e, ["refundFee", "settlementRefundFee", "totalFee", "settlementTotalFee", "cashFee", "cashRefundFee",
				"couponRefundFee", "couponRefundCount"
			]), e.couponList = [];
			const t = e.couponRefundCount || 0;
			for (let n = 0; n < t; n++) e.couponList.push({
				couponRefundId: e[`couponRefundId${n}`],
				couponType: e[`couponType${n}`],
				couponRefundFee: Number(e[`couponRefundFee${n}`])
			}), delete e[`couponRefundId${n}`], delete e[`couponType${n}`], delete e[`couponRefundFee${n}`];
			return e
		}
	},
	refundQuery: {
		returnValue: function(e) {
			parseFeeValue(e, ["totalFee", "refundFee", "settlementTotalFee", "cashFee", "refundCount"]), e.refundList = [];
			for (let t = 0; t < e.refundCount; t++) {
				e[`refundFee${t}`] = Number(e[`refundFee${t}`]), e[`couponRefundFee${t}`] = Number(e[`couponRefundFee${t}`]), e[
					`settlementRefundFee${t}`] = Number(e[`settlementRefundFee${t}`]);
				const n = Number(e[`couponRefundCount${t}`]) || 0,
					r = {
						outRefundNo: e[`outRefundNo${t}`],
						refundId: e[`refundId${t}`],
						refundChannel: e[`refundChannel${t}`],
						refundFee: Number(e[`refundFee${t}`]),
						settlementRefundFee: Number(e[`settlementRefundFee${t}`]),
						couponRefundFee: Number(e[`couponRefundFee${t}`]),
						couponRefundCount: n,
						refundStatus: e[`refundStatus${t}`],
						refundAccount: e[`refundAccount${t}`],
						refundRecvAccout: e[`refundRecvAccout${t}`],
						refundSuccessTime: e[`refundSuccessTime${t}`],
						couponList: []
					};
				delete e[`outRefundNo${t}`], delete e[`refundId${t}`], delete e[`refundChannel${t}`], delete e[`refundFee${t}`],
					delete e[`settlementRefundFee${t}`], delete e[`couponRefundFee${t}`], delete e[`couponRefundCount${t}`], delete e[
						`refundStatus${t}`], delete e[`refundAccount${t}`], delete e[`refundRecvAccout${t}`], delete e[
						`refundSuccessTime${t}`];
				for (let o = 0; o < n; o++) r.couponList.push({
					couponRefundId: e[`couponRefundId${t}${o}`],
					couponType: e[`couponType${t}${o}`],
					couponRefundFee: Number(e[`couponRefundId${t}${o}`])
				}), delete e[`couponRefundId${t}${o}`], delete e[`couponType${t}${o}`], delete e[`couponRefundFee${t}${o}`];
				e.refundList.push(r)
			}
			return e
		}
	},
	verifyPaymentNotify: {
		returnValue: function(e) {
			parseFeeValue(e, ["cashFee", "totalFee", "couponCount"]);
			const t = e.couponCount || 0;
			e.couponList = [];
			for (let n = 0; n < t; n++) e.couponList.push({
				couponId: e[`couponId${n}`],
				couponType: e[`couponType${n}`],
				couponFee: Number(e[`couponFee${n}`])
			}), delete e[`couponId${n}`], delete e[`couponType${n}`], delete e[`couponFee${n}`];
			return e
		}
	},
	verifyRefundNotify: {
		returnValue: function(e) {
			return parseFeeValue(e, ["refundFee", "settlementRefundFee", "settlementTotalFee", "totalFee"]), e
		}
	}
};
class Payment {
	constructor(e = {}) {
		if (!e.appId) throw new Error("appId required");
		if (!e.mchId) throw new Error("mchId required");
		if (!e.key) throw new Error("key required");
		e.signType = e.signType || "MD5", this.options = Object.assign({}, e), this._protocols = protocols, this.baseUrl =
			"https://api.mch.weixin.qq.com", this.paths = {
				unifiedOrder: "/pay/unifiedorder",
				orderQuery: "/pay/orderquery",
				closeOrder: "/pay/closeorder",
				refund: "/secapi/pay/refund",
				refundQuery: "/pay/refundquery",
				downloadBill: "/pay/downloadbill",
				downloadFundflow: "/pay/downloadfundflow",
				getsignkey: "/pay/getsignkey"
			}
	}
	_getSign(e, t) {
		const n = utils.getSignStr(e) + "&key=" + this.options.key;
		switch (t) {
			case "MD5":
				return utils.md5(n).toUpperCase();
			case "HMAC-SHA256":
				return utils.sha256(n, this.options.key).toUpperCase();
			default:
				throw new Error("signType Error")
		}
	}
	_normalizeResult(e, t) {
		return e.returnMsg = e.returnMsg || ("SUCCESS" === e.returnCode ? "ok" : "fail"), e.errMsg =
			`payment.${t} ${e.returnMsg.toLowerCase()}`, e
	}
	_parse(e, t, n) {
		const r = utils.parseXML(e);
		if ("FAIL" === r.return_code) throw new Error(`${r.return_msg}`);
		if ("getSandboxKey" !== t) {
			if (r.appid !== this.options.appId) throw new Error("appId不匹配");
			if (r.mch_id !== this.options.mchId) throw new Error("mchId不匹配");
			if (r.sign !== this._getSign(r, n)) throw new Error("返回结果签名错误");
			r.app_id = r.appid, delete r.appid
		}
		if ("FAIL" === r.result_code) throw new Error(`${r.err_code} ${r.err_code_des}`);
		return this._normalizeResult(snake2camelJson(r), t)
	}
	_parseBill(e, t) {
		const n = {};
		if (utils.isXML(e)) {
			const t = utils.parseXML(e);
			if ("FAIL" === t.return_code) throw new Error(`${t.return_msg}`);
			if ("FAIL" === t.result_code) throw new Error(`${t.err_code} ${t.err_code_des}`)
		} else n.returnCode = "SUCCESS", n.content = e;
		return this._normalizeResult(n, t)
	}
	_getPublicParams() {
		return {
			appid: this.options.appId,
			mchId: this.options.mchId,
			nonceStr: utils.getNonceStr()
		}
	}
	async _requestWxpay(e, t, n = !1) {
		"getSandboxKey" !== t && await this._initSandbox();
		const r = e.signType || this.options.signType;
		(e = camel2snakeJson(e)).sign = this._getSign(e, r);
		const o = {
			method: "POST",
			dataType: "text",
			data: utils.buildXML(e),
			timeout: this.options.timeout
		};
		n && (o.pfx = this.options.pfx, o.passphrase = this.options.mchId);
		const {
			status: s,
			data: a
		} = await uniCloud.httpclient.request(this.options.sandbox ? `${this.baseUrl}/sandboxnew${this.paths[t]}` :
			`${this.baseUrl}${this.paths[t]}`, o);
		if (200 !== s) throw new Error("request fail");
		return -1 !== ["downloadBill", "downloadFundflow"].indexOf(t) ? this._parseBill(a, t) : this._parse(a, t, r)
	}
	async getSandboxKey() {
		const e = {
			mchId: this.options.mchId,
			nonceStr: utils.getNonceStr()
		};
		return await this._requestWxpay(e, "getSandboxKey")
	}
	async _initSandbox() {
		this.options.sandbox && !this.options.sandboxKey && (this.options.key = this.options.sandboxKey = await this.getSandboxKey()
			.sandbox_signkey)
	}
	async unifiedOrder(e) {
		let t;
		switch (this.options.clientType) {
			case "app-plus":
				delete e.openid, t = "APP";
				break;
			case "mp-weixin":
			default:
				t = "JSAPI"
		}
		const n = { ...e,
			...this._getPublicParams(),
			spbillCreateIp: e.spbillCreateIp || "127.0.0.1",
			tradeType: e.tradeType || t
		};
		return await this._requestWxpay(n, "unifiedOrder")
	}
	_getPayParamsByPrepayId(e, t) {
		let n;
		switch (this.options.clientType) {
			case "app-plus":
				n = {
					appid: this.options.appId,
					noncestr: utils.getNonceStr(),
					package: "Sign=WXPay",
					partnerid: this.options.mchId,
					prepayid: e,
					timestamp: "" + (Date.now() / 1e3 | 0)
				}, n.sign = this._getSign(n, t);
				break;
			case "mp-weixin":
				n = {
					appId: this.options.appId,
					nonceStr: utils.getNonceStr(),
					package: "prepay_id=" + e,
					timeStamp: "" + (Date.now() / 1e3 | 0)
				}, n.signType = t, n.paySign = this._getSign(n, t);
				break;
			default:
				throw new Error("不支持的客户端类型，微信支付下单仅支持App、微信小程序")
		}
		return n
	}
	async getOrderInfo(e) {
		const t = await this.unifiedOrder(e);
		if (!t.prepayId) throw new Error(t.errMsg || "获取prepayId失败");
		return this._getPayParamsByPrepayId(t.prepayId, e.signType || this.options.signType)
	}
	async orderQuery(e) {
		const t = { ...e,
			...this._getPublicParams()
		};
		return await this._requestWxpay(t, "orderQuery")
	}
	async closeOrder(e) {
		const t = { ...e,
			...this._getPublicParams()
		};
		return await this._requestWxpay(t, "closeOrder")
	}
	async refund(e) {
		const t = { ...e,
			...this._getPublicParams()
		};
		return await this._requestWxpay(t, "refund", !0)
	}
	async refundQuery(e) {
		const t = { ...e,
			...this._getPublicParams()
		};
		return await this._requestWxpay(t, "refundQuery")
	}
	async downloadBill(e) {
		const t = { ...e,
			...this._getPublicParams(),
			billType: e.billType || "ALL"
		};
		return await this._requestWxpay(t, "downloadBill")
	}
	async downloadFundflow(e) {
		const t = { ...e,
			...this._getPublicParams(),
			signType: e.signType || "HMAC-SHA256",
			accountType: e.accountType || "Basic"
		};
		return await this._requestWxpay(t, "downloadFundflow", !0)
	}
	_verifyNotify(e, t) {
		let n = e.body;
		e.isBase64Encoded && (n = Buffer.from(n, "base64").toString("utf-8"));
		const r = utils.parseXML(n);
		if ("FAIL" === r.return_code) throw new Error(`${r.return_code} ${r.return_msg}`);
		if (r.appid !== this.options.appId) throw new Error("appId不匹配");
		if (r.mch_id !== this.options.mchId) throw new Error("mchId不匹配");
		if (t && r.sign !== this._getSign(r, this.options.signType)) throw new Error("通知验签未通过");
		const o = snake2camelJson(r);
		return o.appId = o.appid, delete o.appid, o
	}
	verifyPaymentNotify(e) {
		return this._verifyNotify(e, !0)
	}
	verifyRefundNotify(e) {
		const t = this._verifyNotify(e, !1),
			n = snake2camelJson(utils.parseXML(utils.decryptData(t.reqInfo, utils.md5(this.options.key))));
		return Object.assign(t, n), delete t.reqInfo, t
	}
}
const ALIPAY_ALGORITHM_MAPPING = {
	RSA: "RSA-SHA1",
	RSA2: "RSA-SHA256"
};
class AlipayBase {
	constructor(e = {}) {
		if (!e.appId) throw new Error("appId required");
		if (!e.privateKey) throw new Error("privateKey required");
		const t = {
			gateway: "https://openapi.alipay.com/gateway.do",
			timeout: 5e3,
			charset: "utf-8",
			version: "1.0",
			signType: "RSA2",
			timeOffset: -(new Date).getTimezoneOffset() / 60,
			keyType: "PKCS8"
		};
		e.sandbox && (e.gateway = "https://openapi.alipaydev.com/gateway.do"), this.options = Object.assign({}, t, e);
		const n = "PKCS8" === this.options.keyType ? "PRIVATE KEY" : "RSA PRIVATE KEY";
		this.options.privateKey = this._formatKey(this.options.privateKey, n), this.options.alipayPublicKey && (this.options
			.alipayPublicKey = this._formatKey(this.options.alipayPublicKey, "PUBLIC KEY"))
	}
	_formatKey(e, t) {
		return `-----BEGIN ${t}-----\n${e}\n-----END ${t}-----`
	}
	_formatUrl(e, t) {
		let n = e;
		const r = ["app_id", "method", "format", "charset", "sign_type", "sign", "timestamp", "version", "notify_url",
			"return_url", "auth_token", "app_auth_token"
		];
		for (const e in t)
			if (r.indexOf(e) > -1) {
				const r = encodeURIComponent(t[e]);
				n = `${n}${n.includes("?")?"&":"?"}${e}=${r}`, delete t[e]
			} return {
			execParams: t,
			url: n
		}
	}
	_getSign(e, t) {
		const n = t.bizContent || null;
		delete t.bizContent;
		const r = Object.assign({
			method: e,
			appId: this.options.appId,
			charset: this.options.charset,
			version: this.options.version,
			signType: this.options.signType,
			timestamp: getFullTimeStr(getOffsetDate(this.options.timeOffset))
		}, t);
		n && (r.bizContent = JSON.stringify(camel2snakeJson(n)));
		const o = camel2snakeJson(r),
			s = Object.keys(o).sort().map(e => {
				let t = o[e];
				return "[object String]" !== Array.prototype.toString.call(t) && (t = JSON.stringify(t)), `${e}=${t}`
			}).join("&"),
			a = crypto.createSign(ALIPAY_ALGORITHM_MAPPING[this.options.signType]).update(s, "utf8").sign(this.options.privateKey,
				"base64");
		return Object.assign(o, {
			sign: a
		})
	}
	async _exec(e, t = {}, n = {}) {
		const r = this._getSign(e, t),
			{
				url: o,
				execParams: s
			} = this._formatUrl(this.options.gateway, r),
			{
				status: a,
				data: i
			} = await uniCloud.httpclient.request(o, {
				method: "POST",
				data: s,
				dataType: "text",
				timeout: this.options.timeout
			});
		if (200 !== a) throw new Error("request fail");
		const u = JSON.parse(i),
			c = `${e.replace(/\./g,"_")}_response`,
			p = u[c],
			d = u.error_response;
		if (p) {
			if (!n.validateSign || this._checkResponseSign(i, c)) {
				if (!p.code || "10000" === p.code) {
					return {
						errCode: 0,
						errMsg: p.msg || "",
						...snake2camelJson(p)
					}
				}
				const e = p.sub_code ? `${p.sub_code} ${p.sub_msg}` : `${p.msg||"unkonwn error"}`;
				throw new Error(e)
			}
			throw new Error("返回结果签名错误")
		}
		if (d) throw new Error(d.sub_msg || d.msg || "接口返回错误");
		throw new Error("request fail")
	}
	_checkResponseSign(e, t) {
		if (!this.options.alipayPublicKey || "" === this.options.alipayPublicKey) return console.warn(
			"options.alipayPublicKey is empty"), !0;
		if (!e) return !1;
		const n = this._getSignStr(e, t),
			r = JSON.parse(e).sign,
			o = crypto.createVerify(ALIPAY_ALGORITHM_MAPPING[this.options.signType]);
		return o.update(n, "utf8"), o.verify(this.options.alipayPublicKey, r, "base64")
	}
	_getSignStr(e, t) {
		let n = e.trim();
		const r = e.indexOf(`${t}"`),
			o = e.lastIndexOf('"sign"');
		return n = n.substr(r + t.length + 1), n = n.substr(0, o), n = n.replace(/^[^{]*{/g, "{"), n = n.replace(
			/\}([^}]*)$/g, "}"), n
	}
	_notifyRSACheck(e, t, n) {
		const r = Object.keys(e).sort().filter(e => e).map(t => {
			let n = e[t];
			return "[object String]" !== Array.prototype.toString.call(n) && (n = JSON.stringify(n)),
				`${t}=${decodeURIComponent(n)}`
		}).join("&");
		return crypto.createVerify(ALIPAY_ALGORITHM_MAPPING[n]).update(r, "utf8").verify(this.options.alipayPublicKey, t,
			"base64")
	}
	_checkNotifySign(e) {
		const t = e.sign;
		if (!this.options.alipayPublicKey || !t) return !1;
		const n = e.sign_type || this.options.signType || "RSA2",
			r = { ...e
			};
		return delete r.sign, r.sign_type = n, !!this._notifyRSACheck(r, t, n) || (delete r.sign_type, this._notifyRSACheck(
			r, t, n))
	}
	_verifyNotify(e) {
		if (!e.headers) throw new Error("通知格式不正确");
		let t;
		for (const n in e.headers) "content-type" === n.toLowerCase() && (t = e.headers[n]);
		if (!1 !== e.isBase64Encoded && -1 === t.indexOf("application/x-www-form-urlencoded")) throw new Error("通知格式不正确");
		const n = querystring.parse(e.body);
		if (this._checkNotifySign(n)) return snake2camelJson(n);
		throw new Error("通知验签未通过")
	}
}

function parseFeeValue$1(e, t, n) {
	t.forEach(t => {
		e[t] = Number(e[t]) * n
	})
}
var protocols$1 = {
	unifiedOrder: {
		args: {
			_pre: e => (parseFeeValue$1(e, ["totalFee"], .01), e),
			totalAmount: "totalFee",
			buyerId: "openid"
		},
		returnValue: {
			transactionId: "tradeNo"
		}
	},
	getOrderInfo: {
		args: {
			_pre: e => (parseFeeValue$1(e, ["totalFee"], .01), e),
			buyerId: "openid",
			totalAmount: "totalFee"
		}
	},
	orderQuery: {
		args: {
			tradeNo: "transactionId"
		},
		returnValue: {
			_pre: e => (parseFeeValue$1(e, ["totalAmount", "settleAmount", "buyerPayAmount", "payAmount", "pointAmount",
				"invoiceAmount", "receiptAmount", "chargeAmount", "mdiscountAmount", "discountAmount"
			], 100), e),
			transactionId: "tradeNo",
			openid: "buyerUserId",
			tradeState: function(e) {
				switch (e.tradeStatus) {
					case "WAIT_BUYER_PAY":
						return "USERPAYING";
					case "TRADE_CLOSED":
						return "CLOSED";
					case "TRADE_SUCCESS":
						return "SUCCESS";
					case "TRADE_FINISHED":
						return "FINISHED";
					default:
						return e.tradeStatus
				}
			},
			totalFee: "totalAmount",
			settlementTotalFee: "settleAmount",
			feeType: "transCurrency",
			cashFeeType: "payCurrency",
			cashFee: "buyerPayAmount",
			fundBillList: function(e) {
				return e.fundBillList ? e.fundBillList.map(e => (e.amount = 100 * Number(e.amount), e.realAmount = 100 * Number(e
					.realAmount), e)) : []
			},
			tradeSettleDetailList: function(e) {
				return e.tradeSettleDetailList ? e.tradeSettleDetailList.map(e => (e.amount = 100 * Number(e.amount), e)) : []
			},
			_purify: {
				shouldDelete: ["tradeStatus"]
			}
		}
	},
	cancelOrder: {
		args: {
			tradeNo: "transactionId"
		},
		returnValue: {
			transactionId: "tradeNo"
		}
	},
	closeOrder: {
		args: {
			tradeNo: "transactionId"
		},
		returnValue: {
			transactionId: "tradeNo"
		}
	},
	refund: {
		args: {
			_pre: e => (parseFeeValue$1(e, ["refundFee", "sendBackFee"], .01), e),
			tradeNo: "transactionId",
			refundAmount: "refundFee",
			outRequestNo: "outRefundNo",
			refundCurrency: "refundFeeType",
			refundReason: "refundDesc",
			goodsDetail: function(e) {
				return e.goodsDetail ? e.goodsDetail.map(e => (e.price = Number(e.price) / 100, e)) : []
			},
			refundRoyaltyParameters: function(e) {
				return e.refundRoyaltyParameters ? e.refundRoyaltyParameters.map(e => (e.amount = Number(e.amount) / 100, e)) : []
			}
		},
		returnValue: {
			_pre: e => (parseFeeValue$1(e, ["refundFee", "presentRefundBuyerAmount", "presentRefundDiscountAmount",
				"presentRefundMdiscountAmount"
			], 100), e),
			transactionId: "tradeNo",
			openid: "buyerUserId",
			cashRefundFee: "presentRefundBuyerAmount",
			refundId: "refundSettlementId",
			cashFeeType: "refundCurrency",
			refundDetailItemList: function(e) {
				return e.refundDetailItemList ? e.refundDetailItemList.map(e => (e.amount = 100 * Number(e.amount), e.realAmount =
					100 * Number(e.realAmount), e)) : []
			},
			refundPresetPaytoolList: function(e) {
				return e.refundPresetPaytoolList ? e.refundPresetPaytoolList.map(e => (e.amount = 100 * Number(e.amount), e)) : []
			}
		}
	},
	refundQuery: {
		args: {
			tradeNo: "transactionId",
			outRequestNo: "outRefundNo"
		},
		returnValue: {
			_pre: e => (parseFeeValue$1(e, ["totalAmount", "refundAmount", "sendBackFee", "presentRefundBuyerAmount",
				"presentRefundBuyerAmount", "presentRefundMdiscountAmount"
			], 100), e),
			transactionId: "tradeNo",
			outRefundNo: "outRequestNo",
			totalFee: "totalAmount",
			refundFee: "refundAmount",
			refundDesc: "refundReason",
			refundId: "refundSettlementId",
			refundRoyaltys: function(e) {
				return e.refundRoyaltys ? e.refundRoyaltys.map(e => (e.refundAmount = 100 * Number(e.refundAmount), e)) : []
			},
			refundDetailItemList: function(e) {
				return e.refundDetailItemList ? e.refundDetailItemList.map(e => (e.amount = 100 * Number(e.amount), e.realAmount =
					100 * Number(e.realAmount), e)) : []
			}
		}
	},
	verifyPaymentNotify: {
		returnValue: {
			_pre: e => (parseFeeValue$1(e, ["invoiceAmount", "receiptAmount", "buyerPayAmount", "totalAmount", "pointAmount"],
				100), e),
			openid: "buyerId",
			transactionId: "tradeNo",
			totalFee: "totalAmount",
			cashFee: "buyerPayAmount",
			resultCode: function(e) {
				return e.tradeStatus.replace("TRADE_", "")
			},
			fundBillList: function(e) {
				return e.fundBillList ? JSON.parse(e.fundBillList).map(e => (e.amount = 100 * Number(e.amount), e)) : []
			}
		}
	}
};
class Payment$1 extends AlipayBase {
	constructor(e) {
		if (!e.alipayPublicKey) throw new Error("调用支付时需传入支付宝公钥（alipayPublicKey）");
		super(e), this._protocols = protocols$1
	}
	async _request(e, t) {
		const n = {};
		return t.notifyUrl && (n.notifyUrl = t.notifyUrl, delete t.notifyUrl), n.bizContent = t, await this._exec(e, n, {
			validateSign: !0
		})
	}
	async unifiedOrder(e) {
		return await this._request("alipay.trade.create", Object.assign({
			sellerId: this.options.mchId
		}, e))
	}
	async getOrderInfo(e) {
		switch (this.options.clientType) {
			case "app-plus":
				{
					delete e.openid;
					const t = {};e.notifyUrl && (t.notifyUrl = e.notifyUrl, delete e.notifyUrl),
					t.bizContent = e;
					const n = this._getSign("alipay.trade.app.pay", t),
						{
							url: r,
							execParams: o
						} = this._formatUrl("", n);
					return (r + "&biz_content=" + encodeURIComponent(o.biz_content)).substr(1)
				}
			case "mp-alipay":
				{
					const t = await this.unifiedOrder(e);
					if (!t.tradeNo) throw new Error("获取支付宝交易号失败");
					return t.tradeNo
				}
			default:
				throw new Error("不支持的客户端类型，支付宝支付下单仅支持App、支付宝小程序")
		}
	}
	async orderQuery(e) {
		return await this._request("alipay.trade.query", e)
	}
	async cancelOrder(e) {
		return await this._request("alipay.trade.cancel", e)
	}
	async closeOrder(e) {
		return await this._request("alipay.trade.close", e)
	}
	async refund(e) {
		return await this._request("alipay.trade.refund", e)
	}
	async refundQuery(e) {
		return await this._request("alipay.trade.fastpay.refund.query", e)
	}
	verifyPaymentNotify(e) {
		return super._verifyNotify(e)
	}
}
var index = {
	initWeixin: function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, createApi(Payment, e)
	},
	initAlipay: function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, createApi(Payment$1, e)
	}
};
module.exports = index;
