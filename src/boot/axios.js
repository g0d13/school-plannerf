import Vue from "vue";
import axios from "axios";

const baseInstance = axios.create({
  baseURL: "https://shool-planner.herokuapp.com/",
});
Vue.prototype.$axios = baseInstance;
