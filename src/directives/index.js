export const imageerror = {
  inserted(dom, options) {
    // 初始化头像
    // dom.src = dom.scr || options.value
    // 应该在错误时间内，将src改为value
    // console.log(dom, options.value)
    dom.onerror = function() {
      dom.src = options.value
    }
  },
  componentUpdated(dom, options) {
    // 没有头像就进行修改
    dom.src = dom.scr || options.value
  }
}
