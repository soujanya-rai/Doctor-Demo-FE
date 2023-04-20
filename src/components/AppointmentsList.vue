<template>
  <div class="q-pa-md window-height window-width">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Appointments</q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-md">
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

const appointments = [ {
  id: 1,
  title: 'Mr',
  name: 'Ruddy Jedrzej',
  email: 'rjedrzej0@discuz.net',
  startDate: '30-04-2023 10:00',
  endDate: '30-04-2023 10:30',
  assignee: 'Dr Pede',
  status: 'Pending'
}, {
  id: 2,
  title: 'Ms',
  name: 'Mallorie Alessandrini',
  email: 'malessandrini1@marketwatch.com',
  startDate: '30-04-2023 11:00',
  endDate: '30-04-2023 10:30',
  assignee: 'Dr Höffner',
  status: 'Pending'
}, {
  id: 3,
  title: 'Ms',
  name: 'Elisabetta Wicklen',
  email: 'ewicklen2@microsoft.com',
  startDate: '02-05-2023 09:00',
  endDate: '02-05-2023 09:30',
  assignee: 'Dr Schmitt',
  status: 'Pending'
}, {
  id: 4,
  title: 'Mr',
  name: 'Seka Fawdrey',
  email: 'sfawdrey3@wired.com',
  startDate: '03-05-2023 10:00',
  endDate: '03-05-2023 10:30',
  assignee: 'Dr Höffner',
  status: 'Pending'
} ]

export default {
  setup () {
    return {
      appointments,
      filter: ref(''),
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
        { name: 'startDate', align: 'center', label: 'Start Date', field: 'startDate', sortable: true },
        { name: 'endDate', align: 'center', label: 'End Date', field: 'endDate' },
        { name: 'assignee', align: 'center', label: 'Assignee', field: 'assignee' },
        { name: 'status', align: 'center', label: 'Status', field: 'status' }
      ]
    }
  },
  created(){
    axios.get('http://localhost:18091/api/appointments')
      .then(response => console.log(response.data));
    if (this.$route.params.user == 'doctor') {
      this.columns.push({ name: 'actions', align: 'center', label: 'Action' },);
    }
  },
  computed:{
    isDoctor(){
      if (this.$route.params.user == 'doctor')
        return true;
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