import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/PageLogon',
    name: 'PageLogon',
    component: () => import('../views/logon/PageLogon.vue'), //登录页面

  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'), //后台
    redirect: "PipePage",
    children: [
      {
        path: "/PipePage",
        name: "PipePage",
        component: () => import("../views/page/PipePage.vue"), //全部页面
      },
      {
        path: "/ManAge",
        name: "ManAge",
        component: () => import("../views/page/ManAge.vue"), //图片页面
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/page/OrderPage.vue"), //订单页面
      },
      {
        path: "/LoveYou",
        name: "LoveYou",
        component: () => import("../views/page/LoveYou.vue"), //订单页面

        beforeEnter: (to, from, next) => {
          const status = sessionStorage.getItem('logon1')
          if (status) {
            next()
          } else {
            // ElMessage.error('请输入密钥')
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == "/PageLogon") {
    next();
  } else {
    if (sessionStorage.getItem("Zhao") != null) { //存储登录
      next();
    } else {
      alert("请登录");
      next("/PageLogon");
    }
  }
});


export default router
