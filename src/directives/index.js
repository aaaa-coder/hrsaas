export const imageerror = {
  inserted(dom, options) {
    // 应该在错误时间内，将src改为value
    // console.log(dom, options.value)
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
