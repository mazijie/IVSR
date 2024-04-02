<template>
  <div id="mainblock" style="width: 100vw;margin: 0;position: relative;height: 100px;display: flex">
    <div id="logo" style="margin: 20px;position: absolute">
      <n-space>
        <img width="50" src="@/assets/logo.jpg" alt="LOGO" style="border-radius: 15px;"/>
        <span style="user-select:none;font-family: Cambria,ARIZONA,SimHei,serif;font-size: 50px;font-weight: bolder;color: rgb(225,245,255);line-height: 50px">IVSR</span>
      </n-space>
    </div>
    <div style="margin: 0 auto;height: 100px;user-select: none">
        <el-menu
            :default-active="mode.toString()"
            background-color="transparent"
            text-color="white"
            active-text-color="white"
            mode="horizontal"
            :ellipsis="false"
            style="height: 100px"
            popper-effect="light"
        >
          <el-menu-item index="0" @click="push('/')" class="menu-item">
            <n-icon size="24" :depth="3">
              <BookIcon />
            </n-icon>&nbsp;
            首页
          </el-menu-item>
          <el-menu-item index="1" @click="push('/analysis/0')" class="menu-item">
            <n-icon size="24" :depth="3">
              <BookIcon />
            </n-icon>&nbsp;
            安全检测
          </el-menu-item>
          <el-menu-item index="2" @click="push('/contact')" class="menu-item">
            <n-icon size="24" :depth="3">
              <BookIcon />
            </n-icon>&nbsp;
            关于IVSR
          </el-menu-item>
        </el-menu>
    </div>
  </div>
</template>

<script>
import {
  BookOutline as BookIcon,
} from "@vicons/ionicons5";
import {ref} from "vue";
import {useRouter} from "vue-router";
import router from "@/router";
export default {
  name: "NavLine",
  methods: {
    router() {
      return router
    }
  },
  components:{
    BookIcon
  },
  setup(){
    const mode = ref(0)
    const switchmode=(input)=>{
      mode.value=input;
    }
    const router = useRouter();
    const router_name = router.currentRoute.value.name;
    const push=(r)=>{
      if(r==='/'&&router_name==='main-page') return;
      if(r==='/analysis/0'&&router_name==='general-analysis') return;
      if(r==='/contact'&&router_name==='contact') return;
      router.push(r);
    }
    if (router_name==='general-analysis'||router_name==='sourcecode'||router_name==='static-analysis')
      mode.value=1
    else if (router_name==='main-page')
      mode.value=0
    else if (router_name==='contact')
      mode.value=2
    else
      router.push('/')
    return{
      mode,
      switchmode,
      push
    }
  }
}
</script>

<style scoped>
#mainblock{
  background:linear-gradient(60deg, #142143, #081f51);
}
.menu-item{
  background-color: transparent;
  width: 200px;
  height: 100px;
}
.menu-item :focus{
  background-color: white;
}
</style>