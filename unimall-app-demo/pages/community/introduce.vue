<template>
	<view class="content">
		<view class="introd" @click="naviageToPage('/pages/community/article')">
			<image src="../../static/emptyCart.jpg"></image>
			<view class="wenzi">
				<text>最新劲爆爆料！</text>
				<text>2020.5.19 22:10:38
					<text>858人浏览</text>
				</text>
			</view>
		</view>
		<view class="fenge"></view>
		<view class="introd">
			<image src="../../static/emptyCart.jpg"></image>
			<view class="wenzi">
				<text>最新劲爆爆料！</text>
				<text>2020.5.19 22:10:38
					<text>858人浏览</text>
				</text>
			</view>
		</view>
		<view class="fenge"></view>
		<view class="introd">
			<image src="../../static/emptyCart.jpg"></image>
			<view class="wenzi">
				<text>最新劲爆爆料！</text>
				<text>2020.5.19 22:10:38
					<text>858人浏览</text>
				</text>
			</view>
		</view>
		<view class="fenge"></view>
		<view class="introd">
			<image src="../../static/emptyCart.jpg"></image>
			<view class="wenzi">
				<text>最新劲爆爆料！</text>
				<text>2020.5.19 22:10:38
					<text>858人浏览</text>
				</text>
			</view>
		</view>
		<view class="fenge"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			naviageToPage(page) {
				uni.navigateTo({
					url: page
				})
			},
		}
	}
</script>

<style lang="scss">
.content{
	background: #f1f1f1;
	padding-top: 20px;
}
.introd{
	display: flex;
	background: #FFFFFF;
	image{
		width: 60px;
		height: 60px;
		margin-left: 20px;
		margin-right: 30px;
	}
	.wenzi{
		margin-top: 8px;
		text{
			display: flex;
			margin-bottom: 5px;
			text{
				display: inline-block;
				margin-left: 50px;
			}
		}
		text:nth-child(2){
			margin-top: 15px;
			font-size: 12px;
		}
	}
}
.fenge{
		background: #eee;
		height: 1rpx;
	}
</style>
