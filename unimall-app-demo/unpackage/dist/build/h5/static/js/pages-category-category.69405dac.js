(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-category-category"],{"0727":function(t,e,i){"use strict";i.r(e);var a=i("6a92"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},2027:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-33e9edfc],\n.content[data-v-33e9edfc]{height:100%;background-color:#f8f8f8}.content[data-v-33e9edfc]{display:-webkit-box;display:-webkit-flex;display:flex}.left-aside[data-v-33e9edfc]{-webkit-flex-shrink:0;flex-shrink:0;width:%?200?%;height:100%;background-color:#fff}.f-item[data-v-33e9edfc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:100%;height:%?100?%;font-size:%?28?%;color:#606266;position:relative}.f-item.active[data-v-33e9edfc]{color:#57e4e4;background:#f8f8f8}.f-item.active[data-v-33e9edfc]:before{content:"";position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);height:%?36?%;width:%?8?%;background-color:#57e4e4;border-radius:0 4px 4px 0;opacity:.8}.right-aside[data-v-33e9edfc]{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden;padding-left:%?20?%}.s-item[data-v-33e9edfc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?70?%;padding-top:%?8?%;font-size:%?28?%;color:#303133}.t-list[data-v-33e9edfc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;width:100%;background:#fff;padding-top:%?12?%}.t-list[data-v-33e9edfc]:after{content:"";-webkit-box-flex:99;-webkit-flex:99;flex:99;height:0}.t-item[data-v-33e9edfc]{-webkit-flex-shrink:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:%?176?%;font-size:%?26?%;color:#666;padding-bottom:%?20?%}.t-item uni-image[data-v-33e9edfc]{width:%?140?%;height:%?140?%}body.?%PAGE?%[data-v-33e9edfc]{background-color:#f8f8f8}',""]),t.exports=e},2911:function(t,e,i){"use strict";var a=i("e5ad"),n=i.n(a);n.a},"581c":function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-scroll-view",{staticClass:"left-aside",attrs:{"scroll-y":!0}},t._l(t.flist,(function(e){return i("v-uni-view",{key:e.id,staticClass:"f-item b-b",class:{active:e.id===t.currentId},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tabtap(e)}}},[t._v(t._s(e.title))])})),1),i("v-uni-scroll-view",{staticClass:"right-aside",attrs:{"scroll-with-animation":!0,"scroll-y":!0,"scroll-top":t.tabScrollTop}},t._l(t.slist,(function(e){return i("v-uni-view",{key:e.id,staticClass:"s-list",attrs:{id:"main-"+e.id}},[i("v-uni-text",{staticClass:"s-item"},[t._v(t._s(e.title))]),i("v-uni-view",{staticClass:"t-list"},t._l(e.childrenList,(function(a){return a.parentId===e.id?i("v-uni-view",{key:a.id,staticClass:"t-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navToList(a.id)}}},[i("v-uni-image",{attrs:{src:a.picUrl+"?x-oss-process=style/200px"}}),i("v-uni-text",[t._v(t._s(a.title))])],1):t._e()})),1)],1)})),1)],1)},s=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}))},"6a92":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{sizeCalcState:!1,tabScrollTop:0,currentId:1,flist:[],slist:[],tlist:[],rawData:[]}},onLoad:function(){this.loadData()},methods:{loadData:function(){var t=this;this.$api.request("category","categoryList").then((function(e){t.rawData=e.data,t.flist=e.data,t.currentId=e.data[0].id,t.slist=e.data[0].childrenList}))},tabtap:function(t){this.currentId=t.id,this.currentId=t.id,this.slist=t.childrenList,this.tabScrollTop=0===this.tabScrollTop?1:0},navToList:function(t){uni.navigateTo({url:"/pages/product/list?tid=".concat(t)})}}};e.default=a},dbb4e:function(t,e,i){"use strict";i.r(e);var a=i("581c"),n=i("0727");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("2911");var c,o=i("f0c5"),l=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"33e9edfc",null,!1,a["a"],c);e["default"]=l.exports},e5ad:function(t,e,i){var a=i("2027");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("daedba24",a,!0,{sourceMap:!1,shadowMode:!1})}}]);