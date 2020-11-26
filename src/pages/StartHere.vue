<template>
  <div class="content text-white">
    <q-toolbar class="text-white">
      <q-space />
      <div class="row buttons--header" v-if="!$auth.loading">
        <q-btn v-if="$auth.isAuthenticated" flat dense label="go" to="/home" />
        <q-btn v-if="!$auth.isAuthenticated"  flat dense label="sing up" @click="login" />
        <q-btn v-if="$auth.isAuthenticated" flat dense label="logout" @click="logout" />
      </div>
    </q-toolbar>

    <div class="row justify-around">
      <div>
        <h3 class="text-center">School in one place</h3>
        <p>With the best school planner</p>
      </div>
      <img
        class="img--size text-center"
        alt="Quasar logo"
        src="~assets/education.svg"
      />
      <!-- Check that the SDK client is not currently loading before accessing is methods -->
      <!-- <div v-if="!$auth.loading"> -->
      <!-- show login when not authenticated -->
      <!-- <button v-if="!$auth.isAuthenticated" @click="login">Log in</button> -->
      <!-- show logout when authenticated -->
      <!-- <button v-if="$auth.isAuthenticated" @click="logout">Log out</button> -->
      <!-- </div> -->
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: "StartHere",

  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: ''
      });
    }
  }
};
</script>

<style scoped lang="sass">
h3
  margin-bottom: 0

.content
  background: $primary
  display: flex
  flex-direction: column
  justify-items: center

.buttons--header
  gap: 1em

.img--size
  width: 400px
  height: 400px
  align-self: center
</style>
