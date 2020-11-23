<template>
  <q-page>
    <q-calendar
      v-model="selectedDate"
      view="week"
      locale="es"
      animated
      :weekdays="[1, 2, 3, 4, 5]"
      :interval-height="60"
      :interval-start="6"
      :interval-count="9"
      short-interval-label
      short-weekday-label
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
            <pre>-{{ event.time }}-</pre>
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
            time: "06:00",
            title: "Mi otra conf",
            duration: 160,
            avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
            desc: "Meeting with CEO",
          },
          {
            time: "15:30",
            title: "Mi otra confv2",
            avatar: "https://cdn.quasar.dev/img/avatar.png",
            desc: "Meeting with HR",
          },
          {
            time: "12:00",
            title: "Mi otra confv3",
            avatar: "https://cdn.quasar.dev/img/avatar1.jpg",
            desc: "Meeting with Karen",
          },
        ],
        2: [
          {
            time: "11:30",
            avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
            desc: "Meeting with Alisha",
          },
          {
            time: "17:00",
            avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
            desc: "Meeting with Sarah",
          },
        ],
        3: [
          {
            time: "08:00",
            desc: "Stand-up SCRUM",
            avatar: "https://cdn.quasar.dev/img/material.png",
          },
          {
            time: "09:00",
            avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          },
          {
            time: "10:00",
            desc: "Sprint planning",
            avatar: "https://cdn.quasar.dev/img/material.png",
          },
          {
            time: "13:00",
            avatar: "https://cdn.quasar.dev/img/avatar1.jpg",
          },
        ],
        4: [
          {
            time: "09:00",
            avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
          },
          {
            time: "10:00",
            avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
          },
          {
            time: "13:00",
            avatar: "https://cdn.quasar.dev/img/material.png",
          },
        ],
        5: [
          {
            time: "08:00",
            avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          },
          {
            time: "09:00",
            avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
          },
          {
            time: "09:30",
            avatar: "https://cdn.quasar.dev/img/avatar4.jpg",
          },
          {
            time: "10:00",
            avatar: "https://cdn.quasar.dev/img/avatar5.jpg",
          },
          {
            time: "11:30",
            avatar: "https://cdn.quasar.dev/img/material.png",
          },
          {
            time: "13:00",
            avatar: "https://cdn.quasar.dev/img/avatar6.jpg",
          },
          {
            time: "13:30",
            avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
          },
          {
            time: "14:00",
            avatar: "https://cdn.quasar.dev/img/linux-avatar.png",
          },
          {
            time: "14:30",
            avatar: "https://cdn.quasar.dev/img/avatar.png",
          },
          {
            time: "15:00",
            avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          },
          {
            time: "15:30",
            avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
          },
          {
            time: "16:00",
            avatar: "https://cdn.quasar.dev/img/avatar6.jpg",
          },
        ],
      },
      events: [
        {
          title: "1st of the Month",
          details:
            "Everything is funny as long as it is happening to someone else",
          date: getCurrentDay(19),
          time: "15:00",
          bgcolor: "orange",
        },
        {
          title: "Sisters Birthday",
          details: "Buy a nice present",
          date: getCurrentDay(17),
          duration: 60,
          time: "11:00",
          bgcolor: "green",
          icon: "fas fa-birthday-cake",
        },
        {
          title: "Meeting",
          details: "Time to pitch my idea to the company",
          date: getCurrentDay(CURRENT_DAY.getDate()),
          time: "10:00",
          bgcolor: "green",
          icon: "fas fa-handshake",
        },
        {
          title: "Lunch",
          details: "Company is paying!",
          date: getCurrentDay(CURRENT_DAY.getDate()),
          time: "11:00",
          bgcolor: "teal",
          icon: "fas fa-hamburger",
        },
        {
          title: "Visit mom",
          details: "Always a nice chat with mom",
          date: getCurrentDay(20),
          time: "17:00",
          duration: 90,
          bgcolor: "blue-grey",
          icon: "fas fa-car",
        },
        {
          title: "Conference",
          details: "Teaching Javascript 101",
          date: getCurrentDay(16),
          time: "16:00",
          duration: 30,
          bgcolor: "blue",
          icon: "fas fa-chalkboard-teacher",
        },
        {
          title: "Girlfriend",
          details: "Meet GF for dinner at Swanky Restaurant",
          date: getCurrentDay(18),
          time: "15:00",
          duration: 180,
          bgcolor: "teal",
          icon: "fas fa-utensils",
        },
        {
          title: "Fishing",
          details: "Time for some weekend R&R",
          date: getCurrentDay(19),
          time: "14:00",
          bgcolor: "blue",
          icon: "fas fa-fish",
        },
        {
          title: "Vacation",
          details:
            "Trails and hikes, going camping! Don't forget to bring bear spray!",
          date: getCurrentDay(17),
          time: "12:00",
          bgcolor: "red",
          icon: "fas fa-plane",
        },
      ],
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
      s["background"] = "red";
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
</style>
