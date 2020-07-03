<template>
	<view class="content">
		<image src="../../static/avatar.png"></image>
		<view class="b-btn">
			<view class="yaoqingma">
				<text>我的邀请码：</text>
				<text>111</text>
				<button>复制邀请码</button>
			</view>
			<view class="btn">
				<button>分享专属海报</button>
				<text>成功邀请的好友每下一单，你都能从中获益</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.content{
	background: #f8f8f8;
	text-align: center;
	.b-btn{
		background: #FFFFFF;
		margin-top: 50px;
		.yaoqingma{
			display: flex;
			padding: 10px 0 10px 100px;
			line-height: 50px;
			font-size: 14px;
			button{
				font-size: 14px;
				margin-top: 11px;
				height: 25px;
				line-height: 25px;
				color: red;
			}
		}
		.btn{
			margin-top: 20px;
			button{
				width: 280px;
				color: #fef4e9;
				border: solid 1px #da7c0c;
			    background: #f78d1d;
			    background: -webkit-gradient(linear, left top, left bottom, from(#faa51a), to(#f47a20));
			    background: -moz-linear-gradient(top,  #faa51a,  #f47a20);
			    filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#faa51a', endColorstr='#f47a20');
			}
			text{
				margin-top: 20px;
				font-size: 13px;
				color: #bfbfbf;
			}
		}
	}
}
</style>
