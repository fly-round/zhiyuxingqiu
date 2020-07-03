<template>
	<view class="container">
		<view class="user-section">
			<view class="user-info-box">
				<view class="portrait-box"><image class="portrait" :src="'/static/missing-face.png'"></image></view>
				<text style="position: absolute;
    margin-top: 35px;
    margin-left: -20px;">satan</text>
				<br />
				<text style="font-size: 12px;position: absolute;
    margin-top: 50px;
    margin-left: -60px;">开通会员，享受专属权益</text>
			</view>
		</view>
		<view class="membertake">
			<button @click="focus()" id="bt">黄金会员</button>
			<button @click="focus()" :class="{active: true}">铂金会员</button>
			<button @click="focus()">钻石会员</button>
		</view>
		<view class="privilege">
			<text style="font-size: 16px; margin-left: 18px;">会员享受以下特权</text>
			<view class="order-section">
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/member/icon-超级会员@3x.png">
					<text style="padding-left: 10px;">超级会员</text>
					<text style="padding-left: 10px;">所有权益</text>
				</view>
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/member/icon-自买返佣@3x.png">
					<text>自买返佣</text>
					<text>收益提升55%</text>
				</view>
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/member/icon-分享返佣@3x.png">
					<text>分享赚佣</text>
					<text style="padding-left: 5px;">收益提升35%</text>
				</view>
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/member/icon-间接出单@3x.png">
					<text>间接问单</text>
					<text>奖励57%</text>
				</view>
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/member/icon-直接出单@3x.png">
					<text style="padding-right: 10px;">直接问单</text>
					<text style="padding-right: 10px;">奖励37%</text>
				</view>
			</view>
			<view class="order-section">
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/member/icon-粉丝@3x.png">
					<text style="padding-left: 10px;">1000粉丝</text>
					<text style="padding-left: 10px;">基础粉丝</text>
				</view>
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/member/icon-视频@3x.png">
					<text>好物视频</text>
					<text style="font-size: 10px;width: 100px;">精品视频任你选</text>
				</view>
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/member/icon-客服@3x.png">
					<text>专属客服</text>
					<text>一对一服务</text>
				</view>
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/member/icon-橱窗@3x.png">
					<text>包开橱窗</text>
					<text>橱窗开通权限</text>
				</view>
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/member/icon-教程@3x.png">
					<text style="padding-right: 10px;">基础教程</text>
					<text style="padding-right: 10px;">新手教程</text>
				</view>
			</view>
			<view class="order-section">
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image v-if="isVip==0" src="../../static/member/icon-铂金课程@3x.png">
					<image v-if="isVip==2 || isVip==3" src="../../static/member/icon-铂金课程@2x.png">
					<text style="padding-left: 10px;">铂金课程</text>
					<text style="padding-left: 10px;">独家讲解</text>
				</view>
				<view class="order-item"  hover-class="common-hover" :hover-stay-time="50">
					<image v-if="isVip==0 || isVip==2 " src="../../static/member/icon-导师@3x.png">
					<image v-if="isVip==3" src="../../static/member/icon-导师@2x.png">
					<text>导师研修班</text>
					<text>专属导师</text>
				</view>
				<view class="order-item"></view>
				<view class="order-item"></view>
				<view class="order-item"></view>
			</view>
		</view>
		<view class="privilege">
			<text style="font-size: 16px; margin-left: 18px;">{{vip}}</text>
			<text style="font-size: 12px; margin:8px 0 5px 18px;color: #9E9E9E;">购买{{vip}}享受{{vip}}特权</text>
			<button @click="navToDetailPage(price*100)">仅需{{price}}成为{{vip}}</button>
			<!-- <button @click="navToDetailPage(price)">下单</button> -->
			<button v-if="isVip==3" @click="showBottom()">请联系专属导师升级</button>
			<button v-if="vipType==1" style="color: #51E3E2;background: #FFFFFF;">您已成为我们的黄金会员</button>
			<button v-if="vipType==2" style="color: #51E3E2;background: #FFFFFF;">您已成为我们的铂金会员</button>
			<button v-if="vipType==3" style="color: #51E3E2;background: #FFFFFF;">您已成为我们的钻石会员</button>
			<bottomSheet :isShowBottom="isShowBottom"  @closeBottom="closeBottom"></bottomSheet>
		</view>
		
		<view class="privilege">
			<text style="font-size: 16px; margin-left: 18px;">7天系统化全链路教学</text>
			<view class="teach">
				<text>1、创作能力</text>
				<text>选择拍摄录音设备、提高视频拍摄水平、学习剪辑制作技术</text>
			</view>
			<view class="teach">
				<text>2、运营能力</text>
				<text>明确账号优势地位、快速涨粉收割流量、玩转热点话题活动</text>
			</view>
			<view class="teach">
				<text>3、变现能力</text>
				<text>了解视频变现方法、解锁平台带货玩法、掌握一键带货模式</text>
			</view>
		</view>
		<view class="privilege">
			<text style="font-size: 16px; margin-left: 18px;">365天平台实战演练</text>
			<view class="drill">
				<image src="../../static/member/会员@2x.png"></image>
				<text>闪电涨粉1000+</text>
			</view>
			<view class="drill">
				<image src="../../static/member/商品橱窗@3x.png"></image>
				<text>包开橱窗，一键分享带货</text>
			</view>
			<view class="drill">
				<image src="../../static/member/涨粉工具@3x.png"></image>
				<text>尊享VIP会员，轻松灵活创收</text>
			</view>
			<button @click="navTo('/pages/member/course')">走进会员</button>
		</view>
	</view>
