(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pay/pay"],{"53a0":function(e,t,n){},"5f76":function(e,t,n){"use strict";var r,o=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}))},7314:function(e,t,n){"use strict";n.r(t);var r=n("5f76"),o=n("ad7b");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("e151");var i,u=n("f0c5"),c=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=c.exports},ad7b:function(e,t,n){"use strict";n.r(t);var r=n("ef95"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},e151:function(e,t,n){"use strict";var r=n("53a0"),o=n.n(r);o.a},ef95:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("4795"));function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t,n,r,o,a,i){try{var u=e[a](i),c=u.value}catch(f){return void n(f)}u.done?t(c):Promise.resolve(c).then(r,o)}function f(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function i(e){c(a,r,o,i,u,"next",e)}function u(e){c(a,r,o,i,u,"throw",e)}i(void 0)}))}}var s={data:function(){return{payType:1,price:0,orderNo:"",submiting:!1}},computed:{},onLoad:function(e){this.price=e.price,this.orderNo=e.orderno},methods:{changePayType:function(e){this.payType=e},confirm:function(){var t=f(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=this,1===n.payType?(n.submiting=!0,n.$api.request("order","wxPrepay",{orderNo:n.orderNo},(function(e){n.submiting=!1,n.$api.msg(e.errmsg)})).then((function(t){n.submiting=!1;var r={appId:t.data.appId,nonceStr:t.data.nonceStr,package:t.data.packageValue,timeStamp:t.data.timeStamp,signType:t.data.signType,paySign:t.data.paySign};e.requestPayment(i({provider:"wxpay"},r,{success:function(t){e.redirectTo({url:"/pages/pay/success"})},fail:function(e){console.log("支付过程失败"),n.$api.msg(JSON.stringify(e))},complete:function(e){console.log("支付过程结束")}}))}))):3===n.payType&&(n.submiting=!0,n.$api.request("order","offlinePrepay",{orderNo:n.orderNo},(function(e){n.submiting=!1,n.$api.msg(e.errmsg)})).then((function(t){e.redirectTo({url:"/pages/pay/success"})})));case 2:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}()}};t.default=s}).call(this,n("543d")["default"])},f7f3:function(e,t,n){"use strict";(function(e){n("435e"),n("921b");r(n("66fd"));var t=r(n("7314"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["f7f3","common/runtime","common/vendor"]]]);