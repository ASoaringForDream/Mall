<template>
  <div class="box">
    <div
      class="cartlistitem"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <div
        class="checkbox"
        :class="{ active: pro.click }"
        @click="checkboxclicked"
      >
        <img src="~assets/img/cart/tick.svg" alt="" />
      </div>
      <div class="item-img" @click="oneProductionisClicked">
        <img :src="pro.img" alt="" />
      </div>
      <div class="item-info">
        <div class="title">{{ pro.title }}</div>
        <div ref="choosestyle" class="choosestyle" @click="chooseSty">
          {{ chooseStyle }}
          <span ref="imgbox" class="imgbox"
            ><img src="~assets/img/cart/slidedown.svg" alt=""
          /></span>
        </div>
        <div class="price">
          <span class="nowprice">{{ pro.nowprice }}</span>
          <span class="oldprice">{{ pro.oldprice }}</span>
          <div class="num">
            <span>x{{ pro.num }}</span>
          </div>
        </div>
      </div>
      <div id="delbox" v-if="isDelShow">
        <span id="del" @click="delPro">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "vue3-eventbus"; // 事件总线
export default {
  name: "CartListItem",
  props: {
    pro: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isDelShow: false,
    };
  },
  components: {},
  computed: {
    chooseStyle() {
      return (
        this.pro.DetailInfo.labels[0].list[this.pro.styleId - 1].name +
        "," +
        this.pro.DetailInfo.labels[1].list[this.pro.sizeId - 100].name
      );
    },
  },
  created() {
    bus.on("delClose", () => {
      // console.log(111);
      this.isDelShow = false;
    });
  },
  activated() {
    let timer = setInterval(() => {
      if (this.$refs.choosestyle.clientWidth !== 0) {
        if (this.$refs.choosestyle.clientWidth >= 200) {
          this.$refs.choosestyle.style.width = "200px";
        }
        clearInterval(timer);
      }
    }, 50);
  },
  methods: {
    checkboxclicked() {
      this.$store.commit("changeItemClick", [
        this.pro.stockId,
        !this.pro.click,
      ]);
    },
    chooseSty() {
      if (this.time) {
        bus.emit("changeSty", this.pro);
      }
    },
    backDetail() {
      this.isChengeStyshow = false;
    },
    touchStart() {
      this.time = setTimeout(() => {
        clearTimeout(this.time);
        this.time = null;
        this.isDelShow = true;
      }, 1000);
    },
    touchMove() {
      if (this.time) {
        clearTimeout(this.time);
      }
    },
    touchEnd() {
      if (this.time) {
        clearTimeout(this.time);
      }
    },
    delPro() {
      // console.log("删除商品");
      this.$store.commit("delPro", this.pro.stockId);
      this.isDelShow = false;
    },
    oneProductionisClicked() {
      this.$router.push({
        path: "/detail",
        query: {
          id: this.pro.iid,
        },
      });
    },
  },
};
</script>

<style scoped>
.cartlistitem {
  margin: 5px 0;
  height: 100px;
  position: relative;
  border-bottom: 1px solid #ccc;
}
.checkbox {
  position: absolute;
  left: 3px;
  top: 36px;
  border: 2px solid #ccc;
  width: 18px;
  height: 18px;
  border-radius: 9px;
}
.active {
  background-color: #ff8198;
  border-color: #ff8198;
}
.item-img {
  overflow: hidden;
  position: absolute;
  left: 25px;
  width: 60px;
  height: 90px;
}
.item-img img {
  width: 100%;
  border-radius: 5px;
}
.title {
  position: absolute;
  left: 90px;
  top: 10px;
  right: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
}
.choosestyle {
  position: absolute;
  left: 90px;
  bottom: 25px;
  margin: 10px 20px;
  border: 1px solid #aaa;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 16px;
  color: #333;
  padding-right: 30px;
  /* width: 200px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.choosestyle .imgbox {
  position: absolute;
  right: 10px;
  top: 5px;
}
.choosestyle img {
  width: 15px;
  height: 15px;
}
.price {
  position: absolute;
  left: 90px;
  bottom: 10px;
  right: 0;
}
.nowprice {
  font-size: 20px;
  color: var(--color-high-text);
}
.oldprice {
  margin-left: 10px;
  font-size: 14px;
  text-decoration: line-through;
}
.num {
  position: absolute;
  right: 5px;
  bottom: 0px;
}
.num span {
  text-align: center;
  display: inline-block;
  width: 20px;
  height: 20px;
}
.num .counter {
  width: 40px;
}
#delbox {
  width: 100%;
  height: 100%;
  background-color: rgba(100, 100, 100, 0.8);
  position: absolute;
  z-index: 99;
}
#del {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 22px;
  background-color: red;
  border-radius: 40px;
  line-height: 80px;
  text-align: center;
}
</style>