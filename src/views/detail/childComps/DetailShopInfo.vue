<template>
  <div class="shopInfo">
    <div class="title">
      <img :src="shop.logo" alt="" />
      <span>{{ shop.name }}</span>
    </div>
    <div class="info">
      <div class="goodsInfo">
        <div class="sell">
          <div class="number">
            {{ sellCount }}
          </div>
          <div class="decri">总销量</div>
        </div>
        <div class="goods">
          <div class="number">{{ shop.cGoods }}</div>
          <div class="decri">全部宝贝</div>
        </div>
      </div>
      <div class="scoreInfo">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="enter">
      <div>进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    sellCount() {
      if (this.shop.cSells < 10000) return this.shop.cSells;
      return (this.shop.cSells / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.shopInfo {
  padding-top: 6.66667vw;
  padding-bottom: 6.66667vw;
  padding-left: 2.13333vw;
  padding-right: 2.13333vw;
  text-align: center;
  border-bottom: 5px solid #f2f5f8;
}
.title {
  height: 50px;
  vertical-align: middle;
  text-align: left;
}
.title span {
  position: relative;
  bottom: 15px;
  margin-left: 2.66667vw;
  color: var(--color-text);
}
.title img {
  width: 40px;
  height: 40px;
  border-radius: 25px;
}
.info {
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
}
.info div {
  flex: 1;
}
.info .goodsInfo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #333;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.info .goodsInfo div {
  flex: 1;
}
.number {
  font-size: 20px;
}
.decri {
  margin-top: 12px;
  font-size: 12px;
}
.info .scoreInfo {
  font-size: 13px;
  color: #333;
}
.info .scoreInfo table {
  width: 120px;
  margin-left: 30px;
}
.info .scoreInfo table td {
  padding: 5px 0;
}
.score {
  color: #5ea732;
}
.better span {
  color: #fff;
  background-color: #5ea732;
}
.score-better {
  color: #f13e3a;
}
.better-more span {
  background-color: #f13e3a;
}
.enter {
  margin-top: 10px;
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
</style>