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
    prototype: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      default: false,
    },
  },
  mounted() {
    // console.log(document.querySelector('.wrapper').querySelector(('.content')).clientHeight);
    this.Bscroll = new Bscroll(this.$refs.scrollwrapper, {
      probeType: this.prototype,
      pullUpLoad: this.pullUpLoad,
      click: true,
    });
    // console.log(this.Bscroll);
    if (this.pullUpLoad instanceof Object === true || this.pullUpLoad===true) {
      this.Bscroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
    if (this.prototype >= 2) {
      this.Bscroll.on("scroll", (position) => {
        this.$emit("scrolling", position);
      });
    }
  },
};
</script>

<style scoped>
</style>