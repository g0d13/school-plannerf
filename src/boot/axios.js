import axios from "axios";

import { boot } from "quasar/wrappers";

let axiosInstance;

export default boot(async ({ app, Vue }) => {
  axiosInstance = axios.create({
    withCredentials: false,
    baseURL: "https://shool-planner.herokuapp.com/"
    // baseURL: "http://localhost:3000"
  });
  const authService = Vue.prototype.$auth;

  authService.$watch("user", async _loading => {
    try {
      const token = await authService.getTokenSilently();
      axiosInstance.interceptors.request.use(config => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });
    } catch {}
  });

  Vue.prototype.$axios = axiosInstance;
});

export { axiosInstance };
