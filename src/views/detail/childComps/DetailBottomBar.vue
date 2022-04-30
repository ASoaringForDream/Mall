<template>
  <div class="DetailBottomBar">
    <div class="left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="setCollect" >
        <i class="icon collect" :class="{collected:iscollected}" ref="collect"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="shop-cart" @click="addToCart">加入购物车</div>
      <div class="shop-buy" @click="Payment">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  data(){
    return {
      iscollected:false
    }
  },
  methods:{
    setCollect(){
      this.iscollected=!this.iscollected
    },
    addToCart(){
      this.$emit('addToCart')
    },
    Payment(){
      this.$emit('payment')
    }
  }
};
</script>

<style scoped>
.DetailBottomBar {
  height: 58px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
}
.DetailBottomBar > div {
  flex: 1;
  display: flex;
}
.DetailBottomBar div div {
  flex: 1;
}

.DetailBottomBar .left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
}
.DetailBottomBar .left {
  font-size: 13px;
}
.service {
  background: url("~assets/img/detail/detail_bottom.png") no-repeat 0 -54px;
  background-size: 100%;
}
.shop {
  background: url("~assets/img/detail/detail_bottom.png") no-repeat 0 -98px;
  background-size: 100%;
}
.collect {
  background: url("~assets/img/detail/detail_bottom.png") no-repeat 0 0;
  background-size: 100%;
}
.collected {
  background-position:0 -26px;
}
.DetailBottomBar .right {
  line-height: 58px;
}
.shop-cart {
  background-color: #ffe817;
  color: #333;
}
.shop-buy {
  background-color: #f69;
  color: #fff;
  font-size: 20px;
}
</style>