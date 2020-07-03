<template>
	<view class="content">
		<view class="sheet" :class="{sheetShow:isShowBottom,sheeHide:!isShowBottom}"    @touchmove.stop.prevent="moveHandle"  >
			<scroll-view scroll-y="true"  class="sheetView"   :class="{sheetView_active:isShowBottom}"   @click.stop="stopEvent()" >
				<view class="pay">
					<text>支付方式</text>
					<text @touchmove.stop.prevent="moveHandle" @click="closeSheet()">X</text>
					<button @click="navTo('/pages/test/goods/goods')" style="color: #FFFFFF;"><image src="../static/member/微信@3x.png"></image>微信支付</button>
					<button style="background: #71bde6; color: #FFFFFF;"> <image src="../static/member/支付宝 (1)@3x.png"></image>支付宝支付</button>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		name : "bottomSheet",
		props: {
			isShowBottom : Boolean
		},
		methods: {
			closeSheet(){					
				this.$emit('closeBottom');
			},
			stopEvent(){						//@click.stop防止事件冒泡
				
			},
			moveHandle(){						//不让页面滚动
				
			}
		}
	}
</script>

<style lang="scss">
	/* sheet弹窗 */
	.sheet{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 120%;
		left: 0upx;
		bottom: 0upx;
		right: 0upx;
		background:rgba(0,0,0,0.3);
		z-index: 10000;
	}
	.pay{
		padding-top: 10px;
		text-align: right;
		font-size: 18px;
		text:nth-child(2){
			margin-right: 10px;
			margin-left: 130px;
		}
		image{
			height: 20px;
			width: 22px;
			padding-top: 5px;
			margin-right: 10px;
		}
		button{
			height: 45px;
			line-height: 45px;
			margin-top: 15px;
			background: #8dd465;
			width: 300px;
			border-radius: 0;
		}
	}
	/* 显示时候的动画默认0.5s */
	.sheetView{
		width: 100%;
		height: 0upx;
		position: absolute;
		bottom: 0upx;
		background: white;
		z-index: 10001;
		transition: all 0.5s;
	}
	.sheetShow{
		top:0upx !important;
	}
	/* 关闭时的动画，时间自己可以设置0.5s*/
	.sheeHide{
		top:120% !important;
		transition: all 0.5s;		
	}
	
	/* 项目需求根据设计稿要展示的高度,超出这个高度就自动滚动*/
	.sheetView_active{
		height: 442upx;
	}
	
</style>
