// prettier-ignore
function updateChartData() {
  const chartElement = document.getElementById('%%ID%%');

  if (!chartElement) {
    console.error('ChartsyChart element not found');
    return;
  }

  const chartType = chartElement.getAttribute('chart-type') || 'bar';
  let newData;

  // Prepare data based on the chartType
  switch (chartType) {
    case 'line':
    case 'radar':
      
      newData = {
        labels: {{ content.settings.chart_data | json_encode | raw }}.map(item => item.label),
    datasets: [{
      label: {{ content.settings.chart_label | json_encode | raw }},
      data: {{ content.settings.chart_data | json_encode | raw }}.map(item => item.value),
      backgroundColor: {{ content.settings.chart_data | json_encode | raw }}.map(item => item.fill_color),
       borderColor: {{ content.settings.chart_data | json_encode | raw }}.map(item => item.border_color),
      borderWidth: {{ content.settings.line_border_width | json_encode | raw }},
borderRadius: {{ content.settings.border_radius | json_encode | raw }},
tension: {{ content.settings.line_tension | json_encode | raw }},
        }],
      };
break;

    case 'bar':
    case 'doughnut':
    case 'pie':
    case 'polarArea':
    default:
// Default to using an array of numbers for bar charts, and potentially others
newData = {
  labels: {{ content.settings.chart_data | json_encode | raw }}.map(item => item.label),
    datasets: [{
      label: {{ content.settings.chart_label | json_encode | raw }},
      data: {{ content.settings.chart_data | json_encode | raw }}.map(item => item.value),
      backgroundColor: {{ content.settings.chart_data | json_encode | raw }}.map(item => item.fill_color),
      borderColor: {{ content.settings.chart_data | json_encode | raw }}.map(item => item.border_color),
      borderWidth: {{ content.settings.chart_data | json_encode | raw }}.map(item => item.border_width),
      borderRadius: {{ content.settings.border_radius | json_encode | raw }},
          
        }],
      };
break;
  }

const options = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: {{ design.styles.aspect_ratio }},
  //we can add more options here as we realise more cool stuff to do
  };


chartElement.updateChart({ chartData: newData, chartOptions: options });
}


updateChartData();
