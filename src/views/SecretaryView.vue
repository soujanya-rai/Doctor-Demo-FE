<template>
  <div>

    <div class="q-pa-md row items-start q-gutter-md">
      <q-btn unelevated color="primary" @click=showAddApptDialog v-if="!this.dialog">
        <q-icon left size="3em" name="add" />
        <div>Create Appointment</div>
      </q-btn>
    </div>

    <div class="add-appt-card q-pa-md row items-start q-gutter-md" v-if="this.dialog">
      <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-bar>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <q-form
              @submit="createAppointment"
              class="q-gutter-md"
            >

              <q-select 
                filled 
                v-model="title" 
                :options="options" 
                label="Title" />

              <q-input
                filled
                v-model="name"
                label="Full Name *"
                hint="First Name and Family Name"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                filled
                v-model="startDate"
                label="Start Date and Time *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                filled
                v-model="endDate"
                label="End Date and Time *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                filled
                v-model="assignee"
                label="Assignee *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <q-dialog v-model="apptCreatedAlert">
      <q-card class="bg-green">
        <q-card-section>
          <div class="text-h6 text-white">Success!</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          The appointment for {{this.title}} {{this.name}} has been created!
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="white" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <AppointmentsList />
  </div>
</template>

<script>
import AppointmentsList from '../components/AppointmentsList.vue'
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'SecretaryView',
  data () {
    return {
      title: ref(null),
      name: ref(null),
      startDate: ref(null),
      endDate: ref(null),
      assignee: ref(null),
      options: ['Mr', 'Ms'],
      dialog: ref(false),
      maximizedToggle: ref(true),
      apptCreatedAlert: ref(false),
    }
  },
  components: {
    AppointmentsList
  },
  computed: {
  },
  methods: {
    showAddApptDialog() {
      this.dialog = true
    },
    createAppointment(){
      this.dialog = false;
      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('cName', this.name);
      formData.append('startDate', this.startDate);
      formData.append('endDate', this.endDate);
      formData.append('assignee', this.assignee);
      formData.append('status', 'Pending');

      axios.post('http://localhost:18091/api/addappointment', formData)
      .then((response) => {
        this.apptCreatedAlert = true;
      })
      .catch(err => console.warn(err));
      }
  }
}
</script>

<style>
.add-appt-card {
  width: 90%;
  z-index: 500;
  max-height: 70%;
}
</style>