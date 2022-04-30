<template>
  <div class="cate-detail">
    <my-grid :cols="3" :lineSpace="15" :v-margin="20" v-if="cateDetail.list">
      <div class="item" v-for="item in cateDetail.list" :key="item">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" @load="imgloaded" />
          <div class="item-text">{{ item.title }}</div>
        </a>
      </div>
    </my-grid>
  </div>
</template>

<script>
import MyGrid from "components/common/MyGrid/My_Grid.vue";
import bus from "vue3-eventbus";// 事件总线
export default {
  name: "CateDetail",
  components: {
    MyGrid,
  },
  props: {
    cateDetail: Object,
  },
  methods: {
    imgloaded() {
      bus.emit("imgloaded");
    },
  },
};
</script>

<style scoped>
.panel img {
  width: 100%;
}
.item {
  text-align: center;
  font-size: 12px;
}
.item-img {
  width: 80%;
}
.item-text {
  margin-top: 15px;
}
</style>