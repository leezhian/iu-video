/*
 * @Author: kim
 * @Date: 2020-12-30 15:55:24
 * @LastEditors: kim
 * @LastEditTime: 2021-01-06 10:50:00
 * @Description: 配置文件
 */
/**
 * @description: 默认配置
 * 回调函数： playCallback: (status) => {} 暂停开始回调 false是播放中 true是暂停
 * endedCallback 视频播放完毕回调
 */
export const defaultConfig = {
  size: {
    width: 512,
    height: 288
  },
  autoFit: false, // 是否自适应，开启后width、height失效
  autoplay: false, // 如果为true,浏览器准备好时开始回放
  muted: false, // 默认情况下将会消除任何音频
  loop: false, // 循环
  disablePictureInPicture: false, // 禁止画中画
  controls: true, // 视频控制条是否显示
  controlBar: {
    fullScreen: true, // 全屏
    volume: true, // 音量
    timeDivider: true, // 时间
    speed: true, // 速度
  },
  preload: 'metadata',
  speed: {
    options: [{
        label: '0.5x',
        value: 0.5
      },
      {
        label: '1.0x',
        value: 1
      },
      {
        label: '1.5x',
        value: 1.5
      },
      {
        label: '2.0x',
        value: 2
      }
    ],
    defaultValue: 1
  }
}