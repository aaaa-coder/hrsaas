/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isValidMobile(data) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(data)
}

export function isValidPassword(data) {
  return data.length >= 6 && data.length <= 16
}
