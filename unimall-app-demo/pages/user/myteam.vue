<template>
	<view>
		<view style="padding-bottom: 2px;">
			<view class="user-info-box">
				<view class="portrait-box"><image class="portrait" src="/static/missing-face.png"></image></view>
				<view class="info-box">
					<text @click="toLogin" class="username">爱吃鱼干的二哈</text>
					<text>15611268322</text>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 2px;">
			<view class="user-info-box">
				<view class="portrait-box"><image class="portrait" src="/static/missing-face.png"></image></view>
				<view class="info-box">
					<text @click="toLogin" class="username">爱吃鱼干的二哈</text>
					<text>15611268322</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.user-info-box {
	height: 160upx;
	display: flex;
	// align-items: center;
	position: relative;
	z-index: 1;
	background: #ffffff;
	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
		margin-left: 19px;
		margin-top: 10px;
	}
	image{
		width: 40px;
		height: 40px;
	}
	.info-box {
		// display: flex;
		// background: #FFFFFF;
		padding-bottom: 2px;
		margin-top: 10px;
		display: grid;
		button {
			margin-left: 140px;
			background: #edfdfc;
			color: #94e8e9;
			height: 25px;
			width: 80px;
			font-size: 14px;
			line-height: 25px;
			&:after {
				border: 0px solid rgba(0, 0, 0, 0.2);
			}
		}
		text:nth-child(2){
			margin-left: 10px;
			color: #999999;
		}
	}
	.username {
		font-size: $font-lg + 6upx;
		color: $font-color-dark;
		margin-left: 20upx;
		margin-top: 10px;
	}
}
</style>
