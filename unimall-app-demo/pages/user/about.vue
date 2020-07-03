<template>
	<view class="content">
		<view class="logo_map">
			<image src="../../static/6156f16915dc757.jpg"></image>
			<text style="margin: 10px 0 10px 60px;">知域星球</text>
			<text>扫描二维码，下载知域星球APP！</text>
			<button>点击分享给好友</button>
		</view>
		<view class="row b-b">
			<text class="tit">版本号</text>
			<text class="tiv" style="font-size: 40upx;">></text>
		</view>
		<!-- <view class="row b-b">
			<text class="tit">贡献</text>
			<text class="tiv">WCZ\KBQ</text>
		</view> -->
		<view class="row b-b">
			<text class="tit">隐私条款</text>
			<text class="tiv" @click="navTo('/pages/user/yinsitiaokuan')">unimall@iotechn.com</text>
		</view>
		<text class="tcp">Copyyyyyy@2010-2020 
		知域星球.com版权所有</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			navTo(page){
				uni.navigateTo({
					url:page
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}
	.logo_map{
		display: block;
		text-align: center;
		background: #FAFAFA;
		text{
			display: block;
			text-align: center;
		}
		image{
			height: 150px;
			width: 150px;
		}
		text:nth-child(2){
			width: 180pt;
			height: 17pt;
			font-size: 12pt;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			color: #222222;
			line-height: 17pt;
		}
		button{
			margin-top: 20px;
			margin-bottom: 20px;
			width: 145pt;
			height: 30pt;
			border: 1pt solid #999999;
			line-height: 30pt;
		}
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #FAFAFA;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.tiv{
			flex: 1;
			font-size: 30upx;
			color: #aaaaaa;
			text-align: right;
		}
		
	}
	
	.tcp{
		width: 100%;
		font-size: 28upx;
		color: #aaaaaa;
		text-align: center;
		position: absolute;
		bottom: 200upx;
	}
	
	
	
</style>
