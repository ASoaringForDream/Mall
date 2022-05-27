<template>
  <div class="addToCart" @click.self="backDetail">
    <div class="Info" ref="Info">
      <div class="back" @click="backDetail">
        <img src="~assets/img/detail/cancel.svg" alt="" />
      </div>
      <div class="title">
        <div class="imgbox"><img :src="TitleImg" alt="" /></div>
        <div class="Cart-Info">
          <div class="Info-title">{{ DetailInfo.title }}</div>
          <div class="chooseStyle">{{ chooseStyle }}</div>
          <div class="price-info">
            <span class="now-price">{{ nowprice }}</span>
            <span class="price">{{ oldprice }}</span>
          </div>
        </div>
      </div>
      <scroll class="content">
        <div class="cate">
          <div v-for="item in DetailInfo.labels" :key="item">
            <div class="label">{{ item.label }}</div>
            <div class="styleItem">
              <div
                :class="{ currentItem: isactive(i.styleId, i.sizeId) }"
                @click="choose(i.styleId, i.sizeId)"
                class="item"
                v-for="i in item.list"
                :key="i"
              >
                {{ i.name }}
              </div>
            </div>
          </div>
          <div class="label">
            数量：
            <div class="changeNum">
              <span @click="subpronum">-</span>
              <span class="pronum">{{ num }}</span>
              <span @click="addpronum">+</span>
            </div>
          </div>
        </div>
      </scroll>
      <div class="operate">
        <div class="btn" @click="btnClicked">{{ operate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"; //封装的better-scroll
export default {
  name: "AddToCart",
  props: {
    DetailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    operate: {
      type: String,
      default: "加入购物车",
    },
    pronum: {
      type: Number,
      default: 1,
    },
    style_Id: {
      type: Number,
      default: 1,
    },
    size_Id: {
      type: Number,
      default: 100,
    },
    stockId:{
      type: String,
      default: '',
    }
  },
  components: {
    Scroll,
  },
  computed: {
    TitleImg() {
      return this.DetailInfo.cate[this.currentIndex].img;
    },
    nowprice() {
      return (
        "￥" +
        (this.DetailInfo.cate[this.currentIndex].nowprice / 100).toFixed(2)
      );
    },
    oldprice() {
      return (
        "￥" + (this.DetailInfo.cate[this.currentIndex].price / 100).toFixed(2)
      );
    },
    chooseStyle() {
      return (
        "当前选择:“" +
        this.DetailInfo.labels[0].list[this.styleId - 1].name +
        "," +
        this.DetailInfo.labels[1].list[this.sizeId - 100].name +
        "” x" +
        this.num
      );
    },
  },
  data() {
    return {
      InfoStyle: {},
      currentIndex: 0,
      styleId: 1,
      sizeId: 100,
      num: 1,
    };
  },
  created() {
    this.styleId = this.style_Id;
    this.sizeId = this.size_Id;
    this.currentIndex=(this.styleId - 1) * this.DetailInfo.labels[1].list.length +
        this.sizeId -
        100;
  },
  mounted() {
    this.num = this.pronum;
    this.InfoStyle = this.$refs.Info.style;
    setTimeout(() => {
      this.scrollToShow();
    }, 100);
  },
  methods: {
    scrollToShow() {
      this.InfoStyle.transition = "transform 300ms";
      this.settransfrom();
    },
    settransfrom() {
      this.InfoStyle.transform = `translate3d(0,-70vh,0)`;
      this.InfoStyle["-webkit-transform"] = `translate3d(0,-70vh,0)`;
      this.InfoStyle["-ms-transform"] = `translate3d(0,-70vh,0)`;
    },
    backDetail() {
      this.InfoStyle.transition = "transform 300ms";
      this.InfoStyle.transform = `translate3d(0,0,0)`;
      this.InfoStyle["-webkit-transform"] = `translate3d(0,0,0)`;
      this.InfoStyle["-ms-transform"] = `translate3d(0,0,0)`;
      setTimeout(() => {
        this.$emit("backDetail");
      }, 290);
    },
    isactive(id1, id2) {
      return id1 === this.styleId || id2 === this.sizeId;
    },
    choose(id1, id2) {
      if (id1) {
        this.styleId = id1;
      }
      if (id2) {
        this.sizeId = id2;
      }
      this.currentIndex =
        (this.styleId - 1) * this.DetailInfo.labels[1].list.length +
        this.sizeId -
        100;
    },
    subpronum() {
      if (this.num > 1) {
        this.num--;
      }else{
        this.$toast('至少选择一件哦!')
      }
    },
    addpronum() {
      console.log(111);
      this.num++;
    },
    btnClicked() {
      if (this.operate === "加入购物车") {
        let shop = {};
        shop.id = this.DetailInfo.shopId; //店铺id
        shop.name = this.DetailInfo.shopName; //店铺名
        shop.logo = this.DetailInfo.shopLogo; //店铺logo
        shop.click = true; //被选中
        let pro = {};
        pro.stockId = this.DetailInfo.cate[this.currentIndex].stockId; //选中商品id
        pro.iid = this.DetailInfo.iid; //商品id
        pro.DetailInfo = this.DetailInfo; //详细信息
        pro.img = this.TitleImg; //商品图片
        pro.title = this.DetailInfo.title; //商品标题
        pro.desc = this.DetailInfo.desc; //商品描述
        pro.nowprice = this.nowprice; //商品价格
        pro.oldprice = this.oldprice; //商品原价
        pro.num = this.num; //商品数量
        pro.sizeId = this.sizeId; //商品尺码
        pro.styleId = this.styleId; //商品风格
        pro.click = true; //被选中
        shop.pro = []; //商品
        shop.pro.push(pro);
        // console.log(pro);
        // this.$store.commit('addCartPro',shop)
        this.$store.dispatch("addCartPro", shop);
        // console.log(this.$store.state.cartList);
        this.$parent.backDetail()
        this.$toast('加入购物车成功')
      } else if (this.operate === "确定") {
        let shop = {};
        shop.id = this.DetailInfo.shopId; //店铺id
        shop.name = this.DetailInfo.shopName; //店铺名
        shop.logo = this.DetailInfo.shopLogo; //店铺logo
        shop.click = true; //被选中
        let pro = {};
        pro.stockId = this.DetailInfo.cate[this.currentIndex].stockId; //选中商品id
        pro.iid = this.DetailInfo.iid; //商品id
        pro.DetailInfo = this.DetailInfo; //详细信息
        pro.img = this.TitleImg; //商品图片
        pro.title = this.DetailInfo.title; //商品标题
        pro.desc = this.DetailInfo.desc; //商品描述
        pro.nowprice = this.nowprice; //商品价格
        pro.oldprice = this.oldprice; //商品原价
        pro.num = this.num; //商品数量
        pro.sizeId = this.sizeId; //商品尺码
        pro.styleId = this.styleId; //商品风格
        pro.click = true; //被选中
        shop.pro = []; //商品
        shop.pro.push(pro);
        // console.log(shop);
        // console.log(this.stockId);
        this.$store.commit('changepro',[shop,this.stockId])
        this.$store.dispatch("addCartPro", shop);
        this.$parent.backDetail()
        this.$toast('修改选中商品成功')
      } else if (this.operate === "去结算") {
      }
    },
  },
};
</script>

<style scoped>
.addToCart {
  background-color: rgba(100, 100, 100, 0.7);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
}
.Info {
  position: absolute;
  top: 100vh;
  height: 70vh;
  width: 100vw;
  background-color: #fff;
  border-radius: 30px 30px 0 0;
}
.back {
  float: right;
  margin: 5px 10px 0 0;
  width: 32px;
  height: 32px;
}
.title {
  margin-top: 40px;
  margin-left: 10px;
  height: 120px;
  overflow: hidden;
}
.imgbox {
  float: left;
  height: 100%;
  width: 100px;
  border-radius: 10px;
  overflow: hidden;
}
.title img {
  width: 100px;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 160px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.Cart-Info {
  position: relative;
  float: right;
  width: calc(100% - 100px);
  padding: 10px 20px 0 10px;
  height: 120px;
}
.Info-title {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #333;
}
.chooseStyle {
  margin-top: 10px;
  padding: 10px 10px;
  color: var(--color-tint);
  /* border: 1px solid #aaa; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price-info {
  position: absolute;
  bottom: 0;
}
.price-info .now-price {
  font-size: 25px;
  color: var(--color-high-text);
}
.price-info .price {
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 5px;
}
.cate .label {
  line-height: 40px;
  padding-left: 10px;
  color: var(--color-high-text);
  border-bottom: 1px solid var(--color-tint);
}
.styleItem {
  display: flex;
  flex-wrap: wrap;
}
.styleItem .item {
  margin: 10px 20px;
  border: 1px solid #aaa;
  padding: 5px 10px;
  border-radius: 15px;
  color: #333;
}
.styleItem .currentItem {
  color: var(--color-high-text);
  border-color: var(--color-tint);
}
.changeNum {
  float: right;
  margin-right: 10px;
  text-align: center;
}
.changeNum span {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-tint);
  border-bottom: none;
}
.changeNum .pronum {
  border-left: none;
  border-right: none;
}
.operate {
  position: fixed;
  width: 100%;
  height: 49px;
  bottom: 0;
}
.operate .btn {
  margin: 7px auto;
  width: 70%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background-color: var(--color-tint);
  border-radius: 17px;
  color: #fff;
  font-size: 18px;
}
</style>