import Vue from "vue";
import Router from "vue-router";

import create from "@/components/create";
import page1 from "@/components/page1";
import detail from "@/components/detail";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/create",
      name: "create",
      component: create
    },
    {
      path: "/",
      name: "page1",
      component: page1
    },
    {
      path: "/detail",
      name: "detail",
      component: detail
    }
  ]
});
