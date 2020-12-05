/*
export function someMutation (state) {
}
*/

export function setActualSemester(state, semesterId) {
  state.actualSemester = semesterId;
}

export function newSemester(state, newSemesters) {
  setItems(state, "semesters", newSemesters);
}

export function newCourses(state, newCourse) {
  setItems(state, "courses", newCourse);
}

export function newTeachers(state, newTeacher) {
  setItems(state, "teachers", newTeacher);
}

export function newNotes(state, newNote) {
  setItems(state, "notes", newNote);
}

export function deleteNote(state, idNote) {
  state.notes = state.notes.filter(n => n.id !== idNote);
}

export function setSchedule(state, newTask) {
  setItems(state, "schedule", newTask);
}

function setItems(state, itemType, data) {
  if (Array.isArray(data)) {
    state[itemType] = data;
  } else {
    state[itemType] = [...state[(itemType, data)]];
  }
}
