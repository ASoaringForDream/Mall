<template>
  <div id="detailNavBar" >
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backclicked">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template v-slot:center>
        <div id="title">
          <div
            class="title-item"
            v-for="(item, index) in titles"
            :key="item"
            :class="{ active: currentIndex === index }"
            @click="itemclicked(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"; //导航栏
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    itemclicked(i) {
      this.currentIndex = i
      this.$emit('scrollToIndex',i)
    },
    backclicked(){
      this.$router.back()
    }
  },
};
</script>

<style scoped>
#title {
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 10px;
}
</style>