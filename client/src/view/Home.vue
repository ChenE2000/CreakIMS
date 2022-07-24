<template>
  <a-layout :style="{height: '100vh'}">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
    <div class="banner">
      <!-- 示例logo -->
    </div>

      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="onClickMenu">
        <a-menu-item key="data">
          <save-outlined />
          <span class="nav-text">数据管理</span>
        </a-menu-item>
        <a-menu-item key="user">
          <user-outlined />
          <span class="nav-text">用户管理</span>
        </a-menu-item>
        <a-menu-item key="model">
          <robot-outlined />
          <span class="nav-text">模型管理</span>
        </a-menu-item>
        <a-menu-item key="more">
          <user-outlined />
          <span class="nav-text">更多</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', height: '100%' }">
         <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { UserOutlined, SaveOutlined, RobotOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { router } from '../router';
export default defineComponent({
 
  components: {
    UserOutlined,
    SaveOutlined,
    RobotOutlined,
  },
  methods: {
    onClickMenu(e: Event) {
      // console.log(e.key)
      router.push(e.key)
    }
  },
  setup() {
    const onCollapse = (collapsed: boolean, type: string) => {
      console.log(collapsed, type);
    };

    const onBreakpoint = (broken: boolean) => {
      console.log(broken);
    };
    // 初始化到data页
    router.push('data')
    return {
      selectedKeys: ref<string[]>(['data']),
      onCollapse,
      onBreakpoint,
    };
  },
});
</script>
<style>
.banner {
  height: 42px;
  background: rgba(110, 92, 209, 0.902);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
}


</style>
