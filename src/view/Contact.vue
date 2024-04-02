<template>
  <div id="mainblock">
    <div style="position: relative;width: 100vw;height: 100px;padding: 0;margin: 0">
      <nav-line></nav-line>
    </div>
    <div id="content" style="position: relative;width: 100vw;height: calc(100vh - 100px);top:0;left:0;padding: 0;margin: 0" :key="$route.fullPath">

    </div>
  </div>
</template>

<script>

import NavLine from "@/components/DashBoard/NavLine.vue";

export default {
  name: "ContactUS",
  components: {NavLine},
}
</script>

<style scoped>
#content{
  background: url("@/assets/img/dash_bk.jpg") no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height:calc(100vh - 100px);
  margin: 0;
  padding: 0;
}
</style>