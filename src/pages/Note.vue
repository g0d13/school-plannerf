<template>
  <q-page class="q-pa-md">
    <q-list>
      <q-item
        clickable
        v-ripple
        v-for="note in notes"
        :key="note.id"
        :style="{ backgroundColor: note.color }"
        class="rounded-borders shadow-2"
        @click="viewNote(note.id)"
      >
        <q-item-section class="q-pa-sm">
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
            <q-btn round flat icon="close" @click="closeDialog" />
            <q-space></q-space>
            <h6>{{ selectedNote ? "View Note" : "New Note" }}</h6>
            <q-space></q-space>
            <q-btn
              v-if="selectedNote"
              round
              flat
              icon="o_delete"
              @click="handleDelete(selectedNote.id)"
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="selectedNote">
            <h5>{{ selectedNote.title }}</h5>
            <p>{{ selectedNote.content }}</p>
          </div>
          <div v-else class="column">
            <div class="row">
              <q-input
                bottom-slots
                v-model="note.title"
                placeholder="Title"
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
              placeholder="Content"
              autogrow
              type="textarea"
            />
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
        @click="fabAction"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import ColorRandom from "random-material-color";

export default {
  name: "Note",
  async mounted() {
    await this.getNotes();
  },
  data: () => ({
    text: "",
    dialog: false,
    selectedNote: undefined,
    note: {
      courseId: "",
      title: "",
      content: "",
      color: ""
    }
  }),
  computed: {
    ...mapState("notes", ["notes"]),
    ...mapGetters("notes", ['getNoteById'])
  },
  methods: {
    fabAction() {
      if (this.selectedNote === undefined && this.dialog) {
        let title = this.note.title;
        this.note.color = ColorRandom.getColor({ title });
        this.postNote(this.note)
      }
      this.dialog = !this.dialog;
    },
    viewNote(id) {
      this.selectedNote = this.getNoteById(id);
      this.dialog = true;
    },
    closeDialog() {
      if (this.selectedNote !== undefined) {
        this.selectedNote = undefined;
      }
      this.dialog = false;
    },
    getColor(text) {
      ColorRandom.getColor({ text });
    },
    handleDelete(id) {
      this.dialog = false;
      this.selectedNote = undefined;
      this.deleteNote(id);
    },
    ...mapActions("notes", ["getNotes", "deleteNote", "postNote"])
  }
};
</script>

<style scoped lang="sass">
p, small, h6, h5
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
