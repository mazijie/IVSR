/* eslint-disable no-unused-vars */
import {createRouter,createWebHistory} from 'vue-router';
import MainPage from "@/view/MainPage.vue";
import DashBoard from "@/view/DashBoard.vue";
import StaticAnalysis from "@/components/DashBoard/StaticAnalysis.vue";
import SourceCode from "@/components/DashBoard/SourceCode.vue";
import GeneralAnalysis from "@/components/DashBoard/GeneralAnalysis.vue";
import ContactUS from "@/view/Contact.vue"
/**  各个模块 */
const Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name:'main-page', component: MainPage},
        {
            path: '/dashboard',
            name: '/dashboard',
            component:DashBoard,
            children:[
                {
                    path: '/analysis/:hashcode',
                    name: 'general-analysis',
                    component:GeneralAnalysis,
                },
                {
                    path: '/static-analysis/:hashcode',
                    name: 'static-analysis',
                    component:StaticAnalysis,
                },
                {
                    path: '/sourcecode/:hashcode/:filepath',
                    name: 'sourcecode',
                    component:SourceCode,
                },

            ],
        },
        {
            path: '/contact',
            name: 'contact',
            component:ContactUS,
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
