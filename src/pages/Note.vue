<template>
  <q-page class="q-pa-md">
    <q-list>
      <q-item clickable v-ripple v-for="note in notes" :key="note.id" :style="{backgroundColor: note.color}" class="rounded-borders shadow-2">
        <q-item-section class="q-pa-sm" >
          <p>{{ note.title }}</p>
          <small>
            {{ note.content }}
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
            <h6>New Note</h6>
            <q-space></q-space>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="column">
            <div class="row">
              <q-input
                bottom-slots
                v-model="note.courseId"
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
                v-model="note.title"
                placeholder="Last Name"
                dense
                class="col-12 col-md-6"
              >
                <template v-slot:before>
                  <q-icon name="o_person" />
                </template>
              </q-input>
            </div>
            <q-input
              v-model="note.content"
              placeholder="Notes"
              autogrow
              type="textarea"
            />
            <pre>{{ notes }}</pre>
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
        :label="dialog ? undefined : 'NEW NOTE'"
        @click="handleFabOpen"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: "Note",
  async mounted() {
    // const { data } = await this.$axios.get("/notes");
    // this.teachers = data;
  },
  data: () => ({
    text: "",
    dialog: false,
    notes: [
      {id: "1", courseId: 1, title: "Mi primera nota", content: "mi nota contenido", color: '#e57373'},
      {id: "2", courseId: 2, title: "Mi segunda nota", content: "mi nota contenido", color: '#ba68c8'},
      {id: "3", courseId: 2, title: "Mi segunda nota", content: "mi nota contenido", color: '#4dd0e1'},
      {id: "4", courseId: 2, title: "Mi segunda nota", content: "mi nota contenido", color: '#81c784'}
    ],
    note: {
      courseId: "",
      title: "",
      content: "",
    },
  }),

  methods: {
    handleFabOpen() {
      this.dialog = !this.dialog;

      if (!this.dialog) {
        this.$axios.post("/notes", this.notes);
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

.q-item
  padding: 4px
  font-weight: 300

.q-list
  display: grid
  gap: 8px
  grid-template-columns: repeat(auto-fill,minmax(400px, 1fr))
</style>
