import { axiosInstance } from "src/boot/axios";

export default {
  namespaced: true,
  state: () => ({
    teachers: []
  }),
  getters: {
    getTeacherById: state => idTeacher => {
      return state.notes.find(teacher => teacher.id === idTeacher);
    }
  },
  mutations: {
    setItems(state, data) {
      if (Array.isArray(data)) {
        state.teachers = data;
      } else {
        state.teachers = [...state.teachers, data];
      }
    },
    deleteTeacher(state, idTeacher) {
      state.teachers = state.teachers.filter(t => t.id !== idTeacher);
    }
  },
  actions: {
    async getTeachers(context) {
      const { data } = await axiosInstance.get("/teachers");
      context.commit("setItems", data);
    },
    postTeacher(context, data) {
      axiosInstance.post("/teachers", data);
      context.commit("setItems", data);
    },
    deleteTeacher(context, id) {
      axiosInstance.delete(`/teachers/${id}`);
      context.commit("deleteTeacher", id);
    }
  }
};
