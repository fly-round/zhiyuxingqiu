<template>
	<view class="content">
		<image src="../../static/index图标/豪礼@3x.png">
			<image src="../../static/index图标/去邀请好友下载知域星球APP@2x.png" style="width: 265px;
			height: 20px;
			margin-top: -678px;
			margin-bottom: 87px;" @click="share"></image>
		</image>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods:{
		share(){
			uni.saveImageToPhotosAlbum({
				filePath:'../../static/index图标/豪礼@3x.png'
			}),
			uni.showModal({
				title:'',
				content:'图片已保存，快去分享吧',
				showCancel:false
			})
		}
	}
};
</script>

<style lang="scss">
.content {
	height: 750px;
	// background-image: url(../../static/index图标/豪礼@3x.png);
	// background: #f8f8f8;
	text-align: center;
	image {
		height: 750px;
		width: 375px;
		image{
			width: 265px;
			height: 20px;
			margin-bottom: 87px;
			
		}
	}
	.b-btn {
		background: #ffffff;
		margin-top: 50px;
		.yaoqingma {
			display: flex;
			padding: 10px 0 10px 100px;
			line-height: 50px;
			font-size: 14px;
			button {
				font-size: 14px;
				margin-top: 11px;
				height: 25px;
				line-height: 25px;
				color: red;
			}
		}
		.btn {
			margin-top: 20px;
			button {
				image {
					padding: 5px 20px 5px 20px;
					height: 30px;
				}
				// background-image: url(../../static/index图标/去邀请好友下载知域星球APP@2x.png);
				width: 280px;
				color: #fef4e9;
				border: solid 1px #da7c0c;
				// background: #f78d1d;
				// background: -webkit-gradient(linear, left top, left bottom, from(#faa51a), to(#f47a20));
				// background: -moz-linear-gradient(top,  #faa51a,  #f47a20);
				// filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#faa51a', endColorstr='#f47a20');
			}
			text {
				margin-top: 20px;
				font-size: 13px;
				color: #bfbfbf;
			}
		}
	}
}
</style>
