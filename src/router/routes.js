const routes = [
  {
    path: "/",
    component: () => import("layouts/EmptyLayout"),
    children: [
      { path: "", component: () => import("pages/StartHere.vue") },
      { path: "/welcome", component: () => import("pages/Welcome.vue") },
      { path: "/login", component: () => import("pages/Login.vue") }
    ],
    meta: { requiresAuth: false }
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import("pages/Home.vue") },
      { path: "/timetable", component: () => import("pages/Timetable.vue") },
      { path: "/courses", component: () => import("pages/Course.vue") },
      { path: "/teachers", component: () => import("pages/Teacher.vue") },
      { path: "/semesters", component: () => import("pages/Semester.vue") },
      { path: "/notes", component: () => import("pages/Note.vue") },
      { path: "/home", component: () => import("pages/Home.vue") },
      { path: "/profile", component: () => import("pages/Profile.vue") }
    ],
    meta: { requiresAuth: true }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
