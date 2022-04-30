<template>
  <div class="products">
    <products-list-item v-for="item in products" :key="item" :productitem="item">

    </products-list-item>
  </div>
</template>

<script>
  import ProductsListItem from './ProductsListItem';
export default {
  name:'ProductsList',
  props:{
    products:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    ProductsListItem
  }
}
</script>

<style scoped>
 .products {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   width: 100%;
   padding-left: 1vw;
   padding-right: 1vw;
   box-sizing: border-box;
 }

</style>