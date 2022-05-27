<template>
  <div id="home-swiper">
    <div
      ref="swiper"
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <div class="indicator">
      <slot v-if="showIndicator && slideCount > 1" name="indicator">
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{ indicatoritemactive: index === currentIndex - 1 }"
          :key="item"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000,
    },
    animDuration: {
      type: Number,
      default: 300,
    },
    moveRatio: {
      type: Number,
      default: 0.3,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      slideCount: 0, // 元素个数
      totalWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false, // 是否正在滚动
    };
  },
  mounted() {
    setTimeout(() => {
      this.handleDom();
      this.startTimer();
    }, 100);
  },
  methods: {
    handleDom() {
      let swiper = this.$refs.swiper;
      let slides = swiper.querySelectorAll(".slide");

      this.slideCount = slides.length;
      if (this.slideCount > 1) {
        let cloneFirst = slides[0].cloneNode(true);
        let classLast = slides[this.slideCount - 1].cloneNode(true);
        swiper.insertBefore(classLast, slides[0]);
        swiper.appendChild(cloneFirst);
        // 获取swiper的宽度
        this.totalWidth = swiper.offsetWidth;
        // 获取swiper的行内样式
        this.swiperStyle = swiper.style;
      }
      this.setTransform(-this.totalWidth);
    },
    setTransform(length) {
      this.swiperStyle.transform = `translate3d(${length}px,0,0)`;
      this.swiperStyle["-webkit-transform"] = `translate3d(${length}px,0,0)`;
      this.swiperStyle["-ms-transform"] = `translate3d(${length}px,0,0)`;
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    scrollContent(transformlength) {
      this.scrolling = true;
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      this.setTransform(transformlength);
      this.checkPosition();
      this.scrolling = false;
    },
    checkPosition() {
      setTimeout(() => {
        this.swiperStyle.transition = "";
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
      }, this.animDuration);
    },
    touchStart(event) {
      if (this.scrolling) {
        return;
      }
      this.stopTimer();
      this.startX = event.touches[0].pageX;
    },
    touchMove(event) {
      this.currentX = event.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentP = -this.currentIndex * this.totalWidth;
      let moveDis = this.distance + currentP;
      this.setTransform(moveDis);
    },
    touchEnd() {
      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        this.distance > this.totalWidth * this.moveRatio
      ) {
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        -this.distance > this.totalWidth * this.moveRatio
      ) {
        this.currentIndex++;
      }
      this.scrollContent(-this.currentIndex * this.totalWidth);
      this.startTimer();
    },
  },
};
</script>
  
<style scoped>
#home-swiper {
  overflow: hidden;
  position: relative;
}
.swiper {
  display: flex;
}
.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}
.indicatoritemactive {
  background-color: rgb(212, 62, 46);
}
.slide {
  width: 100%;
  flex-shrink: 0;
  z-index: 1;
}
.slide img {
  width: 100%;
}
</style>