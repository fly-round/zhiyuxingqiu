<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<view v-if="tabIndex == 0">
						<view class="goods-list" v-for="(item, index) in goodRecommend" :key="index" @click="navToDetailPage(item.id)">
							<view class="user-info-box">
								<view class="portrait-box"><image class="portrait" :src="item.headimg"></image></view>
								<view class="info-box">
									<text @click="toLogin" class="username">{{ item.name }}</text>
									<text style="margin-left: 80px; font-size: 10px;">3分钟前</text>
								</view>
							</view>
							<view class="good-link">
								<text>{{ item.introd }}</text>
								<view class="courses_list">
									<view class="course_item">
										<view style="display: flex;">
											<image :src="item.img1" mode="widthFix"></image>
											<image :src="item.img2" mode="widthFix"></image>
										</view>
										<view class="goods_item" @click="navToDetailPage(item.id)">
											<image src="../../static/community/lADPGpNybNeA5RDNAz7NBNo_1242_830.jpg_720x720g备份@3x.png"></image>
											<view>
												{{ item.ad }}
												<view>{{ item.price }}</view>
											</view>
										</view>
									</view>
								</view>
								<view class="measion">
									<view class="order-item" @click="saveHttpImg(item.img1, item.img2)" hover-class="common-hover" :hover-stay-time="50">
										<image src="../../static/community/下载@3x.png"></image>
										<text>保存图片</text>
									</view>
									<view class="vline"></view>
									<view class="order-item" @click="copy(item.introd)" hover-class="common-hover" :hover-stay-time="50">
										<image src="../../static/community/复制@3x.png"></image>
										<text>复制文案</text>
									</view>
									<view class="vline"></view>
									<view class="order-item" @click="copy(item.url)" hover-class="common-hover" :hover-stay-time="50">
										<image src="../../static/community/icon_复制口令-30@3x.png"></image>
										<text>复制链接</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="tabIndex == 1">
						<view class="goods-list" v-for="(item, index) in source" :key="index">
							<view class="user-info-box">
								<view class="portrait-box"><image class="portrait" src="/static/missing-face.png"></image></view>
								<view class="info-box">
									<text @click="toLogin" class="username">二哈</text>
									<button>
										<image src="../../static/community/分 享@3x.png" style="width: 10px;height: 10px; margin-right: 5px;"></image>
										6980
									</button>
									<!-- <text style="margin-left: 80px; font-size: 10px; color: #00BFFF; background: #f8f8f8;width: 20px;height: 9px;"
									>321人</text> -->
								</view>
							</view>
							<view class="good-link">
								<text>{{item.introd}}</text>
								<view class="courses_list">
									<view class="course_item">
										<view style="display: flex;"><image src="../../static/community/joinus.png" mode="widthFix"></image></view>
										<view class="appraise-body">
											<view>{{item.comment}}</view>
											<view style="margin-top: 10px;">
												<image src="../../static/good/复制@3x.png" style="width: 20px;margin-left: 220px;" mode="widthFix"></image>
												<text class="item-btn" @click="copy(item.comment)">复制评论</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="tabIndex == 2">
						<view class="navbar-sec">
							<button @click="naviageToPage('/pages/community/introduce')">知域星球</button>
							<button>视频直播</button>
							<button>名师指路</button>
							<button>独家分享</button>
						</view>
						<view class="content-sec">
							<image src="../../static/community/pexels-photo-3584930@3x.png"></image>
							<view class="title"><text>新媒体与短视频培训</text></view>
							<view class="intro"><text>线上短视频创业者培训｜线下短视频运营培训</text></view>
						</view>
						<view class="content-sec">
							<image src="../../static/community/pexels-photo-3847892@3x.png"></image>
							<view class="title"><text>红人经纪</text></view>
							<view class="intro"><text>网红孵化｜主播带货｜红人营销</text></view>
						</view>
						<view class="content-sec">
							<image src="../../static/community/pexels-photo-955405@3x.png"></image>
							<view class="title"><text>新媒体代运营</text></view>
							<view class="intro"><text>抖音｜快手｜公众号｜微博｜小红书</text></view>
						</view>
					</view>

					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import neilModal from '@/components/neil-modal/neil-modal.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import empty from "@/components/empty";
