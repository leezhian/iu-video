/**
 * @description: 设置css style
 * @param {*} el dom
 * @param {Object} cssObj css对象
 * @return {*}
 */
export const cssHelper = (el, cssObj) => {
  for (let i in cssObj) {
    el.style[i] = cssObj[i]
  }
}

/**
 * @description: 判断 childNode 是否是 parentNode 的后代节点
 * @param {Element} parentNode 
 * @param {Element} childNode
 * @return {Boolean}
 */
export const isNodeContain = (parentNode, childNode) => {
  return parentNode.contains(childNode)
}

/**
 * @description: 格式化视频时间
 * @param {number} duration 秒
 * @return {string} mm:ss
 */
export const filterDuration = duration => {
  if (!duration) return '00:00'

  const minute = Math.floor(duration / 60)
  const second = Math.floor(duration % 60)

  return `${minute >= 10 ? minute : ('0' + minute)}:${second >= 10 ? second : ('0' + second)}`
}

/**
 * @description: 控制全屏
 * @param {Element} el 待全屏dom对象
 * @return {Promise}
 */
export const toFullVideo = el => {
  if (el.requestFullscreen) {
    return el.requestFullscreen()
  } else if (el.webkitRequestFullScreen) {
    return el.webkitRequestFullScreen()
  } else if (el.mozRequestFullScreen) {
    return el.mozRequestFullScreen()
  } else {
    return el.msRequestFullscreen()
  }
}

/**
 * @description: 退出全屏
 */
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

/**
 * @description: 开启画中画
 * @param {Element} el 视频对象
 * @return {Promise}
 */
export const toPicInPic = el => {
  return el.requestPictureInPicture().catch(() => {
    console.error('The video failed to open picture in picture')
  })
}

/**
 * @description: 关闭画中画
 */
export const exitPicInPic = () => {
  document.exitPictureInPicture().catch(() => {
    console.error('The video failed to close picture in picture')
  })
}

/**
 * @description: 发布订阅模式
 */
const observer = {
  clientList: {},
  listen(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }

    this.clientList[key].push(fn)
  },
  trigger() {
    const key = Array.prototype.shift.call(arguments)
    const fns = this.clientList[key]

    if (!fns || fns.listen === 0) {
      return false
    }

    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments)
    }
  },
  remove(key, fn) {
    const fns = this.clientList[key]

    if (!fns) {
      return false
    }

    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (let i = fns.length - 1; i >= 0; i--) {
        const _fn = fns[i]
        if (_fn === fn) {
          fns.splice(1, 1)
        }
      }
    }
  }
}

/**
 * @description: 安装发布订阅
 * @param {object} obj
 */
export const installObserver = obj => {
  for (let key in observer) {
    obj[key] = observer[key]
  }
}