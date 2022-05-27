<template>
  <div class="shopcart" @touchstart="touchStart">
    <nav-bar class="shopcart-nav">
      <template v-slot:center>
        <div>购物车({{$store.getters.counter}})</div>
      </template>
    </nav-bar>
    <scroll class="content" ref="Bscroll" :prototype="0" :pullUpLoad="false">
      <div class="topbgbox">
        <img class="topbg" src="~assets/img/common/topbg.webp" alt="" />
      </div>
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar class="bottom-bar"></cart-bottom-bar>
    <add-to-cart
      class="changeSty"
      @backDetail="backDetail"
      :style_Id="pro.styleId"
      :size_Id="pro.sizeId"
      :stockId="pro.stockId"
      :pronum="pro.num"
      :DetailInfo="pro.DetailInfo"
      :operate="'确定'"
      ref="changesty"
      v-if="isChengeStyshow"
    ></add-to-cart>
  </div>
</template>

<script>
import bus from "vue3-eventbus";// 事件总线
import NavBar from "components/common/navbar/NavBar"; //首页导航栏
import CartList from "./childComps/CartList.vue"; //购物车列表
import Scroll from "components/common/scroll/Scroll"; //封装的better-scroll
import CartBottomBar from './childComps/CartBottomBar.vue'//购物车底部菜单栏
import AddToCart from "components/content/addToCart/AddToCart.vue";//添加到购物车
export default {
  name: "Shopcart",
  data(){
    return{
      isChengeStyshow: false,
      pro:{}
    }
  },
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
    AddToCart
  },
  mounted(){
    bus.on('changeSty',(pro)=>{
      // console.log(pro);
      this.isChengeStyshow=true
      this.pro=pro
    })
  },
  activated(){
    this.$refs.Bscroll.Bscroll && this.$refs.Bscroll.Bscroll.refresh()
  },
  deactivated(){
    bus.emit('delClose')
  },
  methods:{
    backDetail(){
      this.isChengeStyshow=false
    },
    touchStart(e){
      if(e.target.id!=='del'&&e.target.id!=='delbox'){
        // console.log(111);
        bus.emit('delClose')
      }
    }
  }
};
</script>

<style scoped>
.shopcart {
  position: relative;
  height: 100vh;
}
.shopcart-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 20px;
  z-index: 99;
  font-weight: 700;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 93px;
  left: 0;
  right: 0;
}
.topbgbox {
  position: relative;
}
.topbg {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.topbg img{
  width: 100%;
}
.bottom-bar {
  position: fixed;
  bottom: 49px;
}
</style>