import { LitElement, html, css } from 'lit';
import Chart from 'chart.js/auto';

class ChartsyChart extends LitElement {
  static get properties() {
    return {
      chartData: { type: Object },
      chartOptions: { type: Object },
      chartType: { type: String, reflect: true, attribute: 'chart-type' },
    };
  }

  static styles = css`
    :host {
      display: block;
    }
    canvas {
      max-width: 600px;
      max-height: 400px;
    }
  `;

  constructor() {
    super();
    // Initialize with default chart type, sample data, and default options
    this.chartType = 'bar';
    this.chartData = this.getDefaultChartData();
    this.chartOptions = this.getDefaultChartOptions();
    this.chart = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('chartData') || changedProperties.has('chartOptions') || changedProperties.has('chartType')) {
      this.renderChart();
    }
  }

  renderChart() {
    if (!this.chartData) return;

    const canvas = this.shadowRoot.getElementById('chartCanvas');
    const ctx = canvas.getContext('2d');
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions,
    });
  }

  getDefaultChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Sample Chart'
        }
      }
    };
  }

  getDefaultChartData() {
    return {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
  }

  render() {
    return html`<canvas id="chartCanvas"></canvas>`;
  }

  // Method for updating the chart with new settings
  updateChart({ chartType, chartData, chartOptions }) {
    this.chartType = chartType || this.chartType;
    this.chartData = chartData || this.chartData;
    this.chartOptions = chartOptions || this.chartOptions;
    this.renderChart();
  }
} customElements.define('chartsy-chart', ChartsyChart);
