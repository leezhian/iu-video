/*
 * @Author: kim
 * @Date: 2021-01-06 14:23:17
 * @LastEditors: kim
 * @LastEditTime: 2021-01-06 16:37:14
 * @Description: 入口文件
 */
import IuVideo from './iuvideo.vue'

IuVideo.install = function (Vue) {
  Vue.component(IuVideo.name, IuVideo)
  // if (typeof window !== 'undefined' && window.Vue) {
  //   install(Window.Vue)
  // }
}

export default IuVideo