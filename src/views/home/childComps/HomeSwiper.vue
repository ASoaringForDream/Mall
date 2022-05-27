<template>
  <div>
    <swiper ref="swiper" v-if="banners.length > 0">
      <template v-slot:default>
        <swiper-item v-for="item in banners" :key="item">
          <template v-slot:default>
            <a :href="item.link">
              <img :src="item.image" alt="" @load="imageLoaded" />
            </a>
          </template>
        </swiper-item>
      </template>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "HomeSwiper",
  props: {
    // 轮播图数据
    banners: {
      type: Array,
      requied: true,
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    // 开启轮播图定时器
    startTimer() {
      this.$refs.swiper && this.$refs.swiper.startTimer();
    },
    // 关闭轮班图定时器
    stopTimer() {
      this.$refs.swiper && this.$refs.swiper.stopTimer();
    },
    // 监听轮班图加载完毕
    imageLoaded() {
      if (!this.isLoaded) {
        this.$emit("swiperLoaded");
        this.isLoaded = true;
      }
    },
  },
};
</script>

<style scoped>
</style>