import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const TimeKey = 'vue_timestamp_key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(TimeKey, Date.now())
}
export function getTimeStamp() {
  return Cookies.get(TimeKey)
}

export function setLang(lang) {
  return Cookies.set('lang', lang)
}

export function getLang() {
  return Cookies.get('lang')
}
