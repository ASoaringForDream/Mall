<template>
  <div>
    <swiper
      class="DetailSwiper"
      :style="{ height: swiperHeight + 'px' }"
      ref="swiper"
      v-if="banners.length > 0"
    >
      <template v-slot:default>
        <swiper-item v-for="(item, index) in banners" :key="item">
          <template v-slot:default>
            <img ref="imgItem" :src="item" alt="" @load="imageLoaded(index)" />
          </template>
        </swiper-item>
      </template>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "DetailSwiper",
  props: {
    banners: {
      type: Array,
      requied: true,
    },
  },
  data() {
    return {
      swiperHeight: 500,
      isloaded: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    startTimer() {
      this.$refs.swiper && this.$refs.swiper.startTimer();
    },
    stopTimer() {
      this.$refs.swiper && this.$refs.swiper.stopTimer();
    },
    imageLoaded(index) {
      let min = this.$refs.imgItem[0].height;
      for (let item of this.$refs.imgItem) {
        if (min > item.height) {
          min = item.height;
        }
      }
      this.swiperHeight = min;
      this.isloaded = true;
      this.$emit('swiperimage')
    },
  },
};
</script>

<style scoped>
.DetailSwiper {
  background-color: #fff;
  height: 500px;
  overflow: hidden;
}
</style>