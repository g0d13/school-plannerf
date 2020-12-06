import { axiosInstance } from "src/boot/axios";

export default {
  namespaced: true,
  state: () => ({
    courses: []
  }),
  getters: {
    getCourseById: state => idCourse => {
      return state.courses.find(course => course.id === idCourse);
    }
  },
  mutations: {
    setItems(state, data) {
      if (Array.isArray(data)) {
        state.courses = data;
      } else {
        state.courses = [...state.courses, data];
      }
    },
    deleteCourse(state, idCourse) {
      state.courses = state.courses.filter(n => n.id !== idCourse);
    }
  },
  actions: {
    async getCourses(context) {
      const { data } = await axiosInstance.get("/courses");
      context.commit("setItems", data);
    },
    postCourse(context, data) {
      axiosInstance.post("/courses", data);
      context.commit("setItems", data);
    },
    deleteCourse(context, id) {
      axiosInstance.delete(`/courses/${id}`);
      context.commit("deleteCourse", id);
    }
  }
};
