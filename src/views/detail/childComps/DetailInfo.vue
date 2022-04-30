<template>
  <div v-if="Object.keys(goods).length !== 0" class="Info">
    <div class="title">{{ goods.title }}</div>
    <div class="price">
      <span class="new-price">{{ goods.newPrice }}</span
      ><span class="old-price">{{ goods.oldPrice }}</span
      ><span class="discount" v-if="goods.discount">{{ goods.discount }}</span>
    </div>
    <div class="others">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="services">
      <span
        v-for="index in goods.services.length - 1"
        :key="goods.services[index - 1]"
      >
        <span class="imgbox"> <img :src="goods.services[index - 1].icon" alt="" /></span>
        {{ goods.services[index - 1].name }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  props: {
    goods: {
      type: Object,
      default(){
        return {}
      }
    },
  },
};
</script>

<style scoped>
.Info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.title {
  color: #222;
}
.price {
  margin-top: 10px;
}
.new-price {
  font-size: 28px;
  color: var(--color-high-text);
}
.old-price {
  margin-right: 5px;
  margin-left: 8px;
  font-size: 15px;
  text-decoration: line-through;
}
.discount {
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 5px;
  padding-right: 5px;
  position: relative;
  bottom: 8px;
  display: inline-block;
  text-align: center;
  color: #fff;
  font-size: 16px;
  border-radius: 8px;
  background-color: var(--color-high-text);
}
.others {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-bottom: 5px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, .2);
}
.services {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  color: #666;
  font-size: 12px;
}
.services .imgbox {
  border: 1px solid #ccc;
}
.services img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
</style>