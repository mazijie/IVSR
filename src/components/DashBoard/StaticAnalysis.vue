<template>
  <div v-if="loading1||loading2" style="position:relative;margin: 350px auto">
    <n-space vertical>
      <n-spin size="large" delay="100">
        <template #description>
          正在分析您的APP，请耐心等待哦~
        </template>
      </n-spin>
    </n-space>
  </div>
  <div v-else style="display:flex;">
    <div id="navlist">
      <div id="logo" style="margin: 20px">
        <n-space>
        <img width="50" src="@/assets/logo.jpg" alt="LOGO" style="border-radius: 15px;"/>
        <span style="user-select:none;font-family: Cambria,ARIZONA,SimHei,serif;font-size: 50px;font-weight: bolder;color: #000000;line-height: 50px">IVSR</span>
        </n-space>
      </div>
      <n-space vertical>
      <el-menu
        default-active="1"
        background-color="transparent"
        text-color="ffffff"
      >
        <el-menu-item index="1" @click="mode=1" class="menu-item">APP基本信息</el-menu-item>
        <el-menu-item index="2" @click="mode=2" class="menu-item">APP组件信息</el-menu-item>
        <el-menu-item index="3" @click="mode=3" class="menu-item">证书分析</el-menu-item>
        <el-menu-item index="4" @click="mode=4" class="menu-item">权限分析</el-menu-item>
        <el-menu-item index="5" @click="mode=5" class="menu-item">Manifest分析</el-menu-item>
        <el-menu-item index="6" @click="mode=6" class="menu-item">网络分析</el-menu-item>
        <el-menu-item index="7" @click="mode=7" class="menu-item">二进制分析</el-menu-item>
        <el-menu-item index="8" @click="mode=8" class="menu-item">代码分析</el-menu-item>
        <el-menu-item index="9" @click="mode=9" class="menu-item">潜在密钥分析</el-menu-item>
        <el-menu-item index="10" @click="mode=10" class="menu-item">ML分析</el-menu-item>
        <el-menu-item index="11" @click="mode=11" class="menu-item">简洁报告</el-menu-item>
        <el-menu-item index="12" @click="router().push('/')" class="menu-item">返回主页面</el-menu-item>
      </el-menu>
      </n-space>
    </div>
    <n-config-provider :hljs="hljs">
      <div id="content-area">
        <div v-if="mode===1">
          <p class="sub_title">·APP基本信息</p>
          <div class="sub_block" style="height: 200px;">
            <n-image
                width="200"
                height="200"
                style="border-top-left-radius: 20px;border-bottom-left-radius: 20px;"
                :src="'/api/file/' + hashcode + '/icon'"
                fallback-src="https://bpic.588ku.com/element_origin_min_pic/19/04/23/ccb94aca0ea5f54c35df8b000c052511.jpg"
            />
            <div style="padding: 10px">
              <ul>
                <li><p>名称：{{app_info.app_name}}</p></li>
                <li><p>包名：{{app_info.package_name}}</p></li>
                <li><p>安装包大小：{{app_info.size}}</p></li>
                <li><p>安全性评分：{{((1-malware_score)*100).toFixed(3)}}(满分100)</p></li>
              </ul>
            </div>
          </div>
          <p class="sub_title">·证书信息</p>
          <div class="sub_block" style="height: 400px;">
            <div style="margin:15px;padding:20px;height:330px;width:870px;overflow-y: scroll;white-space: pre-wrap;word-break: break-all;background-color: white;border-radius: 10px">
              <n-code :code="app_info.cert_info" language="plaintext" word-wrap show-line-numbers/>
            </div>
          </div>
        </div>
        <div v-else-if="mode===2">
          <p class="sub_title">·APP组件信息</p>
          <div class="sub_block" style="height: 100px;">
            <div style="margin-left: 40px;">
              <p style="font-family: serif;font-size: 24px;color: rgb(154,104,46);font-weight: bolder">Main Activity: {{app_comps.main_activity}}</p>
            </div>
          </div>
          <div style="display: flex">
            <div class="comps" style="background-color: #fde9eb">
              <p style="color: #b77c77;font-size: 20px;font-weight: bold;text-align: center">Activities(
<!--                {{app_comps.activities.length}}-->
                <n-number-animation
                    show-separator
                    :from="0"
                    duration="1000"
                    :to="app_comps.activities.length"
                />
                )</p>
              <ul>
                <li v-for="item in app_comps.activities" :key="item">{{item}}</li>
              </ul>
            </div>
            <div class="comps" style="background-color: #ecd7f8">
              <p style="color: #8f6398;font-size: 20px;font-weight: bold;text-align: center">Receivers(
                <n-number-animation
                    show-separator
                    :from="0"
                    duration="1000"
                    :to="app_comps.receivers.length"
                />
<!--                {{app_comps.receivers.length}}-->
                )</p>
              <ul>
                <li v-for="item in app_comps.receivers" :key="item">{{item}}</li>
              </ul>
            </div>
          </div>
          <div style="display: flex">
            <div class="comps" style="background-color: #e7eef6">
              <p style="color: #386dab;font-size: 20px;font-weight: bold;text-align: center">Providers(
                <n-number-animation
                    show-separator
                    :from="0"
                    duration="1000"
                    :to="app_comps.providers.length"
                />
<!--                {{app_comps.providers.length}}-->
                )</p>
              <ul>
                <li v-for="item in app_comps.providers" :key="item">{{item}}</li>
              </ul>
            </div>
            <div class="comps" style="background-color: #dfe6d4">
              <p style="color: #95a67b;font-size: 20px;font-weight: bold;text-align: center">Services(
                <n-number-animation
                    show-separator
                    :from="0"
                    duration="1000"
                    :to="app_comps.services.length"
                />
<!--                {{app_comps.services.length}}-->
                )</p>
              <ul>
                <li v-for="item in app_comps.services" :key="item">{{item}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else-if="mode===3">
          <p class="sub_title">·证书分析信息(共{{cert_results.length}}项)</p>
          <div class="sub_block">
            <div style="padding: 20px;border-radius: 20px;">
              <n-data-table
                  :columns="cert_columns"
                  :data="cert_results"
                  max-height="610px"
              />
            </div>
          </div>
        </div>
        <div v-else-if="mode===4">
          <div style="height: 750px;">
            <p class="sub_title">·权限使用信息（共{{prem_results.perms.length}}项）</p>
            <div class="sub_block" style="max-height: 320px">
              <div style="padding: 20px;border-radius: 20px;">
                <n-data-table
                    :columns="perm_columns"
                    :data="prem_results.perms"
                    max-height="220px"
                />
              </div>
            </div>
            <p class="sub_title">·恶意与滥用权限情况</p>
            <div class="sub_block" style="height: 300px;display: flex">
              <div style="margin:10px;padding: 20px;border-radius: 20px;width: 420px;background-color: white">
                <n-statistic label="恶意权限"  tabular-nums>
                  <n-number-animation
                      show-separator
                      :from="0"
                      duration="1000"
                      :to="prem_results.malware_perms_stat.top_malware_perms.length"
                  />
<!--                  {{prem_results.malware_perms_stat.top_malware_perms.length}}-->
<!--                  {{prem_results.malware_perms_stat.total_malware_perms}}-->
                </n-statistic>
                <div style="max-height: 180px;word-break: break-word;overflow-y: scroll">
                  <ul>
                    <li v-for="item in prem_results.malware_perms_stat.top_malware_perms" :key="item">{{item}}</li>
                  </ul>
                </div>
              </div>
              <div style="margin:10px;padding: 20px;border-radius: 20px;width: 420px;background-color: white">
                <n-statistic label="滥用权限"  tabular-nums>
                  <n-number-animation
                      show-separator
                      :from="0"
                      duration="1000"
                      :to="prem_results.malware_perms_stat.other_abused_perms.length"
                  />
<!--                  {{prem_results.malware_perms_stat.other_abused_perms.length}}-->
<!--                  {{prem_results.malware_perms_stat.total_other_perms}}-->
                </n-statistic>
                <div style="max-height: 180px;word-break: break-word;overflow-y: scroll">
                  <ul>
                    <li v-for="item in prem_results.malware_perms_stat.other_abused_perms" :key="item">{{item}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="mode===5">
          <p class="sub_title">·Manifest分析(共{{manifest_results.length}}项)</p>
          <div class="sub_block" style="max-height: 650px;">
            <div style="margin: 10px;padding:10px;width: 860px;max-height: 610px;background-color: white;border-radius: 10px">
              <el-table  :data="manifest_results" width="840px" max-height="590" :stripe="true" :border="true" fit>
                <el-table-column type="index" width="90px"></el-table-column>
                <el-table-column prop="name" label="名称" width="200px"></el-table-column>
                <el-table-column prop="severity" label="严重程度等级" width="100px"></el-table-column>
                <el-table-column prop="rule" label="rule" width="220px"></el-table-column>
                <el-table-column prop="description" label="描述" width="250px"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div v-else-if="mode===6">
          <p class="sub_title">·网络分析(共{{network_results.length}}项)</p>
          <div class="sub_block" style="max-height: 650px;">
            <div style="margin: 10px;padding:10px;width: 880px;max-height: 610px;background-color: white;border-radius: 10px">
              <el-table  :data="network_results" width="860px" max-height="570" :stripe="true" :border="true" fit>
                <el-table-column type="index" width="50px"></el-table-column>
                <el-table-column prop="name" label="SCOPE" width="180px"></el-table-column>
                <el-table-column prop="severity" label="严重程度等级" width="130px"></el-table-column>
                <el-table-column prop="description" label="描述" width="500px"></el-table-column>
              </el-table>
            </div>
          </div>
<!--          {{network_results}}-->
        </div>
        <div v-else-if="mode===7">
<!--          <p class="sub_title">·二进制共享库分析(共{{binary_results.length}}项)</p>-->
          <div style="max-height: 750px;overflow-y: scroll">
          <p class="sub_title">·NX(共{{binary_results.length}}项)</p>
          <div class="sub_block" style="max-height: 600px;">
            <div style="margin: 10px;padding:10px;width: 880px;max-height: 580px;background-color: white;border-radius: 10px">
              <el-table  :data="binary_results" width="860px" max-height="560" :stripe="true" :border="true" fit>
                <el-table-column type="index" width="50px"></el-table-column>
                <el-table-column prop="name" label="共享对象" width="200px"></el-table-column>
                <el-table-column prop="is_nx.is_nx" label="是否存在" width="100px"/>
                <el-table-column prop="is_nx.severity" label="严重程度" width="100px"/>
                <el-table-column prop="is_nx.description" label="描述" width="410px"/>
              </el-table>
            </div>
          </div>
            <p class="sub_title">·STACK CANARY(共{{binary_results.length}}项)</p>
          <div class="sub_block" style="max-height: 600px;">
            <div style="margin: 10px;padding:10px;width: 880px;max-height: 580px;background-color: white;border-radius: 10px">
              <el-table  :data="binary_results" width="860px" max-height="560" :stripe="true" :border="true" fit>
                <el-table-column type="index" width="50px"></el-table-column>
                <el-table-column prop="name" label="共享对象" width="200px"></el-table-column>
                <el-table-column prop="has_canary.has_canary" label="是否存在" width="100px"/>
                <el-table-column prop="has_canary.severity" label="严重程度" width="100px"/>
                <el-table-column prop="has_canary.description" label="描述" width="410px"/>
              </el-table>
            </div>
          </div>
            <p class="sub_title">·RELRO(共{{binary_results.length}}项)</p>
          <div class="sub_block" style="max-height: 600px;">
            <div style="margin: 10px;padding:10px;width: 880px;max-height: 580px;background-color: white;border-radius: 10px">
              <el-table  :data="binary_results" width="860px" max-height="560" :stripe="true" :border="true" fit>
                <el-table-column type="index" width="50px"></el-table-column>
                <el-table-column prop="name" label="共享对象" width="200px"></el-table-column>
                <el-table-column prop="relro.relro" label="是否存在" width="100px"/>
                <el-table-column prop="relro.severity" label="严重程度" width="100px"/>
                <el-table-column prop="relro.description" label="描述" width="410px"/>
              </el-table>
            </div>
          </div>
            <p class="sub_title">·RPATH(共{{binary_results.length}}项)</p>
          <div class="sub_block" style="max-height: 600px;">
            <div style="margin: 10px;padding:10px;width: 880px;max-height: 580px;background-color: white;border-radius: 10px">
              <el-table  :data="binary_results" width="860px" max-height="560" :stripe="true" :border="true" fit>
                <el-table-column type="index" width="50px"></el-table-column>
                <el-table-column prop="name" label="共享对象" width="200px"></el-table-column>
                <el-table-column prop="rpath.rpath" label="是否存在" width="100px"/>
                <el-table-column prop="rpath.severity" label="严重程度" width="100px"/>
                <el-table-column prop="rpath.description" label="描述" width="410px"/>
              </el-table>
            </div>
          </div>
            <p class="sub_title">·RUNPATH(共{{binary_results.length}}项)</p>
          <div class="sub_block" style="max-height: 600px;">
            <div style="margin: 10px;padding:10px;width: 880px;max-height: 580px;background-color: white;border-radius: 10px">
              <el-table  :data="binary_results" width="860px" max-height="560" :stripe="true" :border="true" fit>
                <el-table-column type="index" width="50px"></el-table-column>
                <el-table-column prop="name" label="共享对象" width="200px"></el-table-column>
                <el-table-column prop="runpath.runpath" label="是否存在" width="100px"/>
                <el-table-column prop="runpath.severity" label="严重程度" width="100px"/>
                <el-table-column prop="runpath.description" label="描述" width="410px"/>
              </el-table>
            </div>
          </div>
            <p class="sub_title">·FORTIFY(共{{binary_results.length}}项)</p>
            <div class="sub_block" style="max-height: 600px;">
              <div style="margin: 10px;padding:10px;width: 880px;max-height: 580px;background-color: white;border-radius: 10px">
                <el-table  :data="binary_results" width="860px" max-height="560" :stripe="true" :border="true" fit>
                  <el-table-column type="index" width="50px"></el-table-column>
                  <el-table-column prop="name" label="共享对象" width="200px"></el-table-column>
                  <el-table-column prop="is_fortified.is_fortified" label="是否存在" width="100px"/>
                  <el-table-column prop="is_fortified.severity" label="严重程度" width="100px"/>
                  <el-table-column prop="is_fortified.description" label="描述" width="410px"/>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="mode===8">
          <p class="sub_title">·代码分析(共{{code_results.length}}项)</p>
          <div class="sub_block" style="max-height: 650px;">
            <div style="margin: 10px;padding:10px;width: 880px;max-height: 610px;background-color: white;border-radius: 10px">
              <el-table  :data="code_results" width="860px" max-height="600" :stripe="true" :border="true" fit>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="name" label="名称" width="180px"></el-table-column>
                <el-table-column prop="severity" label="严重程度等级" width="120px"></el-table-column>
                <!--            <el-table-column prop="cvs" label="cvs" width="50px"></el-table-column>-->
                <!--            <el-table-column prop="cve" label="cve" width="50px"></el-table-column>-->
                <el-table-column prop="description" label="描述" width="250px"></el-table-column>
                <el-table-column prop="masvs" label="masvs" width="180px"></el-table-column>
                <!--            <el-table-column prop="ref" label="ref" width="100px"></el-table-column>-->
                <el-table-column label="源码文件" type="expand" width="70px">
                  <template v-slot="{ row }">
                    <div style="width: 650px;margin: 0 auto">
                      <el-table  :data="row.sources"  :stripe="true" :border="true" max-height="400px">
                        <!--                  <el-table-column type="index"></el-table-column>-->

                        <el-table-column v-slot="{ row }" label="文件" width="300px">
                          <span><a :href="'/sourcecode/' + hashcode + '/' + reversePath(row.file)" target="_blank">{{row.file}}</a></span>
                        </el-table-column>
                        <el-table-column v-slot="{ row }" label="行号" width="350px">
                          <n-space><span v-for="item in row.lines_no" :key="item">{{item}}</span></n-space>
                        </el-table-column>
                      </el-table>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div v-else-if="mode===9">
          <p class="sub_title" v-if="secrets_results!==null">·潜在密钥分析(共{{secrets_results.possible_secrets.length}}个)</p>
          <p class="sub_title" v-else>·潜在密钥分析(共0个)</p>
          <div class="sub_block" style="max-height: 650px">
            <div style="width:900px;margin:20px;padding: 20px;border-radius: 20px;background-color: white;overflow-y: scroll;word-break: break-word">
              <p v-if="secrets_results===null||secrets_results.possible_secrets.length===0">未发现潜在的密钥信息</p>
              <p v-else>以下为潜在的密钥信息：</p>
              <ul v-if="secrets_results!==null">
                <li v-for="item in secrets_results.possible_secrets" :key="item">{{item}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else-if="mode===10">
          <p class="sub_title">·机器学习特征分析(共{{key_features.length}}项)</p>
          <div class="sub_block" style="height: 120px;">
            <div style="margin: 20px;padding: 10px;border-radius: 10px;background-color: white;width: 860px;">
              <n-statistic label="潜在恶意性评分(分值越高，恶意性越大)">
                {{malware_score.toFixed(6)}}/1.000000
              </n-statistic>
            </div>
          </div>
          <div class="sub_block" style="height: 520px;">
            <div style="margin: 10px;padding: 10px;border-radius: 10px;">
              <el-table  :data="key_features" width="860px" max-height="480" :stripe="true" :border="true" fit>
                <el-table-column type="index" width="60px"></el-table-column>
                <el-table-column prop="feature" label="关键特征" width="400px"></el-table-column>
                <el-table-column label="关联特征" width="400px">
                  <template v-slot="{ row }">
                    <ul>
                      <li v-for="item in row.associate_features" :key="item">{{item}}</li>
                    </ul>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div v-else-if="mode===11">
          <p class="sub_title">·简洁报告</p>
          <div class="sub_block" style="height: 650px;">
            <div v-if="generating" style="margin: 300px auto">
              <n-space vertical>
                <n-spin size="large" delay="100">
                  <template #description>
                    正在生成报告，请耐心等待哦~
                  </template>
                </n-spin>
              </n-space>
            </div>
            <div v-else>
              <div style="margin:15px;padding:20px;height:580px;width:830px;overflow-y: scroll;white-space: pre-wrap;word-break: break-word;background-color: white;border-radius: 10px">
                <n-code :code="report" language="markdown" word-wrap show-line-numbers/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </n-config-provider>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {ref} from "vue";
import {generateReport, scanFile, scanFileML} from "@/api";
import router from "@/router";
import hljs from 'highlight.js/lib/core'
import markdown from 'highlight.js/lib/languages/markdown'
import plaintext from 'highlight.js/lib/languages/plaintext'
// import {useMessage} from "naive-ui";

export default {
  name: "StaticAnalysis",
  methods: {
    router() {
      return router
    }
  },
  setup(){
    const route = useRoute();
    const hashcode=route.params.hashcode;

    const information=ref(null);
    const mode=ref(1);
    const app_info=ref();
    const app_comps=ref();
    const binary_results=ref();
    const cert_results=ref();
    const code_results=ref();
    const manifest_results=ref();
    const prem_results=ref();
    const secrets_results=ref();
    const network_results=ref();

    const informationML=ref(null);
    const key_features=ref();
    const malware_score=ref(0.0);

    const report=ref();

    const loading1=ref(true);
    const loading2=ref(true);
    const generating=ref(true);

    // const message=useMessage();

    hljs.registerLanguage('markdown', markdown)
    hljs.registerLanguage('plaintext', plaintext)
    const analysis=(info)=>{
      app_info.value=info.app_info;
      app_comps.value=info.app_comps;
      binary_results.value=info.binary_results;
      cert_results.value=info.cert_results;
      code_results.value=info.code_results;
      manifest_results.value=info.manifest_results;
      prem_results.value=info.prem_results;
      secrets_results.value=info.secrets_results;
      network_results.value=info.network_results;
    }

    const analysisML=(info)=>{
      key_features.value=info.key_features;
      malware_score.value=info.malware_score;
    }

    const reversePath= (path)=>{

      return path.split("/").join("%2F");
    }

    const regenerate= ()=>{
      // if(generating.value==false) return;
      generateReport({"regenerate":false,"hash":hashcode}).then((res)=>{
        report.value=res.data;
        generating.value=false;
      }).catch((error)=>{
        console.log("报告生成出现错误："+error);
      })
    }

    scanFile({"hash":hashcode}).then((res)=>{
      information.value=res;
      analysis(information.value);
      loading1.value=false;
    }).catch((error)=>{
      alert("静态分析出现错误："+error)
      router.push('/');
      // message.error("静态分析出现错误："+error);
    })
    scanFileML({"hash":hashcode}).then((res)=>{
      informationML.value=res;
      analysisML(informationML.value);
      loading2.value=false;
    }).catch((error)=>{
      alert("ML分析出现错误："+error)
      router.push('/');
      // message.error("ML分析出现错误："+error);
    })
    // const startreport=()=>{
      generateReport({"regenerate":false,"hash":hashcode}).then((res)=>{
        report.value=res.data;
        generating.value=false;
      }).catch((error)=>{
        console.log("报告生成出现错误："+error)
        // router.push('/');
        // message.error("报告生成出现错误："+error);
      })
    // }

    const cert_columns=[
      {
        title:"名称",key:"name",width:200
      },
      {
        title:"问题级别",key:"severity",width: 100
      },
      {
        title:"描述",key:"description"
      }
    ]
    const perm_columns=[
      {
        title:"名称",key:"name",width:220
      },
      {
        title:"问题级别",key:"severity",width: 100
      },
      {
        title:"描述",key:"description",width: 300
      },
      {
        title:"信息",key:"info",
      },
      // {
      //   title:"源文件位置",key:"sources",width: 100
      // }
    ]
    const code_columns=[
        {
          type: "selection"
        },
        {
          type: "expand",
          // expandable: (rowData) => rowData.name !== "Jim Green",
          // renderExpand: (rowData) => {
          //   return `${rowData.name} is a good guy.`;
          // }
        },
        {
          title: "#",
          key: "key",
          render: (_, index) => {
            return `${index + 1}`;
          }
        },
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        },
    ]
    return {
      information,
      loading1,
      loading2,
      mode,
      app_info,
      app_comps,
      binary_results,
      cert_results,
      code_results,
      manifest_results,
      prem_results,
      secrets_results,
      network_results,
      hljs,
      cert_columns,
      perm_columns,
      code_columns,
      key_features,
      malware_score,
      hashcode,
      report,
      generating,
      reversePath,
      regenerate,
    };
  }
}
</script>

<style scoped>
#navlist{
  position: relative;
  background: linear-gradient(60deg, rgb(254, 231, 190) 0%, rgb(254, 221, 202) 100%);
  width: 300px;
  padding: 0;
  margin: 0;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
#content-area{
  position: relative;
  width: 960px;
  padding: 20px;
  margin: 0;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.menu-item{
  background-color: transparent;
}
.sub_title{
  text-align: left;
  color: #3b6c9d;
  font-size: 20px;
  font-weight: bold;
  font-family: serif;
}

.subsub_title{
  text-align: left;
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  font-family: serif;
}
.sub_block{
  margin:10px;
  width: 900px;
  background-color: #f8e2a9;
  border-radius: 20px;
  box-shadow:0 0 10px 10px #dcd7c4;
  display: flex;
}
.comps{
  width: 400px;
  height: 230px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px 10px #dcd7c4;
  word-break: break-word;
  padding: 10px;
  overflow-y: scroll;
}
a{
  text-decoration: none;
  color: black;
  transition: 0.5s all;
  -webkit-transition: 0.5s all;
}

a:hover{
  text-decoration: underline;
  transition: 0.5s all;
  -webkit-transition: 0.5s all;
}
a:visited{
  text-decoration: none;
  color: black;
  transition: 0.5s all;
  -webkit-transition: 0.5s all;
}
</style>