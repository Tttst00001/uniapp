<template>
  <t-tab-bar
    :value="current"
    :fixed="false"
    :split="false"
    :safe-area-inset-bottom="false"
    custom-style="--td-tab-bar-height: 3rem; --td-tab-bar-active-color: #7b2ff7;"
    @change="onChange"
  >
    <t-tab-bar-item
      value="recommend"
      :icon="{ name: 'gamepad', size: '1.375rem' }"
    >
      推荐赛事
    </t-tab-bar-item>
    <t-tab-bar-item value="create">
      <template #icon>
        <view class="create-button-wrap">
          <view class="create-button">
            <text class="create-button__text">办赛</text>
          </view>
        </view>
      </template>
    </t-tab-bar-item>
    <t-tab-bar-item
      value="mine"
      :icon="{ name: 'flag', size: '1.375rem' }"
    >
      我的比赛
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: 'recommend',
  },
})

const emit = defineEmits(['change'])

const current = ref(props.value)

const tabRoutes = {
  recommend: '/pages/index/index',
  create: '/pages/create/create',
  mine: '/pages/mine/mine',
}

function onChange(event) {
  current.value = event.value
  emit('change', event.value)
  const url = tabRoutes[event.value]
  if (url) {
    uni.reLaunch({ url })
  }
}
</script>

<style scoped src="./game-tabbar.css"></style>
