<template>
  <q-page>
    <q-calendar
      v-model="selectedDate"
      view="week"
      animated
      :weekdays="[1, 2, 3, 4, 5]"
      :interval-height="60"
      :interval-start="8"
      :interval-count="9"
      short-interval-label
      short-weekday-label
      no-default-header-btn
      class="calendar-container"
    >
      <template #day-body="{ timestamp, timeStartPos, timeDurationHeight }">
        <template v-for="(event, index) in getEvents(timestamp)">
          <div
            v-if="event.time"
            :key="index"
            class="my-event justify-center"
            :style="itemStyle(event, 'body', timeStartPos, timeDurationHeight)"
          >
            <div :style="{background: event.color ? event.color : 'red', height: '100%', borderRadius: '5px' }">
              <div :style="{paddingLeft: '7px', paddingTop: '7px'}">
                <p>{{ event.title }}</p>
                <p>Hola</p>
              </div>
            </div>
          </div>
        </template>
      </template>
    </q-calendar>
  </q-page>
</template>

<script>
// normally you would not import "all" of QCalendar, but is needed for this example to work with UMD (codepen)
import QCalendar, { parseDate } from "@quasar/quasar-ui-qcalendar"; // ui is aliased from ''

const CURRENT_DAY = new Date();

function getCurrentDay(day) {
  const newDay = new Date(CURRENT_DAY);
  newDay.setDate(day);
  const tm = parseDate(newDay);
  return tm.date;
}

export default {
  data() {
    return {
      selectedDate: "",
      agenda: {
        1: [
          {
            time: "08:00",
            title: "Mi otra conf",
            duration: 60,
            desc: "Meeting with CEO",
            color: "#ff5252"
          },
          {
            time: "9:00",
            title: "Mi otra confv2",
            desc: "Meeting with HR",
            color: "#ff4081",
            duration: 60
          },
          {
            time: "10:00",
            title: "Mi otra confv3",
            desc: "Meeting",
            color: "#448aff",
            duration: 90
          },
        ],
        2: [
          {
            time: "8:00",
            title: "Meeting with Alisha",
            color: "#3f51b5",
            duration: 90
          },
          {
            time: "10:00",
            title: "Meeting with Sarah",
            color: "#ff6e40",
            duration: 60
          },
        ],
        3: [
          {
            time: "08:00",
            title: "Stand-up SCRUM",
            duration: 60,
            color: "#e91e63"
          },
          {
            time: "09:00",
            title: "https://cdn.quasar.dev/img/boy-avatar.png",
            duration: 60,
            color: "#673ab7"
          },
          {
            time: "10:00",
            title: "Sprint planning",
            duration: 60,
            color:"#4caf50"
          },
          {
            time: "11:00",
            title: "Sprint making",
            duration: 60,
            color:"#ff9800"
          },
        ],
        4: [
          {
            time: "8:00",
            title: "Activity v2",
            duration: 60,
            color:"#ff9800"
          },
          {
            time: "9:00",
            title: "main activity",
            duration: 60,
            color:"#827717"
          },
          {
            time: "11:00",
            title: "Pasos pdf",
            duration: 60,
            avatar: "https://cdn.quasar.dev/img/material.png",
            color: "#ff5722"
          },
        ],
        5: [
          {
            time: "8:30",
            title: "Meeting with Alisha",
            color: "#3f51b5",
            duration: 90
          },
          {
            time: "10:00",
            title: "Meeting with Sarah",
            color: "#ff6e40",
            duration: 60
          },
        ],
      },
    };
  },
  methods: {
    isCssColor(color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
    },

    itemStyle(event, type, timeStartPos, timeDurationHeight) {
      const s = {};
      if (timeStartPos) {
        s.top = timeStartPos(event.time) + "px";
      }

      if (timeDurationHeight) {
        s.height = timeDurationHeight(event.duration) + "px";
      }

      s["align-items"] = "flex-start";
      s["color"] = "white";
      s["padding"] = "2px"
      return s;
    },

    getEvents(dt) {
      return this.agenda[dt.weekday];
    },
  },
};
</script>

<style lang="sass">
.calendar-container
  position: relative

.my-event
  width: 100%
  position: absolute
  font-size: 12px

.full-width
  left: 0
  width: 100%

.left-side
  left: 0
  width: 49.75%

.right-side
  left: 50.25%
  width: 49.75%

p
  margin: 0
</style>
