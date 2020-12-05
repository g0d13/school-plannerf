<template>
  <q-page class="q-pa-md">
    <q-list>
      <q-item clickable v-ripple v-for="teacher in teachers" :key="teacher.id">
        <q-item-section avatar>
          <q-avatar color="primary text-white">
            {{ teacher.firstName[0] }}
          </q-avatar>
        </q-item-section>
        <q-item-section class="teacher--item">
          <div>
            <p>{{ `${teacher.firstName} ${teacher.lastName}` }}</p>
            <small>
              {{ teacher.phone ? teacher.phone : "No phone number set" }}
            </small>
          </div>
          <q-space />
          <q-btn icon="delete" flat round />
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
            <h6>New teacher</h6>
            <q-space></q-space>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="column">
            <div class="row">
              <q-input
                bottom-slots
                v-model="teacher.firstName"
                placeholder="First Name"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_person" />
                </template>
              </q-input>
              <q-input
                bottom-slots
                v-model="teacher.lastName"
                placeholder="Last Name"
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
                v-model="teacher.phone"
                placeholder="Phone number"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_tty" />
                </template>
              </q-input>
              <q-input
                bottom-slots
                v-model="teacher.email"
                placeholder="Email"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_local_post_office" />
                </template>
              </q-input>
            </div>
            <q-input
              v-model="teacher.description"
              placeholder="Description"
              autogrow
              type="textarea"
            />
            <pre>{{ teachers }}</pre>
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
        :label="dialog ? undefined : 'new teacher'"
        @click="handleFabOpen"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: "Teacher",
  mounted() {
    this.loadData();
  },
  data: () => ({
    text: "",
    dialog: false,
    teachers: [],
    teacher: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      description: "",
    },
  }),

  methods: {
    async loadData(){
      const { data } = await this.$axios.get("/teachers");
      this.teachers = data;
    },
    handleFabOpen() {
      this.dialog = !this.dialog;

      if (!this.dialog) {
        this.$axios.post("/teachers", this.teacher);
        this.loadData();
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

.teacher--item
  flex-direction: row !important
</style>
