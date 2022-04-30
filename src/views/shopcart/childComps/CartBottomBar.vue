<template>
  <div class="Cartbottombar">
    <div class="count">总计:
      <span class="total">{{$store.getters.totalPrice}}</span>
      <span class="oldtotal">{{$store.getters.oldTotalPrice}}</span>
    </div>
    <div class="buy" @click="buyclicked">结算({{$store.getters.counter}})</div>
  </div>
</template>

<script>
export default {
  name: "CartBottomBar",
  methods:{
    buyclicked(){
      if(this.$store.getters.counter===0){
        this.$toast('您还没有选择商品')
      }
    }
  }
};
</script>

<style>
.Cartbottombar {
  height: 44px;
  width: 100%;
  display: flex;
  line-height: 44px;
}
.count {
  width: 70vw;
  height: 100%;
  color: #333;
  font-size: 20px;
  margin-left: 20px;
}
.total {
  color: var(--color-high-text);
}
.oldtotal {
  font-size: 12px;
  text-decoration: line-through;
  color: #555;
}
.buy {
  width: 30vw;
  text-align: center;
  height: 100%;
  color: #fff;
  font-size: 22px;
  background-color: var(--color-tint);
}
</style>