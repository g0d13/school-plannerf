const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/timetable", component: () => import("pages/Timetable.vue") },
      { path: "/teacher", component: () => import("pages/Teacher.vue") },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/EmptyLayout"),
    children: [
      { path: "welcome", component: () => import("pages/Welcome.vue") },
      { path: "login", component: () => import("pages/Login.vue") },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
