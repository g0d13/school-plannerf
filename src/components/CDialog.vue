<template>
  <div>
    <slot name="content"></slot>
    <q-dialog v-model="isOpen"
              persistent
              maximized
              transition-show="slide-up"
              transition-hide="slide-down">
      <slot name="dialog"></slot>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "CDialog",
  data: () => ({
    isOpen: false
  })
}
</script>

<style scoped>

</style>
