<template>
	<view class="content">
		<view class="bkg">
			<view class="item">
				<image src="../../static/index图标/新品专区备份@3x.png"></image>
				<image src="../../static/QQ.png"></image>
				<text>{{ goodTitle }}</text>
			</view>
			<view class="item">
				<image src="../../static/index图标/新品专区备份@3x.png"></image>
				<image src="../../static/QQ.png"></image>
				<text>{{ goodTitle }}</text>
			</view>
			<view class="item">
				<image src="../../static/index图标/新品专区备份@3x.png"></image>
				<image src="../../static/QQ.png"></image>
				<text>{{ goodTitle }}</text>
			</view>
		</view>
		<view class="newGood">
			<image src="../../static/index图标/编组@3x.png"></image>
			<view class="goods">
				<view class="goods_item">
					<text>6月30日</text>
					<text>华为新品</text>
					<text>5G双模</text>
				</view>
				<image src="../../static/index图标/截屏@3x.png" style="width:60px;height:60px"></image>
			</view>
			<view class="goods">
				<view class="goods_item">
					<text>6月30日</text>
					<text>华为新品</text>
					<text>5G双模</text>
				</view>
				<image src="../../static/index图标/截屏@3x.png" style="width:60px;height:60px"></image>
			</view>
		</view>
		<view class="f-header m-t">
			<view class="tit-box">
				<text class="tit">新品抢购</text>
			</view>
			<view class="cel">
				<image src="../../static/index图标/截屏@3x.png" style="width:120px;height:80px"></image>
				<view class="cel_introd">
					<text>华为/HUAWEI P40 Pro | 5G徕卡四摄50倍变焦5g手机</text>
					<view class="price">
						<text>$12321</text>
						<button>立即抢购</button>
					</view>
				</view>
			</view>
			<view class="cel">
				<image src="../../static/index图标/截屏@3x.png" style="width:120px;height:60px"></image>
				<view class="cel_introd">
					<text>华为/HUAWEI P40 Pro | 5G徕卡四摄50倍变焦5g手机</text>
					<view class="price">
						<text>$12321</text>
						<button>立即抢购</button>
					</view>
				</view>
			</view>
			<image src='../../static/index图标/编组 6@3x.png'style="width: 100%;height: 70px;"></image>
			<view class="f-header m-t">
				<view class="tit-box">
					<text class="tit" style="margin-left: 145px;">精选新品</text>
				</view>
			</view>
			
			<view class="guess-section">
				<view 
					v-for="(item, index) in salesTop" :key="index"
					class="guess-item"
					@click="navToDetailPage(item.id)"
				>
					<view class="image-wrapper">
						<image :src="item.img + '?x-oss-process=style/400px'" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.title}}</text>
					<text class="price">￥{{isVip ? (item.vipPrice / 100 + ' [VIP]') : item.price / 100}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goodTitle: '黑色皮革手册',
			titleNViewBackground: '',
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [],
			windowSpuList: [],
			categoryPickList: [],
			categoryButtomList: [],
			salesTop: [],
			banner: undefined,
			isVip: false
		};
	},
	onShow() {
		this.isVip = this.$api.isVip()
	},
	onLoad(options) {
		//#ifdef H5
		//H5进入，有可能是回调进来的
		if (options.code && options.state) {
			const that = this
			that.logining = true
			that.$api.request('user', 'thirdPartLogin', {
				loginType: 3,
				raw: options.code
			}, failres => {
				that.logining = false
				that.$api.msg(failres.errmsg)
			}).then(res => {
				//登录成功，重定向到指定目标
				that.logining = false
				that.$store.commit('login', res.data)
				uni.setStorageSync('userInfo', res.data)
				//重定向到
				//不能重定向到tabbar页面
				if (options.state === '/pages/cart/cart' || options.state === '/pages/user/user' 
				|| options.state === '/pages/index/index' || options.state === '/pages/category/category') {
					uni.switchTab({
						url: options.state
					})
				} else {
					uni.redirectTo({
						url: options.state
					})
				}
				
			})
		}
		//#endif
		this.loadData()
	},
	methods: {
			async loadData() {
				const that = this
				uni.showLoading({
					title: '正在加载'
				})
				that.$api.request('integral', 'getIndexData', failres => {
					that.$api.msg(failres.errmsg)
					uni.hideLoading()
				}).then(res => {
					let data = res.data
					//橱窗
					that.windowSpuList = data.windowRecommend
					//轮播
					data.advertisement.t1.forEach(item => {
						if (!item.color) {
							item.color = 'rgb(205, 215, 218)'
						}
					})
					that.carouselList = data.advertisement.t1
					that.swiperLength = data.advertisement.t1.length
					that.titleNViewBackground = data.advertisement.t1[0].color
					//分类精选
					if (data.advertisement.t2) {
						that.categoryPickList = data.advertisement.t2
					}
					//横幅
					if (data.advertisement.t3 && data.advertisement.t3.length > 0) {
						that.banner = data.advertisement.t3[0]
					}
					//热销
					if (data.salesTop) {
						that.salesTop = data.salesTop
					}
					//分类5Buttom
					if (data.advertisement.t4) {
						// that.categoryButtomList = data.advertisement.t4
						that.categoryButtomList = [{
							title:'京东',
							imgUrl:'../../static/icon-京东@3x.png'
						},
						{
							title:'淘宝',
							imgUrl:'../../static/淘宝-icon.png'
						},{
							title:'拼多多',
							imgUrl:'../../static/icon-拼多多@3x.png'
						},{
							title:'分享有礼',
							imgUrl:'../../static/icon-分享有礼@3x.png'
						},{
							title:'升级VIP',
							imgUrl:'../../static/icon-升级VIP@3x.png'
						}
						]
							// '京东','拼多多','淘宝','分享有礼','升级VIP']
					}
					uni.hideLoading()
				})
			},
			navTo(page){
				uni.navigateTo({
					url:page,
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].color;
			},
			//详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: `/pages/product/detail?id=${id}`
				})
			},
			navToWindowSuggestSpu(index) {
				const that = this
				uni.navigateTo({
					url: '/pages/product/detail?id=' + that.windowSpuList[index].spuId
				})
			},
			naviageToPage(page) {
				uni.navigateTo({
					url: page
				})
			}
		},
	}
