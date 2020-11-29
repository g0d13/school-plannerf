/*
export function someGetter (state) {
}
*/

import { date } from "quasar";

export function getActualSemester(state) {
  if (state.actualSemester !== 0) {
    return state.actualSemester;
  }

  const isBetweenDates = (date1, date2) =>
    date.isBetweenDates(date1, date2, { onlyDate: true });

  const actualSemester = state.semesters.find(se =>
    isBetweenDates(se.startDate, se.endDate)
  );

  return actualSemester;
}
