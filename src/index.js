/*
 * @Author: kim
 * @Date: 2021-01-06 14:23:17
 * @LastEditors: kim
 * @LastEditTime: 2021-01-06 15:49:57
 * @Description: 入口文件
 */
import IuVideo from './plugins/iuvideo.vue'

const components = [
  IuVideo
]

const install = function(Vue) {
  if(install.installed) return
  install.installed = true
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if(typeof window !== 'undefined' && window.Vue) {
  install(Window.Vue)
}

export default {
  install,
  ...components
}