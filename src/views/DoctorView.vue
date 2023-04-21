<template>

  <q-bar class="bg-deep-orange">
    <div class="cursor-pointer text-white">Hello, Doctor</div>
    <q-space />
    <q-btn flat icon="logout" @click="$router.push('/')"></q-btn>
  </q-bar>

  <AppointmentsList/>
</template>

<script>
import AppointmentsList from '../components/AppointmentsList.vue'

export default {
  name: 'DoctorView',
  components: {
    AppointmentsList
  }
}
</script>