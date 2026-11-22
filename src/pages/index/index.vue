<template>
  <view class="page">
    <view class="page-body">
      <view class="header">
        <view :style="{ height: statusBarHeight + 'px' }" />
        <view class="brand-row">
          <t-image
            class="logo"
            src="https://i.ibb.co/JRvr5XMq/img-logo.png"
            mode="aspectFit"
          />
        </view>
        <view class="search-row">
          <t-search
            class="search"
            placeholder="搜索赛事名称"
            shape="round"
            :clearable="false"
          />
          <view class="message-wrap">
            <t-badge :count="3">
              <view class="message-btn">
                <t-icon name="chat" size="1.125rem" />
              </view>
            </t-badge>
          </view>
        </view>
      </view>

      <t-image
        class="banner"
        src="https://i.ibb.co/Mk1Y2Z3C/img-banner.png"
        mode="widthFix"
      />

      <match-list />

      <view class="bottom">
        <game-tabbar />
      </view>
    </view>
  </view>
</template>

<script setup>
import { statusBarHeight } from '@/utils/system'
</script>

<style src="./index.css"></style>
