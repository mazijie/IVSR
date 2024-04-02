<template>
  <div id="mainblock">
    <div style="position: relative;width: 100vw;height: 100px;padding: 0;margin: 0">
      <nav-line></nav-line>
    </div>
    <div style="position: relative;width: 100vw;height: calc(100vh - 100px);top:0;left:0;padding: 0;margin: 0" :key="$route.fullPath">
      <router-view/>
    </div>
  </div>

</template>

<script>
import NavLine from "@/components/DashBoard/NavLine.vue";
export default {
  name: "DashBoard",
  components:{
    NavLine
  },
  setup(){
    return{
      // NavLine
    }
  }
}
</script>
<style scoped>
#mainblock{
  width: 100vw;
  height:100vh;
  padding: 0;
  margin: 0;
}
/*#centerblock{*/
/*  position: absolute;*/
/*  width: 1300px;*/
/*  height: 800px;*/
/*  background-color: white;*/
/*  top: calc(50vh - 400px);*/
/*  left:calc(50vw - 650px);*/
/*  border-radius: 30px;*/
/*  box-shadow:0 0 10px 10px #f4d077;*/
/*  display: flex;*/
/*}*/

</style>