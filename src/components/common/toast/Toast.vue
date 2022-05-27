<template>
  <div id="toast" class="toast">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: "",
    },
  }
};
</script>

<style>
.toast {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px 10px;
  color: #fff;
  border-radius: 10px;
  animation: anima 0.5s;
}
@keyframes anima {
  0%{
    transform: translate(-50%, -100%);
    opacity: 0.5;
  }
  100%{
    transform: translate(-50%, 100%);
    opacity: 1;
  }
}
.remove{
  animation: remove 0.3s;
}
@keyframes remove {
  0%{
    transform: translate(-50%, 100%);
    opacity: 1;
  }
  100%{
    transform: translate(-50%, -100%);
    opacity: 0;
  }
}
</style>