<template>
  <div class="q-pa-md window-height window-width">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Appointments</q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-md" v-if=renderTable>
      <q-table
        flat bordered
        :rows="appointments"
        :columns="columns"
        row-key="name"
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
            <q-btn icon="mode_edit" @click="onEdit(props.row)"></q-btn>
            <q-btn icon="delete" @click="onDelete(props.row)"></q-btn>
          </q-td>
        </template>
      </q-table>

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
          name: 'customerName',
          required: true,
          label: 'Name',
          align: 'center',
          field: row => row.customerName,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
        { name: 'startDate', align: 'center', label: 'Start Date', field: 'startDate', sortable: true },
        { name: 'endDate', align: 'center', label: 'End Date', field: 'endDate' },
        { name: 'assignee', align: 'center', label: 'Assignee', field: 'assignee' },
        { name: 'status', align: 'center', label: 'Status', field: 'status' }
      ],
      appointments : [],
      refreshKey: 0,
    }
  },
  created(){
    axios.get('http://localhost:18091/api/appointments')
    .then((response) => {
      for (var i=0; i<response.data.length;i++) {
        var apptObj = response.data[i]
        this.appointments.push(apptObj)
      }  
    })
    this.refreshKey++;
    //console.log(this.appointments);
    if (this.$route.params.user == 'doctor') {
      this.columns.push({ name: 'actions', align: 'center', label: 'Action' },);
    }
  },
  computed:{
    isDoctor(){
      if (this.$route.params.user == 'doctor')
        return true;
    },
    renderTable(){
      this.refreshKey
      if(this.appointments != []) {
        console.log(this.appointments)
        return true;
      }
      return false;
    }
  },
  methods:{
    onEdit(row){
      console.log(`Editing row - '${row.name}'`)
    },
    onDelete(row){
      console.log(`Deleting row - '${row.name}'`)
    }
  }
}
</script>