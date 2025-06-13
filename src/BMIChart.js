// BMIChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BMIChart = ({ bmiValue }) => {
  const categories = ['Underweight', 'Normal', 'Overweight', 'Obese'];
  const categoryRanges = [18.5, 24.9, 29.9, 40]; // example end values for ranges

  // Determine where user's BMI fits
  const dataValues = categoryRanges.map((limit, index) =>
    bmiValue <= limit && (index === 0 || bmiValue > categoryRanges[index - 1])
      ? bmiValue
      : null
  );

  const backgroundColors = ['#36A2EB', '#4BC0C0', '#FFCE56', '#FF6384'];

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Your BMI',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 40,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: context =>
            context.raw ? `Your BMI: ${context.raw.toFixed(1)}` : '',
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3>Your BMI Compared to Standard Categories</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BMIChart;