<template>
  <n-config-provider  :hljs="hljs">
    <div style="margin:30px;padding:30px;height:650px;width:1200px;white-space: pre-wrap;word-break: break-all;background-color: white;border-radius: 10px">
      <h3>{{filepath}}</h3>
      <n-code :code="code" :language="type" show-line-numbers style="height: 630px;overflow-y: scroll;"/>
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
    hljs.registerLanguage('java', java)
    viewFile({hash:hashcode,filepath:filepath})
        .then((res)=>{
      code.value=res.data;
      type.value=res.type;
    })


    return{
      code,
      type,
      hljs,
      filepath
    }
  }
}
</script>

<style scoped>

</style>