</script>

<style lang="scss">
.bkg {
	background-image: url(../../static/img/1.jpg);
	width: 375pt;
	height: 280px;
	display: flex;
	.item {
		width: 100px;
		height: 120px;
		background: #ffffff;
		margin-left: 15px;
		margin-top: 140px;
		// display: flex;
		image {
			width: 20px;
			height: 20px;
			// float: right;
			margin: 5px 5px 0 75px;
		}
		image:nth-child(2) {
			width: 50px;
			// margin: 8px;
			margin-left: 25px;
			height: 50px;
		}
		text {
			margin-left: 10px;
			padding-top: 5px;
		}
	}
}
.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
.newGood {
	height: 110px;
	display: flex;
	background: #FFFFFF;
	image {
		width: 80px;
		height: 80px;
		margin: 10px 0 10px 10px;
	}
	.goods {
		display: flex;
		margin-top: 5px;
		.goods_item {
			display: grid;
			// width: auto;
			height: 20px;
			margin-left: 5px;
			margin-top: 10px;
			text:nth-child(1) {
				color: white;
				padding-left: 5px;
				padding-right: 5px;
				font-size: 13px;
				padding-bottom: 3px;
				background: linear-gradient( #51E3E2, #222222);
				background: -ms-linear-gradient(#51E3E2, #222222);
				background: -webkit-linear-gradient(#51E3E2, #222222);
				background: -moz-linear-gradient(#51E3E2, #222222);
			}
			text:nth-child(2){
				width: 48pt;
				height: 17pt;
				font-size: 12pt;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: left;
				color: #222222;
				line-height: 17pt;
			}
			text:nth-child(3){
				width: 37pt;
				height: 16pt;
				font-size: 11pt;
				font-family: PingFangSC, PingFangSC-Light;
				font-weight: 300;
				text-align: left;
				color: #999999;
				line-height: 16pt;
			}
			image{
				width: 60px;
				height: 60px;
			}
		}
	}
}
.f-header{
		// display:flex;
		align-items:center;
		background: #fff;
		image{
			background: #FFFFFF;
			margin-top: 8px;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
			padding-top: 15px;
			margin-left: 10px;
		}
		.cel{
			background: #FFFFFF;
			margin-top: 10px;
			padding-left:10px;
			display: flex;
			image{
				width: 180px;
			    height: 100px;
			}
			.cel_introd{
				text:nth-child(1){
					width: 130pt;
					height: 40pt;
					font-size: 11pt;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					text-align: justify;
					color: #222222;
					line-height: 20pt;
				}
				.price{
					// margin-top: 20px;
					display: flex;
					height: 35px;
					text{
						width: 130pt;
						height: 40pt;
						font-size: 11pt;
						font-family: PingFangSC, PingFangSC-Medium;
						font-weight: 500;
						text-align: justify;
						color: #222222;
						line-height: 20pt;
						margin-top: 5px;
					}
					button{
						background: #51E3E2;
						color: #FFFFFF;
						height: 30px;
						line-height: 30px;
						margin-right: 10px;
						// margin-top: 20px;
					}
				}
			}
		}
		
	}
</style>