export default {

	components: {
		uniLoadMore,
		empty,
		neilModal
	},
	data() {
		return {
			goodRecommend:[{
				name:'零食达人笑笑',
				headimg:'/static/missing-face.png',
				introd:'@所有人大漏洞\n'+
					'抢大希地小龙虾虾尾 原价79，拍3份\n'+
					' 每份净含量330g，虾酱分装 \n'+
					'疯了，外卖一份都要89元',
				id:'',
				price:'32',
				ad:'限时鱼干一包包邮到家，重量100g',
				img1:'../../static/community/lADPGpNybNeA5RDNAz7NBNo_1242_830.jpg_720x720g备份@3x.png',
				img2:'../../static/community/lADPGpNybNeA5RDNAz7NBNo_1242_830.jpg_720x720g备份@3x.png'
			},{
				name:'爱吃鱼的二哈',
					headimg:'/static/missing-face.png',
					introd:'@所有人大漏洞\n'+
						'抢大希地小龙虾虾尾 原价79，拍3份\n'+
						' 每份净含量330g，虾酱分装 \n'+
						'疯了，外卖一份都要89元',
					id:'',
					price:'32',
					ad:'限时鱼干一包包邮到家，重量100g',
					img1:'../../static/community/lADPGpNybNeA5RDNAz7NBNo_1242_830.jpg_720x720g备份@3x.png',
					img2:'../../static/community/lADPGpNybNeA5RDNAz7NBNo_1242_830.jpg_720x720g备份@3x.png'
			}],
			source:[{
					name:'知域',
					headimg:'/static/missing-face.png',
					introd:'没有慧根就要会跟 \n跟着名师指路丰富经验 \n 学习各类知域创业技巧 \n向精英学习各类技巧 \n超多大咖在商学院倾囊讲述 带你开启百万知域事业之旅',
					id:'',
					price:'32',
					comment:'在知域成功创业的大咖们分享自己的心路历程，他们是如何成功的，不容错过。',
					img1:'../../static/community/joinus.png',
					// img2:'../../static/community/lADPGpNybNeA5RDNAz7NBNo_1242_830.jpg_720x720g备份@3x.png'
				},
			],
			statusMap: {
				10: '未付款',
				12: '正在拼团',
				20: '待出库',
				30: '待收货',
				40: '待评价',
				50: '已完成',
				60: '退款中',
				70: '已退款',
				80: '已取消',
				90: '已取消(系统)'
			},
			submiting: false,
			refundShow: false,
			inputRefundReason: '',
			refundOrderItem: '',
			tabCurrentIndex: 0,
			navList: [{
					state: 0,
					text: '好物推荐',
					loadingType: 'more',
					pageNo: 1,
					orderList: ["1"]
				},
				{
					state: 10,
					text: '优质素材',
					loadingType: 'more',
					pageNo: 1,
					orderList: ["2"]
				},
				{
					state: 30,
					text: '私域传媒',
					loadingType: 'more',
					pageNo: 1,
					orderList: []
				}
			],
		};
	},
	onLoad(options) {
		/**
		 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
		 * 替换onLoad下代码即可
		 */
		this.tabCurrentIndex = 0
		for (let i = 0; i < this.navList.length; i++) {
			if (this.navList[i].state === parseInt(options.state)) {
				this.tabCurrentIndex = i
			}
		}
		// #ifndef MP
		this.loadData()
		// #endif
		// #ifdef MP
		if (options.state == 0) {
			this.loadData()
		}
		// #endif

	},

	methods: {
		//下载网络图片
		    saveHttpImg(url1,url2){
		//     let _t = this;
		//        uni.downloadFile({
		//             url:url, //仅为示例，并非真实的资源
		//                         success: (res) => {
		//                                 if (res.statusCode === 200) {
		//                                         let file = res.tempFilePath;
		//                                         _t.save(file)
		//                                 }
		//                         }
		//                 });
		//             },
		// //保存图片到本地
		//             save(url){
		//               let _this = this;
		//                 _this.$util._loading("保存中...");
		//                 uni.saveImageToPhotosAlbum({
		//                     filePath: url,
		//                     success: () => {
		//                         uni.hideLoading();
		//                         _this.$util._toast("图片已保存");
		//                     },
		//                     fail: () => {
		//                         uni.hideLoading();
		//                         _this.$util._toast("保存失败");
		//                     },
		//                     complete: () => {

		//                     }
		//                 });
		          },
		copy(message){
			uni.setClipboardData({
				data:message,
			})
			uni.showToast({
			    title: '复制成功',
			    duration: 2000,
				background:'#51E3E2',
				color:'#51E3E2'
			});
		},
		//获取订单列表
		loadData(source) {
			const that = this
			//这里是将订单挂载到tab列表下
			let index = that.tabCurrentIndex;
			let navItem = that.navList[index];
			let state = navItem.state;

			if (source === 'tabChange' && navItem.loaded === true) {
				//tab切换只有第一次需要加载数据
				return;
			}
			if (navItem.loadingType === 'loading') {
				//防止重复加载
				return;
			}

			navItem.loadingType = 'loading';

			// let orderList = that.$api.request('order', 'getOrderPage', {
			// 	pageNo: navItem.pageNo,
			// 	status: navItem.state
			// }).then(res => {
			// 	navItem.pageNo = res.data.pageNo + 1
			// 	navItem.loadingType = res.data.pageNo < res.data.totalPageNo ? 'more' : 'noMore'
			// 	res.data.items.forEach(item => {
			// 		navItem.orderList.push(item);
			// 		item.skuCount = 0
			// 		item.skuList.forEach(skuItem => {
			// 			item.skuCount += skuItem.num
			// 		})
			// 	})
			// 	//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
			// 	that.$set(navItem, 'loaded', true);
			// })
		},

		naviageToPage(page) {
			uni.navigateTo({
				url: page
			})
		},
		//swiper 切换
		changeTab(e) {
			this.tabCurrentIndex = e.target.current;
			this.loadData('tabChange');
		},
		//顶部tab点击
		tabClick(index) {
			this.tabCurrentIndex = index;
		},
		payOrder(item) {
			uni.navigateTo({
				url: '/pages/pay/pay?orderno='+ item.orderNo + '&price=' + item.actualPrice
			})
		},
		//取消订单
		cancelOrder(item) {
			const that = this
			uni.showModal({
				title: '取消？',
				content: '您确定要取消此订单吗？',
				success : (e) => {
					if (e.confirm) {
						that.submiting = true
						that.$api.request('order', 'cancel', {
							orderNo: item.orderNo
						}, failres => {
							that.submiting = false
							that.$api.msg(failres.errmsg)
						}).then(res => {
							that.submiting = false
							item.status = 80
						})
					}
				}
			})

		},
		//订单退款
		refundConfirm() {
			const that = this
			if (that.submiting) {
				return
			}
			that.submiting = true
			that.$api.request('order', 'refund', {
				orderNo: that.refundOrderItem.orderNo,
				reason: that.inputRefundReason
			}, failres => {
				that.submiting = false
				that.$api.msg(failres.errmsg)
			}).then(res => {
				that.submiting = false
				that.refundOrderItem.status = 60
				that.$api.msg('申请退款成功！')
			})
		},
		refundOrder(item) {
			const that = this
			that.refundOrderItem = item
			that.refundShow = true
			that.inputRefundReason = ''
		},
		//确认订单
		confirmOrder(item) {
			const that = this
			uni.showModal({
				title: '收货？',
				content: '您确定要确认收货吗？',
				success : (e) => {
					if (e.confirm) {
						that.submiting = true
						that.$api.request('order', 'confirm', {
							orderNo: item.orderNo
						}, failres => {
							that.submiting = false
							that.$api.msg(failres.errmsg)
						}).then(res => {
							that.submiting = false
							item.status = 40
						})
					}
				}
			})
		},
		showShipTrace(item) {
			uni.navigateTo({
				url: "/pages/order/trace?orderno=" + item.orderNo
			})
		},
		//评价订单
		appraiseOrder(item) {
			uni.navigateTo({
				url: '/pages/order/appraise?orderid=' + item.id
			})
		}
	}
}
</script>

