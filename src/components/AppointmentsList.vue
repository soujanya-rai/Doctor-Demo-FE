<template>
  <div>
    <div class="q-pa-md window-height window-width">

      <div class="q-pa-md">
        <q-table
          title="Appointments"
          flat bordered
          :rows="appointments"
          :columns="columns"
          row-key="id"
          separator="horizontal"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-actions="props" v-if=isDoctor>
            <q-td :props="props">
              <q-btn icon="done" color="green" @click="onEdit(props.row)"></q-btn>
              <q-btn icon="delete" color="red" @click="onDelete(props.row)"></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>

      <q-dialog v-model="showAlert">
        <q-card class="bg-green">
          <q-card-section>
            <div class="text-h6 text-white">Success!</div>
          </q-card-section>

          <q-card-section class="q-pt-none text-white">
            {{alertMessage}}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="white" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup () {
    return {
      filter: ref(''),
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'center',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true,
        },
        { name: 'customerName', required: true, label: 'Name', align: 'center', field: 'customerName',sortable: true },
        { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
        { name: 'startDate', align: 'center', label: 'Start Date', field: 'startDate', sortable: true },
        { name: 'endDate', align: 'center', label: 'End Date', field: 'endDate' },
        { name: 'assignee', align: 'center', label: 'Assignee', field: 'assignee' },
        { name: 'status', align: 'center', label: 'Status', field: 'status' }
      ],
      appointments: ref([]),
      showAlert: ref(false),
      alertMessage: ref('')
    }
  },
  created(){
    this.getAppointments();
    if (this.$route.params.user == 'doctor')
      this.columns.push({ name: 'actions', align: 'center', label: 'Action' },);
    
  },
  computed:{
    isDoctor(){
      if (this.$route.params.user == 'doctor')
        return true;
    }
  },
  methods:{
    getAppointments() {
      axios.get('http://localhost:18091/api/appointments')
      .then((response) => {
        this.appointments = [];
        for (var i=0; i<response.data.length;i++) {
          var apptObj = response.data[i]
          this.appointments.push(apptObj)
        }  
      })
    },
    onEdit(row){
      let url = 'http://localhost:18091/api/appointments/' + row.id;
      let bodyData = 
        {
          title: row.title,
          customerName: row.customerName,
          startDate: row.startDate,
          endDate: row.endDate,
          assignee: row.assignee,
          status: 'Completed'
        }
      axios.put(
        url,
        bodyData,
        {
          headers: {
            'content-type': 'application/json'
          },
        }
      )
      .then(response => {
        this.getAppointments();
        this.alertMessage = "The appointment for " + row.title + " " + row.customerName + " is completed."
        this.showAlert = true;
      })
    },
    onDelete(row){
      let url = 'http://localhost:18091/api/appointments/' + row.id;
      axios
      .delete(url)
      .then(response => {
        this.getAppointments();
        this.alertMessage = "The appointment for " + row.title + " " + row.customerName + " is deleted!"
        this.showAlert = true;
      });
    }
  }
}
</script>