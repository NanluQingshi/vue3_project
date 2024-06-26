<!--
 * @Author: nlqs
 * @Date: 2024-04-10 15:55:00
 * @Description: 图片预览组件
-->
<script setup>
import { ref, watch } from "vue"
import { useMouseInElement } from '@vueuse/core'

// 获取鼠标相对位置
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)

// 遮罩滑块位置
const left = ref(0)
const top = ref(0)

// 大图位置
const positionX = ref(0)
const positionY = ref(0)

defineProps({
  // 图片列表
  imageList: {
    type: Array,
    default: () => []
  }
})

// 当前图片下标
const activeIndex = ref(0)
const handleEnter = (i) => {
  activeIndex.value = i
}

watch([elementX, elementY, isOutside], () => {
  // 鼠标未移动到图片盒子内
  if(isOutside.value) {
    return
  }
  // 控制横向滑块范围
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100
  }
  // 控制纵向滑块范围
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100
  }
  // 大图位置
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2
}) 

</script>

<template>
  <div class="goods-image">
    <!-- 左侧大图 -->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="">
      <!-- 遮罩层滑块 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li
        v-for="(img, index) in imageList"
        :key="index"
        @mouseenter="handleEnter(index)"
        :class="{ active: activeIndex === index }">
        <img :src="img" alt="">
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" v-show="!isOutside" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`
      }
    ]"></div>
  </div>
</template>

<style lang="scss" scoped>
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