</template>
<script>
import listCell from '@/components/mix-list-cell';
import bottomSheet from '../../components/bottomSheet.vue';
import { mapState } from 'vuex';
let startY = 0,
	moveY = 0,
	pageAtTop = true;
export default {
	components: {
		listCell,
		bottomSheet
	},
	data() {
		return {
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			footprintList: [],
			isVip: false,
			isUps:false,
			isShowBottom : false,
			vip:'黄金会员',
			vipType:0,
			price:698
		};
	},
	methods: {
		pay () {
		    let selectedProvider = ''
		    new Promise((resolve, reject) => {
		      uni.getProvider({
		        service: 'payment',
		        success (res) {
		          resolve(res.provider)
		        },
		        fail () {
		          reject(new Error('获取支付方式失败'))
		        }
		      })
		    }).then((providerList) => {
		      return new Promise((resolve, reject) => {
		        uni.showActionSheet({
		          itemList: providerList,
		          success (res) {
		            resolve(providerList[res.tapIndex])
		          },
		          fail () {
		            reject(new Error('取消支付'))
		          }
		        })
		      })
		
		    }).then((provider) => {
		      selectedProvider = provider
		      return uniCloud.callFunction({
		        name: 'pay',
		        data: {
		          provider,
		          openid: this.openid,
		          outTradeNo: this.outTradeNo
		        }
		      })
		    }).then((res) => {
		      console.log(res);
		      if (res.result.orderInfo) {
		        return new Promise((resolve, reject) => {
		          uni.requestPayment({
		            // #ifdef APP-PLUS
		            provider: selectedProvider,
		            // #endif
		            // #ifdef MP-WEIXIN
		            ...res.result.orderInfo,
		            // #endif
		            // #ifdef APP-PLUS || MP-ALIPAY
		            orderInfo: res.result.orderInfo,
		            // #endif
		            complete () {
		              resolve(res.result.outTradeNo)
		            }
		          })
		        })
		      } else {
		        throw new Error(res.result.msg)
		      }
		    }).then((outTradeNo) => {
		      return uniCloud.callFunction({
		        name: 'orderQuery',
		        data: {
		          provider: selectedProvider,
		          outTradeNo
		        }
		      })
		    }).then((res) => {
		      if (res.result.orderPaid) {
		        this.status = 2
		        uni.showModal({
		          content: '订单已支付',
		          showCancel: false
		        })
		      } else {
		        uni.showModal({
		          content: '订单未支付',
		          showCancel: false
		        })
		      }
		    }).catch((err) => {
		      uni.showModal({
		        content: err.message || '登录失败',
		        showCancel: false
		      })
		    })
		
		  },
		async loadFootprint() {
			const that = this;
			that.$api.request('footprint', 'getAllFootprint').then(res => {
				that.footprintList = res.data;
			});
		},
		focus(){
			this.vip = event.target.innerText
			if(this.vip === "黄金会员"){
				this.price = 698,
				this.isVip = 0
			}else if(this.vip === "铂金会员"){
				this.price =2989,
				this.isVip = 2
			}else{
				// thi.price = '请联系专属导师晋升'
				this.isVip = 3
			}
			document.getElementById('bt').background='#51E3E2'
		},
		//底部开关
		showBottom(){
			this.isShowBottom = true;
		},
		closeBottom(){
			this.isShowBottom = false;
		},
		navToDetailPage(price) {
			uni.navigateTo({
				url: `/pages/pay/pay?price=${price}`
			})
		},
		navTo(page){
			uni.navigateTo({
				url:page
			})
		}
	}
};
</script>
<style lang="scss">
%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
%section {
	display: flex;
	justify-content: space-around;
	align-content: center;
	background: #fff;
	border-radius: 10upx;
}
.container {
	background: #51e3e3;
	padding-top: 20px;
	.membertake {
		padding-top: 10px;
		padding-bottom: 10px;
		background: #ffffff;
		display: flex;
		button {
			background: #85ebe9;
			color: #ffffff;
			
		}
		button:active{
		  background-color:#51e3e3;
		}
	}
	.privilege {
		padding-top: 10px;
		padding-bottom: 10px;
		background: #ffffff;
		text {
			display: block;
		}
		button {
			margin-top: 10px;
			width: 326px;
			height: 50px;
			line-height: 50px;
			color: #fef4e9;
			background: #85ebe9;
			background: -webkit-gradient(linear, left top, left bottom, from(#85ebe9), to(#4fdadd));
			background: -moz-linear-gradient(top, #85ebe9, #4bced1);
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#85ebe9', endColorstr='#4cd0d2');
		}
		.teach {
			text {
				margin-top: 10px;
				margin-left: 18px;
				color: #85ebe9;
				font-size: 14px;
			}
			text:nth-child(2) {
				color: #9e9e9e;
				font-size: 12px;
			}
		}
		.drill {
			background: #ecfbfb;
			padding: 15px;
			margin: 10px 15px 10px 15px;
			display: flex;
			image {
				width: 20px;
				height: 20px;
				margin-right: 5px;
			}
			text {
				font-size: 16px;
			}
		}
	}
}
.user-section {
	margin: 50px 20px 0 20px;
	position: relative;
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		filter: blur(1px);
		opacity: 0.7;
	}
}
.user-info-box {
	height: 280upx;
	display: block;
	align-items: center;
	position: relative;
	text-align: center;
	background: #85ebe9;
	z-index: 1;
	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
		    position: absolute;
		    margin-top: -30px;
		    margin-left: -30px;
	}
	.portrait-bo {
		padding: 10px;
	}
	text {
		font-size: 20px;
		color: #f3f3f3;
		margin-left: 20upx;
		margin-top: 15px;
		text-align: center;
	}
}

.vip-card-box {
	display: flex;
	flex-direction: column;
	color: #f7d680;
	height: 240upx;
	background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
	border-radius: 16upx 16upx 0 0;
	overflow: hidden;
	position: relative;
	padding: 20upx 24upx;
	.card-bg {
		position: absolute;
		top: 20upx;
		right: 0;
		width: 380upx;
		height: 260upx;
	}
	.b-btn {
		position: absolute;
		right: 20upx;
		top: 16upx;
		width: 132upx;
		height: 40upx;
		text-align: center;
		line-height: 40upx;
		font-size: 22upx;
		color: #36343c;
		border-radius: 20px;
		background: linear-gradient(left, #f9e6af, #ffd465);
		z-index: 1;
	}
	.tit {
		font-size: $font-base + 2upx;
		color: #f7d680;
		margin-bottom: 28upx;
		.yticon {
			color: #f6e5a3;
			margin-right: 16upx;
		}
	}
	.e-b {
		font-size: $font-sm;
		color: #d8cba9;
		margin-top: 10upx;
	}
}
.cover-container {
	background: $page-color-base;
	margin-top: -150upx;
	/* padding: 0 30upx; */
	position: relative;
	background: #f5f5f5;
	/* padding-bottom: 20upx; */
	.arc {
		position: absolute;
		left: 0;
		top: -34upx;
		width: 100%;
		height: 36upx;
	}
	.my_tool {
		background: #ffffff;
		margin-top: 5px;

		text:nth-child(1) {
			font-size: 16px;
			margin-left: 13px;
		}
	}
}
.tj-sction {
	@extend %section;
	.tj-item {
		@extend %flex-center;
		flex-direction: column;
		height: 140upx;
		font-size: $font-sm;
		color: #75787d;
	}
	.num {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-bottom: 8upx;
	}
}
.order-section {
	@extend %section;
	padding: 14upx 0 20upx 0;
	margin-top: 10upx;
	.order-item {
		@extend %flex-center;
		width: 160upx;
		// height: 120upx;
		border-radius: 10upx;
		font-size: $font-sm;
		color: $font-color-dark;
		text{
			text-align: center;
		};
		image{
			width: 40px;
			height: 40px;
		}
		text:nth-child(2) {
			font-size: 12px;
			text-align: center;
			width: 80px;
		}
		text:nth-child(3) {
			font-size: 10px;
			color: #CCCCCC;
			text-align: center;
			width: 80px;
		}
	}
	.yticon {
		font-size: 52upx;
		margin-bottom: 10upx;
		margin-top: 10upx;
		color: #fa436a;
	}
	.icon-shouhoutuikuan {
		font-size: 44upx;
	}
}
.history-section {
	padding: 30upx 0 0;
	margin-top: 10upx;
	background: #fff;
	border-radius: 10upx;
	.sec-header {
		display: flex;
		align-items: center;
		font-size: $font-base;
		color: $font-color-dark;
		line-height: 40upx;
		margin-left: 30upx;
		.yticon {
			font-size: 44upx;
			color: #5eba8f;
			margin-right: 16upx;
			line-height: 40upx;
		}
	}
	.h-list {
		white-space: nowrap;
		padding: 30upx 30upx 0;
		image {
			display: inline-block;
			width: 160upx;
			height: 160upx;
			margin-right: 20upx;
			border-radius: 10upx;
		}
	}
}
.fenge {
	background: #eee;
	margin: 1px 5px 0 5px;
	height: 1rpx;
}
.more {
	margin-left: 200px;
	font-size: 14px;
	color: #9d9d9d;
}
</style>
