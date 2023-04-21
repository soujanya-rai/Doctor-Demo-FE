<template>
  <div class="bg-light-blue-1 window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-light-blue-10 q-my-md">Login</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" label="email" />
              <q-input square filled clearable v-model="password" type="password" label="password" />
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Login"
            @click=login />
          </q-card-actions>

        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      email: 'doc@mail.com',
      password: 'SamplePwd1'
    }
  },
  methods: {
    login() {
      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);
      axios.post('http://localhost:18091/api/login', formData)
      .then((response) => {
        if(response.data == "Doctor")
          this.$router.push({ name: 'doctorLogin', params: { user: 'doctor' } })
        else if(response.data == "Secretary")
          this.$router.push({ name: 'secretaryLogin'})
      })
      .catch(err => console.log('Something went wrong!'));
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>


