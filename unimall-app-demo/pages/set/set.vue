<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('个人资料')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">绑定手机号</text>
			<text class="cell-tip">12345678</text>
		</view>
		<view class="list-cell b-b" @click="navTo('设置登录密码')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">设置登录密码</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo('设置支付密码')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">设置支付密码</text>
			<text class="cell-more yticon icon-you"></text>
		</view>

		<view class="list-cell m-t " style="background: #f8f8f8;"><text class="cell-tit">绑定账户</text></view>

		<view class="list-cell m-t b-b" @click="navTo(' ')" hover-class="cell-hover" :hover-stay-time="50">
			<image src="../../static/img/share/wx.png"></image>
			<text class="cell-tit">微信</text>
			<button class="bind">绑定</button>
		</view>
		<view class="list-cell b-b" @click="navTo(' ')" hover-class="cell-hover" :hover-stay-time="50">
			<image src="../../static/img/share/qq.png"></image>
			<text class="cell-tit">QQ</text>
			<button class="bind">绑定</button>
		</view>
		<view class="list-cell b-b" @click="navTo('')" hover-class="cell-hover" :hover-stay-time="50">
			<image src="../../static/img/share/wb.png"></image>
			<text class="cell-tit">微博</text>
			<button class="notbind">解绑</button>
		</view>
		<view class="list-cell m-t b-b" @click="navTo('账号注销')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">账号注销</text>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout"><text class="cell-tit">退出登录</text></view>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	data() {
		return {};
	},
	methods: {
		...mapMutations(['logout']),

		navTo(url) {
			this.$api.msg(`跳转到${url}`);
		},
		//退出登录
		toLogout() {
			uni.showModal({
				content: '确定要退出登录么',
				success: e => {
					if (e.confirm) {
						this.logout();
						setTimeout(() => {
							uni.navigateBack();
						}, 200);
					}
				}
			});
		},
		//switch
		switchChange(e) {
			let statusTip = e.detail.value ? '打开' : '关闭';
			this.$api.msg(`${statusTip}消息推送`);
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}
.list-cell {
	display: flex;
	align-items: baseline;
	padding: 20upx $page-row-spacing;
	line-height: 60upx;
	position: relative;
	background: #fff;
	justify-content: center;
	vertical-align: middle;
	&.log-out-btn {
		margin-top: 40upx;
		.cell-tit {
			color: $uni-color-primary;
			text-align: center;
			margin-right: 0;
		}
	}
	image{
		height: 20px;
		width: 20px;
		margin: auto;
		margin-right: 5px;
	}
	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30upx;
	}
	&.m-t {
		margin-top: 16upx;
	}
	.bind {
		color: #4cd964;
		border: 1px solid #4cd964;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		background: #ffffff;
	}
	.notbind {
		color: #65626e;
		border: 1px solid #65626e;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		background: #ffffff;
	}
	.cell-more {
		align-self: baseline;
		font-size: $font-lg;
		color: $font-color-light;
		margin-left: 10upx;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		margin-right: 10upx;
	}
	.cell-tip {
		font-size: $font-base;
		color: $font-color-light;
	}
	switch {
		transform: translateX(16upx) scale(0.84);
	}
}
</style>
