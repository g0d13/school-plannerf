/*
export function someMutation (state) {
}
*/

export function setActualSemester(state, semesterId) {
  state.actualSemester = semesterId;
}

export function newSemester(state, newSemesters) {
  newItems(state, "semesters", newSemesters);
}

export function newCourses(state, newCourse) {
  newItems(state, "courses", newCourse);
}

export function newTeachers(state, newTeacher) {
  newItems(state, "teachers", newTeacher);
}

function newItems(state, itemType, data) {
  if (Array.isArray(data)) {
    state[itemType] = data;
  } else {
    state[itemType] = [...state[(itemType, data)]];
  }
}
