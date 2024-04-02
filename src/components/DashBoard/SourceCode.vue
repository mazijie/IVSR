<template>
    <n-config-provider  :hljs="hljs">
      <div id="codeblock">
        <span style="font-size: 24px;font-weight: bold">{{filepath}}&nbsp;&nbsp;</span>
        <el-button type="primary" @click="exportJava">下载源代码文件</el-button>
        <n-code :code="code" :language="type" show-line-numbers/>
      </div>
    </n-config-provider>

</template>

<script>
import {ref} from "vue";
import {viewFile} from "@/api";
import {useRoute} from "vue-router";
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'

export default {
  name: "SourceCode",
  setup(){
    const code=ref("");
    const type=ref("java");
    const route = useRoute();
    const hashcode = route.params.hashcode;
    const filepath = route.params.filepath;
    hljs.registerLanguage('java', java);

    viewFile({hash:hashcode,filepath:filepath})
        .then((res)=>{
      code.value=res.data;
      type.value=res.type;
    })

    const exportJava=()=>{
      const blob = new Blob([code.value], {
        type: 'java'
      })
      const objectURL = URL.createObjectURL(blob)
      const aTag = document.createElement('a')
      aTag.href = objectURL
      aTag.download = filepath
      aTag.click()
      URL.revokeObjectURL(objectURL)
    }

    return{
      code,
      type,
      hljs,
      filepath,
      exportJava
    }
  }
}
</script>

<style scoped>
#codeblock{
  padding:30px;
  width: calc(100vw - 60px);
  white-space: pre-wrap;
  word-break: break-all;
  /*background: white url("@/assets/img/dash_bk.jpg") no-repeat;*/
  /*background-size: 100% 100%;*/
  height:calc(100vh - 160px);
  margin: 0;
  overflow-y: scroll;
  overflow-x: scroll;
}
</style>