<template>
  <view class="content">
    <view class="list">
      <view class="goods-item" v-for="(item, index) in goodsList" :key="index">
        <view>商品名：{{ item.name }}</view>
        <view>价格：{{ item.price / 100 }}元</view>
      </view>
    </view>
    <view class="order-info">
      <view>
        <view>总金额：{{ totalFee / 100 }}元</view>
        <view v-if="status">订单状态：{{ statusText[status - 1] }}</view>
      </view>
    </view>
    <button v-if="status !== 2" type="primary" @click="pay">支付</button>
  </view>
</template>

<script>
export default {
  data () {
    return {
      userId: '123456',
      openid: '',
      goodsList: [],
      totalFee: 0,
      status: 0,
      statusText: ['未支付', '已支付']
    }
  },
  onLoad (options) {
    let outTradeNo = options.outTradeNo
    this.outTradeNo = outTradeNo
    this.openid = uni.getStorageSync('openid')
    uni.showLoading({
      title: '正在获取商品列表',
      mask: true
    })
    uniCloud.callFunction({
      name: 'getOrderDetail',
      data: {
        outTradeNo
      }
    }).then((res) => {
      console.log(res);
      uni.hideLoading()
      if (res.result.goodsList && res.result.goodsList.length > 0) {
        this.goodsList.splice(0, 0, ...res.result.goodsList)
        this.totalFee = res.result.totalFee
        this.status = res.result.status
      } else {
        throw new Error('获取商品列表失败')
      }
    }).catch((err) => {
      console.log(err);
      uni.hideLoading()
      uni.showModal({
        content: err.message || '获取商品列表失败',
        showCancel: false
      })
    })
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

    }
  }
}
</script>

<style>
.content {
  padding: 15px;
}

.goods-item,
.order-info {
  padding: 10px 0px;
  line-height: 30px;
  font-size: 16px;
}
</style>
