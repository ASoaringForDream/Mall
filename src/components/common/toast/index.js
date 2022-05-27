import { createVNode, render } from "vue";
import Toast from "./Toast.vue";
const div = document.createElement("div");
document.body.appendChild(div);
let time = null;

const toast = (message, duration = 2000) => {

  const NODE = createVNode(Toast, { message });
  render(null, div);
  render(NODE, div);
  clearTimeout(time);
  time = setTimeout(() => {
    let toast=document.querySelector('#toast')
    toast.classList.add('remove')
    let t=setTimeout(() => {
      render(null, div);
      clearTimeout(t)
    }, 250);
    clearTimeout(time)
  }, duration-300);
};
export default toast