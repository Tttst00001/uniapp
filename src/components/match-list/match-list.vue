<template>
  <view class="match-list">
    <view class="match-list__title">赛事列表</view>
    <scroll-view scroll-y class="match-list__scroll">
      <t-cell
        v-for="item in matches"
        :key="item.id"
        :title="item.name"
        :description="`${item.time} · ${item.place}`"
        :note="`${item.signups} 人报名`"
        :bordered="false"
        hover
        arrow
      >
        <template #left-icon>
          <t-tag
            :theme="item.theme"
            variant="light"
            size="small"
          >
            {{ item.status }}
          </t-tag>
        </template>
      </t-cell>
    </scroll-view>
  </view>
</template>

<script setup>
const matches = [
  { id: 1, name: '和平精英城市赛·华东赛区', status: '报名中', theme: 'primary', time: '11-25 10:00', place: '上海', signups: 128 },
  { id: 2, name: '高校电竞邀请赛', status: '进行中', theme: 'success', time: '11-22 14:00', place: '广州', signups: 256 },
  { id: 3, name: '秋季巅峰对决', status: '已结束', theme: 'default', time: '11-15 19:00', place: '线上', signups: 512 },
  { id: 4, name: '周末排位冲分赛', status: '报名中', theme: 'primary', time: '11-30 20:00', place: '线上', signups: 64 },
  { id: 5, name: '职业联赛资格赛', status: '报名中', theme: 'primary', time: '12-05 12:00', place: '深圳', signups: 302 },
]
</script>

<style src="./match-list.css"></style>
