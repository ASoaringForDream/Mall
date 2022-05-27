<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" alt="" @load="imageloaded" />
    </a>
  </div>
</template>

<script>
export default {
  name: "featureView",
  data() {
    return {
      isloaded: false,
    };
  },
  methods: {
    // 监听推荐页面图片加载完毕
    imageloaded() {
      if (!this.isloaded) {
        this.$emit("featureViewloaded");
        this.isloaded = true;
      }
    },
  },
};
</script>

<style scoped>
.feature img {
  width: 100%;
}
</style>