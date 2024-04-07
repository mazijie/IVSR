<template>
  <div v-if="!anythingupload">
    <div id="mainblock">
      <div style="position: relative;top:20%;width: 100vw">
        <div style="position:relative;width:500px;margin: 0 auto;text-align: center">
          <img width="360" src="@/assets/img/name.png" alt="LOGO" style="margin: 0 auto"/><br>
          <span style="font-size: 20px;color: white">您还未上传文件，请在下方点击或拖动以上传APK文件。</span>
        </div>
        <div id="enter" style="position:relative;width: 600px;height:500px;margin: 30px auto;text-align: center;z-index: 9999;color: #858585">
          <n-upload
              action="/api/file"
              @finish="handleSuccess"
              :max="1"
              show-download-button
              accept=".apk"
          >
            <n-upload-dragger>
              <div style="display: inline-flex;height: 200px;align-items:center;justify-content:center;">
                <n-icon size="48" :depth="3">
                  <archive-icon />
                </n-icon>
                &nbsp;&nbsp;
                <n-text style="font-size: 18px;color: #353535;font-family:Anda-le Mono, monospace;font-weight: bolder;line-height: 48px;user-select:none;">
                  点击或将文件拖动到此区域内
                </n-text>
              </div>
            </n-upload-dragger>
          </n-upload>
        </div>
      </div>

    </div>
  </div>
  <div v-else>
    <div id="mainblock" v-if="loading1||loading2||generating">
      <div style="position:relative;top: 350px;width: 100vw">
        <div style="position:relative;margin: 0 auto;width: 400px;text-align: center">
          <div id="loadingPattern" style="width: 400px;height: 50px"/>
          <br>
          <span style="color: white;font-size: 20px;user-select:none;">正在分析您的APP，请耐心等待哦~</span>
        </div>
      </div>
    </div>
    <div v-else style="display:flex;height: calc(100vh - 100px)">
      <div id="navlist">
        <n-space vertical>
          <el-menu
              default-active="0"
              background-color="#071842"
              text-color="#ffffff"
          >
            <el-menu-item index="0" @click="mode=0" class="menu-item">结果速览</el-menu-item>
            <el-menu-item index="1" @click="mode=1" class="menu-item">应用组件概览</el-menu-item>
            <el-menu-item index="2" @click="turnToPerm" class="menu-item">权限调用情况</el-menu-item>
            <el-menu-item index="3" @click="initMap" class="menu-item">V2X网联情况</el-menu-item>
            <el-menu-item index="4" @click="mode=4" class="menu-item">特征提取分析</el-menu-item>
            <el-menu-item index="5" @click="mode=5" class="menu-item">动态链接库</el-menu-item>
            <el-menu-item index="6" @click="mode=6" class="menu-item">清单文件分析</el-menu-item>
            <el-menu-item index="7" @click="mode=7" class="menu-item">详细代码分析</el-menu-item>
            <el-menu-item index="8" @click="mode=8" class="menu-item">证书审查</el-menu-item>
            <el-menu-item index="9" @click="mode=9" class="menu-item">潜在密钥概览</el-menu-item>
            <el-menu-item index="11" @click="router().push('/contact')" class="menu-item">关于智行清境（IVSR）</el-menu-item>
            <el-menu-item index="12" @click="router().push('/')" class="menu-item">返回主页面</el-menu-item>
          </el-menu>
        </n-space>
      </div>
      <n-config-provider :hljs="hljs">
        <div id="content-area">
          <!---结果速览-->
          <div v-if="mode===0">
            <p class="sub_title">&diams;&nbsp;结果速览</p>
            <div style="display: flex">
              <div class="sub_block_width" style="height: 200px;min-width: 380px;width:calc(50vw - 220px)">
                <n-image
                    width="200"
                    height="200"
                    style="border-top-left-radius: 20px;border-bottom-left-radius: 20px;"
                    :src="'/api/file/' + hashcode + '/icon'"
                    fallback-src="https://bpic.588ku.com/element_origin_min_pic/19/04/23/ccb94aca0ea5f54c35df8b000c052511.jpg"
                />
                <div style="padding: 10px;width: 380px" translate="no">
                  <ul>
                    <li><p>名称：{{app_info.app_name}}</p></li>
                    <li><p>包名：{{app_info.package_name}}</p></li>
                    <li><p>安装包大小：{{app_info.size}}</p></li>
                  </ul>
                  <div style="display:flex;justify-content: center;word-wrap: break-word">
                    <el-button type="primary" @click="exportMD" :disabled="generating||regenerating">导出分析报告</el-button>
                    <el-button type="warning" @click="regenerate" :disabled="generating||regenerating">重新生成报告</el-button>
                  </div>
                </div>

              </div>

              <div class="sub_block_width" style="height: 200px;min-width: 380px;width:calc(50vw - 220px)">
                <div style="width: 180px">
                  <div v-if="malware_score>0.4" style="position:relative;margin:20px;padding:25px;border-radius: 75px;width:100px;height:100px;border:5px dotted #ff0000;text-align: center">
                    <span style="color: #ff0000;font-size: 28px;line-height: 70px">
                      {{((1-malware_score)*100).toFixed(0)}}
                    </span>
                    <span style="color: #ff0000;font-size: 16px;line-height: 70px">
                      /100
                    </span>
                    <br>
                    <span style="color: #ff0000;font-size: 22px;line-height:30px;">
                      高危
                    </span>
                  </div>
                  <div v-else-if="malware_score>0.1" style="position:relative;margin:20px;padding:25px;border-radius: 75px;width:100px;height:100px;border:5px dotted #eccb49;text-align: center">
                    <span style="color: #eccb49;font-size: 28px;line-height: 70px">
                      {{((1-malware_score)*100).toFixed(0)}}
                    </span>
                    <span style="color: #eccb49;font-size: 16px;line-height: 70px">
                      /100
                    </span>
                    <br>
                    <span style="color: #eccb49;font-size: 22px;line-height:30px;">
                      中危
                    </span>
                  </div>
                  <div v-else-if="malware_score>0.05" style="position:relative;margin:20px;padding:25px;border-radius: 75px;width:100px;height:100px;border:5px dotted #f1e932;text-align: center">
                    <span style="color: #f1e932;font-size: 28px;line-height: 70px">
                      {{((1-malware_score)*100).toFixed(0)}}
                    </span>
                    <span style="color: #f1e932;font-size: 16px;line-height: 70px">
                      /100
                    </span>
                    <br>
                    <span style="color: #f1e932;font-size: 22px;line-height:30px;">
                      低危
                    </span>
                  </div>
                  <div v-else style="position:relative;margin:20px;padding:25px;border-radius: 75px;width:100px;height:100px;border:5px dotted chartreuse;text-align: center">
                    <span style="color: chartreuse;font-size: 28px;line-height: 70px">
                      {{((1-malware_score)*100).toFixed(0)}}
                    </span>
                    <span style="color: chartreuse;font-size: 16px;">
                      /100
                    </span>
                    <br>
                    <span style="color: chartreuse;font-size: 22px;line-height:30px;">
                      安全
                    </span>
                  </div>
                </div>

                <div style="padding: 10px;min-width: 230px;height:200px">
                  <div style="height: 150px;align-items:center;justify-content:center;">
                    <span style="font-size: 24px">应用安全性评估得分</span>
                    <br>
                    <span v-if="malware_score>0.1" style="font-size: 20px;">该应用危险性高，建议立刻停止使用！</span>
                    <span v-else-if="malware_score>0.05" style="font-size: 20px;">该应用可能存在安全隐患，请谨慎使用。</span>
                    <span v-else style="font-size: 20px;">未发现该应用存在严重安全隐患。建议根据具体分析结果进行综合判断。</span>
                  </div>
                </div>

              </div>
            </div>

            <p class="sub_title">·安全分析报告</p>
            <div class="sub_block_width" style="min-height: 420px;width: calc(100vw - 400px);min-width: 800px">
              <div v-if="generating||regenerating" style="margin: 300px auto">
                <n-space vertical>
                  <n-spin size="large" delay="100">
                    <template #description>
                      正在生成报告，请耐心等待哦~
                    </template>
                  </n-spin>
                </n-space>
              </div>
              <div v-else>
                <div style="margin:15px;padding:20px;min-height:350px;width:calc(100% - 70px);white-space: pre-wrap;word-break: break-word;background-color: white;border-radius: 10px">
                  <MdPreview  previewTheme='smart-blue' v-model="report" language="en-US" page-fullscreen read-only/>
                </div>
              </div>
            </div>
          </div>
          <!---应用组件概览-->
          <div v-else-if="mode===1" translate="no">
            <p class="sub_title">·APP组件信息</p>
            <div class="sub_block" style="height: 100px;">
              <div style="margin-left: 40px;">
                <p style="line-height:50px;font-family: serif;font-size: 24px;color: rgb(0,0,0);font-weight: bolder">主活动组件(Main Activity): {{app_comps.main_activity}}</p>
              </div>
            </div>
            <div style="display: flex">
              <div class="comps" style="background-color: rgba(243,0,0,0.6);">
                <p style="color: #ffffff;font-size: 20px;font-weight: bold;text-align: center">Activities(
                  <!--                {{app_comps.activities.length}}-->
                  <n-number-animation
                      show-separator
                      :from="0"
                      duration=1000
                      :to="app_comps.activities.length"
                  />
                  )</p>
                <ul>
                  <li v-for="item in app_comps.activities" :key="item">{{item}}</li>
                </ul>
              </div>
              <div class="comps" style="background-color: rgba(126,215,0,0.6);">
                <p style="color: #ffffff;font-size: 20px;font-weight: bold;text-align: center">Receivers(
                  <n-number-animation
                      show-separator
                      :from="0"
                      duration=1000
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
              <div class="comps" style="background-color: rgba(0,188,255,0.6);">
                <p style="color: #ffffff;font-size: 20px;font-weight: bold;text-align: center">Providers(
                  <n-number-animation
                      show-separator
                      :from="0"
                      duration=1000
                      :to="app_comps.providers.length"
                  />
                  <!--                {{app_comps.providers.length}}-->
                  )</p>
                <ul>
                  <li v-for="item in app_comps.providers" :key="item">{{item}}</li>
                </ul>
              </div>
              <div class="comps" style="background-color: rgba(253,166,0,0.6);">
                <p style="color: #ffffff;font-size: 20px;font-weight: bold;text-align: center">Services(
                  <n-number-animation
                      show-separator
                      :from="0"
                      duration=1000
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
          <div v-else-if="mode===2">
            <div style="height: 750px;">
              <p class="sub_title">·恶意与滥用权限情况</p>
              <div class="sub_block" style="height: 300px;display: flex"  translate="no">
                <div id="premPiePattern" style="width: 300px;height: 100%">

                </div>
                <div style="margin:10px;padding: 20px;border-radius: 20px;width: calc(50% - 120px);background-color: white">
                  <n-statistic label="可能会被恶意利用的主要权限"  tabular-nums>
                    <n-number-animation
                        show-separator
                        :from="0"
                        duration=1000
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
                <div style="margin:10px;padding: 20px;border-radius: 20px;width: calc(50% - 120px);background-color: white">
                  <n-statistic label="其他可能被滥用的权限"  tabular-nums>
                    <n-number-animation
                        show-separator
                        :from="0"
                        duration=1000
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
              <p class="sub_title">·权限使用详细信息（共{{prem_results.perms.length}}项）</p>
              <div class="sub_block">
                <div style="padding: 20px;border-radius: 20px;width: 100%">
                  <n-data-table
                      :columns="perm_columns"
                      :data="prem_results.perms"
                      striped
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="mode===3">
            <p class="sub_title">·与应用发生数据交换的服务器地理分布（共{{domains.length}}处，其中{{unknownDomains}}处来源未知）</p>
            <div class="sub_block">
              <div id="worldmapdom" style="width: 1500px; height: 600px"></div>
            </div>
            <div class="sub_block">
              <div style="margin: 10px;padding:10px;width: calc(100% - 40px);background-color: white;border-radius: 10px">
                <n-data-table
                    :columns="domain_columns"
                    :data="domains"
                    striped
                />
              </div>
            </div>
            <p class="sub_title">·网络安全隐患排查(共{{network_results.length}}项)</p>
            <div class="sub_block" style="max-height: 650px;">
              <div style="margin: 10px;padding:10px;width: calc(100% - 40px);background-color: white;border-radius: 10px">
<!--                <el-table  :data="network_results" :stripe="true" :border="true" fit>-->
<!--                  <el-table-column type="index"></el-table-column>-->
<!--                  <el-table-column prop="name" label="涉及网域（*表示全部域）"></el-table-column>-->
<!--                  <el-table-column prop="severity" label="问题严重程度"></el-table-column>-->
<!--                  <el-table-column prop="description" label="描述"></el-table-column>-->
<!--                </el-table>-->
                <n-data-table
                    :columns="network_columns"
                    :data="network_results"
                    striped
                />
              </div>
            </div>
            <!--          {{network_results}}-->
          </div>
          <div v-else-if="mode===4">
            <p class="sub_title">·特征提取分析(共{{key_features.length}}项)</p>
            <div class="sub_block" translate="no">
              <div style="width:calc(100% - 40px);margin: 10px;padding: 10px;border-radius: 10px;">
<!--                <n-data-table-->
<!--                    :columns="key_features_columns"-->
<!--                    :data="key_features"-->
<!--                />-->
                <el-table  :data="key_features" :stripe="true" :border="true" fit>
                  <el-table-column prop="feature" label="具有关键作用的恶意特征"></el-table-column>
                  <el-table-column label="与之有强相互作用的关联特征">
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
          <div v-else-if="mode===5">
            <p class="sub_title">·动态链接库(共{{binary_results.length}}个)</p>
            <div class="sub_block" translate="no">
              <div style="padding: 20px;border-radius: 20px;">
                <n-data-table
                    :columns="binary_columns"
                    :data="binary_results"
                    striped
                />
              </div>
            </div>
          </div>
          <div v-else-if="mode===6">
            <p class="sub_title">·清单文件分析(共{{manifest_results.length}}项)</p>
            <div class="sub_block">
              <div style="margin: 10px;padding:10px;width: calc(100vw - 40px);background-color: white;border-radius: 10px">
<!--                <el-table  :data="manifest_results" :stripe="true" :border="true" fit>-->
<!--                  <el-table-column type="index"></el-table-column>-->
<!--                  <el-table-column prop="name" label="名称"></el-table-column>-->
<!--                  <el-table-column prop="severity" label="严重程度等级"></el-table-column>-->
<!--                  <el-table-column prop="rule" label="rule"></el-table-column>-->
<!--                  <el-table-column prop="description" label="描述"></el-table-column>-->
<!--                </el-table>-->
                <n-data-table
                    :columns="manifest_columns"
                    :data="manifest_results"
                    striped
                />
              </div>
            </div>
          </div>
          <div v-else-if="mode===7">
            <p class="sub_title">·代码分析(共{{code_results.length}}项)</p>
            <div class="sub_block">
              <div style="margin: 10px;padding:10px;width: calc(100% - 40px);background-color: white;border-radius: 10px">
                <el-table  :data="code_results" :stripe="true" :border="true" fit>
                  <el-table-column prop="name" label="名称"></el-table-column>
                  <el-table-column label="严重程度等级">
                    <template v-slot="{ row }">
                      <n-tag v-if="row.severity==='info'" type="info">
                        提示
                        <template #icon>
                          <n-icon :component="AlertCircleSharp" />
                        </template>
                      </n-tag>
                      <n-tag v-else-if="row.severity==='warning'" type="warning">
                        警告
                        <template #icon>
                          <n-icon :component="WarningSharp" />
                        </template>
                      </n-tag>
                      <n-tag v-else type="error">
                        严重
                        <template #icon>
                          <n-icon :component="CloseCircleSharp" />
                        </template>
                      </n-tag>
                    </template>

                  </el-table-column>
                  <el-table-column prop="description" label="描述"></el-table-column>
<!--                  <el-table-column prop="masvs" label="masvs"></el-table-column>-->
<!--                  <el-table-column prop="cve" label="cve"></el-table-column>-->
<!--                  <el-table-column prop="cvss" label="cvss"></el-table-column>-->
                  <el-table-column label="源码文件" type="expand">
                    <template v-slot="{ row }">
                      <div style="width: calc(100% - 40px);margin: 0 auto">
                        <el-table  :data="row.sources"  :stripe="true" :border="true" max-height="400px">
                          <!--                  <el-table-column type="index"></el-table-column>-->

                          <el-table-column v-slot="{ row }" label="文件">
                            <span translate="no"><a :href="'/sourcecode/' + hashcode + '/' + reversePath(row.file)" target="_blank">{{row.file}}</a></span>
                          </el-table-column>
                          <el-table-column v-slot="{ row }" label="行号">
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
          <div v-else-if="mode===8">
            <p class="sub_title">·证书签名</p>
            <div class="sub_block" style="min-height: 400px;">
              <div style="margin:15px;padding:20px;min-height:330px;width:calc(100% - 40px);white-space: pre-wrap;word-break: break-all;background-color: white;border-radius: 10px">
                <n-code :code="app_info.cert_info" language="plaintext" word-wrap show-line-numbers/>
              </div>
            </div>
            <p class="sub_title">·证书分析信息(共{{cert_results.length}}项)</p>
            <div class="sub_block">
              <div style="padding: 20px;border-radius: 20px;width: 100%;">
                <n-data-table
                    :columns="cert_columns"
                    :data="cert_results"
                    striped
                />
              </div>
            </div>
          </div>
          <div v-else-if="mode===9">
            <p class="sub_title" v-if="secrets_results!==null">·潜在密钥分析(共{{secrets_results.possible_secrets.length}}个)</p>
            <p class="sub_title" v-else>·潜在密钥分析(共0个)</p>
            <div class="sub_block">
              <div style="width:calc(100% - 40px);margin:20px;padding: 20px;border-radius: 20px;background-color: white;overflow-y: scroll;word-break: break-word">
                <p v-if="secrets_results===null||secrets_results.possible_secrets.length===0">未发现潜在的密钥信息</p>
                <p v-else>以下为潜在的密钥信息：</p>
                <ul v-if="secrets_results!==null">
                  <li v-for="item in secrets_results.possible_secrets" :key="item">{{item}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else-if="mode===10">

          </div>
          <div v-else-if="mode===15">



          </div>
        </div>
      </n-config-provider>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {h, nextTick, ref} from "vue";
import {generateReport, scanFile, scanFileML} from "@/api";
import router from "@/router";
import hljs from 'highlight.js/lib/core'
import markdown from 'highlight.js/lib/languages/markdown'
import plaintext from 'highlight.js/lib/languages/plaintext'
import {MdPreview} from "md-editor-v3";
import {loadingPatternOption, piePatternOption} from "@/assets/js/echartsoptions";
import * as echarts from "echarts";
import worldMap from "@/assets/js/world_zh.ts"
import {CloudUploadOutline as ArchiveIcon, AlertCircleSharp, WarningSharp, CloseCircleSharp} from "@vicons/ionicons5";
import {englishToChineseAbbreviation} from "@/assets/js/translate";
import {NTag,NIcon} from "naive-ui";
import "@vavt/markdown-theme/css/all.css";

export default {
  name: "GeneralAnalysis",
  computed: {
    CloseCircleSharp() {
      return CloseCircleSharp
    },
    WarningSharp() {
      return WarningSharp
    },
    AlertCircleSharp() {
      return AlertCircleSharp
    }
  },
  components: {MdPreview,ArchiveIcon},
  methods: {
    router() {
      return router
    }
  },

  setup() {
    const empty_list = ref([]);
    const route = useRoute();
    const hashcode = route.params.hashcode;

    const information = ref(null);
    const mode = ref(0);
    const app_info = ref();
    const app_comps = ref();
    const binary_results = ref();
    const cert_results = ref();
    const code_results = ref();
    const manifest_results = ref();
    const prem_results = ref();
    const secrets_results = ref();
    const network_results = ref();
    const domains = ref();

    const informationML = ref(null);
    const key_features = ref();
    const malware_score = ref(0.0);

    const report = ref();

    const loading1 = ref(true);
    const loading2 = ref(true);
    const generating = ref(true);
    const regenerating = ref(false);

    const anythingupload = ref(true);

    const domainsCountForCountry = ref([])
    const unknownDomains = ref(0)

    if (hashcode === '0') {
      anythingupload.value = false;
    }

    // const message=useMessage();

    hljs.registerLanguage('markdown', markdown)
    hljs.registerLanguage('plaintext', plaintext)
    const analysis = (info) => {
      app_info.value = info.app_info;
      app_comps.value = info.app_comps;
      binary_results.value = info.binary_results;
      cert_results.value = info.cert_results;
      code_results.value = info.code_results;
      manifest_results.value = info.manifest_results;
      prem_results.value = info.prem_results;
      secrets_results.value = info.secrets_results;
      network_results.value = info.network_results;
      domains.value = info.domains;
      for (const domain of domains.value) {
        if (domain.geolocation === null || domain.geolocation === undefined) {
          unknownDomains.value++;
          continue;
        }
        if (domainsCountForCountry.value.find(
            item => item.name === englishToChineseAbbreviation(domain.geolocation.country_short)) === undefined
        ) {
          const newCountryData = {name: englishToChineseAbbreviation(domain.geolocation.country_short), domainCount: 1};
          domainsCountForCountry.value.push(newCountryData)
        } else {
          const index = domainsCountForCountry.value.findIndex(item => item.name === englishToChineseAbbreviation(domain.geolocation.country_short));
          domainsCountForCountry.value[index].domainCount++;
        }
      }
    }

    const analysisML = (info) => {
      key_features.value = info.key_features;
      malware_score.value = info.malware_score;
    }

    const reversePath = (path) => {

      return path.split("/").join("%2F");
    }

    const regenerate = () => {
      regenerating.value = true;
      generateReport({"regenerate": true, "hash": hashcode}).then((res) => {
        report.value = res.data;
        regenerating.value = false;
      }).catch((error) => {
        console.log("报告生成出现错误：" + error);
      })
    }

    const exportMD = () => {
      const blob = new Blob([report.value], {
        type: 'text/markdown'
      })
      const objectURL = URL.createObjectURL(blob)
      const aTag = document.createElement('a')
      aTag.href = objectURL
      aTag.download = "Report.md"
      aTag.click()
      URL.revokeObjectURL(objectURL)
    }
    if (anythingupload.value) {
      scanFile({"hash": hashcode}).then((res) => {
        information.value = res;
        analysis(information.value);
        loading1.value = false;
        scanFileML({"hash": hashcode}).then((res) => {
          informationML.value = res;
          analysisML(informationML.value);
          loading2.value = false;
          generateReport({"regenerate": false, "hash": hashcode}).then((res) => {
            report.value = res.data;
            generating.value = false;
          }).catch((error) => {
            console.log("报告生成出现错误：" + error)
            router.push('/');
          })
        }).catch((error) => {
          alert("ML分析出现错误：" + error)
          router.push('/');
        })
      }).catch((error) => {
        alert("静态分析出现错误：" + error)
        router.push('/');
        // message.error("静态分析出现错误："+error);
      })


      nextTick(() => {
        (echarts.init(document.getElementById('loadingPattern'))).setOption(loadingPatternOption);
      })
    }

    const cert_columns = [
      {
        title: "名称", key: "name"
      },
      {
        title: "问题级别", key: "severity",
        render (row) {
          if(row.severity==='warning'){
            return h(
                NTag,
                {
                  style: {
                    marginRight: "6px"
                  },
                  type: "warning",
                  bordered: false
                },
                {
                  default: () => [h(NIcon,{component:WarningSharp}),"警告"]
                }
            );
          }
          if(row.severity==='info'){
            return h(
                NTag,
                {
                  style: {
                    marginRight: "6px"
                  },
                  type: "info",
                  bordered: false
                },
                {
                  default: () => [h(NIcon,{component:AlertCircleSharp}),"提示"]
                }
            );
          }
          if(row.severity==='high'){
            return h(
                NTag,
                {
                  style: {
                    marginRight: "6px"
                  },
                  type: "error",
                  bordered: false
                },
                {
                  default: () => [h(NIcon,{component:CloseCircleSharp}),"严重"]
                }
            );
          }
        }
      },
      {
        title: "描述", key: "description"
      }
    ]
    const perm_columns = [
      {
        title: "名称", key: "name",
        render(row){
          return h('span', {translate:"no"},row.name)
        }
      },
      {
        title: "问题级别", key: "severity",
        render (row) {
          if(row.severity==='warning'){
            return h(
                NTag,
                {
                  style: {
                    marginRight: "6px"
                  },
                  type: "warning",
                  bordered: false
                },
                {
                  default: () => [h(NIcon,{component:WarningSharp}),"警告"]
                }
            );
          }
          if(row.severity==='info'){
            return h(
                NTag,
                {
                  style: {
                    marginRight: "6px"
                  },
                  type: "info",
                  bordered: false
                },
                {
                  default: () => [h(NIcon,{component:AlertCircleSharp}),"提示"]
                }
            );
          }
          if(row.severity==='high'){
            return h(
                NTag,
                {
                  style: {
                    marginRight: "6px"
                  },
                  type: "error",
                  bordered: false
                },
                {
                  default: () => [h(NIcon,{component:CloseCircleSharp}),"严重"]
                }
            );
          }
        }
      },
      {
        title: "描述", key: "description"
      },
      {
        title: "信息", key: "info",
      },
    ]
    const code_columns = [
      {
        type: "selection"
      },
      {
        type: "expand",
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

    const domain_columns = [
      {
        title: "域名", key: "name"
      },
      {
        title: "是否为恶意域名", key: "bad",
        render(row){
          if(row.bad==="yes") return "是";
          else return "否";
        }
      },
      {
        title: "IP地址", key: "geolocation.ip",
        render(row){
          if(row.geolocation===null) return "未知";
          if(row.geolocation.ip===null) return "未知";
          return row.geolocation.ip;
        }
      },
      {
        title: "国家", key: "geolocation.country_long",
        render(row){
          if(row.geolocation===null) return "未知";
          if(row.geolocation.country_long===null) return "未知";
          return row.geolocation.country_long;
        }
      },
      {
        title: "地区", key: "geolocation.region",
        render(row){
          if(row.geolocation===null) return "未知";
          if(row.geolocation.region===null) return "未知";
          return row.geolocation.region;
        }
      },
      {
        title: "城市", key: "geolocation.city",
        render(row){
          if(row.geolocation===null) return "未知";
          if(row.geolocation.city===null) return "未知";
          return row.geolocation.city;
        }
      },
      // {
      //   title:"源文件位置",key:"sources",width: 100
      // }
    ]
    const binary_columns = [
      {
        title: "共享库名称", key: "name",
        defaultSortOrder: 'ascend',
        sorter: 'default'
      },
      {
        title: "是否使用NX位", key: "is_nx.is_nx",
        render(row) {
          if (row.is_nx.is_nx === true) return "是";
          else return "否";
        }
      },
      {
        title: "是否使用Stack Canary", key: "has_canary.has_canary",
        render(row) {
          if (row.has_canary.has_canary === true) return "是";
          else return "否";
        }
      },
      {
        title: "是否实现堆栈地址随机化", key: "relro.relro",
        render(row) {
          if (row.relro.relro === "Full RELRO") return "实现";
          else if (row.relro.relro === "Partial RELRO") return "部分实现";
          else return "未实现";
        }
      },
      {
        title: "查找动态库的搜索路径", key: "rpath.rapth",
        render(row) {
          if (row.rpath.rpath === null) return "未设置";
          else return row.rpath.rpath;
        }
      },
      {
        title: "动态库的运行路径", key: "runpath.runpath",
        render(row) {
          if (row.runpath.runpath === null) return "未设置";
          else return row.runpath.runpath;
        }
      },
      {
        title: "是否增强函数以提供缓冲区溢出检测", key: "is_fortified.is_fortified",
        render(row) {
          if (row.is_fortified.is_fortified === true) return "是";
          else return "否";
        }
      },
      {
        title: "是否对符号表进行清除", key: "is_stripped.is_stripped",
        render(row) {
          if (row.is_stripped.is_stripped === true) return "是";
          else return "否";
        }
      }
    ]
    const manifest_columns=[
      {
        title: "名称", key: "name",
        defaultSortOrder: 'ascend',
        sorter: 'default'
      },
      {
        title: "问题级别", key: "severity",
        render (row) {
          if(row.severity==='warning'){
            return h(
                NTag,
                {
                  style: {
                    marginRight: "6px"
                  },
                  type: "warning",
                  bordered: false
                },
                {
                  default: () => [h(NIcon,{component:WarningSharp}),"警告"]
                }
            );
          }
          if(row.severity==='info'){
            return h(
                NTag,
                {
                  style: {
                    marginRight: "6px"
                  },
                  type: "info",
                  bordered: false
                },
                {
                  default: () => [h(NIcon,{component:AlertCircleSharp}),"提示"]
                }
            );
          }
          if(row.severity==='high'){
            return h(
                NTag,
                {
                  style: {
                    marginRight: "6px"
                  },
                  type: "error",
                  bordered: false
                },
                {
                  default: () => [h(NIcon,{component:CloseCircleSharp}),"严重"]
                }
            );
          }
        }
      },
      {
        title:"描述信息",key:"description"
      },
      {
        title: "问题分类",key:"rule"
      }
    ]
    const network_columns=[
          {
            title:"涉及网域（*表示全部域）",key:"name"
          },
          {
            title:"问题等级",key:"name",
            render (row) {
              if(row.severity==='warning'){
                return h(
                    NTag,
                    {
                      style: {
                        marginRight: "6px"
                      },
                      type: "warning",
                      bordered: false
                    },
                    {
                      default: () => [h(NIcon,{component:WarningSharp}),"警告"]
                    }
                );
              }
              if(row.severity==='info'){
                return h(
                    NTag,
                    {
                      style: {
                        marginRight: "6px"
                      },
                      type: "info",
                      bordered: false
                    },
                    {
                      default: () => [h(NIcon,{component:AlertCircleSharp}),"提示"]
                    }
                );
              }
              if(row.severity==='high'){
                return h(
                    NTag,
                    {
                      style: {
                        marginRight: "6px"
                      },
                      type: "error",
                      bordered: false
                    },
                    {
                      default: () => [h(NIcon,{component:CloseCircleSharp}),"严重"]
                    }
                );
              }
            }
          },
          {
            title:"描述",key:"description",
          }
        ]
    // const key_features_columns = [
    //   {
    //     title: "具有关键作用的恶意特征", key: "feature",
    //     defaultSortOrder: 'ascend',
    //     sorter: 'default',
    //   },
    //   {
    //     title: "与之有强相互作用的关联特征", key: "associate_features",
    //     render: (row) => {
    //       let str=row.associate_features.join('\n')
    //       return str;
    //     }
    //   },
    // ]

    const initMap = () => {
      mode.value = 3;
      nextTick(
          () => {
            let dom = document.getElementById("worldmapdom")
            echarts.registerMap('world', worldMap, {
              Alaska: {
                left: -131,
                top: 25,
                width: 15,
              },
              Hawaii: {
                left: -110,
                top: 28,
                width: 5,
              },
              'Puerto Rico': {
                left: -76,
                top: 26,
                width: 2,
              },
            })
            const myChart = echarts.init(dom)
            const option = {
              title: {
                text: '网联服务器地理位置分布地图',
                left: 'center',
              },
              tooltip: {
                triggerOn: 'mousemove',
                formatter: function (params) {
                  if (params?.data) {
                    var a = `<span style="color:rgba(23, 240, 204)">国家名称：${params.data.name}</span></br>`
                    var b = `<span style="color:rgba(23, 240, 204)">服务器数量：${params.data.domainCount}</span></br>`
                    return [a, b].join('')
                  }
                },
                backgroundColor: 'rgba(29, 38, 71)',
                // 额外附加的阴影
                extraCssText: 'box-shadow:0 0 4px rgba(11, 19, 43,0.8);',
              },
              geo: {
                map: 'world',
                // aspectScale: 0.75, //长宽比
                // zoom: 1.0,
                roam: false,
              },
              series: [
                {
                  name: '境外事务',
                  type: 'map',
                  roam: false,
                  map: 'world',
                  // label: {
                  // 	show: true,
                  // },
                  itemStyle: {
                    normal: {
                      borderColor: 'rgb(147, 235, 248)',
                      borderWidth: 1,
                      areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [
                          {
                            offset: 0,
                            color: '#396a92', // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: '#396a92', // 100% 处的颜色
                          },
                        ],
                        globalCoord: true, // 缺省为 false
                      },
                    },
                    emphasis: {
                      areaColor: 'rgba(23, 240, 204)',
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      borderWidth: 0,
                    },
                  },
                  data: domainsCountForCountry.value,
                },
              ],
            }
            myChart.setOption(option)
            if(domainsCountForCountry.value.length!==0){
              // 自动轮播
              let n = 0
              let Carousel = setInterval(function () {
                myChart.dispatchAction({
                  type: 'showTip',
                  seriesIndex: 0,
                  name: domainsCountForCountry.value[n].name,
                })
                myChart.dispatchAction({
                  type: 'mapToggleSelect',
                  seriesIndex: 0,
                  name: domainsCountForCountry.value[n].name,
                })
                n++
                if (n === domainsCountForCountry.value.length) {
                  n = 0
                }
              }, 3000)
              // 鼠标移入有mapData数据的国家清除定时器
              myChart.on('mouseover', function (params) {
                if (params.data) {
                  clearInterval(Carousel)
                }
              })
              // 鼠标移出有mapData数据的国家清除定时器，并开起新的定时器
              myChart.on('mouseout', function (params) {
                if (params.data) {
                  clearInterval(Carousel) //停止定时器
                  Carousel = setInterval(function () {
                    myChart.dispatchAction({
                      type: 'showTip',
                      seriesIndex: 0,
                      name: domainsCountForCountry.value[n].name,
                    })
                    myChart.dispatchAction({
                      type: 'mapToggleSelect',
                      seriesIndex: 0,
                      name: domainsCountForCountry.value[n].name,
                    })
                    n++
                    if (n === domainsCountForCountry.value.length) {
                      n = 0
                    }
                  }, 3000)
                }
              })
            }

          })

    }

    const turnToPerm = () => {
      mode.value = 2;
      nextTick(
          () => {
            let dom = document.getElementById('premPiePattern');
            let option = piePatternOption;
            piePatternOption.series[0].data = [
              {value: prem_results.value.malware_perms_stat.total_malware_perms, name: '可能被恶意利用的权限'},
              {value: prem_results.value.malware_perms_stat.total_other_perms, name: '其他权限'},
            ]
            echarts.init(dom).setOption(option);
          }
      )
    }

    const handleSuccess = ({file, event}) => {
      console.log(file)
      let hashcode = (event?.target).response;
      hashcode = JSON.parse(hashcode);
      router.push('/analysis/' + hashcode.hash);
    };


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
      domain_columns,
      key_features,
      malware_score,
      hashcode,
      report,
      generating,
      reversePath,
      regenerate,
      empty_list,
      exportMD,
      anythingupload,
      regenerating,
      initMap,
      handleSuccess,
      domains,
      turnToPerm,
      binary_columns,
      unknownDomains,
      manifest_columns,
      network_columns
    };
  }
}
</script>

<style scoped>
#mainblock{
  background: url("@/assets/img/dash_bk.jpg") no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height:calc(100vh - 100px);
  margin: 0;
  padding: 0;
}
#navlist{
  position: relative;
  background-color: #071941;
  width: 300px;
  padding: 0;
  margin: 0;
}
#content-area{
  position: relative;
  width: calc(100vw - 300px);
  height: calc(100vh - 140px);
  background: url("@/assets/img/dash_bk.jpg") no-repeat;
  background-size: 100% 100%;
  padding: 20px;
  margin: 0;
  overflow-y: scroll;
}
.menu-item{
  background-color: transparent;
}
.sub_title{
  text-align: left;
  color: #ffffff;
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
  width: calc(100vw - 350px);
  min-width: 800px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow:0 0 10px 10px rgba(220, 215, 196, 0.05);
  display: flex;
}
.sub_block_width{
  margin:10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow:0 0 10px 10px rgba(220, 215, 196, 0.05);
  display: flex;
}
.comps{
  min-width: 400px;
  width: calc(50vw - 180px);
  height: 230px;
  margin: 20px;
  border-radius: 5px;
  /*box-shadow: 0 0 10px 10px #dcd7c4;*/
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