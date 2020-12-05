/*
export function someAction (context) {
}
*/
import { axiosInstance } from "src/boot/axios";

export async function getSemesters(context) {
  const { data } = await axiosInstance.get("/semesters");
  context.commit("newSemester", data);
}

export async function postSemester(context, data) {
  await axiosInstance.post("/semesters", data);
  context.commit("newSemester", data);
}

export async function getCourses(context) {
  const { data } = await axiosInstance.get("/courses");
  context.commit("newCourses", data);
}

export async function postCourses(context, data) {
  await axiosInstance.post("/courses", data);
  context.commit("postCourses", data);
}

export async function getTeachers(context) {
  const { data } = await axiosInstance.get("/teachers");
  context.commit("newTeachers", data);
}

export async function getNotes(context) {
  const { data } = await axiosInstance.get("/notes");
  context.commit("newNotes", data);
}

export async function deleteNote(context, id) {
  const { data } = await axiosInstance.delete(`/notes/${id}`);
  context.commit("deleteNote", id);
}

export async function getSchedule(context) {
  const { data } = await axiosInstance.get("/schedule");
  console.log(data);
  context.commit("setSchedule", data);
}
