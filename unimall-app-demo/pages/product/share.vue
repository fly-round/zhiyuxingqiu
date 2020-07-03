<template>
	<view class="content">
		<view class="uni-padding-wrap">
			<view class="uni-title">分享图片</view>
			<view class="uni-uploader" style="padding:15upx; background:#FFF;">
				<image class="uni-uploader__img" v-if="image" :src="image"></image>
				<view class="uni-uploader__input-box" @tap="chooseImage"></view>
			</view>
			<view class="uni-title" @tap="demo">分享内容</view>
			<view class="uni-textarea"><textarea class="textarea" v-model="shareSummary" /></view>
		</view>
		<view class="copy" @click="copy(shareSummary)">
			<image src="../../static/good/复制@3x.png" style="width: 18px;
		height: 18px;margin-left: 200px; margin-right: 5px;" ></image>
			<text style="margin-bottom: 5px; font-size: 15px;">仅复制分享文案</text>
		</view>
		<button @tap="sendOut" type="primary" style="
height: 29pt;
background: #51e3e2;
border-radius: 1pt;">分享</button>
		<own-share
			ref="share"
			:shareSummary="shareSummary"
			:shareImage="image"
			:shareTitle="title"
			:shareHref="href"
			:miniProgram="miniProgram"
			:webUrl="webUrl"
			:miniProgramId="miniProgramId"
			@shareSuccess="shareSuccess"
			@shareFail="shareFail"
		></own-share>
	</view>
</template>

<script>
import ownShare from '@/components/own-share/own-share.vue'
export default {
	components:{
		ownShare
	},
	data() {
		return {
			shareSummary: '',
			title: '',
			image: '',
			href: '',
			webUrl: '',
			miniProgramId: '',
			miniProgram: {
				id: 'gh_abcdefg',
				path: 'pages/index/index',
				type: 0,
				webUrl: 'http://uniapp.dcloud.io'
			}
		};
	},
	onLoad(option) {
		this.image = option.imgs;
		this.shareSummary = option.title;
	},
	methods: {
		demo() {
			uni.share({
				provider: 'weixin',
				scene: 'WXSenceTimeline',
				type: 0,
				href: 'http://uniapp.dcloud.io/',
				title: 'uni-app分享',
				summary: '我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！',
				imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		},
		sendOut() {
			this.$nextTick(() => {
				this.$refs.share.open();
			});
		},
		copy(shareSummary){
			uni.showToast({
				title:'仅复制分享文案成功',
				duration:1500,
				background:'#51E3E2',
				color:'#51E3E2'
			})
			
			uni.setClipboardData({
			    data: shareSummary,
			    success: function () {
			        console.log('success');
			    },
				fail: function(){
					uni.showModal({
						content:'仅复制分享文案成功',
					})
				}
			});
		},
		chooseImage() {
			uni.chooseImage({
				count: 6, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: res => {
					this.image = res.tempFilePaths[0];
				}
			});
		},
		shareSuccess(e) {
			console.log('success', e);
		},
		shareFail(e) {
			console.log('fail', e);
		}
	},
	onBackPress() {
		this.$refs.share.$children[0].close();
	}
};
</script>

<style>
page {
	padding: 0 20rpx;
	background-color: #f4f5f6;
}
.uni-title {
	font-size: 36rpx;
	padding: 10rpx;
}
.uni-uploader__img{
	height: 150px;
	width: 150px;
}
.uni-textarea {
	background-color: #EDFCFC;
}
.uni-textarea textarea {
	padding: 10rpx 20rpx;
}
.uni-uploader__input-box {
	position: relative;
	width: 208rpx;
	height: 208rpx;
	border: 1rpx solid #d9d9d9;
}
.copy{
	margin-top: 10px;
	margin-bottom: 20px;
}
.uni-uploader__input-box:before {
	width: 4rpx;
	height: 79rpx;
	content: ' ';
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	background-color: #d9d9d9;
}
.uni-uploader__input-box:after {
	width: 79rpx;
	height: 4rpx;
	content: ' ';
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	background-color: #d9d9d9;
}
</style>
