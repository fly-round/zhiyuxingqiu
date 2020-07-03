<template>
	<view class="content">
		<swiper style="height: 100%;">
			<block>
				<swiper-item>
					<view class="uni_vdplayer">
						<video src="http://admin.jzldy.com:8999/utuifiles/video/1.mp4"></video>
						<!-- 中间播放按钮 -->
						<view class="vd-cover flexbox" @click="handleClicked(index)"><text v-if="!isPlay" class="iconfont icon-bofang"></text></view>
						<!-- 底部信息 -->
						<view class="vd-footToolbar flexbox flex_alignb">
							<view class="vd-info flex1">
								<view class="item at">
									<view class="kw" v-for="(kwItem, kwIndex) in item.keyword" :key="kwIndex">
										<text class="bold fs_18 mr_5">＃</text>
										{{ kwItem }}
									</view>
								</view>
								<view class="item subtext">{{ item.subtitle }}</view>
								<view class="item uinfo flexbox flex_alignc">
									<image class="avator" :src="item.avator" mode="aspectFill" />
									<text class="name">{{ item.author }}</text>
									<text class="btn-attention bg_linear1" :class="item.attention ? 'on' : ''" @tap="handleAttention(index)">
										{{ item.attention ? '已关注' : '关注' }}
									</text>
								</view>
								<view class="item reply" @tap="handleVideoComment">
									<text class="iconfont icon-pinglun mr_5"></text>
									写评论...
								</view>
							</view>
							<view class="vd-sidebar">
								<view v-if="item.cart" class="ls cart flexbox bg_linear3" @tap="handleVideoCart(index)"><text class="iconfont icon-cart"></text></view>
								<view class="ls" @tap="handleIsLike(index)">
									<text class="iconfont icon-like" :class="item.islike ? 'like' : ''"></text>
									<text class="num">{{ item.likeNum + (item.islike ? 1 : 0) }}</text>
								</view>
								<view class="ls" @tap="handleVideoComment">
									<text class="iconfont icon-liuyan"></text>
									<text class="num">{{ item.replyNum }}</text>
								</view>
								<view class="ls">
									<text class="iconfont icon-share"></text>
									<text class="num">{{ item.shareNum }}</text>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>
<script>
// 引入商品广告、评论
// import videoCart from '@/components/cp-video/cart.vue';
// import videoComment from '@/components/cp-video/comment';

let timer = null;
export default {
	data() {
		return {
			videoIndex: 0,
			vlist: videoJson,

			isPlay: true, //当前视频是否播放中
			clickNum: 0 //记录点击次数
		};
	},
	// components: {
	// 	videoCart,
	// 	videoComment
	// },
	onLoad(option) {
		this.videoIndex = parseInt(option.index);
	},
	onReady() {
		this.init();
	},
	methods: {
		init() {
			this.videoContextList = [];
			for (var i = 0; i < this.vlist.length; i++) {
				// this.videoContextList.push(this.$refs['myVideo' + i][0])
				this.videoContextList.push(uni.createVideoContext('myVideo' + i, this));
			}

			setTimeout(() => {
				this.play(this.videoIndex);
			}, 200);
		},

		// 滑动切换
		handleSlider(e) {
			let curIndex = e.detail.current;
			if (this.videoIndex >= 0) {
				this.videoContextList[this.videoIndex].pause();
				this.videoContextList[this.videoIndex].seek(0);
				this.isPlay = false;
			}
			if (curIndex === this.videoIndex + 1) {
				this.videoContextList[this.videoIndex + 1].play();
				this.isPlay = true;
			} else if (curIndex === this.videoIndex - 1) {
				this.videoContextList[this.videoIndex - 1].play();
				this.isPlay = true;
			}
			this.videoIndex = curIndex;
		},
		// 播放
		play(index) {
			this.videoContextList[index].play();
			this.isPlay = true;
		},
		// 暂停
		pause(index) {
			this.videoContextList[index].pause();
			this.isPlay = false;
		},
		// 点击视频事件
		handleClicked(index) {
			if (timer) {
				clearTimeout(timer);
			}
			this.clickNum++;
			timer = setTimeout(() => {
				if (this.clickNum >= 2) {
					console.log('双击视频');
				} else {
					console.log('单击视频');
					if (this.isPlay) {
						this.pause(index);
					} else {
						this.play(index);
					}
				}
				this.clickNum = 0;
			}, 300);
		},

		// 喜欢
		handleIsLike(index) {
			let vlist = this.vlist;
			vlist[index].islike = !vlist[index].islike;
			this.vlist = vlist;
		},
		// // 显示评论
		// handleVideoComment() {
		// 	this.$refs.videoComment.show();
		// },

		// // 显示购物车
		// handleVideoCart(index) {
		// 	this.$refs.videoCart.show(index);
		// }
	}
};
</script>

<style lang="scss">
.content {
}
</style>
