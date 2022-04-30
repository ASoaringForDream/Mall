<template>
  <div class="cart-list">
    <cart-shop v-for="item in $store.state.cartList" :key="item" :shopInfo="item" ></cart-shop>
  </div>
</template>

<script>
import CartShop from "./CartShop.vue"
export default {
  name:'CartList',
  components:{
    CartShop
  },
  methods:{
    
  }
}
</script>

<style scoped>
.cart-list {
  width: 100%;
}
</style>