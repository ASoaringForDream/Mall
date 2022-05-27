<template>
  <div class="wrapper" ref="scrollwrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import MouseWheel from "@better-scroll/mouse-wheel";
Bscroll.use(Pullup);
Bscroll.use(MouseWheel);
export default {
  name: "Scroll",
  data() {
    return {
      Bscroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      default: false,
    },
  },
  mounted() {
    //新建BScroll对象
    this.Bscroll = new Bscroll(this.$refs.scrollwrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true
    });
    // console.log(this.Bscroll);
    // 监听上拉加载更多
    if (this.pullUpLoad instanceof Object === true || this.pullUpLoad===true) {
      this.Bscroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
    // 监听滚动
    if (this.probeType >= 2) {
      this.Bscroll.on("scroll", (position) => {
        this.$emit("scrolling", position);
      });
    }
  },
};
</script>

<style scoped>
</style>