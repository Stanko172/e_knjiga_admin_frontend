<script>
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  props: ["pieData"],
  data(){
    return{
      pieOptions: {
        hoverBorderWidth: 20
      },
      data: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Kupljene knjige", "Iznajmljene knjige", "Kupljene e-knjige"],
        datasets: [
          {
            backgroundColor: ["#2856B6", "#b68928da", "#ED1C24"],
            data: this.pieData
          }
        ]
      }
    }
  },
  mounted() {
    this.renderChart(this.data, {
      borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px"
    });
  }
};
</script>

<style>

</style>