import React, { useState } from 'react';

function BMIForm({ userName, useMetric }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [bmi, setBmi] = useState(null);

  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (/^[\d.]*$/.test(value)) {
      setHeight(value);
      setError('');
    } else {
      setError('Height must be a number');
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (/^[\d.]*$/.test(value)) {
      setWeight(value);
      setError('');
    } else {
      setError('Weight must be a number');
    }
  };

  const calculateBMI = () => {
    if (!height || !weight) {
      setError('Please enter both height and weight');
      setBmi(null);
      return;
    }
    setError('');
    let bmiValue;
    if (useMetric) {
      // height in cm, convert to meters
      const heightMeters = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightMeters * heightMeters);
    } else {
      // imperial: height in feet.inches (e.g., 5.8), weight in lbs
      // Convert height feet.inches to total inches
      const heightParts = height.split('.');
      if (heightParts.length !== 2) {
        setError('Enter height as feet.inches (e.g., 5.8)');
        setBmi(null);
        return;
      }
      const feet = parseInt(heightParts[0], 10);
      const inches = parseInt(heightParts[1], 10);
      if (isNaN(feet) || isNaN(inches)) {
        setError('Invalid height format');
        setBmi(null);
        return;
      }
      const totalInches = feet * 12 + inches;
      bmiValue = (parseFloat(weight) / (totalInches * totalInches)) * 703;
    }
    setBmi(bmiValue.toFixed(2));
  };

  return (
    <div>
      <h2>Enter your height and weight</h2>
      <input
        value={height}
        onChange={handleHeightChange}
        placeholder={useMetric ? "Height (cm)" : "Height (ft/in)"}
      />
      <input
        value={weight}
        onChange={handleWeightChange}
        placeholder={useMetric ? "Weight (kg)" : "Weight (lbs)"}
      />
      {error && <p className="error">{error}</p>}
      <button onClick={calculateBMI}>Calculate BMI</button>
      <button>Clear Fields</button>
      <button>Health Tips</button>
      {bmi && (
        <p>
          {userName ? `${userName}, your BMI is: ${bmi}` : `Your BMI is: ${bmi}`}
        </p>
      )}
    </div>
  );
}

export default BMIForm;