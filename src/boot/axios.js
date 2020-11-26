import Vue from "vue";
import axios from "axios";

import { boot } from "quasar/wrappers";

export default boot(async ({ Vue }) => {
  const baseInstance = axios.create({
    withCredentials: false,
    // baseURL: "https://shool-planner.herokuapp.com/"
    baseURL: "http://localhost:3000"
  });

  const authService = Vue.prototype.$auth;

  // authService.$watch("user", async _loading => {
  //   const token = await authService.getTokenSilently();
  //   baseInstance.interceptors.request.use(config => {
  //     config.headers["Authorization"] = `Bearer ${token}`;
  //     return config;
  //   });
  // });

  Vue.prototype.$axios = baseInstance;
});
