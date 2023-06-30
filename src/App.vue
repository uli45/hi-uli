<script setup lang="ts">
if (import.meta.env.PROD) {
  setInterval(function () {
    check()
  }, 2000)
  var check = function () {
    function doCheck(a: any) {
      if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
        ; (function () { })['constructor']('debugger')()
      } else {
        ; (function () { })['constructor']('debugger')()
      }
      doCheck(++a)
    }
    try {
      doCheck(0)
    } catch (err) { }
  }
  check()
}
</script>
<template>
  <router-view></router-view>
</template>

<style lang="less" scoped></style>
