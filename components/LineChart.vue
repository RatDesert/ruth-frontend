<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    value: {
      type: Number,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    capacity: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      data: {
        labels: [],
        datasets: [
          {
            fill: false,
            label: '',
            borderColor: this.color,
            data: [],
            borderWidth: 1,
          },
        ],
      },
      options: {
        layout: {
          padding: 20,
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: { zeroLineColor: '#1E1E1E' },
              ticks: {
                display: false, // this will remove only the label
              },
            },
          ],
          yAxes: [
            {
              gridLines: { zeroLineColor: '#1E1E1E' },
            },
          ],
        },
        tooltips: {
          mode: 'nearest',
          intersect: false,
          callbacks: {
            label(tooltipItem) {
              return tooltipItem.yLabel;
            },
          },
        },
        hover: {
          mode: 'nearest',
          intersect: false,
        },
        elements: {
          point: {
            radius: 4,
            hitRadius: 6,
            hoverRadius: 6,
          },
        },
      },
    };
  },
  watch: {
    label() {
      if (this.value === null) {
        return;
      }
      this.update();
      this.$data._chart.update();
    },
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
  methods: {
    update() {
      const labels = this.data.labels;
      const values = this.data.datasets[0].data;
      if (values.length === this.capacity) {
        values.shift();
        labels.shift();
      }
      labels.push(this.label);
      values.push(this.value);
    },
  },
};
</script>

<style></style>
