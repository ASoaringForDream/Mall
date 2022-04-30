<template>
  <transition name="fade">
    <div class="toast" v-show="isShow">
      {{ message }}
    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: "",
    },
  },
  setup() {
    const isShow = ref(false);
    onMounted(() => {
      isShow.value = true;
    });
    return { isShow };
  },
};
</script>

<style>
.toast {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px 10px;
  color: #fff;
  border-radius: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .8s;
}
.fade-enter {
  transform: translate(-50%, -100%);
}
.fade-leave-to {
  transform: translate(-50%, -100%);
}
.fade-leave {
  transform: translate(-50%, 200%);
}
.fade-enter-to {
  transform: translate(-50%, 200%);
}
</style>