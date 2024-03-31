import { LitElement, css } from 'lit';
import Chart from 'chart.js/auto';

class ChartsyChart extends LitElement {
  static get properties() {
    return {
      chartData: { type: Object },
      chartOptions: { type: Object },
      chartType: { type: String, reflect: true, attribute: 'chart-type', default: 'bar' },
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'chart-type' && oldValue !== newValue) {
      this.chartType = newValue;
      this.chartOptions = this.getDefaultChartOptions();
      this.renderChart();
    }
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
    this.chart = null; // Initialize the chart variable here
    console.log('[ChartsyChart] constructor');
  }

  // lets over-ride using shadowroot. (it just looks prettier in the code, and honestly its a bit simpler in the whole 
  // lifecycle if the shadow-dom doesn't render quite fast enough)
  createRenderRoot() {
    return this;
  }

  renderChart() {
    console.log('[ChartsyChart] renderChart called');

    // Destroy the existing chart instance if it exists
    if (this.chart) {
      console.log('[ChartsyChart] Destroying old chart instance.');
      this.chart.destroy();
    }

    // Use this.querySelector now that we're directly in the light DOM
    const existingCanvas = this.querySelector('canvas');
    if (existingCanvas) {
      existingCanvas.remove();
    }

    const newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id', 'chartCanvas');
    this.appendChild(newCanvas); // Append to this, as we're in the light DOM

    const ctx = newCanvas.getContext('2d');

    console.log(`[ChartsyChart] Creating new chart instance with type: ${this.chartType}, data: ${JSON.stringify(this.chartData)}, options: ${JSON.stringify(this.chartOptions)}`);
    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions,
    });
  }

  getDefaultChartOptions() {
    console.log('[ChartsyChart] getDefaultChartOptions called');
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Sample Chart',
        },
      },
    };
    console.log(`[ChartsyChart] Default chart options: ${JSON.stringify(options)}`);
    return options;
  }

  getDefaultChartData() {
    console.log('[ChartsyChart] getDefaultChartData called');
    const data = {
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
        borderWidth: 1,
      }],
    };
    console.log(`[ChartsyChart] Default chart data for updateChartData function: ${JSON.stringify(data)}`);
    return data;
  }

  updateChart({ chartType, chartData, chartOptions }) {
    console.log('[ChartsyChart] updateChart called with type:', chartType);
    console.log('[ChartsyChart] updateChart called with data:', JSON.stringify(chartData));
    console.log('[ChartsyChart] updateChart called with options:', JSON.stringify(chartOptions));

    if (chartType) this.chartType = chartType;
    if (chartData) this.chartData = chartData;
    if (chartOptions) this.chartOptions = chartOptions;

    this.renderChart();
  }
}

customElements.define('chartsy-chart', ChartsyChart);
