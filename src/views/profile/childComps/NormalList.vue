<template>
  <div class="normallist">
    <div v-for="item in listItem" :key="item" class="item" @click="itemClicked(item)">
      <span class="icon">
        <img :src="iconURL(item)" alt="" />
      </span>
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NormalList",
  props: {
    listItem: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    iconURL(item) {
      return require('assets/img/profile/' + item.icon)
    },
    itemClicked(item) {
      if(item.info==="我的购物车"){
        // console.log(111);
        this.$router.push('/shopcart')
      }
    }
  },
};
</script>

<style>
  .normallist {
    border-top: 10px solid #f2f2f2;
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  .normallist .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .icon img {
    width: 20px;
    height: 20px;
  }

  .item .icon {
    margin-top: 10px;
    position: absolute;
    left: 16px;
    top: -7px;
  }

  .item .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }
</style>