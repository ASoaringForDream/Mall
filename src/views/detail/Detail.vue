<template>
  <div id="detail">
    <detail-nav-bar
      class="detailNavBar"
      ref="detailNavBar"
      @scrollToIndex="scrollToIndex"
    ></detail-nav-bar>
    <scroll
      @scrolling="contentscroll"
      ref="Bscroll"
      class="content"
      :probeType="3"
      :pullUpLoad=true
    >
      <div class="topbgbox">
        <img class="topbg" src="~assets/img/common/topbg.webp" alt="" />
      </div>
      <detail-swiper
        ref="detailSwiper"
        :banners="banner"
        @swiperimage="swiperimage"
      ></detail-swiper>
      <detail-info :goods="goods"></detail-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-description
        ref="detailDescription"
        :description="dedescription"
        @DescriptionImage="DescriptionImage"
      ></detail-description>
      <detail-params
        :DetailParams="params"
        @paramsimgload="paramsimgload"
        ref="detailParams"
      ></detail-params>
      <detail-comment
        :Comment="DetailComment"
        ref="detailComment"
      ></detail-comment>
      <div class="produtionrec" ref="DetailProducts">精品推荐</div>
      <products-list
        ref="DetailProductsList"
        :products="recommend"
      ></products-list>
    </scroll>
    <back-top @click="backupClciked" v-show="isbacktopshow"></back-top>
    <detail-bottom-bar @addToCart="addToCart" @payment="payment"></detail-bottom-bar>
    <add-to-cart @backDetail='backDetail' :pronum="1" :DetailInfo="DetailInfo" :operate="'加入购物车'" ref="addToCart" v-if="isAddToCartshow"></add-to-cart>
    <add-to-cart @backDetail='backDetail' :pronum="1" :DetailInfo="DetailInfo" :operate="'去结算'" ref="addToCart" v-if="isPaymentshow"></add-to-cart>
  </div>
</template>

<script>
import bus from "vue3-eventbus"; // 事件总线

import DetailNavBar from "./childComps/DetailNavBar.vue"; //详情页面顶部栏
import DetailSwiper from "./childComps/DetailSwiper.vue"; //详情页面轮播图
import DetailInfo from "./childComps/DetailInfo.vue"; //商品基本信息
import DetailShopInfo from "./childComps/DetailShopInfo.vue"; //商品店铺信息
import DetailDescription from "./childComps/DetailDescription.vue"; //商品描述
import DetailParams from "./childComps/DetailParams.vue"; //商品参数
import DetailComment from "./childComps/DetailComment.vue"; //商品评价
import ProductsList from "components/content/products/ProductsList"; //商品数据列表
import DetailBottomBar from "./childComps/DetailBottomBar.vue"; //底部菜单栏
import BackTop from "components/content/backtop/BackTop"; //回到顶部按钮
import AddToCart from "components/content/addToCart/AddToCart.vue"; //添加到购物车

import { itemListener } from "common/mixin"; //混入函数

import Scroll from "components/common/scroll/Scroll"; //封装的better-scroll
import { getDetail, getRecommend, Goods, Shop,CartInfo } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      id: null, //商品ID
      banner: [], //商品轮播图
      goods: {}, // 商品全部信息
      shop: {}, //店铺信息
      dedescription: {}, //描述信息
      params: {}, //参数信息
      DetailComment: {}, //评价信息
      recommend: [], //推荐列表
      Topoffset: [0], //距离顶部的距离
      DetailInfo:{}, //商品基本信息
      isbacktopshow: false, //返回顶部按钮显示状态
      isAddToCartshow:false, //添加购物车界面
      isPaymentshow:false //购买界面
    };
  },
  mixins: [itemListener],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailInfo,
    DetailShopInfo,
    Scroll,
    DetailDescription,
    DetailParams,
    DetailComment,
    ProductsList,
    DetailBottomBar,
    BackTop,
    AddToCart,
  },
  created() {
    this.id = this.$route.query.id;
    getDetail(this.id).then((res) => {
      // console.log(res);
      this.banner = res.result.itemInfo.topImages;
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );
      this.shop = new Shop(res.result.shopInfo);
      this.dedescription = res.result.detailInfo;
      this.params = res.result.itemParams;
      this.DetailComment = res.result.rate;
      this.DetailInfo = new CartInfo(res.iid,res.result);
    });
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });
  },
  mounted() {
    this.setTopoffset();
  },
  unmounted() {
    bus.off("imgloaded", this.ItemListener);
  },
  methods: {
    // 轮播图加载完毕
    swiperimage() {
      if (this.refresh) {
        this.refresh();
      }
      this.setTopoffset();
    },
    // 描述图片加载完毕
    DescriptionImage() {
      if (this.refresh) this.refresh();
      this.setTopoffset();
    },
    // 参数图片加载完毕
    paramsimgload() {
      if (this.refresh) this.refresh();
      this.setTopoffset();
    },
    // 获取各个部分距离顶部的距离
    setTopoffset() {
      // console.log(this.Topoffset[1]);
      this.Topoffset[1] = this.$refs.detailParams.$el.offsetTop;
      this.Topoffset[2] = this.$refs.detailComment.$el.offsetTop;
      this.Topoffset[3] = this.$refs.DetailProducts.offsetTop;
    },
    // 滚动到指定部分
    scrollToIndex(i) {
      this.setTopoffset();
      this.$refs.Bscroll.Bscroll &&
        this.$refs.Bscroll.Bscroll.scrollTo(0, -this.Topoffset[i], 300);
    },
    // 监听滚动事件
    contentscroll(position) {
      this.setTopoffset();
      if (-position.y >= this.Topoffset[3]) {
        this.$refs.detailNavBar.currentIndex = 3;
      } else if (-position.y >= this.Topoffset[2]) {
        this.$refs.detailNavBar.currentIndex = 2;
      } else if (-position.y >= this.Topoffset[1]) {
        this.$refs.detailNavBar.currentIndex = 1;
      } else {
        this.$refs.detailNavBar.currentIndex = 0;
      }
      if (-position.y >= this.$refs.detailDescription.$el.offsetTop) {
        this.isbacktopshow = true;
      } else {
        this.isbacktopshow = false;
      }
    },
    // 返回顶部
    backupClciked() {
      this.$refs.Bscroll.Bscroll &&
        this.$refs.Bscroll.Bscroll.scrollTo(0, 0, 500);
    },
    // 添加购物车
    addToCart() {
      this.isAddToCartshow=true
      // this.$refs.addToCart.scrollToShow()
    },
    // 关闭购物车（结算）界面
    backDetail (){
      this.isAddToCartshow=false
      this.isPaymentshow=false
    },
    // 去结算界面显示
    payment(){
      this.isPaymentshow=true
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detailNavBar {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 58px;
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
.topbg img {
  width: 100%;
}
.produtionrec {
  text-align: center;
  padding: 20px 0;
  color: var(--color-high-text);
}
</style>