<template>
  <q-page class="flex q-pa-md justify-center">
    <div
      v-if="getTask(day).length === 0"
      class="flex flex-center column full-height self-center q-pa-md"
    >
      <img
        class="img--size"
        alt="Quasar logo"
        src="~assets/undraw_festivities.svg"
      />
      <h5>Free on {{ capitalize(day) }}</h5>
      <p>You have no scheduled classes on Tuesday</p>
      <p>You can schedule new classes by tapping the add button</p>
    </div>
    <q-list v-else class="full-width mt-50">
      <q-item
        clickable
        v-ripple
        @click="seamless = true"
        v-for="task in getTask(day)"
        :key="task.id"
      >
        <q-item-section avatar>
          <q-avatar size="md" text-color="white" :style="{ backgroundColor: getColor(task.course.name) }">
            {{ task.course.name[0] }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <small>{{task.startTime}}</small>
          <p class="q-mb-none">{{ task.course.name }}</p>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="seamless" seamless position="bottom">
      <q-card>
        <q-card-section class="column items-center no-wrap gap-4">
          <div class="row">
            <q-avatar color="primary" size="md" text-color="white">P</q-avatar>
            <div class="q-ml-md">Programacion logica y funcional</div>
            <q-btn flat round icon="close" v-close-popup/>
          </div>
          <p class="start q-mt-md">course details</p>

          <div class="row self-start">
            <q-icon name="o_schedule" size="sm" class="q-mr-md"/>
            <div>
              <p>Class time</p>
              <small>9:00 a.m - 11:00 a.m.</small>
            </div>
          </div>

          <div class="row self-start q-mt-sm">
            <q-icon name="o_schedule" size="sm" class="q-mr-md"/>
            <div>
              <p>Course teacher</p>
              <small>Cristina Joaquin Salas</small>
            </div>
          </div>

          <div class="row self-start q-mt-sm">
            <q-icon name="o_schedule" size="sm" class="q-mr-md"/>
            <div>
              <p>Class notes</p>
              <small>No class notes</small>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-sticky position="top" expand>
      <q-toolbar>
        <q-btn flat round dense icon="map"/>
        <q-tabs inline-label align="left" v-model="day" class="scroll-x">
          <q-tab v-for="(day, index) in days" :ripple="false" :name="index" :label="day" :key="index" @click="onTabAction(index)"/>
        </q-tabs>
      </q-toolbar>
    </q-page-sticky>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" text-color="white" icon="add" direction="up">
        <q-fab-action
          color="primary"
          text-color="white"
          icon="mail"
          label-class="bg-white text-black text-weight-bolder"
          external-label
          label-position="left"
          label="Schedule Class"
          to="/timetable"
        />
        <q-fab-action
          color="primary"
          text-color="white"
          icon="mail"
          label-class="bg-white text-black text-weight-bolder"
          external-label
          label-position="left"
          label="Assignment"
          to="/courses"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex';
import ColorRandom from "random-material-color";

export default {
  name: "Home",
  mounted() {
    this.getSchedule()
  },
  data: () => ({
    day: new Date().getDay(),
    seamless: false
  }),
  computed: {
    ...mapGetters('planner', ["getTask"]),
    ...mapState('planner', ['days'])
  },
  methods: {
    ...mapActions('planner', ['getSchedule']),
    onTabAction(id){
      this.day = id
    },
    capitalize(day) {
      let [s1, ...s2] = this.days[day];
      return s1 + s2.join("").toLowerCase();
    },
    getColor(text){
      return ColorRandom.getColor()
    }
  },
};
</script>

<style lang="sass" scoped>
.img--size
  width: 300px
  height: 300px

h5
  margin: 0
  color: gray

p
  margin: 0
  color: gray

.mt-50
  margin-top: 50px

.start
  align-self: flex-start
  margin-top: 15px
  margin-bottom: 15px
  text-transform: uppercase
  font-size: 11px
  font-weight: bold
</style>
