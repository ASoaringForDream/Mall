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
    render(null, div);
  }, duration);
};
export default toast