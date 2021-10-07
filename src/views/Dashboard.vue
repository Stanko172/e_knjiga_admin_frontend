<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3" v-for="(item, index) in data" :key="index">
        <DashCard :item="item"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <bar-chart :barData="barData" v-if="barData.length > 0"></bar-chart>
      </v-col>
      <v-col cols="12" sm="6">
        <pie-chart :pieData="pieData" v-if="pieData.length > 0"></pie-chart>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DashTable :tableData="tableData"/>
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
    return {};
  },
  computed:{
    ...mapState('dashboard', ['data', 'barData', 'pieData', 'tableData'])
  },
  methods:{
    ...mapActions('dashboard', ['fetchAllData', 'fetchChartData', 'fetchTableData']),
  },
  created() {
    this.fetchAllData()
    this.fetchChartData()
  }
}
</script>