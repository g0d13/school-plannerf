<template>
  <q-page class="q-pa-md">
    <q-list>
      <q-item clickable v-ripple v-for="course in courses" :key="course.id">
        <q-item-section avatar>
          <q-avatar color="primary text-white">
            {{ course.name[0] }}
          </q-avatar>
        </q-item-section>
        <q-item-section class="course">
          <div>
            <p>{{ course.name }}</p>
            <small>
              {{ course.code }}
            </small>
          </div>
          <q-space />
          <q-btn round  flat icon="delete" @click.stop="deleteCourse(course.id)"></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog
      v-model="dialog"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center flex">
            <q-btn round flat icon="close" @click="dialog = false"/>
            <q-space></q-space>
            <h6>New Course</h6>
            <q-space></q-space>

          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="column">
            <div class="row">
              <q-input
                bottom-slots
                v-model="course.name"
                placeholder="Title"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_book"/>
                </template>
              </q-input>
              <q-input
                bottom-slots
                v-model="course.code"
                placeholder="Codigo"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="code"/>
                </template>
              </q-input>
            </div>
            <div class="row">
              <q-select
                v-model="course.semester"
                :options="filterSemesters"
                emit-value
                map-options
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_person"/>
                </template>
              </q-select>
              <q-select
                v-model="course.teacher"
                :options="filterTeachers"
                emit-value
                map-options
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_person"/>
                </template>
              </q-select>
            </div>

            <pre>{{ course }}</pre>
          </div>
        </q-card-section>
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
import {mapGetters, mapState, mapActions} from "vuex";

export default {
  name: "Course",
  mounted() {
    this.getSemesters();
    this.getTeachers();
    this.getCourses();

    this.filterTeachers = this.teachers.map(el => ({value: el.id, label: el.firstName}));
    this.filterSemesters = this.semesters.map(el => ({value: el.id, label: el.name}))
  },
  data: () => ({
    text: "",
    dialog: false,
    filterTeachers: [],
    filterSemesters: [],
    course: {
      name: "",
      code: "",
      semester: "",
      teacher: ""
    }
  }),
  computed: {
    ...mapState("course", ["courses"]),
    ...mapState("semester", ["semesters",]),
    ...mapState("teacher", ["teachers"]),
  },
  methods: {
    handleFabOpen() {
      this.dialog = !this.dialog;

      if (!this.dialog) {
        this.postCourse(this.course)
      }
    },
    ...mapActions("course", ["getCourses", 'postCourse', 'deleteCourse']),
    ...mapActions("teacher", ["getTeachers"]),
    ...mapActions("semester", ["getSemesters"]),
  }
};
</script>

<style scoped lang="sass">
p, small, h6
  margin: 0

.z-6k
  z-index: 2700

.course
  display: flex
  flex-direction: row
</style>
