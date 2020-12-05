import { axiosInstance } from "src/boot/axios";
import { date } from "quasar";

export default {
  namespaced: true,
  state: () => ({
    semesters: [],
    actualSemester: 0
  }),
  getters: {
    getActualSemester(state) {
      if (state.actualSemester !== 0) {
        return state.actualSemester;
      }

      const isBetweenDates = (date1, date2) =>
        date.isBetweenDates(date1, date2, { onlyDate: true });

      return state.semesters.find(se =>
        isBetweenDates(se.startDate, se.endDate)
      );
    }
  },
  mutations: {
    setActualSemester(state, semesterId) {
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
