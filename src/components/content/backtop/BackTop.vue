<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:'BackTop'
}
</script>

<style>
  .back-top{
    position: fixed;
    bottom: 60px;
    right: 20px;
    height: 50px;
    width: 50px;
    z-index: 99;
  }
  .back-top img {
    width: 100%;
  }
</style>