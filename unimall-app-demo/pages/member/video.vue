<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
           <view class="video-play">
                <video style="width: 100%;" src="../../../static/duanshiping.mp4"
                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
            </view>
            <view >
                <view >
                    <view>
                        <view class="uni-label">视频标题</view>
                    </view>
                    <view class="video-num">
						<text>2020.5.19</text>
						<view class="vline"></view>
						<text>1w+次播放</text>
					</view>
					<view style="font-size: 13px; margin-top: 15px;">
						<text class="video-measure">听音频</text>
						<text class="video-measure">单集播放</text>
						<text class="video-measure">倍速x2</text>
					</view>
                </view>
            </view>
        </view>
		<view class="content">
			<view class="navbar" :style="{ position: headerPosition, top: headerTop }">
				<view class="nav-item" :class="{ current: filterIndex === 0 }" @click="tabClick(0)">详情</view>
				<view class="nav-item" :class="{ current: filterIndex === 1 }" @click="tabClick(1)"><text>评论</text></view>
				<view class="nav-item" :class="{ current: filterIndex === 3 }" @click="tabClick(3)">相关推荐</view>
			</view>
		</view>
    </view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
	    data() {
	        return {
	            src: '',
	            danmuList: [{
	                    text: '第 1s 出现的弹幕',
	                    color: '#ff0000',
	                    time: 1
	                },
	                {
	                    text: '第 3s 出现的弹幕',
	                    color: '#ff00ff',
	                    time: 3
	                }
	            ],
	            danmuValue: ''
	        }
	    },
		onLoad(options) {
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight + 'px';
			// #endif
			this.cateId = options.tid ? options.tid : 0;
			this.keywords = options.keywords ? options.keywords : '';
			this.loadData();
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = 'fixed';
			} else {
				this.headerPosition = 'absolute';
			}
		},
	    onReady: function(res) {
	        // #ifndef MP-ALIPAY
	        this.videoContext = uni.createVideoContext('myVideo')
	        // #endif
	    },
	    methods: {
			tabClick(index) {
				if (this.filterIndex === index && index !== 1) {
					return;
				}
				this.filterIndex = index;
				if (index === 1) {
					this.priceOrder = this.priceOrder === 1 ? 2 : 1;
				} else {
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				});
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				});
			},
	        sendDanmu: function() {
	            this.videoContext.sendDanmu({
	                text: this.danmuValue,
	                color: this.getRandomColor()
	            });
	            this.danmuValue = '';
	        },
	        videoErrorCallback: function(e) {
	            uni.showModal({
	                content: e.target.errMsg,
	                showCancel: false
	            })
	        },
	        getRandomColor: function() {
	            const rgb = []
	            for (let i = 0; i < 3; ++i) {
	                let color = Math.floor(Math.random() * 256).toString(16)
	                color = color.length == 1 ? '0' + color : color
	                rgb.push(color)
	            }
	            return '#' + rgb.join('')
	        }
	    }
	}
</script>

<style lang="scss">
	page,
	%flex-center {
		 display:flex;
		 flex-direction: column;
		 justify-content: center;
		 align-items: center;
		}
		%section {
		  display:flex;
		  justify-content: space-around;
		  align-content: center;
		  background: #fff;
		  border-radius: 10upx;
		}
	.content {
		background: #F8F8F8;
	}
	
	.content {
		padding-top: 60upx;
	}
	
	.navbar {
		/* position: fixed; */
		left: 0;
		/* top: var(--window-top); */
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, 0.06);
		z-index: 10;
		text-align: center;
		
		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
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
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}
	
		.p-box {
			display: flex;
			flex-direction: column;
	
			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
	
				&.active {
					color: $base-color;
				}
			}
	
			.xia {
				transform: scaleY(-1);
			}
		}
	
		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
	
			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}
	
	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: 0.3s;
	
		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: 0.3s;
		}
	
		&.none {
			display: none;
		}
	
		&.show {
			background: rgba(0, 0, 0, 0.4);
	
			.cate-content {
				transform: translateX(0);
			}
		}
	}
	
	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;
	
		.cate-item {
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}
	
		.two {
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
	
		.active {
			color: $base-color;
		}
	}
	
	/* 商品列表 */
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
	
		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
	
		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
	
		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
	
			&:before {
				content: '￥';
				font-size: 26upx;
			}
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
		.username {
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}
	.video-play{
		text-align: center;
	}
	.uni-label{
		margin-top: 12px;
		margin-left: 20px;
	}
	.video-num{
		font-size: 12px;
		margin-left: 20px;
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
	.navbar {
		/* position: fixed; */
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, 0.06);
		z-index: 10;
		margin-top: 10px;
		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
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
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}
	}
</style>
