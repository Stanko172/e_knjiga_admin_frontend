<script>
import { Bar } from "vue-chartjs";
export default {
  props:[
      'barData'
  ],
  extends: Bar,
  data(){
      return{
        data: {
        labels: ['Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj', 'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'],
        datasets: [{
            axis: 'y',
            label: 'Učlanjivanja prema mjesecima',
            data: this.barData,
            fill: false,
            backgroundColor: [
                'rgba(40, 86, 182, 0.7)',
                'rgba(237, 28, 36, 0.7)',
                'rgba(40, 86, 182, 0.7)',
                'rgba(237, 28, 36, 0.7)',
                'rgba(40, 86, 182, 0.7)',
                'rgba(237, 28, 36, 0.7)',
                'rgba(40, 86, 182, 0.7)',
                'rgba(237, 28, 36, 0.7)',
                'rgba(40, 86, 182, 0.7)',
                'rgba(237, 28, 36, 0.7)',
                'rgba(40, 86, 182, 0.7)',
                'rgba(237, 28, 36, 0.7)',
            ],
            borderColor: [
           'rgba(40, 86, 182, 1)',
            'rgba(237, 28, 36, 1)',
            'rgba(40, 86, 182, 1)',
            'rgba(237, 28, 36, 1)',
            'rgba(40, 86, 182, 1)',
            'rgba(237, 28, 36, 1)',
            'rgba(40, 86, 182, 1)',
            'rgba(237, 28, 36, 1)',
            'rgba(40, 86, 182, 1)',
            'rgba(237, 28, 36, 1)',
            'rgba(40, 86, 182, 1)',
            'rgba(237, 28, 36, 1)',
            ],
            borderWidth: 1
        }]
        }
      }
  },
  mounted() {
    this.renderChart(this.data)
  }
};
</script>

<style>

</style>