<style lang="scss">
page,
.content {
	background: $page-color-base;
	height: 100%;
}

.navbar-sec {
	display: flex;
	background: #ffffff;
	button {
		background: #51e3e2;
		font-size: 14px;
		margin-top: 12px;
		margin-bottom: 8px;
		color: #ffffff;
		border-radius: 10px;
		line-height: 32px;
		height: 32px;
		font-family: PingFangSC;
	}
}
.swiper-box {
	height: calc(100% - 40px);
}
.content-sec {
	background: #edfcfc;
	margin: 10px 15px 20px 15px;
	border-radius: 10px;
	image {
		height: 100px;
		width: 100%;
	}
	.title {
		font-size: 15px;
		margin-left: 12px;
		margin-top: 10px;
		padding-bottom: 3px;
	}
	.intro {
		font-size: 13px;
		margin-left: 12px;
		margin-top: 6px;
		padding-bottom: 6px;
	}
}
.goods-list {
	// display: flex;
	// flex-wrap: wrap;
	padding: 0 30upx;
	background: #fff;
	.courses_list {
		margin-top: 5px;
		image {
			width: 60%;
			height: 100px;
		}
		.course_title {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			font-size: 18px;
			justify-content: space-between;
			text:nth-child(2) {
				color: #262626;
				font-size: 13px;
				margin: 0px 12px 0 0;
				text-align: right;
				width: 300rpx;
			}
		}
		.course_introd {
			margin-top: 8px;
			width: 100%;
			color: #9d9d9d;
			display: flex;
			flex-wrap: wrap;
			font-size: 10px;
		}
	}
	.good-link {
		font-size: 16px;
		text {
			font-size: 11pt;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: justify;
			color: #222222;
			line-height: 20pt;
			margin-bottom: 2px;
		}
		image {
			margin-right: 6px;
			// height: 50px;
		}
		.measion {
			margin: 16rpx 6rpx 16rpx 6rpx;
			padding: 15rpx;
			display: flex;
			justify-content: space-between;
			font-size: 13px;
			text {
				margin-right: 8rpx;
			}
			.vline {
				border-left: solid 2px #ccc;
				height: 15px;
				vertical-align: middle;
				display: inline-block;
				// margin-top: 15px;
			}
		}
		.appraise-body {
			border-radius: 10px;
			background: #fafafa;
			margin: 6rpx;
			padding: 20rpx;
			font-size: 15px;
			.image {
				height: 10px;
				width: 10px;
				margin-top: 10px;
			}
			.item-btn {
				margin-top: 15px;
				// margin-left: 200px;
				color: #57e4e4;
				font-size: 15px;
				vertical-align: text-bottom;
			}
		}
		.goods_item {
			border-radius: 10px;
			background: #fafafa;
			margin: 6rpx;
			padding: 15rpx;
			display: flex;
			justify-content: space-between;
			font-size: 15px;
			.price {
				color: red;
				font-size: 36rpx;
				text:nth-child(2) {
					color: #c0c0c0;
					font-size: 28rpx;
					margin-left: 17rpx;
					text-decoration: line-through;
				}
			}
			.item-btn {
				color: #2aeeff;
				margin-top: 50px;
				margin-right: 5px;
			}
			.name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding-bottom: 15rpx;
				padding-top: 10rpx;
			}
		}
	}
	.image-wrapper {
		width: 100%;
		height: 330upx;
		border-radius: 3px;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
	}
}

