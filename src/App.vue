<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <router-view v-slot="{ Component }">
      <keep-alive exclude='Detail'>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/MainTabBar/MainTabBar.vue";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
