import { LitElement, html, css } from 'lit';
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
    console.log(`[ChartsyChart] Attribute changed: ${name}, from: ${oldValue}, to: ${newValue}`);
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'chart-type') {
      this.chartType = newValue;
      console.log(`[ChartsyChart] chartType property set to ${newValue} via attributeChangedCallback, invoking renderChart.`);
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
    console.log('[ChartsyChart] constructor');
    this.chart = null; // Initialize the chart variable here
  }



  renderChart() {
    console.log('[ChartsyChart] renderChart called');
    // Guard against null shadowRoot. This is just extra precautionary;
    // connectedCallback ensures that shadowRoot is available.
    if (!this.shadowRoot) {
      console.warn("[ChartsyChart] shadowRoot is not available.");
      return;

    }
    console.log('[ChartsyChart] renderChart called');
    const existingCanvas = this.shadowRoot.querySelector('canvas');
    console.log(`[ChartsyChart] Existing canvas: ${existingCanvas ? 'found' : 'not found'}, proceeding to remove and replace.`);
    if (existingCanvas) {
      existingCanvas.remove();
    }

    const newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id', 'chartCanvas');
    this.shadowRoot.appendChild(newCanvas);

    const ctx = newCanvas.getContext('2d');
    if (this.chart) {
      console.log('[ChartsyChart] Destroying old chart instance before creating a new one.');
      this.chart.destroy();
    }

    console.log(`[ChartsyChart] Creating new chart instance with type: ${this.chartType}, data: ${JSON.stringify(this.chartData)}, options: ${JSON.stringify(this.chartOptions)}`);
    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions,
    });

  }

  getDefaultChartOptions() {
    console.log('[ChartsyChart] getDefaultChartOptions called');
    // Default chart options
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
    // Default chart data
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
          'rgba(153, 102, 255, 0, 0.2)',
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
    console.log(`[ChartsyChart] Default chart data: ${JSON.stringify(data)}`);
    return data;
  }

  render() {
    console.log('[ChartsyChart] render method called');
    return html`<canvas id="chartCanvas"></canvas>`;
  }

  updateChart({ chartType, chartData, chartOptions }) {
    console.log('[ChartsyChart] updateChart called with type:', chartType);
    console.log('[ChartsyChart] updateChart called with data:', JSON.stringify(chartData));
    console.log('[ChartsyChart] updateChart called with options:', JSON.stringify(chartOptions));

    let shouldRenderChart = false;

    if (chartType && this.chartType !== chartType) {
      console.log(`[ChartsyChart] chartType changed to ${chartType}`);
      this.chartType = chartType;
      shouldRenderChart = true;
    }
    if (chartData && JSON.stringify(this.chartData) !== JSON.stringify(chartData)) {
      console.log('[ChartsyChart] chartData changed');
      this.chartData = { ...chartData };
      shouldRenderChart = true;
    }
    if (chartOptions || shouldRenderChart) {
      console.log('[ChartsyChart] Updating/resetting chart options');
      this.chartOptions = chartOptions;
      shouldRenderChart = true;
    }

    if (shouldRenderChart) {
      console.log('[ChartsyChart] Conditions met for re-rendering chart. Invoking renderChart.');
      this.renderChart();
    } else {
      console.log('[ChartsyChart] No significant changes detected. No need to re-render chart.');
    }
  }
}

customElements.define('chartsy-chart', ChartsyChart);

