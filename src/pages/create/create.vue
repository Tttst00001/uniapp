<template>
  <view class="page">
    <view class="header">
      <view :style="{ height: statusBarHeight + 'px' }" />
      <view class="back" @click="onBack">
        <t-icon name="chevron-left" size="1.25rem" />
      </view>
    </view>

    <scroll-view scroll-y class="form-scroll">
      <view class="hero">
        <view class="hero-avatar-wrap">
          <t-image
            class="hero-avatar"
            src="https://image-1251917893.file.myqcloud.com/tip-project/pubg/pubg-match/match-logo-new-3.png"
            mode="aspectFill"
          />
          <view class="hero-edit">
            <t-icon name="edit" size="0.875rem" />
          </view>
        </view>
        <view class="hero-name">的比赛</view>
      </view>

      <view class="form">
        <view class="form-row">
          <view class="form-label">比赛赛制</view>
          <view class="form-value form-value--chips">
            <view
              v-for="(item, index) in visibleFormatChips"
              :key="item"
              class="chip"
              :class="{ 'chip--active': form.format === item }"
              @click="form.format = item"
            >
              <text class="chip__text">{{ item }}</text>
              <text v-if="index === 0" class="chip__tag">常用</text>
            </view>
            <t-icon class="row-arrow" name="chevron-right" size="0.875rem" />
          </view>
        </view>

        <view class="form-row">
          <view class="form-label">比赛模式</view>
          <view class="form-value">
            <t-icon class="row-arrow" name="chevron-right" size="0.875rem" />
          </view>
        </view>

        <view class="form-gap" />

        <view class="form-row" @click="openPicker('type')">
          <view class="form-label">比赛类型</view>
          <view class="form-value">
            <text class="value-text">{{ form.type }}</text>
            <t-icon class="row-arrow" name="chevron-right" size="0.875rem" />
          </view>
        </view>

        <view class="form-row" @click="openPicker('rounds')">
          <view class="form-label">比赛局数及地图</view>
          <view class="form-value">
            <text class="value-text">{{ form.rounds }}</text>
            <t-icon class="row-arrow" name="chevron-right" size="0.875rem" />
          </view>
        </view>

        <view class="form-row" @click="openPicker('startTime')">
          <view class="form-label">开赛时间</view>
          <view class="form-value">
            <text class="value-text">{{ startTimeText }}</text>
            <t-icon class="row-arrow" name="chevron-right" size="0.875rem" />
          </view>
        </view>

        <view class="more-toggle" @click="showMore = !showMore">
          <text>报名、直播、规则、奖品等更多设置</text>
          <t-icon :name="showMore ? 'chevron-up' : 'chevron-down'" size="0.875rem" />
        </view>

        <view v-if="showMore" class="more-panel">
          <view class="form-row">
            <view class="form-label">赛事名称</view>
            <view class="form-value">
              <t-input
                class="name-input"
                placeholder="请输入赛事名称"
                :value="form.name"
                maxlength="20"
                borderless
                align="right"
                @change="(e) => (form.name = e.value)"
              />
            </view>
          </view>
          <view class="form-row" @click="openPicker('format')">
            <view class="form-label">比赛赛制</view>
            <view class="form-value">
              <text class="value-text">{{ form.format }}</text>
              <t-icon class="row-arrow" name="chevron-right" size="0.875rem" />
            </view>
          </view>
          <view class="form-row" @click="openPicker('device')">
            <view class="form-label">参赛设备</view>
            <view class="form-value">
              <text class="value-text">{{ form.device }}</text>
              <t-icon class="row-arrow" name="chevron-right" size="0.875rem" />
            </view>
          </view>
          <view class="form-row">
            <view class="form-label">报名队伍</view>
            <view class="form-value">
              <t-input
                class="name-input"
                type="number"
                placeholder="请输入报名队伍数量"
                :value="form.entries"
                borderless
                align="right"
                @change="(e) => (form.entries = e.value)"
              />
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="bottom-bar">
      <view class="bottom-action">
        <t-icon name="app" size="1.25rem" />
        <text class="bottom-action__text">智能办赛</text>
      </view>
      <t-button
        class="submit-btn"
        theme="primary"
        size="large"
        @click="onSubmit"
      >
        创建赛事
      </t-button>
      <view class="bottom-action">
        <t-icon name="ellipsis" size="1.25rem" />
        <text class="bottom-action__text">更多操作</text>
      </view>
    </view>

    <t-picker
      :visible="pickerVisible"
      :value="pickerValue"
      :header="false"
      @update:visible="(v) => (pickerVisible = v)"
      @pick="onPickerPick"
    >
      <template #content>
        <view class="sheet-head">
          <view class="sheet-close" @click="pickerVisible = false">
            <t-icon name="close" size="1.75rem" />
          </view>
          <text class="sheet-title">{{ pickerTitle }}</text>
          <t-button
            class="sheet-confirm"
            size="large"
            theme="primary"
            @click="onPickerConfirm"
          >
            确认
          </t-button>
        </view>
      </template>
      <t-picker-item :options="pickerOptions" />
    </t-picker>
  </view>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { statusBarHeight } from '@/utils/system'

const form = reactive({
  name: '',
  mode: '经典模式',
  format: '积分赛',
  type: '团队赛（四人）',
  entries: '',
  device: '模拟器和手机端',
  startTime: '20:30',
  rounds: '共一局（海岛）',
})

const formatChips = ['积分赛', '快速赛', '单败淘汰赛', '匹配积分赛']
const visibleFormatChips = formatChips.slice(0, 3)

const pickerConfig = {
  format: { title: '比赛赛制', options: formatChips },
  type: { title: '比赛类型', options: ['个人赛（单人）', '团队赛（四人）'] },
  device: { title: '参赛设备', options: ['模拟器和手机端', '仅手机端', '仅模拟器'] },
  startTime: { title: '开赛时间', options: ['20:30', '21:00', '次日 10:00'] },
  rounds: {
    title: '比赛局数及地图',
    options: ['共一局（海岛）', 'BO3（海岛）', '共一局（地铁）'],
  },
}

const showMore = ref(false)
const currentKey = ref('')
const pickerVisible = ref(false)
const pickerValue = ref([])
const pendingValue = ref('')

const startTimeText = computed(() => `每局间隔1小时(首局${form.startTime})`)
const pickerTitle = computed(() => pickerConfig[currentKey.value]?.title || '')
const pickerOptions = computed(() =>
  (pickerConfig[currentKey.value]?.options || []).map((item) => ({ label: item, value: item }))
)

function openPicker(key) {
  currentKey.value = key
  pickerValue.value = [form[key]]
  pendingValue.value = form[key]
  pickerVisible.value = true
}

function onPickerPick(event) {
  pendingValue.value = event.value[0]
}

function onPickerConfirm() {
  form[currentKey.value] = pendingValue.value
  pickerVisible.value = false
}

function onBack() {
  uni.navigateBack()
}

function onSubmit() {
  if (!form.name.trim()) {
    uni.showToast({ icon: 'none', title: '请输入赛事名称' })
    return
  }
  if (!form.entries || Number(form.entries) <= 0) {
    uni.showToast({ icon: 'none', title: '请输入报名队伍数量' })
    return
  }
  uni.showToast({ icon: 'success', title: '创建成功' })
  console.log('创建赛事：', { ...form })
}
</script>

<style src="./create.css"></style>
