<template>
	<view class="content">
		<view class="courses_list">
			<view class="course_item">
				<image src="../../../static/member/banner备份@3x.png"></image>
				<view class="course_title">
					<text>21天实战特训营</text>
					<text></text>
				</view>
				<view class="course_introd">
					<text>周末直播课、导师录播课、平台实战演练周末直播课、导师录播课、平台实战演练周末直播课、导师录播课、平台实战演练</text>
					<text>已更新6期｜354人开通</text>
				</view>
			</view>
		</view>
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">

					<view v-if="tabIndex==0">
						视频详情内容
					</view>
					<view v-if="tabIndex==1">
						<view class="list">
							<text>单课</text>
							<text>正序</text>
						</view>
						<view class="fenge"></view>
						<view @click="naviageToPage('/pages/member/video/video')">
							<view class="uni-label">一、《视频标题》</view>
						</view>
						<view class="video-num">
							<text>2020.5.19</text>
							<view class="vline"></view>
							<text>1w+次播放</text>
						</view>
						<view class="fenge"></view>
						<view>
							<view class="uni-label">二、《视频标题》</view>
						</view>
						<view class="video-num">
							<text>2020.5.19</text>
							<view class="vline"></view>
							<text>1w+次播放</text>
						</view>
					</view>
					<view v-if="tabIndex==2">
						
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
				videoUri: '//player.alicdn.com/video/aliyunmedia.mp4', // 视频地址
				rateShow: false, // 倍速浮层
	            currentRate: 1.0,// 默认倍速
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
						text: '详情',
						loadingType: 'more',
						pageNo: 1,
						orderList: ["1"]
					},
					{
						state: 10,
						text: '目录',
						loadingType: 'more',
						pageNo: 1,
						orderList: ["2"]
					},
					{
						state: 30,
						text: '相关推荐',
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
		.courses_list{
			background: #FFFFFF;
					margin-top: 5px;
					image{
						width: 100%;
						height: 160px;
					}
					.course_title{
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						font-size: 18px;
						justify-content: space-between;
						margin-left: 15px;
						margin-top: 8px;
						text:nth-child(2){
							color: #262626;
							font-size: 14px;
							margin:0px 12px 0 5px;
							text-align:right;
							width: 300rpx;
						}
					}
					.course_introd{
							margin-top: 8px;
							width: 100%;
							color: #9d9d9d;
							display: flex;
							flex-wrap: wrap;
							font-size: 10px;
							margin-bottom: 5px;
							margin-left: 5px;
							padding-right: 8px;
							text{
								margin: 5px;
							}
							text:nth-child(1){
								width: 335pt;
								font-size: 11pt;
								font-family: PingFangSC, PingFangSC-Regular;
								font-weight: 400;
								text-align: justify;
								color: #999999;
								line-height: 20pt;
							}
					}
			}
			.uni-label{
				font-size:14px;
				margin-top: 5px;
				margin-left: 8px;
			}
			.video-num{
				font-size: 8px;
				margin-left: 10px;
				color: #737373;
				margin-top: 5px;
			}
			.vline {
				border-left: solid 2px #dfdfdf;
			    height: 12px;
			    vertical-align: middle;
			    display: inline-block;
				margin-left: 5px;
				margin-right: 5px;
			}
			.video-measure{
				background: #f6f6f6;
				margin-left: 20px;
				margin-top: 20px
			}
			.list{
				margin: 10px 8px 0 5px;
				padding: 15rpx 15rpx;
				display: flex;
				flex-wrap: wrap;
				font-size: 16px;
				justify-content: space-between;
				text:nth-child(2){
					color: #9d9d9d;
					font-size: 12px;
					margin:2px 10px 0 0;
					text-align:right;
					width: 300rpx;
				}
			}
			.fenge{
				background:#f8f8f8;
				margin-top:3px;
				margin-left:3px;
				height: 2px;
			}
	}

.navbar-sec{
	display: flex;
	background: #FFFFFF;
	button{
		background: #76e2f5;
		font-size: 13px;
		margin-top: 12px;
		margin-bottom: 8px;
		color: #fefefe;
		border-radius: 10px;
		line-height: 30px;
		height: 30px;
	}
}
	.swiper-box {
		height: calc(100% - 40px);
	}
	.content-sec{
		background: #9ef4ed;
		margin: 10px 15px 20px 15px;
		border-radius: 10px;
		image{
			height: 100px;
			width: 100%;
		}
		.title{
			margin-left: 12px;
		}
		.intro{
			font-size: 15px;
			margin-left: 12px;
			margin-top: 10px;
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
			text{
				margin-left: 10px;
			}
			image {
				margin-right: 6px;
				height: 50px;
			}
			.measion {
				margin: 16rpx 6rpx 16rpx 6rpx ;
				padding: 15rpx;
				display: flex;
				justify-content: space-between;
				font-size: 15px;
				text{
					margin-right:12rpx ;
				}
				.vline {
				    border-left: solid 2px #ccc;
				    height: 15px;
				    vertical-align: middle;
				    display: inline-block;
				    // margin-top: 15px;
				}
			}
			.appraise-body{
				border-radius: 10px;
				background: #f6f6f6;
				margin: 6rpx;
				padding: 15rpx;
				font-size: 15px;
				.item-btn{
					margin-top: 10px;
					margin-left: 250px;
					color: #00BFFF;
					font-size: 15px;
				}
			}
			.goods_item {
				border-radius: 10px;
				background: #f6f6f6;
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
				.item-btn{
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
		background: #FFFFFF;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
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
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;

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
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	.uni-label{
		font-size:14px;
		margin-top: 5px;
		margin-left: 8px;
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
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
		.info-box{
			display: flex;
			button{
				margin-left: 150px;
				background: #00BFFF;
				color: #FFFFFF;
				height: 30px;
				width: 50px;
				line-height: 30px;
			}
		}
		.username {
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}
</style>
