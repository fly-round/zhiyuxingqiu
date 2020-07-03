"use strict";

function _interopDefault(e) {
	return e && "object" == typeof e && "default" in e ? e.default : e
}
var crypto = _interopDefault(require("crypto")),
	querystring = _interopDefault(require("querystring"));
class UniCloudError extends Error {
	constructor(e) {
		super(e.message), this.errMsg = e.message || "", Object.defineProperties(this, {
			message: {
				get() {
					return `errCode: ${e.code||""} | errMsg: ` + this.errMsg
				},
				set(e) {
					this.errMsg = e
				}
			}
		})
	}
}
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
	let s, n;
	switch (t) {
		case "snake2camel":
			n = snake2camel, s = isSnakeCase;
			break;
		case "camel2snake":
			n = camel2snake, s = isCamelCase
	}
	for (const r in e)
		if (hasOwn(e, r) && s.test(r)) {
			const s = n(r);
			e[s] = e[r], delete e[r], isPlainObject(e[s]) ? e[s] = parseObjectKeys(e[s], t) : Array.isArray(e[s]) && (e[s] = e[s]
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
	const s = [];
	return s.push(e.getFullYear()), s.push(("00" + (e.getMonth() + 1)).substr(-2)), s.push(("00" + e.getDate()).substr(-2)),
		s.join(t)
}

function getTimeStr(e, t = ":") {
	e = e || new Date;
	const s = [];
	return s.push(("00" + e.getHours()).substr(-2)), s.push(("00" + e.getMinutes()).substr(-2)), s.push(("00" + e.getSeconds())
		.substr(-2)), s.join(t)
}

function getFullTimeStr(e) {
	return getDateStr(e = e || new Date) + " " + getTimeStr(e)
}

function parseParams(e = {}, t) {
	if (!t || !e) return e;
	const s = ["_pre", "_purify", "_post"];
	t._pre && (e = t._pre(e));
	let n = {
		shouldDelete: new Set([])
	};
	if (t._purify) {
		const e = t._purify;
		for (const t in e) e[t] = new Set(e[t]);
		n = Object.assign(n, e)
	}
	if (isPlainObject(t))
		for (const r in t) {
			const o = t[r];
			isFn(o) && -1 === s.indexOf(r) ? e[r] = o(e) : "string" == typeof o && -1 === s.indexOf(r) && (e[r] = e[o], n.shouldDelete
				.add(o))
		} else isFn(t) && (e = t(e));
	if (n.shouldDelete)
		for (const t of n.shouldDelete) delete e[t];
	return t._post && (e = t._post(e)), e
}

function createApi(e, t) {
	const s = new e(t);
	return new Proxy(s, {
		get: function(e, t) {
			if ("function" == typeof e[t] && 0 !== t.indexOf("_") && e._protocols && e._protocols[t]) {
				const s = e._protocols[t];
				return async function(n) {
					n = parseParams(n, s.args);
					let r = await e[t](n);
					return r = parseParams(r, s.returnValue), r
				}
			}
			return e[t]
		}
	})
}

function generateApiResult(e, t) {
	if (t.errcode) throw new UniCloudError({
		code: t.errcode || -2,
		message: t.errmsg || `${e} fail`
	});
	return delete t.errcode, delete t.errmsg, { ...t,
		errMsg: `${e} ok`,
		errCode: 0
	}
}

function nomalizeError(e, t) {
	throw new UniCloudError({
		code: t.code || -2,
		message: t.message || `${e} fail`
	})
}
async function callWxOpenApi({
	name: e,
	url: t,
	data: s,
	options: n,
	defaultOptions: r
}) {
	let o = {};
	const i = camel2snakeJson(Object.assign({}, s));
	i && i.access_token && delete i.access_token;
	try {
		n = Object.assign({}, r, n, {
			data: i
		}), o = await uniCloud.httpclient.request(t, n)
	} catch (t) {
		return nomalizeError(e, t)
	}
	let a = o.data;
	const c = o.headers["content-type"];
	if (!Buffer.isBuffer(a) || 0 !== c.indexOf("text/plain") && 0 !== c.indexOf("application/json")) Buffer.isBuffer(a) &&
		(a = {
			buffer: a,
			contentType: c
		});
	else try {
		a = JSON.parse(a.toString())
	} catch (e) {
		a = a.toString()
	}
	return snake2camelJson(generateApiResult(e, a || {
		errCode: -2,
		errMsg: "Request failed"
	}))
}

function buildUrl(e, t) {
	let s = "";
	if (t && t.accessToken) {
		s = `${e.indexOf("?")>-1?"&":"?"}access_token=${t.accessToken}`
	}
	return `${e}${s}`
}
class Auth {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://api.weixin.qq.com",
			timeout: 5e3
		}, e)
	}
	async _requestWxOpenapi({
		name: e,
		url: t,
		data: s,
		options: n
	}) {
		const r = {
			method: "GET",
			dataType: "json",
			dataAsQueryString: !0,
			timeout: this.options.timeout
		};
		return await callWxOpenApi({
			name: `auth.${e}`,
			url: `${this.options.baseUrl}${buildUrl(t,s)}`,
			data: s,
			options: n,
			defaultOptions: r
		})
	}
	async code2Session(e) {
		return await this._requestWxOpenapi({
			name: "code2Session",
			url: "/sns/jscode2session",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				js_code: e
			}
		})
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
		const s = "PKCS8" === this.options.keyType ? "PRIVATE KEY" : "RSA PRIVATE KEY";
		this.options.privateKey = this._formatKey(this.options.privateKey, s), this.options.alipayPublicKey && (this.options
			.alipayPublicKey = this._formatKey(this.options.alipayPublicKey, "PUBLIC KEY"))
	}
	_formatKey(e, t) {
		return `-----BEGIN ${t}-----\n${e}\n-----END ${t}-----`
	}
	_formatUrl(e, t) {
		let s = e;
		const n = ["app_id", "method", "format", "charset", "sign_type", "sign", "timestamp", "version", "notify_url",
			"return_url", "auth_token", "app_auth_token"
		];
		for (const e in t)
			if (n.indexOf(e) > -1) {
				const n = encodeURIComponent(t[e]);
				s = `${s}${s.includes("?")?"&":"?"}${e}=${n}`, delete t[e]
			} return {
			execParams: t,
			url: s
		}
	}
	_getSign(e, t) {
		const s = t.bizContent || null;
		delete t.bizContent;
		const n = Object.assign({
			method: e,
			appId: this.options.appId,
			charset: this.options.charset,
			version: this.options.version,
			signType: this.options.signType,
			timestamp: getFullTimeStr(getOffsetDate(this.options.timeOffset))
		}, t);
		s && (n.bizContent = JSON.stringify(camel2snakeJson(s)));
		const r = camel2snakeJson(n),
			o = Object.keys(r).sort().map(e => {
				let t = r[e];
				return "[object String]" !== Array.prototype.toString.call(t) && (t = JSON.stringify(t)), `${e}=${t}`
			}).join("&"),
			i = crypto.createSign(ALIPAY_ALGORITHM_MAPPING[this.options.signType]).update(o, "utf8").sign(this.options.privateKey,
				"base64");
		return Object.assign(r, {
			sign: i
		})
	}
	async _exec(e, t = {}, s = {}) {
		const n = this._getSign(e, t),
			{
				url: r,
				execParams: o
			} = this._formatUrl(this.options.gateway, n),
			{
				status: i,
				data: a
			} = await uniCloud.httpclient.request(r, {
				method: "POST",
				data: o,
				dataType: "text",
				timeout: this.options.timeout
			});
		if (200 !== i) throw new Error("request fail");
		const c = JSON.parse(a),
			p = `${e.replace(/\./g,"_")}_response`,
			u = c[p],
			l = c.error_response;
		if (u) {
			if (!s.validateSign || this._checkResponseSign(a, p)) {
				if (!u.code || "10000" === u.code) {
					return {
						errCode: 0,
						errMsg: u.msg || "",
						...snake2camelJson(u)
					}
				}
				const e = u.sub_code ? `${u.sub_code} ${u.sub_msg}` : `${u.msg||"unkonwn error"}`;
				throw new Error(e)
			}
			throw new Error("返回结果签名错误")
		}
		if (l) throw new Error(l.sub_msg || l.msg || "接口返回错误");
		throw new Error("request fail")
	}
	_checkResponseSign(e, t) {
		if (!this.options.alipayPublicKey || "" === this.options.alipayPublicKey) return console.warn(
			"options.alipayPublicKey is empty"), !0;
		if (!e) return !1;
		const s = this._getSignStr(e, t),
			n = JSON.parse(e).sign,
			r = crypto.createVerify(ALIPAY_ALGORITHM_MAPPING[this.options.signType]);
		return r.update(s, "utf8"), r.verify(this.options.alipayPublicKey, n, "base64")
	}
	_getSignStr(e, t) {
		let s = e.trim();
		const n = e.indexOf(`${t}"`),
			r = e.lastIndexOf('"sign"');
		return s = s.substr(n + t.length + 1), s = s.substr(0, r), s = s.replace(/^[^{]*{/g, "{"), s = s.replace(
			/\}([^}]*)$/g, "}"), s
	}
	_notifyRSACheck(e, t, s) {
		const n = Object.keys(e).sort().filter(e => e).map(t => {
			let s = e[t];
			return "[object String]" !== Array.prototype.toString.call(s) && (s = JSON.stringify(s)),
				`${t}=${decodeURIComponent(s)}`
		}).join("&");
		return crypto.createVerify(ALIPAY_ALGORITHM_MAPPING[s]).update(n, "utf8").verify(this.options.alipayPublicKey, t,
			"base64")
	}
	_checkNotifySign(e) {
		const t = e.sign;
		if (!this.options.alipayPublicKey || !t) return !1;
		const s = e.sign_type || this.options.signType || "RSA2",
			n = { ...e
			};
		return delete n.sign, n.sign_type = s, !!this._notifyRSACheck(n, t, s) || (delete n.sign_type, this._notifyRSACheck(
			n, t, s))
	}
	_verifyNotify(e) {
		if (!e.headers) throw new Error("通知格式不正确");
		let t;
		for (const s in e.headers) "content-type" === s.toLowerCase() && (t = e.headers[s]);
		if (!1 !== e.isBase64Encoded && -1 === t.indexOf("application/x-www-form-urlencoded")) throw new Error("通知格式不正确");
		const s = querystring.parse(e.body);
		if (this._checkNotifySign(s)) return snake2camelJson(s);
		throw new Error("通知验签未通过")
	}
}
var protocols = {
	code2Session: {
		returnValue: {
			openid: "userId"
		}
	}
};
class Auth$1 extends AlipayBase {
	constructor(e) {
		super(e), this._protocols = protocols
	}
	async code2Session(e) {
		return await this._exec("alipay.system.oauth.token", {
			grantType: "authorization_code",
			code: e
		})
	}
}
var index = {
	initWeixin: function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, createApi(Auth, e)
	},
	initAlipay: function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, createApi(Auth$1, e)
	}
};
module.exports = index;
