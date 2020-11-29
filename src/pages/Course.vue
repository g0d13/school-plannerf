<template>
  <q-page class="q-pa-md">
    <q-list>
      <q-item clickable v-ripple v-for="course in courses" :key="course.id">
        <q-item-section avatar>
          <q-avatar color="primary text-white">
            {{ course.name[0] }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <p>{{ course.name }}</p>
          <small>
            {{ course.code }}
          </small>
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
            <q-btn round flat icon="close" @click="dialog = false" />
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
                  <q-icon name="o_book" />
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
                  <q-icon name="code" />
                </template>
              </q-input>
            </div>
            <div class="row">
              <q-select
                v-model="course.semester"
                :options="semesters"
                emit-value
                map-options
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_person" />
                </template>
              </q-select>
              <q-select
                v-model="course.teacher"
                :options="teachers"
                map-options
                emit-value
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_person" />
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
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "Course",
  async mounted() {
    this.getCourses();
  },
  data: () => ({
    text: "",
    dialog: false,
    course: {
      name: "Programacion orientada a negros",
      code: "BQ4A",
      color: "#000",
      semester: -1,
      teacher: 1
    }
  }),
  computed: {
    ...mapState("planner", ["teachers", "semesters", "courses"])
  },
  methods: {
    handleFabOpen() {
      this.dialog = !this.dialog;

      if (!this.dialog) {
        this.$axios.post("/courses", this.course);
      }
    },
    ...mapActions("planner", ["getCourses"])
  }
};
</script>

<style scoped lang="sass">
p, small, h6
  margin: 0
.z-6k
  z-index: 2700
</style>
