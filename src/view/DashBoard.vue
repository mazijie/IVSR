<template>
  <div id="mainblock">
    <div id="centerblock">
      <router-view/>
    </div>
<!--    <div style="position: absolute;width: 100vw;height: 100px;top:0;left:0;">-->
<!--      <NavLine/>-->
<!--    </div>-->
<!--    <div style="position: absolute;width: 100vw;min-height: calc(100vh - 100px);top:100px;left:0;background-color: beige;">-->
<!--      <router-view></router-view>-->
<!--    </div>-->
  </div>

</template>

<script>
// import NavLine from "@/components/DashBoard/NavLine.vue";
export default {
  name: "DashBoard",
  components:{
    // NavLine
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
  background-color: #f4cc6e;
  width: 100vw;
  height:100vh;
  padding: 0;
  margin: 0;
}
#centerblock{
  position: absolute;
  width: 1300px;
  height: 800px;
  background-color: white;
  top: calc(50vh - 400px);
  left:calc(50vw - 650px);
  border-radius: 30px;
  box-shadow:0 0 10px 10px #f4d077;
  display: flex;
}

</style>