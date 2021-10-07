<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3" v-for="i in 4" :key="i">
        <DashCard />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <bar-chart></bar-chart>
      </v-col>
      <v-col cols="12" sm="6">
        <pie-chart :data="PieData" :options="PieOptions"></pie-chart>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DashTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashCard from '../components/dashboard/DashCard.vue'
import PieChart from '../components/dashboard/charts/PieChart.vue'
import BarChart from '../components/dashboard/charts/BarChart.vue'
import DashTable from '../components/dashboard/DashTable.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Dashboard',
  components:{
    DashCard,
    PieChart,
    BarChart,
    DashTable
  },
    data() {
    return {
      PieOptions: {
        hoverBorderWidth: 20
      },
      PieData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Green", "Red", "Blue"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [1, 10, 5]
          }
        ]
      }
    };
  },
  computed:{
    ...mapState('dashboard', ['data'])
  },
  methods:{
    ...mapActions('dashboard', ['fetchAllData'])
  }
}
</script>