/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import Chart from 'chart.js/auto';

class CountryInfo extends LitElement {
  static get properties() {
    return {
      countries: { type: Array },
      chartType: { type: String, reflect: true, attribute: 'chart-type' }, // Ensure correct reflection and attribute name
    };
  }



  static styles = css`
    :host {
    display: flex
    }
  `;

  constructor() {
    super();
    this.countries = [];
    this.chartType = 'line'; // Default chart type
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchCountries();
  }

  firstUpdated() {
    this.renderChart();
  }


  updated(changedProperties) {
    if (changedProperties.has('chart-type')) {
      this.renderChart();
    }
  }

  async fetchCountries() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      this.countries = data.slice(0, 10).map(country => ({ // Limiting data for simplicity
        name: country.name.common,
        population: country.population
      }));
      this.renderChart();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  renderChart() {
    const canvas = this.shadowRoot.getElementById('chartCanvas');
    if (canvas && this.countries.length > 0) {
      const ctx = canvas.getContext('2d');
      // Destroy the previous chart instance if it exists
      if (this.chart) {
        this.chart.destroy();
        this.chart = null; // Clear the reference
      }

      // Default chart options
      let chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
            display: this.chartType !== 'pie' // Hide the Y-axis for pie charts
          }
        }
      };



      this.chart = new Chart(ctx, {
        type: this.chartType,
        data: {
          labels: this.countries.map(country => country.name),
          datasets: [{
            label: 'Population',
            data: this.countries.map(country => country.population),
            backgroundColor: [
              // Add more colors as needed
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
        },
        options: {
          layout: {
            chartOptions
          }
        }
      });
    }
  }


  render() {
    return html`
    
      <canvas id="chartCanvas">nothinghere</canvas>
    
    `;
  }
}
window.CountryInfo = CountryInfo;
customElements.define('country-info', CountryInfo);
