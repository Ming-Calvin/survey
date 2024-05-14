// 点击指定元素外的任何区域触发一个回调函数
import Vue from "vue";
Vue.directive("clickOutSide", {
  // 绑定指令
  bind: function (el, binding) {
    el.clickOutsideEvent = function (event) {
      //删除按钮
      const isDeleteBtn =
        event.target.className.includes("confirmDeleteOption") ||
        event.target.className.includes("cancelDeleteOption") ||
        event.target.parentNode.className.includes("confirmDeleteOption") ||
        event.target.parentNode.className.includes("cancelDeleteOption");

      // 判断点击事件是否绑定在元素内部
      binding.value.handler(
        binding.value.params,
        // 本节点 或者 子节点  或者 节点被删除 或者 删除按钮
        el == event.target ||
          el.contains(event.target) ||
          !document.contains(event.target) ||
          isDeleteBtn
      );
    };

    // 绑定点击事件到document对象上
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  // 解绑指令
  unbind: function (el) {
    // 解绑事件监听器
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});
