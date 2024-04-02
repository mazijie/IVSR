<template>
  <div id="mainblock">
    <div id="content">
      <img src="@/assets/img/name.png" width="360"/><br>
      <span style="user-select:none;font-family:Cambria,ARIZONA,SimHei,serif;font-size: 24px;font-weight: bold;color: #f4f2e6;text-shadow: #464444 2px 2px 10px ;offset-after: 10px;">
          智能网联车载应用隐私泄露问题排查解决方案
      </span>
      <br>
      <br>
      <n-upload
          action="/api/file"
          @finish="handleSuccess"
          :max="1"
          show-download-button
          accept=".apk"
      >
        <n-float-button color="#3e4760" size="large" :width="200" :height="55" shape="square">
          <div style="height: 50px;width: 200px;padding: 2px;display:flex;">
            <n-icon size="48" :depth="3">
              <archive-icon />
            </n-icon>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <n-text style="font-size: 22px;color: #353535;font-family:Cambria,ARIZONA,SimHei,serif;font-weight: bold;line-height: 50px;user-select:none;">
              上传文件
            </n-text>
          </div>
        </n-float-button>
      </n-upload>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { CloudUploadOutline as ArchiveIcon } from "@vicons/ionicons5";

export default {
  name: "MainPageNew",
  components:{
    ArchiveIcon
  },
  setup(){
    const header={
      "Content-Type":"application/x-www-form-urlencoded",
    }
    const handleSuccess = ({file,event}) => {
      console.log(file)
      let hashcode = (event?.target).response;
      hashcode=JSON.parse(hashcode);
      router.push('/analysis/'+hashcode.hash);
    };
    return{
      header,
      handleSuccess
    }
  }
}
</script>

<style scoped>
#mainblock{
  background: url("@/assets/img/main_bk.jpg") no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height:calc(100vh - 100px);
  margin: 0;
  padding: 0;
}
#content{
  position: relative;
  top:calc(50vh - 200px);
  height: 300px;
  width:600px;
  left:10vw;
}
</style>