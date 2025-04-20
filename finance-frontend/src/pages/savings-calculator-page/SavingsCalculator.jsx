import React, { useState } from 'react';
import axios from 'axios';
import './SavingsCalculator.css';
import HeaderBar from '../../components/header-bar/HeaderBar';
import Navbar from '../../components/navbar/Navbar';
import savingsImage from '../../assets/savings-image.png'; // replace with your actual image path

const SavingsCalculator = ({ user, onLogout }) => {
  const [goal, setGoal] = useState('');
  const [saved, setSaved] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    const goalAmount = parseFloat(goal);
    const savedAmount = parseFloat(saved);
    const time = parseFloat(months);
  
    if (!goalAmount || !time || savedAmount < 0 || savedAmount > goalAmount) {
      setResult("Please enter valid values.");
      return;
    }
  
    const remaining = goalAmount - savedAmount;
    const monthly = (remaining / time).toFixed(2);
  
    setResult(`You need to save £${monthly} every month to reach your goal.`);
  
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post('http://localhost:5050/api/savings/save', {
        userId: user._id,
        goalAmount,
        savedAmount,
        monthsToSave: time
      });
      console.log("Savings entry saved.");
    } catch (err) {
      console.error("Error saving savings data:", err);
    }
  };
  

  const handleReset = () => {
    setGoal('');
    setSaved('');
    setMonths('');
    setResult(null);
  };

  return (
    <div>
      <HeaderBar isLoggedIn={true} onLogout={onLogout} />
      <Navbar isAdmin={true} />

      <div className="breadcrumb">
        Home <span>&gt;</span> Manage Money <span>&gt;</span> <span className="active">Savings Calculator</span>
      </div>

      <div className="savings-wrapper">
        <div className="savings-left">
          <h1>Savings Calculator</h1>
          <h3>How much do you need to save?</h3>

          <label>My goal is:</label>
          <input
            type="number"
            placeholder="£"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <label>I've saved:</label>
          <input
            type="number"
            placeholder="£"
            value={saved}
            onChange={(e) => setSaved(e.target.value)}
          />

          <label>I need to save it in:</label>
          <input
            type="number"
            placeholder="Months"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />

          <button onClick={handleCalculate} className="btn-calc">Calculate</button>
        </div>

        <div className="savings-right">
  <div className="result-top-row">
    <h3>Your result</h3>
    <img src={savingsImage} alt="Savings visual" className="savings-image" />
  </div>

  <div className="result-box">
    {result ? result : "You need to save £_____ every month to reach your goal."}
  </div>

  <button onClick={handleReset} className="btn-recalc">Recalculate</button>
</div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
