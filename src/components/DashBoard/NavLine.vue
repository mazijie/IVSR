<template>
  <div style="width: 200px;margin: 0 auto;position: relative;height: 75px">
    <n-menu :options="menuOptions" />
  </div>
</template>

<script>
import { NIcon } from "naive-ui";
import { h } from "vue";
import {
  BookOutline as BookIcon,
  // PersonOutline as PersonIcon,
  // WineOutline as WineIcon
} from "@vicons/ionicons5";
export default {
  name: "NavLine",
  setup(){
    function renderIcon(icon) {
      return () => h(NIcon, null, { default: () => h(icon) });
    }
    const menuOptions = [
      {
        label: () => h(
            "a",
            {
              href: "https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F",
              target: "_blank",
              rel: "noopenner noreferrer"
            },
            "且听风吟"
        ),
        key: "hear-the-wind-sing",
        icon: renderIcon(BookIcon)
      }
    ];
    return{
      menuOptions
    }
  }
}
</script>

<style scoped>

</style>