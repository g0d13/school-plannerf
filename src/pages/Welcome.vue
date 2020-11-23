<template>
  <q-page class="h-100 page">
    <q-tab-panels v-model="panel" animated swipeable class="content">
      <q-tab-panel :name="1">
        <div class="flex column flex-center">
          <img
            class="img--size"
            alt="Quasar logo"
            src="~assets/welcome_cats_thqn.svg"
          />
          <div class="text-h6">Welcome</div>
          <p>Welcome to this school planner.</p>
          <p>
            With School Planner you'll be better prepared to deal with
            scheduling all of your school related tags and activities
          </p>
        </div>
      </q-tab-panel>

      <q-tab-panel :name="2">
        <div class="flex column flex-center">
          <img
            class="img--size"
            alt="Quasar logo"
            src="~assets/online_organizer_ofxm.svg"
          />
          <div class="text-h6">Stay Organizated</div>
          <p>Using this planner you can stay organizated</p>
        </div>
      </q-tab-panel>

      <q-tab-panel :name="3">
        <div class="flex column flex-center">
          <img
            class="img--size"
            alt="Quasar logo"
            src="~assets/online_organizer_ofxm.svg"
          />
          <div class="text-h6">Smart details</div>
          <p>Using this planner you can stay organizated</p>
        </div>
      </q-tab-panel>

      <q-tab-panel :name="4">
        <div class="flex column flex-center">
          <img
            class="img--size"
            alt="Quasar logo"
            src="~assets/studying_s3l7.svg"
          />
          <div class="text-h6">Always prepared</div>
          <p>Using this planner you can stay organizated</p>
        </div>
      </q-tab-panel>

      <q-tab-panel :name="5">
        <div class="flex column flex-center">
          <img
            class="img--size"
            alt="Quasar logo"
            src="~assets/Tree_swing_646s.svg"
          />
          <div class="text-h6">School made easier</div>
          <p>Using this planner you can stay organizated</p>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <div class="footer">
      <q-btn flat @click="handleNext">
        <p v-if="panel < 5">Siguiente</p>
        <p v-else>Get Started</p>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Welcome",
  data: () => ({
    panel: 1,
  }),
  methods: {
    handleNext() {
      if (this.panel !== 5) {
        this.panel++;
      }
    },
  },
};
</script>

<style lang="sass">
p
  margin: 0

.h-100
  height: 100vh

.img--size
  height: 300px
  width: 300px
.page
  padding: 10px
  display: flex
  flex-direction: column
  align-content: flex-end
  align-items: flex-end
.content
  overflow: hidden
  flex: 1 1 auto
  align-self: center
  text-align: center
.footer
  align-self: flex-end
</style>
