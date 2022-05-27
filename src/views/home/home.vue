<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      v-show="tabControlStatus"
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      ref="tabControl1"
      @tabClicked="tabClicked"
      @scrollToTop="scrollToTop"
    ></tab-control>
    <scroll
      class="content"
      ref="Bscroll"
      :probeType=3
      :pullUpLoad=true
      @scrolling="contentscroll"
      @pullingUp="loadmore"
    >
      <div class="topbgbox">
        <img class="topbg" src="~assets/img/common/topbg.webp" alt="" />
      </div>
      <home-swiper
        :banners="result.banner"
        @swiperLoaded="swiperLoaded"
        class="homeswiper"
      ></home-swiper>
      <homerecommedview
        class="homerecommedview"
        :recommend="result.recommends"
        @recommendloaded="recommendloaded"
      ></homerecommedview>
      <feature-view
        class="featureview"
        @featureViewloaded="featureViewloaded"
      ></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
        @tabClicked="tabClicked"
        @scrollToTop="scrollToTop"
      ></tab-control>
      <products-list ref="home-products-list" :products="products[currentTab].list"></products-list>
      <div class="isloadingbox">
        <div class="isloading">正在加载...</div>
      </div>
    </scroll>
    <back-top @click="backupClciked" v-show="isbacktopshow"></back-top>
  </div>
</template>

<script>
import bus from "vue3-eventbus";// 事件总线
import NavBar from "components/common/navbar/NavBar"; //首页导航栏
import TabControl from "components/content/tabControl/TabControl";//首页tab切换栏
import ProductsList from "components/content/products/ProductsList";//商品数据列表
import Scroll from "components/common/scroll/Scroll";//封装的better-scroll
import BackTop from "components/content/backtop/BackTop";//回到顶部按钮

import HomeSwiper from "views/home/childComps/HomeSwiper";//首页轮播图
import homerecommedview from "views/home/childComps/HomeRecommendView";//首页推荐列表
import featureView from "./childComps/featureView";//首页流行页表

import {itemListener} from "common/mixin"//混入函数

import { getHomeMultidata, getHomeProducts } from "network/home";
export default {
  name: "home",
  components: {
    NavBar,
    TabControl,
    ProductsList,
    Scroll,
    BackTop,

    HomeSwiper,
    homerecommedview,
    featureView,
  },
  data() {
    return {
      result: {
        banner: [],//轮播图数据
        recommends: [],//推荐列表数据
      },
      // 商品数据
      products: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
      currentTab: "pop",//tab栏当前显示状态
      isbacktopshow: false,//返回顶部按钮显示状态
      topContentLength: 0,//tabControl距离顶部的高度
      // refresh: null,//对betterscroll的refrech函数的防抖处理
      tabControlStatus: false,//tabControl吸顶状态
      saveY:0//保存离开界面时的滑动位置
    };
  },
  mixins:[itemListener],
  created() {
    // 请求数据
    this.getHomeMultidata();
    this.getHomeProducts("pop");
    this.getHomeProducts("new");
    this.getHomeProducts("sell");
  },
  activated(){
    if (this.refresh) this.refresh();
    // console.log(this.saveY);
    this.$refs.Bscroll.Bscroll && this.$refs.Bscroll.Bscroll.scrollTo(0,this.saveY,1);
  },
  deactivated(){
    this.saveY=this.$refs.Bscroll.Bscroll.y
    bus.off('imgloaded',this.ItemListener)
  },
  methods: {
    // 获取首页加载数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res)
        this.result.banner = res.data.banner.list;
        this.result.recommends = res.data.recommend.list;
      });
    },
    // 获取商品数据
    getHomeProducts(type) {
      const page = this.products[type].page + 1;
      // 请求商品数据
      getHomeProducts(type, page).then((res) => {
        // console.log(res.data.list.length)
        this.products[type].page = page;
        this.products[type].list = this.products[type].list.concat(
          res.data.list
        );
        this.$refs.Bscroll.Bscroll.finishPullUp();
      });
    },
    // tabContorl点击事件监听
    tabClicked(index) {
      switch (index) {
        case 0:
          this.currentTab = "pop";
          break;
        case 1:
          this.currentTab = "new";
          break;
        case 2:
          this.currentTab = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 界面滚动事件监听
    contentscroll(position) {
      if (-position.y > this.topContentLength) {
        this.isbacktopshow = true;
        this.tabControlStatus = true;
      } else {
        this.isbacktopshow = false;
        this.tabControlStatus = false;
      }
    },
    // 下拉加载更多
    loadmore() {
      // console.log("loadmore");
      this.getHomeProducts(this.currentTab);

      this.$refs.Bscroll.Bscroll && this.$refs.Bscroll.Bscroll.refresh();
    },
    scrollToTop() {
      let h = this.topContentLength;
      this.$refs.Bscroll.Bscroll &&
        this.$refs.Bscroll.Bscroll.scrollTo(0, -h, 500);
    },
    backupClciked() {
      // console.log(111);
      this.$refs.Bscroll.Bscroll &&
        this.$refs.Bscroll.Bscroll.scrollTo(0, 0, 500);
    },
    // 轮播图加载成功
    swiperLoaded() {
      this.topContentLength = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.topContentLength);
    },
    // featureView加载成功
    featureViewloaded() {
      this.topContentLength = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.topContentLength);
    },
    // recommend加载成功
    recommendloaded() {
      this.topContentLength = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.topContentLength);
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 20px;
  z-index: 99;
}
.tab-control {
  position: relative;
  z-index: 99;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
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
.isloadingbox {
  position: relative;
  text-align: center;
}
.isloading{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
</style>