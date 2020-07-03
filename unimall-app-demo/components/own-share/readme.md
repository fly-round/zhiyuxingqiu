### 使用方法
 本组件依赖于 uni-popup 组件 跟 uni-transtion 组件 

 
``` js
	
	<own-share ref="share" :shareSummary="shareSummary" :shareImage="image"
	:shareTitle="title" :shareHref="href"
	:miniProgram="miniProgram" :webUrl="webUrl"
	@shareSuccess="shareSuccess" @shareFail="shareFail"></own-share>

	//先引入组件
	import ownShare from '@/components/own-share/own-share.vue'
	//然后使用
	components:{
		ownShare
	}
	
	//打开分享
	this.$nextTick(()=>{
		this.$refs.share.open()
	})
	//关闭分享
	this.$nextTick(()=>{
		this.$refs.share.close()
	})
	//当然也可以用 easycom 直接使用
```
参数		<sub>分享只用于app</sub>

|  参数   | 类型  | 是否必填 |
|  ----  | ----  | ---- |
| shareSummary | String | 只分享内容时必填 |
| shareImage  | String | 只分享图片时必填 |
| shareTitle | String | 否 |
| shareHref | String | 分享图文时必填 |
| miniProgram | Object | 分享小程序必填 |

miniProgram参数  [详情](https://uniapp.dcloud.io/api/plugins/share?id=share)

|  参数   | 类型  | 是否必填 |
|  ----  | ----  | ---- |
| id | String | 微信小程序原始id |
| path  | String | 点击链接进入的页面 |
| type | Number | 微信小程序版本类型 |
| webUrl | String | 兼容低版本的网页链接 |

|  事件   | 说明  | 
|  ----  | ----  |
| shareSuccess | 成功回调 |
| shareFail | 失败回调 | 

----
**图标链接写在组件里面请自行修改(请看示例项目)**


[了解更多uniapp分享,请参考官网](https://uniapp.dcloud.io/api/plugins/share)


