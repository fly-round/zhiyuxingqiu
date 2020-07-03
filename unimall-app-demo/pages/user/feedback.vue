<template>
	<view class="content">
		<view class="advise">
			<textarea value="请输入您的意见反馈"></textarea>
			<text>您还可以选择在线客服哦～</text>
			<button @click="sendmessage()">发送</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	methods: {
		sendmessage(){
			uni.showToast({
				title: '发送成功',
				duration: 2000
			});
		}
	}
}
</script>

<style lang="scss">
.content {
	background: #f8f8f8;
	.advise {
		padding-top: 10px;
		padding-bottom: 2px;
		background: #f8f8f8;
		textarea {
			background: #ffffff;
			width: 100%;
			color: #c1c1c1;
			padding-top: 10px;
			padding-left: 10px;
		}
		text {
			margin: 20px 0 10px 15px;
			font-size: 13px;
			color: #c1c1c1;
		}
		button {
			margin-top: 20px;
			margin-bottom: 20px;
			width: 280px;
			color: #fef4e9;
			border: solid 1px #da7c0c;
			background: #f78d1d;
			background: -webkit-gradient(linear, left top, left bottom, from(#faa51a), to(#f47a20));
			background: -moz-linear-gradient(top, #faa51a, #f47a20);
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#faa51a', endColorstr='#f47a20');
		}
	}
}
</style>
