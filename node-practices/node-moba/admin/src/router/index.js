import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

// 分类
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

// 物品
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

// 英雄
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

// 文章/资讯
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

// 广告位
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

// 管理员
import AdminEdit from '../views/AdminEdit.vue'
import AdminList from '../views/AdminList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // 路由元信息 配合导航守卫
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },

      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },
      { path: '/heroes/list', component: HeroList },

      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/articles/list', component: ArticleList },

      { path: '/ads/create', component: AdEdit },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/ads/list', component: AdList },

      { path: '/admin_users/create', component: AdminEdit },
      { path: '/admin_users/edit/:id', component: AdminEdit, props: true },
      { path: '/admin_users/list', component: AdminList }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage._token) {
    return next('/login')
  }
  next()
})

export default router
