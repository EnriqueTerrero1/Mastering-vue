import Vue from "vue";
import VueRouter, { RouterLink } from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import NProgress from "nprogress";
import store from "@/store";
import NotFound from "../views/NotFound.vue";
import NetworkIssue from "../views/NetworkIssue.vue";
import Example from "../views/Example.vue";
import Dashboard from "../views/Dashboard.vue";
import RegisterUser from "../views/RegisterUser.vue"
import LoginUser from "../views/LoginUser.vue";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
{
  path:'/',
  name:'Home',
  props:true,
  component:Home
  
},


  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id).then((event) => {
        routeTo.params.event = event
        next()
      }).catch(error => {
        if (error.response && error.response.status == 404) {
          next({ name: '404', params: { resource: 'event' } })
        } else {
          next({ name: 'network-issue' })
        }
      })
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path:'/example',
    component:Example
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: EventList,

  },
  {
    path:'/register',
    name:'register',
    component:RegisterUser
  },
  {
    path:'/login',
    name:'login',
    component:LoginUser
  },
  {
    path:'/eventList',
    name:'event-list',
    component:EventList,
    props:true,
    meta:{requiresAuth:true}
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router;
