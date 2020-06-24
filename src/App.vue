<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
  }
</script>

<style>
  .el-button--danger.is-disabled, .el-button--primary, .el-button--danger, .el-button--success.is-plain {
    color: #181818;
    background-color: #FFFFFF;
    border-color: #eeeeee;
  }
  .el-radio__label {
    color: #181818;
  }
  .grid-cont-right {
    color: #181818 !important;
  }
  .el-radio__input.is-disabled+span.el-radio__label {
    color: #000000;
  }
  .el-input.is-disabled .el-input__inner {
    color: #000000;
  }
</style>
