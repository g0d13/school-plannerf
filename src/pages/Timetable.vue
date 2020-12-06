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
      @click:time2="onClickDay"
    >
      <template #day-body="{ timestamp, timeStartPos, timeDurationHeight }">
        <template v-for="(event, index) in getEvents(timestamp.weekday)">
          <div
            v-if="event.startTime"
            :key="index"
            class="my-event justify-center"
            :style="itemStyle(event, 'body', timeStartPos, timeDurationHeight)"
          >
            <div
              :style="{
                background: event.color,
                height: '100%',
                borderRadius: '5px',
                display: 'grid',
                placeItems: 'center'
              }"
            >
              <div :style="{ paddingLeft: '7px', paddingTop: '7px' }">
                <p>{{ getCourseName(event) }}</p>
              </div>
              <q-btn round flat icon="delete" @click.stop="deleteSchedule(event.id)"></q-btn>
            </div>
          </div>
        </template>
      </template>
    </q-calendar>
    <q-dialog
      v-model="dialog"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section>
          <q-select
            v-model="schedule.course"
            :options="filterCourses"
            label="Select Course"
            filled
            map-options
            emit-value
            class="col-12 col-md-6"
          >
            <template v-slot:before>
              <q-icon name="o_person"/>
            </template>
          </q-select>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            v-model="schedule.startTime"
            mask="time"
            label="Start Time"
            :rules="['time']"
          >
            <template v-slot:before>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="schedule.startTime">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            filled
            v-model="schedule.endTime"
            mask="time"
            label="End Time"
            :rules="['time']"
          >
            <template v-slot:before>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="schedule.endTime">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input filled v-model="schedule.day" label="Select day">
            <template v-slot:before>
              <q-icon name="o_event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-card>
                    <q-card-section>
                      <div v-for="day in days" :key="day">
                        <q-radio
                          v-model="schedule.day"
                          :val="day"
                          :label="capitalize(day)"
                          color="cyan"
                          class="days"
                        />
                      </div>
                    </q-card-section>
                  </q-card>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ schedule }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-sticky class="z-6k" position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        rounded
        color="primary"
        :icon="dialog ? 'done' : 'add'"
        :label="dialog ? undefined : 'new course'"
        @click="handleFabOpen"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
// normally you would not import "all" of QCalendar, but is needed for this example to work with UMD (codepen)
import ColorRandom from "random-material-color";
import {mapActions, mapState} from "vuex";

export default {
  mounted() {
    this.getCourses();
    this.filterCourses = this.courses.map(c => {
      return {value: c.id, label: c.name};
    });
    this.getSchedules();
  },
  computed: {
    ...mapState('timetable', ['days', 'schedules']),
    ...mapState('course', ['courses'])
  },
  data: () => ({
    schedule: {
      course: "",
      startTime: "",
      endTime: "",
      day: "",
      semester: 1
    },
    filterCourses: [],
    selectedDate: "",
    dialog: false
  }),
  methods: {
    onClickDay(data) {
      const timestamp = data.scope.timestamp;
      const endTime = timestamp.hour + 1;
      this.dialog = true;
      this.schedule.day = this.days[timestamp.weekday - 1];
      this.schedule.startTime =
        timestamp.hour < 10 ? `0${timestamp.hour}:00` : `${timestamp.hour}:00`;
      this.schedule.endTime = endTime < 10 ? `0${endTime}:00` : `${endTime}:00`;
    },
    getEvents(numberDay) {
      let actualDay = this.days[numberDay - 1];
      actualDay = actualDay.toUpperCase();
      return this.schedules.filter(sh => sh.day === actualDay)
        .map(el => ({...el, color: this.getRandomColor(el.course.name), name: el.course.name}));
    },
    getCourseName(id) {
      console.log(id)
      if (id.course.name === undefined) {
        let nombre = this.courses.find(c => c.id === id).name
        console.log('el courso es undefined', {id}, {courses: this.courses, nombre})
        return nombre;
      }
      return id.course.name;
    },
    getRandomColor(text) {
      return ColorRandom.getColor({text});
    },
    handleFabOpen() {
      this.dialog = !this.dialog;

      if (!this.dialog) {
        const sendData = this.schedule;
        sendData.day = sendData.day.toUpperCase();
        this.postSchedule(sendData)
      }
    },
    capitalize([s1, ...s2]) {
      return s1 + s2.join("").toLowerCase();
    },
    getDuration(event1, event2) {
      let timeStart = new Date("01/01/2007 " + event1).getHours();
      let timeEnd = new Date("01/01/2007 " + event2).getHours();
      let hourDiff = timeEnd - timeStart;
      return hourDiff * 60;
    },
    itemStyle(event, type, timeStartPos, timeDurationHeight) {
      const s = {};
      if (timeStartPos) {
        s.top = timeStartPos(event.startTime) + "px";
      }
      let duration = this.getDuration(event.startTime, event.endTime);
      if (timeDurationHeight) {
        s.height = timeDurationHeight(duration) + "px";
      }

      s["align-items"] = "flex-start";
      s["color"] = "white";
      s["padding"] = "2px";
      return s;
    },
    ...mapActions('timetable', ['postSchedule', 'deleteSchedule', 'getSchedules']),
    ...mapActions('course', ['getCourses']),
  }
};
</script>

<style lang="sass">
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

.z-6k
  z-index: 2700

.calendar-container
  position: relative

  .q-calendar-daily__day-interval:hover
    background: rgba(0, 0, 255, .1)

  .q-calendar-weekly__workweek:hover
    background: rgba(0, 0, 255, .1)

  .q-calendar-weekly__day:hover
    background: rgba(0, 0, 255, .1)

  .q-calendar-weekly__head-weekday:hover
    background: rgba(0, 0, 255, .1)

  .q-calendar-scheduler__day:hover
    background: rgba(0, 0, 255, .1)

  .q-calendar-resource__resource-interval:hover
    background: rgba(0, 0, 255, .1)

  .q-calendar-daily__day:hover
    background: rgba(0, 0, 255, .1)
</style>
