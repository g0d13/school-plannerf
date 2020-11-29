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
  context.commit("setTeachers", data);
}
