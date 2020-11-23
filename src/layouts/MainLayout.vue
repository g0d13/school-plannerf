<template>
  <q-layout view="lHh LpR lFf">
    <q-header reveal class="bg-dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title> Good morning, Juan </q-toolbar-title>
        <q-btn
          dense
          round
          flat
          icon="o_brightness_4"
          @click="$q.dark.toggle()"
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
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <p class="q-mb-none q-mt-md text-bold">Juan Diego Parra Mendez</p>
            <span>Seven semester</span>
          </q-item-section>
          <template v-for="(menuItem, index) in menuList">
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
export default {
  name: "MainLayout",
  data: () => ({
    left: false,
    day: new Date().getDay().toString(),
    menuList: [
      {
        icon: "o_access_time",
        label: "Week overview",
        path: "/",
      },
      {
        icon: "o_widgets",
        label: "Timetable",
        path: "/timetable",
      },
      {
        icon: "o_person",
        label: "Teachers",
        path: "/teacher",
      },
      {
        icon: "o_view_agenda",
        label: "Assignments",
      },
      {
        icon: "o_format_align_center",
        label: "Notes & Checklists",
      },
      {
        icon: "o_calculate",
        label: "GPA Calculator",
      },
      {
        icon: "o_filter_none",
        label: "Semesters",
      },
      {
        icon: "o_feedback",
        label: "Send Feedback",
      },
      {
        icon: "o_settings",
        label: "Settings",
      },
      {
        icon: "help",
        iconColor: "primary",
        label: "Help",
        separator: false,
      },
    ],
  }),
};
</script>

<style lang="sass" scoped>
.active-item
  border-radius: 0 32px 32px 0
  margin-right: 10px
  color: $primary
  background-color: $primary#{14}
</style>

<style lang="sass">
body > div.q-dialog.fullscreen.no-pointer-events
  z-index: 2000
</style>
