import React, { useState } from 'react';
import axios from 'axios';
import './BudgetCalculator.css';
import HeaderBar from '../../components/header-bar/HeaderBar';
import Navbar from '../../components/navbar/Navbar';
import budgetImage from '../../assets/budget-image.png'; // replace with your image

const BudgetCalculator = ({ user, onLogout }) => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState([
    { category: 'Groceries', amount: '' },
    { category: 'Bills', amount: '' },
    { category: 'Transport', amount: '' },
    { category: 'Miscellaneous', amount: '' }
  ]);

  const [result, setResult] = useState(null);

  const handleExpenseChange = (index, value) => {
    const newExpenses = [...expenses];
    newExpenses[index].amount = value;
    setExpenses(newExpenses);
  };

  const calculateBudget = async () => {
    const totalExpenses = expenses.reduce((total, item) => {
      return total + parseFloat(item.amount || 0);
    }, 0);
  
    const balance = parseFloat(income || 0) - totalExpenses;
    setResult(balance.toFixed(2));

     // Save to MongoDB
  try {
    await axios.post('http://localhost:5050/api/budget/save', {
      userId: user._id,
      income,
      expenses,
      balance
    });
    console.log("Budget saved!");
  } catch (error) {
    console.error("Failed to save budget:", error);
  }
};

  const handleReset = () => {
    setIncome('');
    setExpenses(expenses.map(e => ({ ...e, amount: '' })));
    setResult(null);
  };

  return (
    <div>
      <HeaderBar isLoggedIn={true} onLogout={onLogout} />
      <Navbar isAdmin={true} />

      <div className="breadcrumb">
        Home <span>&gt;</span> Manage Money <span>&gt;</span> <span className="active">Budget Calculator</span>
      </div>

      <div className="budget-wrapper">
        <div className="budget-left">
          <h1>Budget Calculator</h1>
          <h3>Plan your monthly spending</h3>

          <label>Monthly Income (£):</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="e.g. 2000"
          />

          {expenses.map((expense, index) => (
            <div key={index}>
              <label>{expense.category} (£):</label>
              <input
                type="number"
                value={expense.amount}
                onChange={(e) => handleExpenseChange(index, e.target.value)}
              />
            </div>
          ))}

          <button className="btn-calc" onClick={calculateBudget}>Calculate</button>
        </div>

        <div className="budget-right">
          <div className="result-top-row">
            <h3>Your result</h3>
            <img src={budgetImage} alt="Budget Visual" className="budget-image" />
          </div>

          <div className="result-box">
            {result !== null
              ? result >= 0
                ? `You have £${result} left over this month.`
                : `You are overspending by £${Math.abs(result)}.`
              : "Enter income and expenses to see your result."}
          </div>

          <button className="btn-recalc" onClick={handleReset}>Recalculate</button>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
