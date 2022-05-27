<template>
  <div class="category">
    <nav-bar class="cate-nav-bar">
      <template v-slot:center>商品分类</template>
    </nav-bar>
    <div class="content">
      <menu-bar
        :cateList="categoryList"
        @cateItemClick="cateItemClick"
        ref="menu_bar"
      ></menu-bar>
      <scroll ref="Bscroll" id="cateDetail">
        <cate-detail :cateDetail="getsubcategories"></cate-detail>
        <tab-control class="tab-control" :titles="['综合','新品','销量']"></tab-control>
        <products-list :products="getcategoryDetail"></products-list>
      </scroll>
    </div>
  </div>
</template>

<script>
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category.js"; //获取分类信息
import MenuBar from "./childComps/MeauBar.vue";//左侧菜单栏
import NavBar from "components/common/navbar/NavBar";//顶部菜单栏
import CateDetail from "./childComps/CateDetail.vue";//右侧分类信息
import Scroll from "components/common/scroll/Scroll"; //封装的better-scroll
import TabControl from "components/content/tabControl/TabControl";//首页tab切换栏
import ProductsList from "components/content/products/ProductsList";//商品数据列表
import {itemListener} from "common/mixin"//混入函数
export default {
  name: "Category",
  data() {
    return {
      categoryList: [],
      cateDetailList: [],
      currentIndex: -1,
      currentType: "pop",
    };
  },
  components: {
    MenuBar,
    NavBar,
    CateDetail,
    Scroll,
    TabControl,
    ProductsList,
  },
  mixins:[itemListener],
  created() {
    getCategory().then((res) => {
      // console.log(res);
      this.categoryList = res.data.category.list;
      this.$refs.menu_bar.refresh()
      for (let i = 0; i < this.categoryList.length; i++) {
        this.cateDetailList[i] = {
          subcategories: {},
          categoryDetail: {
            pop: [],
            new: [],
            sell: [],
          },
        };
      }
      this._getSubcategory(0);
    });
  },
  computed: {
    getsubcategories() {
      if (this.currentIndex === -1) return {};
      return this.cateDetailList[this.currentIndex].subcategories;
    },
    getcategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.cateDetailList[this.currentIndex].categoryDetail[this.currentType];
    },
  },
  methods: {
    // 获取右侧分类信息
    _getSubcategory(index) {
      this.currentIndex = index;
      let mait_Key = this.categoryList[index].maitKey;
      getSubcategory(mait_Key).then((res) => {
        // console.log(res);
        if (!this.cateDetailList[index].subcategories.list) {
          this.cateDetailList[index].subcategories = res.data;
          this._getCategoryDetail("pop");
          this._getCategoryDetail("sell");
          this._getCategoryDetail("new");
        }
      });
    },
    // 获取分类下的精品推荐列表
    _getCategoryDetail(type) {
      let miniWallkey = this.categoryList[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then((res) => {
        // console.log(res);
        this.cateDetailList[this.currentIndex].categoryDetail[type] = res;
      });
    },
    // 监听左侧菜单栏点击
    cateItemClick(index) {
      this._getSubcategory(index);
      this.$refs.Bscroll.Bscroll.scrollTo(0,0,300)
    },
  },
};
</script>

<style scoped>
#cateDetail {
  overflow: hidden;
  position: absolute;
  top: 44px;
  right: 0;
  left: 100px;
  bottom: 49px;
}
.cate-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 20px;
  z-index: 99;
}
.content {
  width: 100%;
  height: 574px;
}
.tab-control {
  position: relative;
  z-index: 999;
}
</style>