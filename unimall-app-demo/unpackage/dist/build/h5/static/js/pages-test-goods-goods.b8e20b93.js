(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-test-goods-goods"],{"2c03":function(t,n,e){var o=e("24fb");n=o(!1),n.push([t.i,".content[data-v-6d2299ee]{padding:15px}.goods-item[data-v-6d2299ee]{padding:10px 0;line-height:30px;font-size:16px}",""]),t.exports=n},"522b":function(t,n,e){"use strict";var o,r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"list"},t._l(t.goodsList,(function(n,o){return e("v-uni-view",{key:o,staticClass:"goods-item"},[e("v-uni-view",[t._v("商品名："+t._s(n.name))]),e("v-uni-view",[t._v("价格："+t._s(n.price/100)+"元")])],1)})),1),e("v-uni-button",{attrs:{type:"primary"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.order()}}},[t._v("下单")])],1)},i=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}))},"5d99":function(t,n,e){"use strict";var o=e("aad4"),r=e.n(o);r.a},"73a5":function(t,n,e){"use strict";(function(t){var o=e("ee27");e("99af"),e("d81d"),e("a434"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=o(e("d0ff")),i={data:function(){return{userId:"123456",openid:"",goodsList:[]}},onLoad:function(){var n=this;this.openid=uni.getStorageSync("openid"),uni.showLoading({title:"正在获取商品列表",mask:!0}),t.callFunction({name:"listGoods"}).then((function(t){if(uni.hideLoading(),!(t.result.goodsList&&t.result.goodsList.length>0))throw new Error("获取商品列表失败");var e;(e=n.goodsList).splice.apply(e,[0,0].concat((0,r.default)(t.result.goodsList)))})).catch((function(t){uni.hideLoading(),uni.showModal({content:t.message||"获取商品列表失败",showCancel:!1})}))},methods:{order:function(){t.callFunction({name:"order",data:{openid:this.openid,userId:this.userId,goodsInOrder:this.goodsList.map((function(t){return{id:t._id,amount:1}}))}}).then((function(t){if(!t.result.outTradeNo)throw new Error("res.result.msg");uni.navigateTo({url:"/pages/test/order/order?outTradeNo="+t.result.outTradeNo})})).catch((function(t){uni.showModal({content:t.message||"下单失败",showCancel:!1})}))}}};n.default=i}).call(this,e("a9ff")["default"])},"9ed4":function(t,n,e){"use strict";e.r(n);var o=e("73a5"),r=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=r.a},aad4:function(t,n,e){var o=e("2c03");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var r=e("4f06").default;r("b146f194",o,!0,{sourceMap:!1,shadowMode:!1})},ca46:function(t,n,e){"use strict";e.r(n);var o=e("522b"),r=e("9ed4");for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);e("5d99");var a,u=e("f0c5"),s=Object(u["a"])(r["default"],o["b"],o["c"],!1,null,"6d2299ee",null,!1,o["a"],a);n["default"]=s.exports},d0ff:function(t,n,e){"use strict";function o(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,o=new Array(n);e<n;e++)o[e]=t[e];return o}function r(t){if(Array.isArray(t))return o(t)}e.r(n);e("a4d3"),e("e01a"),e("d28b"),e("a630"),e("e260"),e("d3b7"),e("3ca3"),e("ddb0");function i(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}e("fb6a"),e("25f0");function a(t,n){if(t){if("string"===typeof t)return o(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?o(t,n):void 0}}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return r(t)||i(t)||a(t)||u()}e.d(n,"default",(function(){return s}))}}]);