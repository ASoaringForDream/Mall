<template>
  <div class="productsitem" @click="oneProductionisClicked">
    <div class="productsitemimg">
      <img v-lazy="showImg" alt="" @load="imgloaded" />
    </div>
    <div class="productsiteminfo">
      <p>{{ productitem.title }}</p>
      <span class="price">{{ productitem.price }}</span>
      <span class="cfav">{{ productitem.cfav }}</span>
    </div>
  </div>
</template>

<script>
import bus from "vue3-eventbus";
export default {
  name: "ProductsListItem",
  props: {
    productitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed:{
    showImg(){
      if(this.productitem.show){
        return this.productitem.show.img
      }else if(this.productitem.img){
        return this.productitem.img
      }else{
        return this.productitem.image
      }
    }
  },
  methods: {
    imgloaded() {
      bus.emit("imgloaded");
    },
    oneProductionisClicked() {
      this.$router.push({
        path:'/detail',
        query:{
          id:this.productitem.iid
        }
      })
    },
  },
};
</script>
  
<style scoped>
.productsitem img {
  width: 100%;
  border-radius: 10px;
}
.productsitem {
  position: relative;
  width: 48%;
  font-size: 12px;
  padding-bottom: 40px;
}
.productsiteminfo p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.8vw;
}
.productsiteminfo {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  text-align: center;
}
.productsiteminfo .price {
  color: var(--color-tint);
  margin-right: 20px;
}
.productsiteminfo .cfav {
  position: relative;
}
.productsiteminfo .cfav::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") no-repeat;
  background-size: 14px, 14px;
}
</style>