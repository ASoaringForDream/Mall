import { debounce } from "./utils";
import bus from "vue3-eventbus"; // 事件总线
export const itemListener = {
  data() {
    return {
      ItemListener: null,
      refresh:null
    }
  },
  mounted() {
    if (this.$refs.Bscroll.Bscroll)
      this.refresh = debounce(
        this.$refs.Bscroll.Bscroll.refresh,
        100,
        this.$refs.Bscroll.Bscroll
      )
    // 监听商品数据图片加载完成
    this.ItemListener = () => {
      // console.log(111);
      if (this.refresh) this.refresh();
    };
    bus.on("imgloaded", this.ItemListener);
  },
}