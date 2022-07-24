import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../view/Home.vue"),
      children: [
        {
          path: "data",
          component: () => import("../components/table-data.vue"),
        },
        {
          path: "user",
          component: () => import("../components/table-user.vue"),
        },
<<<<<<< HEAD
      ],
    },
    {
      path: "/login",
      component: () => import("../components/TheLogin.vue"),
=======
        {
          path: "model",
          component: () => import("../components/table-model.vue"),
        },
        {
          path: "info",
          component: () => import("../components/info-card.vue"),
        }
      ]
>>>>>>> bf2fff7b0e6931828995a1813e1baa621d5c384e
    },
    // {
    //   path: "/info",
    //   component: () => import("../components/RandomAnimal.vue"),
    // }
  ],
});
