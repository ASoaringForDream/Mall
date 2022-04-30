<template>
  <div class="my_grid" ref="my_grid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "My_Grid",
  props: {
    cols: {
      type: Number,
      default: 2,
    },
    hPadding: {
      type: Number,
      default: 8,
    },
    wPadding: {
      type: Number,
      default: 8,
    },
    itemSpace: {
      type: Number,
      default: 8,
    },
    lineSpace: {
      type: Number,
      default: 8,
    },
  },
  mounted() {
    setTimeout(this.init,50)
  },
  updated(){
    this.init()
  },
  methods:{
    init(){
      const grid=this.$refs.my_grid;
      const child=grid.children
      grid.style.padding=`${this.hPadding}px ${this.wPadding}px`

      const Item_width=(grid.clientWidth - 2*this.wPadding -(this.cols-1)*this.itemSpace)/this.cols
      for (let i = 0; i < child.length; i++) {
          let item = child[i];
          item.style.width = Item_width + 'px';
          if ((i+1) % this.cols !== 0) {
            item.style.marginRight = this.itemSpace + 'px'
          }
          if (i >= this.cols) {
            item.style.marginTop = this.lineSpace + 'px'
          }
        }
    }
  }
};
</script>

<style scoped>
.my_grid {
  display: flex;
  flex-wrap: wrap;
}
</style>