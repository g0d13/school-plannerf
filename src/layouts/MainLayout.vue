<template>
  <q-layout view="lHh LpR lFf">
    <q-header
      reveal
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-white text-black'"
    >
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          Good morning, {{ $auth.user.name.split(" ")[0] }}
        </q-toolbar-title>
        <q-btn
          dense
          round
          flat
          icon="o_brightness_4"
          @click="$q.dark.toggle()"
        />
        <q-btn
          v-if="$auth.isAuthenticated"
          to="/profile"
          dense
          round
          flat
          icon="o_person"
        />
        <q-btn dense round flat icon="more_vert" />
      </q-toolbar>
    </q-header>
    <q-drawer
      class="ml-3"
      v-model="left"
      side="left"
      overlay
      behavior="mobile"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item-section class="q-ml-md q-mb-md q-mt-md">
            <q-avatar>
              <img :src="$auth.user.picture" />
            </q-avatar>
            <p class="q-mb-none q-mt-md text-bold">{{ $auth.user.name }}</p>
            <span>Seven semester</span>
          </q-item-section>
          <template v-for="(menuItem, index) in listMenuItems">
            <q-item
              :key="index"
              :to="menuItem.path"
              active-class="active-item"
              exact
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MainLayout",
  mounted() {
    this.$q.dark.set("auto");
    // if (this.getActualSemester == undefined) {
    //   this.$router.push("/welcome");
    // }
  },
  computed: mapGetters("planner", ["getActualSemester"]),
  data: () => ({
    left: false,
    day: new Date().getDay().toString(),
    listMenuItems: [
      {
        icon: "o_access_time",
        label: "Week overview",
        path: "/home"
      },
      {
        icon: "o_widgets",
        label: "Timetable",
        path: "/timetable"
      },
      {
        icon: "o_person",
        label: "Teachers",
        path: "/teachers"
      },
      {
        icon: "o_view_agenda",
        label: "Courses",
        path: "/courses"
      },
      {
        icon: "o_format_align_center",
        label: "Notes",
        path: "/notes"
      },
      {
        icon: "o_filter_none",
        label: "Semesters",
        path: "/semesters"
      }
    ]
  })
};
</script>

<style lang="sass" scoped>
.q-item
  border-radius: 0 32px 32px 0
  margin-right: 10px

.active-item
  border-radius: 0 32px 32px 0
  margin-right: 10px
  color: $primary
  background-color: #{$primary}#{20}
</style>

<style lang="sass">
body > div.q-dialog.fullscreen.no-pointer-events
  z-index: 2000
</style>
