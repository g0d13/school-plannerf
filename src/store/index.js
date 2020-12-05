import Vue from "vue";
import Vuex from "vuex";
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
import planner from "./planner";
import notes from "./notes";
import semester from "./semester";

// import example from './module-example'

Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      planner,
      notes,
      semester
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });
}
