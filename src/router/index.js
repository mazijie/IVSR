/* eslint-disable no-unused-vars */
import {createRouter,createWebHistory} from 'vue-router';
import MainPage from "@/view/MainPage.vue";
import DashBoard from "@/view/DashBoard.vue";
import StaticAnalysis from "@/components/DashBoard/StaticAnalysis.vue";
import DynamicsAnalysis from "@/components/DashBoard/DynamicsAnalysis.vue";
import SourceCode from "@/components/DashBoard/SourceCode.vue";
// import HeadsQ from "@/components/Heads.vue";
/**  各个模块 */
const Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name:'MainPage', component: MainPage},
        {
            path: '/dashboard',
            name: '/dashboard',
            component:DashBoard,
            // redirect : {name:'docEdit'},
            children:[
                // {
                //     path: '/doc-edit/:doc_name/:doc_id/:isNewDoc/:doc_temp/:isVstEditable',
                //     name: 'docEdit',
                //     component:DocEdit,
                // },
                {
                    path: '/static-analysis/:hashcode',
                    name: 'static-analysis',
                    component:StaticAnalysis,
                },
                {
                    path: '/dynamics-analysis',
                    name: 'dynamics-analysis',
                    component:DynamicsAnalysis,
                },
                {
                    path: '/sourcecode/:hashcode/:filepath',
                    name: 'sourcecode',
                    component:SourceCode,
                }
            ]
        },
    //     //空页面，用于刷新，会跳转到团队的首页
    //     {
    //         path:'/empty',
    //         component: EmptyPage,
    //         name:'empty'
    //     },
    //     //错误路由访问
    //     { path: '/:pathMatch(.*)*',
    //         redirect:'/'}
    //     // ... 其他路由规则
    ]
});
// const isAuthenticated = async function() {
//     let JWT = localStorage.getItem('JWT');
//     try {
//         const response = await axios.post('/api/user/decode', {
//             "JWT": JWT
//         });
//         console.log(response);
//         return response.data.user_id >= 0;
//     } catch (error) {
//         // alert("return false");
//         return true;
//     }
// };
//
// Router.beforeEach(async (to, from) => {
//     const authenticated = await isAuthenticated();
//     // alert(authenticated);
//     if ((!authenticated) && (to.path !== '/')&&(to.path)!=='/login' &&(to.path)!=='/prototype/preview') {
//         // 将用户重定向到登录页面
//         ElMessage.error("登录信息已失效，请重新登录");
//         return { path: '/login' }
//     }
// })

export default Router;
