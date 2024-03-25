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
      // Add your styles here
    }
  `;

  constructor() {
    super();
    this.chartData = null; // Default to null, expect object later
    this.chartOptions = {}; // Default to empty object, can be customized
    this.chartType = 'line'; // Default chart type
  }

  updated(changedProperties) {
    if (changedProperties.has('chartData') || changedProperties.has('chartOptions') || changedProperties.has('chartType')) {
      this.renderChart();
    }
  }

  renderChart() {
    const canvas = this.shadowRoot.getElementById('chartCanvas');
    if (canvas && this.chartData) {
      const ctx = canvas.getContext('2d');
      if (this.chart) {
        this.chart.destroy(); // Clean up the old chart instance before creating a new one
      }

      const mergedOptions = {
        ...{
          // Your default options here, if any
        },
        ...this.chartOptions
      };

      this.chart = new Chart(ctx, {
        type: this.chartType,
        data: this.chartData,
        options: mergedOptions,
      });
    }
  }

  render() {
    return html`
      <canvas id="chartCanvas"></canvas>
    `;
  }
}

window.ChartsyChart = ChartsyChart;
customElements.define('chartsy-chart', ChartsyChart);
