// HealthTips.js
import React from 'react';

function HealthTips({ category }) {
  const getHealthTip = (category) => {
    switch (category) {
      case "Underweight":
        return "You are underweight. Consider consulting a healthcare provider to ensure you're getting enough nutrients. Focus on high-calorie, nutrient-dense foods.";
      case "Healthy Weight":
        return "Great job maintaining a healthy weight! Keep eating balanced meals and staying physically active.";
      case "Overweight":
        return "You are slightly overweight. Incorporating regular exercise and mindful eating can help you manage your weight better.";
      case "Obesity":
        return "Your BMI is in the obesity range. It's a good idea to speak with a healthcare provider about a sustainable weight loss plan. Consider dietary changes and increased physical activity.";
      default:
        return "";
    }
  };

  const tip = getHealthTip(category);

  return (
    <div>
      {tip && (
        <p><strong>Health Tip:</strong> {tip}</p>
      )}
    </div>
  );
}

export default HealthTips;