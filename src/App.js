import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import BMIForm from './BMIForm';
import BMIChart from './BMIChart';
import HealthTips from './HealthTips';
import './ButtonControls.css';
import './App.css';
import './InputStyles.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [showForm, setShowForm] = useState(true);
  const [showChart, setShowChart] = useState(true);
  const [showTips, setShowTips] = useState(false);

  // State and input handlers for user name input
  const [userName, setUserName] = useState('');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Basic sanitization: remove numbers and special characters
    const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');

    if (sanitizedValue !== value) {
      setInputError('Only letters and spaces are allowed');
    } else {
      setInputError('');
    }

    setUserName(sanitizedValue);
  };

  const [useMetric, setUseMetric] = useState(true);
  const [bmiValue, setBmiValue] = useState(null);
  return (
    <div className="App">
      <h1>
  <span className="bmi-title">BMI</span>{' '}
  <span className="buddy-title">Buddy</span>
</h1>
      <div className="bmi-info">
        <h2>What to know</h2>
        <p>
          Body mass index (BMI) is a calculated measure of weight relative to height.
          For adults, BMI is categorized into underweight, healthy weight, overweight, and obesity.
          Obesity is further subdivided into three classes. This BMI calculator is for adults 20 and older.
        </p>
      </div>
      <div className="user-input">
        <label htmlFor="userName">Enter Your Name:</label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={handleInputChange}
          placeholder="Your name"
          className="name-input"
        />
        {inputError && <p className="error">{inputError}</p>}
      </div>

      <div className="unit-toggle">
        <button onClick={() => setUseMetric(prev => !prev)}>
          Switch to {useMetric ? 'Imperial' : 'Metric'} Units
        </button>
      </div>

      <div className="button-group">
        <button
          className={showForm ? 'active' : ''}
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? 'Hide' : 'Show'} BMI Form
        </button>
        <button
          className={showChart ? 'active' : ''}
          onClick={() => setShowChart(prev => !prev)}
        >
          {showChart ? 'Hide' : 'Show'} BMI Chart
        </button>
        <button
          className={showTips ? 'active' : ''}
          onClick={() => setShowTips(prev => !prev)}
        >
          {showTips ? 'Hide' : 'Show'} Health Tips
        </button>
      </div>

      {showForm && (
        <BMIForm
          userName={userName}
          useMetric={useMetric}
          onBmiCalculated={setBmiValue}
        />
      )}
      {showChart && <BMIChart bmiValue={bmiValue} />}
      {showTips && <HealthTips />}
      <footer className="app-footer">
  <h1>
    <span className="bmi-title">BMI</span>{' '}
    <span className="buddy-title">Buddy</span>
  </h1>
  <p>Built by Kenneth Mayeden</p>
  <p>&copy; {new Date().getFullYear()} BMI Buddy. All rights reserved.</p>
</footer>
    </div>
  );
}

export default App;