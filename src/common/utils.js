// 防抖函数
export function debounce(fun, delay = 500, _this = null, immediate = false) {
  let timer = null; //保存定时器
  let that = _this;
  return function (...args) {
    that = that === null ? this : that
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      if (!timer) fun.apply(that, args)
      timer = setTimeout(function () {
        timer = null;
      }, delay)
    } else {
      timer = setTimeout(function () {
        fun.apply(that, args);
      }, delay);
    }
  };
}
//格式化时间
export function dataFormat(dtStr){
  const dt=new Date(dtStr);
  const y=dt.getFullYear();
  const m=padZero(dt.getMonth()+1);
  const d=padZero(dt.getDay());
  const hh=padZero(dt.getHours());
  const mm=padZero(dt.getMinutes());
  const ss=padZero(dt.getSeconds());
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}
function padZero(n){
  return n>9?n:'0'+n;
}