<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="tab-control-item"
      :class="{ tabcontrolactive: index === currentIndex }"
      @click="itemClicked(index)"
    >
      <span :class="{ tabcontrolspanactive: index === currentIndex }">{{
        item
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClicked(i) {
      this.currentIndex = i;
      this.$emit("tabClicked", i);
      this.$emit('scrollToTop');
    },
    
  },
};
</script>

<style scoped>
.tab-control {
  text-align: center;
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control span {
  padding: 5px;
}
.tabcontrolactive {
  color: var(--color-high-text);
}
.tabcontrolactive span {
  border-bottom: 3px solid var(--color-tint);
}
</style>