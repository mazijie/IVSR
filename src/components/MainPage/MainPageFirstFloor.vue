<template>
  <!--Hey! This is the original version
of Simple CSS Waves-->
  <div class="inner-header" style="z-index: 999">
    <!--      <div class="flex" style="position:relative;height:35vh;top:10vh">-->
    <!--      <svg width="87.200000" height="67.800000" viewBox="0 0 436 339" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">-->
    <!--        <desc>-->
    <!--          Created with Pixso.-->
    <!--        </desc>-->
    <!--        <defs>-->
    <!--          <clipPath id="clip89_237">-->
    <!--            <rect id="画板 1" width="436.000000" height="339.000000" fill="white"/>-->
    <!--          </clipPath>-->
    <!--        </defs>-->
    <!--        <rect  fill="#EFEFEF"/>-->
    <!--        <g clip-path="url(#clip89_237)">-->
    <!--          <circle id="椭圆 1" r="169.500000" transform="matrix(1 0 0 1 218.5 169.5)" fill="#FFFFFF"/>-->
    <!--          <path id="矢量 1" d="M159.025 254L85 128.266L145.375 128.266L159.025 205.552L197.875 156.527L184.75 146.722L203.65 115L211 125.959L220.975 119.037L227.275 122.764L236.2 115L254.05 146.722L248.48 152.356L282.925 205.552L300.25 128.266L358 128.266L282.925 254L230.105 170.944L227.275 166.332L159.025 254Z" fill-rule="evenodd" fill="#024888"/>-->
    <!--          <path id="矢量 1" d="M197.875 156.527L159.025 205.552L145.375 128.266L85 128.266L159.025 254L227.275 166.332L242.91 157.991L248.48 152.356L254.05 146.722L236.2 115L227.275 122.764L217.3 132.88M184.75 146.722L197.875 156.527L211 166.332L227.275 146.722L217.3 132.88L211 125.959L203.65 115L184.75 146.722ZM211 125.959L220.975 119.037L227.275 122.764M227.275 166.332L230.105 170.944L282.925 254L358 128.266L300.25 128.266L282.925 205.552L248.48 152.356" stroke="#FFFFFF"/>-->
    <!--        </g>-->
    <!--      </svg>-->
    <!--      <h1>智行清境</h1>-->
    <!--      </div>-->
    <div style="height: 150px;width: 150px;margin: 10px auto;">
      <img width="150" src="@/assets/logo.jpg" alt="LOGO" style="border-radius: 15px;"/>
    </div>
    <div style="height: 100px;width: 500px;background-color: transparent;margin: 10px auto;text-align: center">
      <n-space justify="center">
        <span style="user-select:none;font-family: Cambria,ARIZONA,SimHei,serif;font-size: 90px;font-weight: bolder;color: #f4f2e6;text-shadow: #464444 2px 2px 10px ;offset-after: 10px;">
          I
        </span>
        <span style="user-select:none;font-family: Cambria,ARIZONA,SimHei,serif;font-size: 90px;font-weight: bolder;color: #f4f2e6;text-shadow: #464444 2px 2px 10px ;offset-after: 10px;">
          V
        </span>
        <span style="user-select:none;font-family: Cambria,ARIZONA,SimHei,serif;font-size: 90px;font-weight: bolder;color: #f4f2e6;text-shadow: #464444 2px 2px 10px ;offset-after: 10px;">
          S
        </span>
        <span style="user-select:none;font-family: Cambria,ARIZONA,SimHei,serif;font-size: 90px;font-weight: bolder;color: #f4f2e6;text-shadow: #464444 2px 2px 10px ;offset-after: 10px;">
          R
        </span>
      </n-space>
    </div>
    <div id="enter" style="position:relative;width: 350px;margin: 30px auto;text-align: center;z-index: 9999;color: #858585">

      <n-upload
          action="/api/file"
          @finish="handleSuccess"
          :max="1"
          show-download-button
          accept=".apk"
      >
        <n-upload-dragger>
          <div style="display: inline-flex">
            <n-icon size="48" :depth="3">
              <archive-icon />
            </n-icon>
            &nbsp;&nbsp;
            <n-text style="font-size: 18px;color: #353535;font-family:Anda-le Mono, monospace;font-weight: bolder;line-height: 48px;user-select:none;">
              Click Or Drag To Upload
            </n-text>
          </div>
        </n-upload-dragger>
      </n-upload>
    </div>
  </div>
  <div class="background" style="position: absolute;bottom: 0;z-index: 0;width: 100vw">
    <!--Waves Container-->
    <div class="header">
      <div>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax">
            <!--          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />-->
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(247, 220, 148,0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(246, 216, 124,0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(245, 208, 106,0.7)" />
            <!--          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />-->
            <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(243, 200, 96,1)" />
          </g>
        </svg>
      </div>
    <!--Waves end-->

  </div>
    <!--Header ends-->

    <!--Content starts-->
    <div class="content flex" id="aaa">
      <p>In Tech,We Trust</p>
    </div>
    <!--Content ends-->
  </div>


    <!--Content before waves-->



  <!--  <main-page-second-floor/>-->
</template>

<script>
import router from "@/router";
import { CloudUploadOutline as ArchiveIcon } from "@vicons/ionicons5";
import {scanFile} from "@/api";

export default {
  name: "MainPageFirstFloor",
  components: {
    ArchiveIcon
  },
  methods: {
    scanFile,
    router() {
      return router
    }
  },
  setup(){
    const header={
      // "Content-Type": "multipart/form-data;boundary:----",
      "Content-Type":"application/x-www-form-urlencoded",
    }
    const handleSuccess = ({file,event}) => {
      console.log(file)
      let hashcode = (event?.target).response;
      hashcode=JSON.parse(hashcode);
      router.push('/static-analysis/'+hashcode.hash);
    };
    return{
      header,
      handleSuccess
    }
  }
}
</script>

<style scoped>

body {
  margin:0;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-weight:300;
  letter-spacing: 2px;
  font-size:48px;
}
p {
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-size:14px;
  color: #333333;
}

.header {
  position:relative;
  text-align:center;
  /*background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);*/
  /*background: linear-gradient(60deg, rgb(255, 255, 255) 0%, rgb(246, 248, 248) 100%);*/
  color:white;
}

#aaa{
  background: rgb(243, 200, 89);
}

.inner-header {
  position: absolute;
  height:400px;
  width:600px;
  top:calc(50vh - 250px);
  left:  calc(50vw - 350px);
  padding: 50px;
  border-radius: 20px;
  background-color: #4f4f4f;
  box-shadow:0 0 10px 10px #dcd7c4
}

.flex { /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
}

.waves {
  position:relative;
  width: 100%;
  height:15vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
}

.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px,0,0);
  }
  100% {
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}



button {
  margin: 20px;
}


/*.aaa p {*/
/*  transition: .2s;*/
/*  color: #fff;*/
/*  text-shadow:*/
/*      0 0 10px #0ebeff,*/
/*      0 0 20px #0ebeff,*/
/*      0 0 50px #0ebeff,*/
/*      0 0 100px #0ebeff,*/
/*      0 0 200px #0ebeff*/
/*}*/

/*.aaa p :hover {*/
/*  text-shadow: 0 0 10px #0ebeff, 0 0 20px #0ebeff, 0 0 50px #0ebeff, 0 0 100px #0ebeff, 0 0 200px #0ebeff;*/
/*}*/

</style>