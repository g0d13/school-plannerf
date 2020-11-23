<template>
  <q-page class="flex q-pa-md">
    <div
      v-if="false"
      class="flex flex-center column full-height self-center q-pa-md"
    >
      <img
        class="img--size"
        alt="Quasar logo"
        src="~assets/undraw_festivities.svg"
      />
      <h5>Free on Tuesday</h5>
      <p>You have no scheduled classes on Tuesday</p>
      <p>You can schedule new classes by tapping the add button</p>
    </div>
    <q-list class="full-width mt-50">
      <q-item clickable v-ripple @click="seamless = true">
        <q-item-section avatar>
          <q-avatar color="primary" size="md" text-color="white">J</q-avatar>
        </q-item-section>

        <q-item-section>
          <small>09:00 a.m</small>
          <p class="q-mb-none">Logic proclamation and functional</p>
          <small>Practical</small>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="seamless" seamless position="bottom">
      <q-card style="width: 350px">
        <q-linear-progress :value="0.6" color="pink" />

        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">The Walker</div>
            <div class="text-grey">Fitz & The Tantrums</div>
          </div>

          <q-space />

          <q-btn flat round icon="play_arrow" />
          <q-btn flat round icon="pause" />
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-sticky position="top" expand>
      <q-toolbar>
        <q-btn flat round dense icon="map" />
        <q-tabs inline-label align="left" v-model="day" class="scroll-x">
          <q-tab :ripple="false" :name="0" label="Sunday" />
          <q-tab :ripple="false" :name="1" label="Monday" />
          <q-tab :ripple="false" :name="2" label="Tuesday" />
          <q-tab :ripple="false" :name="3" label="Wednesday" />
          <q-tab :ripple="false" :name="4" label="Thursday" />
          <q-tab :ripple="false" :name="5" label="Friday" />
          <q-tab :ripple="false" :name="6" label="Saturday" />
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
        />
        <q-fab-action
          color="primary"
          text-color="white"
          icon="mail"
          label-class="bg-white text-black text-weight-bolder"
          external-label
          label-position="left"
          label="Assignment"
        />
        <q-fab-action
          color="primary"
          text-color="white"
          icon="mail"
          label-class="bg-white text-black text-weight-bolder"
          external-label
          label-position="left"
          label="Reminder"
        />
        <q-fab-action
          color="primary"
          text-color="white"
          icon="mail"
          label-class="bg-white text-black text-weight-bolder"
          external-label
          label-position="left"
          label="Exam"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data: () => ({
    day: new Date().getDay(),
    seamless: false,
  }),
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
</style>
