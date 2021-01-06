/*
 * @Author: kim
 * @Date: 2021-01-06 15:50:11
 * @LastEditors: kim
 * @LastEditTime: 2021-01-06 15:50:55
 * @Description: 入口文件，按需引入
 */
import IuVideo from './iuvideo.vue'

// 为组件添加 install 方法，用于按需引入
IuVideo.install = function (Vue) {
    Vue.component(IuVideo.name, IuVideo)
}

export default IuVideo