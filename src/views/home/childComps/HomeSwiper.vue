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
    startTimer() {
      this.$refs.swiper && this.$refs.swiper.startTimer();
    },
    stopTimer() {
      this.$refs.swiper && this.$refs.swiper.stopTimer();
    },
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