<template>
	<view class="content">
		<view class="online">
			<image src="../../static/my/客服@3x.png"></image>
			<text class="hello">Hello.</text>
			<button @click="naviageToPage('/pages/user/realserver')">有什么想问的尽管戳我
			</button>
			<view class="alert">
				<text>在线客服</text>
				<text>1.在线客服工作时间：9:00-18:00</text>
				<text>2.客服微信：120</text>
				<text>3.遇到问题请及时沟通</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		naviageToPage(page) {
			uni.navigateTo({
				url: page
			});
		}
	}
};
</script>

<style lang="scss">
.content {
	background: #ffffff;
	.alert{
		margin-top: 110px;
		// display: inline-block;
		text{
			display: flex;
			margin-left: 10px;
			margin-top: 3px;
			color: #999999;
			font-family: PingFangSC, PingFangSC-Regular;
		}
		text:nth-child(1){
			margin-left: 15px;
			font-size: 15px;
			color: #999999;
			font-family: PingFangSC, PingFangSC-Regular;
		}
	}
}
.online {
	background: #51E3E2;
	height: 200px;
	position: fixed;
	width: 100%;
	text-align: center;
	image{
		width:42px;
		height: 42px;
		margin-top: 60px;
		margin-right: 10px;
	}
	button {
		position: absolute;
		bottom: 20px;
		margin-left: 85px;
		color: #fff;
		background: #36cbda;
		background-image: url(../../static/my/编组@3x.png);
	}
	.hello{
		width: 47pt;
		height: 25pt;
		font-size: 18pt;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #ffffff;
		line-height: 25pt;
		margin-right: 100px;
	}
}
</style>