.list-scroll-content {
	height: 100%;
	background: #ffffff;
}

.navbar {
	display: flex;
	height: 40px;
	padding: 0 5px;
	background: #fff;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 10;

	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 15px;
		color: $font-color-dark;
		position: relative;

		&.current {
			color: $base-color;

			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 44px;
				height: 0;
				border-bottom: 2px solid $base-color;
			}
		}
	}
}

.uni-swiper-item {
	height: auto;
}

.order-item {
	display: block;
	flex-direction: column;
	// padding-left: 20upx;
	background: #fff;
	// margin-top: 16upx;
	image {
		width: 18px;
		height: 18px;
	}
	.i-top {
		display: flex;
		align-items: center;
		height: 80upx;
		padding-right: 30upx;
		font-size: $font-base;
		color: $font-color-dark;
		position: relative;

		.time {
			flex: 1;
		}

		.state {
			color: $base-color;
		}

		.del-btn {
			padding: 10upx 0 10upx 36upx;
			font-size: $font-lg;
			color: $font-color-light;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 30upx;
				border-left: 1px solid $border-color-dark;
				position: absolute;
				left: 20upx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}

	/* 多条商品 */
	.goods-box {
		height: 160upx;
		padding: 20upx 0;
		white-space: nowrap;

		.goods-item {
			width: 120upx;
			height: 120upx;
			display: inline-block;
			margin-right: 24upx;
		}

		.goods-img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	/* 单条商品 */
	.goods-box-single {
		display: flex;
		padding: 20upx 0;

		.goods-img {
			display: block;
			width: 120upx;
			height: 120upx;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 30upx 0 24upx;
			overflow: hidden;

			.title {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				line-height: 1;
			}

			.attr-box {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				padding: 10upx 12upx;
			}

			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	}

	.price-box {
		display: flex;
		justify-content: flex-end;
		align-items: baseline;
		padding: 20upx 30upx;
		font-size: $font-sm + 2upx;
		color: $font-color-light;

		.num {
			margin: 0 8upx;
			color: $font-color-dark;
		}

		.price {
			font-size: $font-lg;
			color: $font-color-dark;

			&:before {
				content: '￥';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
			}
		}
	}

	.action-box {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100upx;
		position: relative;
		padding-right: 30upx;
	}

	.action-btn {
		width: 160upx;
		height: 60upx;
		margin: 0;
		margin-left: 24upx;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;

		&:after {
			border-radius: 100px;
		}

		&.recom {
			background: #fff9f9;
			color: $base-color;

			&:after {
				border-color: #f7bcc8;
			}
		}
	}
}

/* load-more */
.uni-load-more {
	display: flex;
	flex-direction: row;
	height: 80upx;
	align-items: center;
	justify-content: center;
}

.uni-load-more__text {
	font-size: 28upx;
	color: #999;
}

.uni-load-more__img {
	height: 24px;
	width: 24px;
	margin-right: 10px;
}

.uni-load-more__img > view {
	position: absolute;
}

.uni-load-more__img > view view {
	width: 6px;
	height: 2px;
	border-top-left-radius: 1px;
	border-bottom-left-radius: 1px;
	background: #999;
	position: absolute;
	opacity: 0.2;
	transform-origin: 50%;
	animation: load 1.56s ease infinite;
}

.uni-load-more__img > view view:nth-child(1) {
	transform: rotate(90deg);
	top: 2px;
	left: 9px;
}

.uni-load-more__img > view view:nth-child(2) {
	transform: rotate(180deg);
	top: 11px;
	right: 0;
}

.uni-load-more__img > view view:nth-child(3) {
	transform: rotate(270deg);
	bottom: 2px;
	left: 9px;
}

.uni-load-more__img > view view:nth-child(4) {
	top: 11px;
	left: 0;
}

.load1,
.load2,
.load3 {
	height: 24px;
	width: 24px;
}

.load2 {
	transform: rotate(30deg);
}

.load3 {
	transform: rotate(60deg);
}

.load1 view:nth-child(1) {
	animation-delay: 0s;
}

.load2 view:nth-child(1) {
	animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
	animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
	animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
	animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
	animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
	animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
	animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
	animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
	animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
	animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
	animation-delay: 1.43s;
}

@-webkit-keyframes load {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0.2;
	}
}
.user-info-box {
	height: 180upx;
	display: flex;
	align-items: center;
	position: relative;
	z-index: 1;
	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
	}
	.info-box {
		display: flex;
		button {
			margin-left: 140px;
			background: #edfdfc;
			color: #94e8e9;
			height: 25px;
			width: 80px;
			font-size: 14px;
			line-height: 25px;
			&:after {
				border: 0px solid rgba(0, 0, 0, 0.2);
			}
		}
	}
	.username {
		font-size: $font-lg + 6upx;
		color: $font-color-dark;
		margin-left: 20upx;
	}
}
</style>
