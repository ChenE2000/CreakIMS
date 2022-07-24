<script setup lang="ts">
import { ref } from "vue";
import {
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons-vue";

const pwd = ref("");
const show = ref(false);
</script>

<template>
  <div class="login">
    <div class="login__container">
      <h2 class="login__title">请输入你的密码</h2>
      <figure class="login__admin-info">
        <img
          src="https://images.unsplash.com/photo-1658592597637-ed0d674acd0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
          alt=""
          class="login__avatar"
        />
        <figcaption class="login__details">
          <p>Admin Account</p>
          <span>A Robot</span>
        </figcaption>
      </figure>
      <div class="login__item">
        <LockOutlined class="login__lock" />
        <input
          type="password"
          class="login__input"
          v-model="pwd"
          v-if="!show"
        />
        <input type="text" class="login__input" v-model="pwd" v-else />
        <div class="login__eye" @click="show = !show">
          <EyeOutlined v-if="!show" />
          <EyeInvisibleOutlined v-else />
        </div>
      </div>
      <div class="login__operations">
        <button class="login__btn">登录</button>
        <a href="#" class="login__reset">重置密码</a>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(246, 246, 246);

  &__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 40rem;
    padding: 4rem 3rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  }

  &__title {
    font-weight: 700;
    color: #108ee9;
    letter-spacing: 2px;
  }

  &__admin-info {
    display: flex;
    align-items: center;
  }

  &__avatar {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1.5rem;
  }

  &__details {
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 500;
      color: #61b5f1;
    }

    span {
      font-weight: 700;
      color: #108ee9;
    }
  }

  &__operations {
    margin-top: 1rem;
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
  }

  &__btn {
    padding: 0.6rem 4rem;
    outline: none;
    border: none;
    background: #108ee9;
    color: #fff;
    font-size: 1.4rem;
    cursor: pointer;
    border-radius: 5px;
  }

  &__reset {
    position: relative;
    padding: 0.3rem 0;
    overflow: hidden;

    &:hover::after {
      transform: translateX(0);
    }

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #108ee9;
      bottom: 0;
      left: 0;
      transition: 0.5s;
      transform: translateX(-100%);
    }
  }

  &__item {
    position: relative;
    width: 100%;
  }

  &__input {
    width: 80%;
    height: 3.8rem;
    outline: none;
    border-radius: 10px;
    padding: 0.5rem 0.8rem 0.5rem 3.2rem;
    border: 1px solid #108ee9;
    color: #108ee9;
    letter-spacing: 1px;
    font-size: 1.4rem;
    font-weight: 500;
  }

  &__lock {
    position: absolute;
    font-size: 1.2em;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
    color: #108ee9;
  }

  &__eye {
    font-size: 1.2em;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 4rem;
    color: #108ee9;
    cursor: pointer;
  }
}
</style>
