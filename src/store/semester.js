import { axiosInstance } from "src/boot/axios";

export default {
  namespaced: true,
  state: () => ({
    semesters: [],
    actualSemester: 0
  }),
  getters: {
    getActualSemester(state) {
      if (localStorage.getItem("actualSemester")) {
        if (state.actualSemester > 0) {
          return state.actualSemester;
        } else {
          return parseInt(localStorage.getItem("actualSemester"));
        }
      }
      return state.actualSemester;
    }
  },
  mutations: {
    setActualSemester(state, semesterId) {
      let toString = semesterId.toString();
      console.log(typeof toString);
      localStorage.setItem("actualSemester", semesterId + "");
      state.actualSemester = semesterId;
    },
    setItems(state, data) {
      if (Array.isArray(data)) {
        state.semesters = data;
      } else {
        state.semesters = [...state.semesters, data];
      }
    },
    deleteSemester(state, idSemester) {
      state.semesters = state.semesters.filter(n => n.id !== idSemester);
    }
  },
  actions: {
    async getSemesters(context) {
      const { data } = await axiosInstance.get("/semesters");
      context.commit("setItems", data);
    },
    postSemester(context, data) {
      axiosInstance.post("/semesters", data);
      context.commit("setItems", data);
    },
    deleteSemester(context, id) {
      axiosInstance.delete(`/semesters/${id}`);
      context.commit("deleteSemester", id);
    }
  }
};
