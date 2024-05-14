import { Loading } from "element-ui";
import { debounce } from "./index";

let count = 0;
let loading = null;

const loadingOpen = (h = {}) => {
  loading = Loading.service({
    lock: true,
    text: h.text || "加载中",
    target: h.target || document.querySelector(".main-contain"),
    background: "rgba(255,255,255,.5)",
  });
};

const loadingClose = debounce(() => {
  loading && loading.close();
  loading = null;
}, 300);

export const show = (h) => {
  count == 0 && !loading && loadingOpen(h);
  h && loading.setText(h.text || "加载中");
  count++;
};

export const hide = () => {
  if (count <= 0) return;
  count--;
  count = Math.max(count, 0);
  count === 0 && loadingClose();
};
