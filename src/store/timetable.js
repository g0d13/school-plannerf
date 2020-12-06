import { axiosInstance } from "src/boot/axios";
import ColorRandom from "random-material-color";

export default {
  namespaced: true,
  state: () => ({
    schedules: [],
    days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]
  }),
  getters: {
    getScheduleById: state => idSchedule => {
      return state.notes.find(schedule => schedule.id === idSchedule);
    },
    getTask: state => day => {
      const nameDay = state.days[day];
      return state.schedules.filter(task => task.day === nameDay);
    }
  },
  mutations: {
    setItems(state, data) {
      if (Array.isArray(data)) {
        state.schedules = data;
      } else {
        state.schedules = [...state.schedules, data];
      }
    },
    deleteSchedule(state, idSchedule) {
      state.schedules = state.schedules.filter(t => t.id !== idSchedule);
    }
  },
  actions: {
    async getSchedules(context) {
      const { data } = await axiosInstance.get("/schedule");
      context.commit("setItems", data);
    },
    async postSchedule(context, course) {
      const { data } = await axiosInstance.post("/schedule", course);
      context.commit("setItems", data);
    },
    deleteSchedule(context, id) {
      axiosInstance.delete(`/schedule/${id}`);
      context.commit("deleteSchedule", id);
    }
  }
};
