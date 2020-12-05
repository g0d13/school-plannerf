import { axiosInstance } from "src/boot/axios";

export default {
  namespaced: true,
  state: () => ({
    notes: []
  }),
  getters: {
    getNoteById: state => idNote => {
      return state.notes.find(note => note.id === idNote);
    }
  },
  mutations: {
    setItems(state, data) {
      if (Array.isArray(data)) {
        state.notes = data;
      } else {
        state.notes = [...state.notes, data];
      }
    },
    deleteNote(state, idNote) {
      state.notes = state.notes.filter(n => n.id !== idNote);
    }
  },
  actions: {
    async getNotes(context) {
      const { data } = await axiosInstance.get("/notes");
      context.commit("setItems", data);
    },
    postNotes(context, data) {
      axiosInstance.post("/semesters", data);
      context.commit("setItems", data);
    },
    deleteNote(context, id) {
      axiosInstance.delete(`/notes/${id}`);
      context.commit("deleteNote", id);
    }
  }
};
