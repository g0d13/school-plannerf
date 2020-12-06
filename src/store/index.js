import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
import notes from "./notes";
import semester from "./semester";
import teacher from "./teacher";
import course from "./course";
import timetable from "./timetable";

// import example from './module-example'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default function(/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      notes,
      semester,
      teacher,
      course,
      timetable
    },
    plugins: [vuexLocal.plugin],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });
}
