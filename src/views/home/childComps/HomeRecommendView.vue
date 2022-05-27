<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imagesloaded">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'HomeRecommedView',
  data(){
    return {
      isloaded:false
    }
  },
  props:{
    // 推荐分类数据
    recommend:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    // 监听推荐分类加载完毕
    imagesloaded(){
      if(!this.isloaded){
        this.$emit('recommendloaded')
        this.isloaded=true
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  margin-bottom: 10px;
  height: 70px;
  width: 70px;
}
</style>