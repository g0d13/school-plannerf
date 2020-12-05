<template>
  <q-page class="q-pa-md">
    <h5 class="text-center">Set Actual semester</h5>
    <q-list>
      <q-item
        clickable
        v-ripple
        v-for="semester in semesters"
        :key="semester.id"
        :class="{ 'bg-primary': semester.id === getActualSemester }"
      >
        <q-item-section v-on:click="setActualSemester(semester.id)" class="semester">
          <p>{{ semester.name }}</p>
          <q-space />
          <q-btn round @click="deleteSemester(semester.id)" flat icon="delete"></q-btn>
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
            <h6>New semester</h6>
            <q-space></q-space>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="column">
            <div class="row">
              <q-input
                bottom-slots
                v-model="semester.name"
                placeholder="Semester name"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_person" />
                </template>
              </q-input>
              <q-input
                bottom-slots
                v-model="semester.description"
                placeholder="Semester description"
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
                v-model="semester.startDate"
                placeholder="Start date"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_tty" />
                </template>
              </q-input>
              <q-input
                bottom-slots
                v-model="semester.endDate"
                placeholder="End date"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_local_post_office" />
                </template>
              </q-input>
            </div>

            <pre>{{ semesters }}</pre>
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
        :label="dialog ? undefined : 'new semester'"
        @click="handleFabOpen"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "Semester",
  mounted() {
    this.getSemesters();
    console.log(this.getActualSemester);
  },
  data: () => ({
    text: "",
    dialog: false,
    semester: {
      name: "",
      description: "",
      startDate: "",
      endDate: ""
    }
  }),
  computed: {
    ...mapGetters("semester", ["getActualSemester"]),
    ...mapState("semester", ["semesters"])
  },
  methods: {
    handleFabOpen() {
      this.dialog = !this.dialog;

      if (!this.dialog) {
        this.postSemester(this.semester);
      }
    },
    ...mapActions("semester", ["getSemesters", "postSemester", "deleteSemester"]),
    ...mapMutations("semester", ["setActualSemester"])
  }
};
</script>

<style scoped lang="sass">
p, small, h5, h6
  margin: 0
.z-6k
  z-index: 2700
.semester
  flex-direction: row
</style>
