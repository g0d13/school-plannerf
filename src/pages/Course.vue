<template>
  <q-page class="q-pa-md">
    <q-list>
      <q-item clickable v-ripple v-for="course in courses" :key="course.id">
        <q-item-section avatar>
          <q-avatar color="primary text-white">
            {{ course.title[0] }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <small>
            {{ course.code }}
          </small>
          <p>{{ course.title }}</p>
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
                v-model="course.title"
                placeholder="Title"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_person" />
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
                  <q-icon name="o_person" />
                </template>
              </q-input>
            </div>
            <div class="row">
              <q-input
                bottom-slots
                v-model="course.semester"
                placeholder="Semester"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_tty" />
                </template>
              </q-input>
              <q-input
                bottom-slots
                v-model="course.teacher"
                placeholder="Email"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_local_post_office" />
                </template>
              </q-input>
            </div>

            <pre>{{ courses }}</pre>
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
export default {
  name: "Course",
  async mounted() {
    const { data } = await this.$axios.get("/courses");
    this.courses = data;
  },
  data: () => ({
    text: "",
    dialog: false,
    courses: [],
    course: {
      title: "",
      code: "",
      color: "",
      semester: 0,
      teacher: 1
    },
  }),

  methods: {
    handleFabOpen() {
      this.dialog = !this.dialog;

      if (!this.dialog) {
        this.$axios.post("/courses", this.course);
      }
    },
  },
};
</script>

<style scoped lang="sass">
p, small, h6
  margin: 0
.z-6k
  z-index: 2700
</style>
