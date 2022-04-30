<template>
  <div class="cart-shop">
    <div class="title">
      <div
        class="checkbox"
        :class="{ active: shopInfo.click }"
        @click="checkboxclicked"
      >
        <img src="~assets/img/cart/tick.svg" alt="" />
      </div>
      <div class="shopInfo">
        <div class="shop-logo">
          <img :src="shopInfo.logo" alt="" />
        </div>
        <div class="shop-name">
          {{ shopInfo.name }}
        </div>
      </div>
    </div>
    <cart-list-item
      v-for="item in shopInfo.pro"
      :key="item"
      :pro="item"
      
    ></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartShop",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      time: null,
    };
  },
  components: {
    CartListItem,
  },
  methods: {
    checkboxclicked() {
      this.$store.commit("changeShopClick", [
        this.shopInfo.id,
        !this.shopInfo.click,
      ]);
    },
    
  },
};
</script>

<style scoped>
.cart-shop {
  margin-bottom: 10px;
  box-shadow: 0 1px 1px 1px rgba(100, 100, 100, 0.2);
  box-shadow: 0 -1px 1px 1px rgba(100, 100, 100, 0.2);
}
.title {
  height: 65px;
  width: 100vw;
  padding-top: 10px;
  padding-left: 3px;
  position: relative;
  border-bottom: 1px solid #ff8198;
  padding-bottom: 5px;
}
.checkbox {
  position: absolute;
  left: 3px;
  top: 18px;
  border: 2px solid #ccc;
  width: 18px;
  height: 18px;
  border-radius: 9px;
}
.active {
  background-color: #ff8198;
  border-color: #ff8198;
}
.shop-logo {
  position: absolute;
  left: 25px;
  top: 10px;
  width: 50px;
  height: 50px;
}
.shop-logo img {
  width: 100%;
}
.shop-name {
  position: absolute;
  left: 80px;
  top: 10px;
  line-height: 50px;
  font-size: 18px;
}
</style>