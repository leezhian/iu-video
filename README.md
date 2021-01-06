# iu-video

小巧的 视频播放器（vue3版）



## Props

- `title: {string}`  视频标题，不传则不显示。
- `dataSource: {array}`  视频源。
  - `type: {string}` 视频类型，如 `video/mp4` 等。
  - `url: {string}` 视频链接。

- `options: {object}` 配置项。



## 配置 `options`

- `size: {object}` 设置视频窗口宽高。
  - `width: {number}` 视频窗口宽度，默认 512px。
  - `height: {number}` 视频窗口高度，默认 288px。
- `autoFit: {boolean}` 视频窗口是否自适应宽高，默认 `false`。注意：开启时 `width`、`height` 会失效。
- `autoplay: {boolean}` 视频自动播放，默认 `false` 。
- `muted: {boolean}` 静音，默认 `false`。
- `loop: {boolean}` 是否循环播放，默认 `false`。
- `disablePictureInPicture: {boolean}` 禁止画中画，默认 `false`。
- `controls: {boolean}` 是否显示控件，默认 `true`。
- `controlBar: {object}` 选择显示自己的控件集。
  - `fullScreen: {boolean}`  全屏控件，默认 `true`。
  - `volume: {boolean}` 音量控件，默认 `true`。
  - `timeDivider: {boolean}`  时间分频器，默认 `true`。
  - `speed: {boolean}`  速率，默认 `true`。
- `preload: {string}`
- `speed: {object}` 视频速率配置。
  - `options: {Array}` 速率选择菜单。
    - `label: {string}` 菜单选项名。
    - `value: {number}` 菜单选项值。
  - `defaultValue: {number}` 默认选项。
- `playCallback: {function}` 视频播放暂停回调，同时会回传一个布尔值，`false`是播放中，`true`是暂停。
- `endedCallback: {function}` 视频播放完毕回调。
- `mutedCallback: {function}` 静音回调，同时会回传一个布尔值，`false`是静音，`true`是静音。



**默认配置项**👇

```javascript
{
    size: {
        width: 512,
    	height: 288,
    },
    autoFit: false,
    autoplay: false,
    muted: false,
    loop: false,
    disablePictureInPicture: false,
    controls: true,
  	controlBar: {
    	fullScreen: true,
    	volume: true,
    	timeDivider: true,
    	speed: true,
  	},
    preload: 'metadata',
    speed: {
      options: [
        {
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
```



## 基本使用

```vue
<template>
	<iu-video :dataSource="dataSource" title="基本使用">
</template>

<script>
	import { reactive } from 'vue'
    export default {
        setup() {
            const dataSource = reactive([
                type: 'video/mp4',
                url: 'https://xxx.mp4'
            ])
            
            return {
                dataSource
            }
        }
    }
</script>
```

