<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  setup(){
    const debounce = (fn, delay) => {
      let timer
      return (...args) => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn(...args)
        }, delay)
      }
    }

    const _ResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
      constructor(callback) {
        callback = debounce(callback, 200);
        super(callback);
      }
    }
  }
}
</script>

<style>

</style>
