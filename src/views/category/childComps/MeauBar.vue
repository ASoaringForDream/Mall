<template>
  <scroll id="cate-menu" ref="Bscroll">
    <div class="menuBar">
      <!-- {{ cateList }} -->
      <div
        class="cateListItem"
        :class="{cateListItemactive:currentIndex===index}"
        v-for="(item, index) in cateList"
        :key="item"
        @click="cateItemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"; //封装的better-scroll
export default {
  name: "MenuBar",
  data(){
    return {
      currentIndex:0
    }
  },
  components: {
    Scroll,
  },
  props: {
    cateList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  updated(){
    this.refresh()
  },
  methods: {
    cateItemClick(index) {
      this.currentIndex=index
      this.$emit('cateItemClick',index)
    },
    refresh(){
      this.$refs.Bscroll.Bscroll && this.$refs.Bscroll.Bscroll.refresh()
    }
  },
};
</script>

<style>
#cate-menu {
  background-color: #f6f6f6;
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 49px;
  width: 100px;
}
.menuBar {
  height: 100%;
  width: 100px;
}
.cateListItem {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.cateListItemactive {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>