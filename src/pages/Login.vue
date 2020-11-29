<template>
  <q-page class="page">
    <div class="title text-white">
      <h5>Sing in</h5>
      <p>Sing in to continue</p>
    </div>
    <div class="wrap-content">
      <div class="content">
        <q-input v-model="email" label="Email" />
        <q-input v-model="password" type="password" label="Password">
          <template v-slot:append>
            <q-icon name="visibility_off" />
          </template>
        </q-input>
        <div class="footer">
          <q-btn color="primary">Acceder</q-btn>
          <q-btn color="secondary">Sing in with google</q-btn>
        </div>
      </div>
      <div class="footer">
        Dont have an account? <a class="text-primary">Sing Up</a>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Login",
  computed: {},
  data: () => ({ email: "", password: "" }),
  mounted() {
    console.log(this.$store.state.planner);
  }
};
</script>

<style scoped lang="sass">
.page
  display: flex
  flex-direction: column
.title
  padding: 3em
  background: url(../assets/wave.svg) no-repeat top
  background-size: cover
  background-clip: initial
h5
  margin: 0
.wrap-content
  align-self: center
  display: flex
  flex-direction: column
  height: 100%

.content
  margin-top: 3em
  max-width: 550px

.footer
  align-self: center
  margin-top: 1em
  display: flex
  gap: 1em
</style>
