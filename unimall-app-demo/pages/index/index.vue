<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input @click="naviageToPage('/pages/product/search')" class="ser-input" type="text" value="输入关键字搜索" disabled />
		</view>
		<!-- #endif -->
		
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper autoplay="true" interval="3000" duration="500" class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="naviageToPage(item.url)">
					<image :src="item.imgUrl" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view v-for="(item, index) in categoryButtomList" :key="index" @click="naviageToPage(item.url)" class="cate-item">
				<image :src="item.imgUrl" @click="navTo(item.url)"></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		
		<view v-if="banner" @click="naviageToPage(banner.url)" class="ad-1">
			<image :src="banner.imgUrl" mode="scaleToFill"></image>
		</view>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="navItemClick(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 橱窗推荐 -->
		<view class="quick">
			<view class="quick_link">
				<text style="margin-left: 8px;" @click="navTo('/pages/index/newGood')">新品首发</text>
				<text style="color: #51E3E2;margin-top: 5px;margin-left: 8px;">新品首发</text>
				<view class="img">
					<image src="../../static/index图标/bag.png"></image>
					<image src="../../static/index图标/thm.png"></image>
				</view>
			</view>
			<view class="vline"></view>
			<view class="quick_link" @click="navTo('/pages/public/notdevelop')" >
				<text style="margin-left: 5px;">红人直播</text>
				<text style="margin-top: 5px;margin-left: 5px;">好物限时抢</text>
				<view class="img">
					<image src="../../static/index图标/newgood.png"></image>
					<image src="../../static/index图标/thm.png"></image>
				</view>
			</view>
			<goods-list @goodsItemClick="goGoodsDetail" :goods="goods"></goods-list>
		</view>
		<view class="hot_goods">
			<view class="tit">
				<text>特色课程</text>
				<text>更多</text>
				<text style="margin-left: 18px;">优惠多多</text>
			</view>
		</view>
		<view class="group-section-1">
			<view @click="navTo('/pages/member/goldVideo')">
				<image src="../../static/index图标/bj_jpg@3x.png"></image>
				<text>心动黄金</text>
			</view>
			<view @click="navTo('/pages/member/9800member/9800member')">
				<image src="../../static/index图标/hj_jpg@3x.png"></image>
				<text>心动铂金</text>
			</view>
			<view @click="navTo('/pages/member/member')">
				<image src="../../static/index图标/zs_jpg@3x.png"></image>
				<text>钻石VIP</text>
			</view>
		</view>
		<view class="fenge"></view>
		<!-- 广告区域 -->
		<view class="group-section">
			<swiper class="g-swiper" :duration="500">
				<swiper-item>
					<image src="../../static/img/banner.jpg"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 销量top -->
		<view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">热销宝贝</text>
				<text class="tit2">Hot Sale</text>
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
		
		<!-- <text @click="navTo('/pages/public/videoTest')">视频测试</text> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
							imgUrl:'../../static/icon-分享有礼@3x.png',
							url:'/pages/index/shareGit'
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
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			uni.navigateTo({
				url: '/pages/product/search'
			})
		},
		// 点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				uni.navigateTo({
					url: '/pages/index/message'
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	/* #ifdef MP */
	.mp-search-box{
		position:absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;
		.ser-input{
			flex:1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color:$font-color-base;
			border-radius: 20px;
			background: rgba(255,255,255,.6);
		}
	}
	page{
		.cate-section{
			position:relative;
			z-index:5;
			border-radius:16upx 16upx 0 0;
			margin-top:-20upx;
		}
		.carousel-section{
			padding: 0;
			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}
			.carousel{
				.carousel-item{
					padding: 0;
				}
			}
			.swiper-dots{
				left:45upx;
				bottom:40upx;
			}
		}
	}
	/* #endif */
	
	
	page {
		background: #f5f5f5;
	}
	.m-t{
		margin-top: 16upx;
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;
		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}
		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 350upx;
		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}
		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;
		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}
		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx; 
		background: #fff;
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}
	.ad-1{
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;
		image{
			width:100%;
			height: 100%; 
		}
	}
	.quick{
		padding: 0 1px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.vline {
		    border-left: solid 1rpx #f3f3f3;
		    // height: 5px;
		    vertical-align: middle;
		    display: inline-block;
		    margin-top: 25px;
			margin-bottom: 25px;
		}
		.quick_link{
			background: #FFFFFF;
			width: 370rpx;
			margin: 3rpx 0;
			padding: 20rpx;
			box-sizing: border-box;
			image{
				width: 80%;
				height: 100px;
				display: block;
				margin: auto;
			}
			.img{
				display: flex;
				image{
					width: 61px;
					height: 61px;
				}
			}
			text{
				font-size: 16px;
				display: flex;
			}
			text:nth-child(2){
				font-size: 11px;
				color: #E56262;
			}
			.price{
				color: red;
				font-size: 36rpx;
				text:nth-child(2){
					color: #C0C0C0;
					font-size: 28rpx;
					margin-left: 17rpx;
					text-decoration: line-through;
				}
			}
			.name{
				font-size: 28rpx;
				line-height: 50rpx;
				padding-bottom: 15rpx;
				padding-top: 10rpx;
			}
		}
	}
	
	
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
			padding-top: 15px;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	.group-section-1{
		background: #fff;
		display: inline-flex;
		image{
			margin-left: 15px;
			margin-top: 10px;
			width: 90px;
			height: 90px;
		}
		text{
			margin-left: 30px;
		}
	}
	.hot_goods {
		background: #eee;
		// overflow: hidden;
		// margin-top: 10px;
		.tit{
			height: 65px;
			text-align: center;
			padding-top: 15px;
			background: #fff;
			font-size: 16px;
			text:nth-child(2){
				margin-left: 210px;
				margin-right: 20px;
			}
			text:nth-child(3){
				display: block;
				color: #E56262;
				float: left;
				font-size: 13px;
				margin-top: 8px;
				margin-left: 13px;
				height: 20px;
			}
		}
		.category{
			display: flex;
			background: #FFFFFF;
			text-align: center;
			image{
				width: 80px;
				height: 80px;
				margin: 0 5px 0 5px;
			}
		}
	}
	/* 团购楼层 */
	.group-section{
		background: #fff;
		.g-swiper{
			height: 250upx;
			padding: 30upx;
			image{
				height: 80px;
			}
		}
		.g-swiper-item{
			width: 100%;
			padding: 0 30upx;
			display:flex;
		}
		image{
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}
		.g-item{
			display:flex;
			flex-direction: column;
			overflow:hidden;
		}
		.left{
			flex: 1.2;
			margin-right: 24upx;
			.t-box{
				padding-top: 20upx;
			}
		}
		.right{
			flex: 0.8;
			flex-direction: column-reverse;
			.t-box{
				padding-bottom: 20upx;
			}
		}
		.t-box{
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}
		.price{
			color:$uni-color-primary;
		}
		.m-price{
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}
		.pro-box{
			display:flex;
			align-items:center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}
		.progress-box{
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}
	/* 分类推荐楼层 */
	.hot-floor{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;
		.floor-img-box{
			width: 100%;
			height:320upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255,255,255,.06) 30%, #f8f8f8);
			}
		}
		.floor-img{
			width: 100%;
			height: 100%;
		}
		.floor-list{
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top:-140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0,0,0,.2);
			position: relative;
			z-index: 1;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
		.more{
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;
			text:first-child{
				margin-bottom: 4upx;
			}
		}
	}
	/* 猜你喜欢 */
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
	.guess-section-1{
		display:flex;
		padding: 5px 30upx;
		background: #fff;
		.guess-item-1{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			margin-right: 3%;
			text {
				margin-top: 5px;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 210upx;
			border-radius: 3px;
			// overflow: hidden;
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
	}
	.fenge{
		background: #eee;
		margin: 1px;
		height: 1rpx;
	}
	
</style>