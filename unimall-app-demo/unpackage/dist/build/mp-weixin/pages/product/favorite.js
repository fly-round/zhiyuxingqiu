(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/favorite"],{"0fb0":function(t,e,o){"use strict";o.r(e);var n=o("a74d"),a=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,(function(){return n[t]}))}(i);e["default"]=a.a},"1eb9":function(t,e,o){"use strict";(function(t){o("435e"),o("921b");n(o("66fd"));var e=n(o("4f5a"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"1f69":function(t,e,o){"use strict";var n,a=function(){var t=this,e=t.$createElement;t._self._c},i=[];o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return n}))},"4f5a":function(t,e,o){"use strict";o.r(e);var n=o("1f69"),a=o("0fb0");for(var i in a)"default"!==i&&function(t){o.d(e,t,(function(){return a[t]}))}(i);o("a559");var r,u=o("f0c5"),c=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=c.exports},"88bd":function(t,e,o){},a559:function(t,e,o){"use strict";var n=o("88bd"),a=o.n(n);a.a},a74d:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){o.e("components/uni-load-more/uni-load-more").then(function(){return resolve(o("d064"))}.bind(null,o)).catch(o.oe)},a=function(){o.e("components/empty").then(function(){return resolve(o("7079"))}.bind(null,o)).catch(o.oe)},i={components:{uniLoadMore:n,empty:a},data:function(){return{favoriteList:[],pageNo:1,loadingType:"more",isVip:!1}},onShow:function(){this.isVip=this.$api.isVip()},onLoad:function(t){this.loadData()},onPullDownRefresh:function(){this.loadData("refresh")},onReachBottom:function(){this.loadData()},methods:{loadData:function(e){var o=this;"refresh"===e&&(o.pageNo=1,o.favoriteList=[],o.loadingType="more"),"more"===o.loadingType&&(o.loadingType="loading",o.$api.request("collect","getCollectAll",{pageNo:o.pageNo}).then((function(n){o.pageNo=n.data.pageNo+1,o.loadingType=n.data.pageNo<n.data.totalPageNo?"more":"nomore",n.data.items.forEach((function(n){o.favoriteList.push(n),console.log(o.favoriteList),"refresh"===e&&t.stopPullDownRefresh()}))})))},deleteFavorite:function(t){var e=this;e.$api.request("collect","deleteCollect",{spuId:t.spuId}).then((function(t){e.loadData("refresh")}))},onImageLoad:function(t,e){this.$set(this[t][e],"loaded","loaded")},onImageError:function(t,e){this[t][e].image="/static/errorImage.jpg"}}};e.default=i}).call(this,o("543d")["default"])}},[["1eb9","common/runtime","common/vendor"]]]);