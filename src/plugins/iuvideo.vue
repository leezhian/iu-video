<template>
  <div
    class="iuvideo"
    ref="videoWrapRef"
    @mousemove="handleMousemoveVideo"
    @mouseleave="handleMouseoutVideo"
  >
    <transition name="fade">
      <div class="iuvideo-header" v-show="title && controlVisiable">
        <h3 class="iuvideo-title">{{ title }}</h3>
      </div>
    </transition>

    <video
      class="iuvideo-player"
      ref="videoRef"
      @click="handlePlayAndPause"
      @dblclick="handleFullScreen"
    >
      <source
        :src="item.url"
        :type="item.type"
        v-for="(item, index) in dataSource"
        :key="index"
      />
    </video>

    <transition name="fade">
      <div
        class="iuvideo-control-wrap"
        ref="videoControlRef"
        v-show="controlVisiable"
      >
        <div class="iuvideo-control-top">
          <div
            class="iuvideo-progress-slider"
            @mouseenter="handleFocusProgress"
            @mouseleave="handleBlurProgress"
            @mousedown="handleTouchStartProgress"
            @mousemove="handleTouchMoveProgress"
            @mouseup="handleTouchEndProgress"
          >
            <div class="iuvideo-progress-bar">
              <div class="bar-buffer"></div>
              <div class="bar-progress"></div>

              <transition name="fade">
                <div class="bar-progress-dot" v-show="dotVisiable"></div>
              </transition>
            </div>
          </div>
        </div>
        <div class="iuvideo-control-bottom">
          <div class="iuvideo-control-b-left">
            <div class="iuvideo-control-btn" @click="handlePlayAndPause">
              <span class="iuvideo-control-svg">
                <!-- 播放和暂停 -->
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="#fff"
                >
                  <g v-if="isPaused">
                    <path
                      d="M852.727563 392.447107C956.997809 458.473635 956.941389 565.559517 852.727563 631.55032L281.888889 993.019655C177.618644 1059.046186 93.090909 1016.054114 93.090909 897.137364L93.090909 126.860063C93.090909 7.879206 177.675064-35.013033 281.888889 30.977769L852.727563 392.447107 852.727563 392.447107Z"
                    ></path>
                  </g>
                  <g v-else>
                    <path
                      d="M309.3 130.7h-70.9c-24.3 0-44 19.7-44 44v674.5c0 24.3 19.7 44 44 44h70.9c24.3 0 44-19.7 44-44V174.7c0-24.3-19.7-44-44-44z m476.3 0h-70.9c-24.3 0-44 19.7-44 44v674.5c0 24.3 19.7 44 44 44h70.9c24.3 0 44-19.7 44-44V174.7c0-24.3-19.7-44-44-44z"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>

            <div
              class="iuvideo-control-duration"
              v-if="config.controlBar.timeDivider"
            >
              {{ filterDuration(currentTime) }} / {{ filterDuration(duration) }}
            </div>
          </div>

          <div class="iuvideo-control-b-right">
            <!-- <div class="iuvideo-control-btn iuvideo-control-btn-quality">
              <button class="iuvideo-control-quality-name">1080p</button>
            </div> -->

            <div
              class="iuvideo-control-btn iuvideo-control-btn-speed"
              v-if="config.controlBar.speed"
              @mouseenter="handleHoverSpeed"
              @mouseleave="handleBlurSpeed"
            >
              <button class="iuvideo-control-speed-name">
                {{ speed.label }}
              </button>

              <ul
                class="speed-menu"
                @click="handleClickSpeedMenu"
                v-show="speedMenuVisiable && config.speed.options.length"
              >
                <li
                  :class="[
                    'speed-menu-item',
                    { active: speed.value === item.value },
                  ]"
                  :data-value="item.value"
                  v-for="(item, index) in config.speed.options"
                  :key="index"
                >
                  {{ item.label }}
                </li>
              </ul>
            </div>

            <div
              class="iuvideo-control-btn iuvideo-control-btn-volume"
              v-if="config.controlBar.volume"
              @mouseenter="handleHoverVolume"
              @mouseleave="handleBlurVolume"
            >
              <span class="iuvideo-control-svg" @click="handleMuted">
                <!-- 音量 -->
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="#fff"
                >
                  <g v-if="!isMuted">
                    <path
                      d="M779.946667 357.12a42.666667 42.666667 0 1 0-66.56 53.76 170.666667 170.666667 0 0 1 0 202.24A42.666667 42.666667 0 0 0 746.666667 682.666667a42.666667 42.666667 0 0 0 33.28-15.786667 256 256 0 0 0 0-309.76z"
                    ></path>
                    <path
                      d="M837.973333 223.146667a42.666667 42.666667 0 1 0-54.613333 65.706666A290.133333 290.133333 0 0 1 896 512a290.133333 290.133333 0 0 1-112.64 223.146667 42.666667 42.666667 0 0 0-5.546667 60.16A42.666667 42.666667 0 0 0 810.666667 810.666667a42.666667 42.666667 0 0 0 27.306666-9.813334A373.333333 373.333333 0 0 0 981.333333 512a373.333333 373.333333 0 0 0-143.36-288.853333zM617.386667 133.12a42.666667 42.666667 0 0 0-42.666667 0L298.666667 322.986667H85.333333a42.666667 42.666667 0 0 0-42.666666 42.666666v292.693334a42.666667 42.666667 0 0 0 42.666666 42.666666h213.333334l273.493333 187.733334A45.226667 45.226667 0 0 0 597.333333 896a42.666667 42.666667 0 0 0 42.666667-42.666667V170.666667a42.666667 42.666667 0 0 0-22.613333-37.546667z"
                    ></path>
                  </g>

                  <g v-else>
                    <path
                      d="M721.493333 600.746667l61.44 61.44a256 256 0 0 0-2.986666-305.066667 42.666667 42.666667 0 1 0-66.56 53.76 170.666667 170.666667 0 0 1 8.106666 189.866667z"
                    ></path>
                    <path
                      d="M896 512a277.76 277.76 0 0 1-75.946667 187.306667l60.586667 60.586666A363.946667 363.946667 0 0 0 981.333333 512a373.333333 373.333333 0 0 0-143.36-288.853333 42.666667 42.666667 0 1 0-54.613333 65.706666A290.133333 290.133333 0 0 1 896 512zM640 519.253333V170.666667a42.666667 42.666667 0 0 0-66.986667-35.413334L384 264.533333zM202.24 322.986667H85.333333a42.666667 42.666667 0 0 0-42.666666 42.666666v292.693334a42.666667 42.666667 0 0 0 42.666666 42.666666h213.333334l273.493333 187.733334A45.226667 45.226667 0 0 0 597.333333 896a42.666667 42.666667 0 0 0 42.666667-42.666667v-92.586666zM200.96 140.373333a42.666667 42.666667 0 0 0-60.586667 60.586667l682.666667 682.666667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z"
                    ></path>
                  </g>
                </svg>
              </span>

              <div class="volume-control" v-show="volumeControlVisiable">
                <div class="volume-num">{{ Math.floor(volume * 100) }}</div>
                <div
                  class="volume-bar-wrap"
                  @mousedown="handleTouchStartVolume"
                  @mousemove="handleTouchMoveVolume"
                  @mouseup="handleTouchEndVolume"
                >
                  <div class="volume-bar">
                    <div class="volume-progress"></div>
                  </div>
                  <div class="volume-dot"></div>
                </div>
              </div>
            </div>

            <div
              class="iuvideo-control-btn iuvideo-control-btn-picture"
              v-if="!config.disablePictureInPicture"
              @click="handlePicInPic"
            >
              <!-- 画中画 -->
              <span class="iuvideo-control-svg">
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="#fff"
                >
                  <g v-if="!isPicInPic">
                    <path
                      d="M896 128a42.666667 42.666667 0 0 1 42.666667 42.666667v298.666666h-85.333334V213.333333H170.666667v597.333334h256v85.333333H128a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h768z m0 426.666667a42.666667 42.666667 0 0 1 42.666667 42.666666v256a42.666667 42.666667 0 0 1-42.666667 42.666667h-341.333333a42.666667 42.666667 0 0 1-42.666667-42.666667v-256a42.666667 42.666667 0 0 1 42.666667-42.666666h341.333333zM286.165333 268.501333l96 96L469.333333 277.333333V512H234.666667l87.168-87.168-96-96 60.330666-60.330667z"
                    ></path>
                  </g>
                  <g v-else>
                    <path
                      d="M896 128a42.666667 42.666667 0 0 1 42.666667 42.666667v298.666666h-85.333334V213.333333H170.666667v597.333334h256v85.333333H128a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h768z m0 426.666667a42.666667 42.666667 0 0 1 42.666667 42.666666v256a42.666667 42.666667 0 0 1-42.666667 42.666667h-341.333333a42.666667 42.666667 0 0 1-42.666667-42.666667v-256a42.666667 42.666667 0 0 1 42.666667-42.666666h341.333333z m-405.333333-256L403.498667 385.834667l96 96-60.330667 60.330666-96-96L256 533.333333V298.666667h234.666667z"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>

            <div
              class="iuvideo-control-btn"
              v-if="config.controlBar.fullScreen"
              @click="handleFullScreen"
            >
              <span class="iuvideo-control-svg">
                <!-- 全屏 -->
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="#fff"
                >
                  <g v-if="!isFullScreen">
                    <path
                      d="M146.070588 12.890353c-66.258824 0-126.494118 55.958588-126.494117 124.988235v124.988236c0 27.587765 24.094118 49.995294 54.211764 49.995294 24.094118 0 48.188235-22.407529 48.188236-49.995294V137.878588c0-13.793882 12.047059-24.997647 24.094117-24.997647h126.494118c24.094118 0 48.188235-22.407529 48.188235-49.995294 0-27.648-24.094118-49.995294-48.188235-49.995294h-126.494118z m752.941177 0c66.258824 0 120.470588 55.958588 120.470588 124.988235v124.988236c0 27.587765-18.070588 49.995294-48.188235 49.995294s-48.188235-22.407529-48.188236-49.995294V137.878588c0-13.793882-12.047059-24.997647-24.094117-24.997647h-126.494118c-30.117647 0-54.211765-22.407529-54.211765-49.995294 0-27.648 24.094118-49.995294 54.211765-49.995294h126.494118zM19.576471 887.808c0 69.029647 60.235294 124.988235 126.494117 124.988235h126.494118c24.094118 0 48.188235-22.347294 48.188235-49.995294 0-27.587765-24.094118-49.995294-48.188235-49.995294h-126.494118c-12.047059 0-24.094118-11.203765-24.094117-24.997647v-124.988235c0-27.587765-24.094118-49.995294-48.188236-49.995294-30.117647 0-54.211765 22.407529-54.211764 49.995294v124.988235z m879.435294 124.988235c66.258824 0 120.470588-55.958588 120.470588-124.988235v-124.988235c0-27.587765-18.070588-49.995294-48.188235-49.995294s-48.188235 22.407529-48.188236 49.995294v124.988235c0 13.793882-12.047059 24.997647-24.094117 24.997647h-126.494118c-30.117647 0-54.211765 22.407529-54.211765 49.995294 0 27.648 24.094118 49.995294 54.211765 49.995294h126.494118z"
                    ></path>
                  </g>
                  <g v-else>
                    <path
                      d="M200.282353 312.862118c66.258824 0 120.470588-55.958588 120.470588-124.988236V62.885647c0-27.648-18.070588-49.995294-48.188235-49.995294-24.094118 0-48.188235 22.347294-48.188235 49.995294v124.988235c0 13.793882-12.047059 24.997647-24.094118 24.997647h-126.494118c-30.117647 0-48.188235 22.347294-48.188235 49.995295 0 27.587765 18.070588 49.995294 48.188235 49.995294h126.494118z m650.541176 0c-72.282353 0-126.494118-55.958588-126.494117-124.988236V62.885647c0-27.648 24.094118-49.995294 48.188235-49.995294 30.117647 0 48.188235 22.347294 48.188235 49.995294v124.988235c0 13.793882 12.047059 24.997647 30.117647 24.997647h120.470589c30.117647 0 54.211765 22.347294 54.211764 49.995295 0 27.587765-24.094118 49.995294-54.211764 49.995294h-120.470589z m-530.070588 524.950588c0-69.029647-54.211765-124.988235-120.470588-124.988235h-126.494118c-30.117647 0-48.188235 22.407529-48.188235 49.995294 0 27.648 18.070588 49.995294 48.188235 49.995294h126.494118c12.047059 0 24.094118 11.203765 24.094118 24.997647v124.988235c0 27.648 24.094118 49.995294 48.188235 49.995294 30.117647 0 48.188235-22.347294 48.188235-49.995294v-124.988235z m530.070588-124.988235c-72.282353 0-126.494118 55.958588-126.494117 124.988235v124.988235c0 27.648 24.094118 49.995294 48.188235 49.995294 30.117647 0 48.188235-22.347294 48.188235-49.995294v-124.988235c0-13.793882 12.047059-24.997647 30.117647-24.997647h120.470589c30.117647 0 54.211765-22.347294 54.211764-49.995294 0-27.587765-24.094118-49.995294-54.211764-49.995294h-120.470589z"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, toRef, toRefs } from 'vue'
import { filterDuration } from '@/assets/js/utils.js'
import useIuVideo from './iuvideo.js'

export default {
  name: 'iu-video',
  props: {
    title: String,
    dataSource: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const opts = toRef(props, 'options')

    const { state, initPlayer, destroyPlayer, ...propsAndFn } = useIuVideo(
      opts.value
    )

    onMounted(() => {
      initPlayer()
    })

    onBeforeUnmount(() => {
      destroyPlayer()
    })

    return {
      ...toRefs(state),
      ...propsAndFn,
      filterDuration,
    }
  },
}
</script>

<style scoped lang="scss">
@import 'iuvideo.scss';
</style>