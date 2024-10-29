// Chart.js setup
      const xValues = []; // Time-based x-axis values
      const tempData = []; // Temperature in Celsius
      const tempFData = []; // Temperature in Fahrenheit
      const humidityData = []; // Humidity

      const myChart = new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            { label: "Nhiệt độ (°C)", data: tempData, borderColor: "red", fill: false },
            { label: "Nhiệt độ (°F)", data: tempFData, borderColor: "green", fill: false },
            { label: "Độ ẩm (%)", data: humidityData, borderColor: "blue", fill: false }
          ]
        },
        options: {
          scales: {
            x: { title: { display: true, text: "Thời gian (giây)" }},
            y: { title: { display: true, text: "Giá trị" }}
          },
          legend: { display: true }
        }
      });

