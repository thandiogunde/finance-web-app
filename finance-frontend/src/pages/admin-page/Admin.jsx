import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import HeaderBar from '../../components/header-bar/HeaderBar';
import Navbar from '../../components/navbar/Navbar';
import './Admin.css';
import { useNavigate } from 'react-router-dom';


const Admin = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  const [savingsData, setSavingsData] = useState(null);
  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const res = await axios.get(`https://finance-web-app-production.up.railway.app/api/savings/${user._id}`);
        const latest = res.data[res.data.length - 1];
        if (latest) {
          setSavingsData(latest);
        }
      } catch (err) {
        console.error("Error fetching savings:", err);
      }
    };
  
    if (user?._id) fetchSavings();
  }, [user]);
  

  const [budgetData, setBudgetData] = useState([]);

useEffect(() => {
  const fetchBudget = async () => {

    try {
      const res = await axios.get(`https://finance-web-app-production-59d5.up.railway.app/api/budget/${user._id}`);
      const latestBudget = res.data[res.data.length - 1]; // get most recent entry
      if (latestBudget) {
        setBudgetData(latestBudget.expenses);
      }
    } catch (err) {
      console.error("Failed to fetch budget:", err);
    }
  };

  if (user?._id) {
    fetchBudget();
  }
}, [user]);
const COLORS = ['#0b4c5f', '#13cbe0', '#54b5bf', 'goldenrod', '#A28BD4'];

return (
  <>

    <section className="admin-banner">
      <h1>Welcome back, {user?.name || 'User'}!</h1>
      <p>This is your personalized dashboard.</p>

      {budgetData.length > 0 ? (
  <>


    <div className="charts-container">
      <div className="chart-box">
        
      <h2>Your Monthly Spending Breakdown</h2>
    <p className="budget-total">
      Total Budget: £
      {budgetData.reduce((sum, item) => sum + Number(item.amount || 0), 0).toFixed(2)}
    </p>
    <button className="add-entry-btn" onClick={() => window.location.href = "/budget-calculator"}>
      Add a New Entry
    </button>

        <PieChart width={350} height={300}>
          <Pie
            data={budgetData}
            dataKey="amount"
            nameKey="category"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {budgetData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {savingsData && (
        <div className="chart-box">
          <h2>Savings Progress</h2>
      <p className="budget-total">
        Your Goal: £{savingsData.goalAmount}
      </p>
      <button className="add-entry-btn" onClick={() => window.location.href = "/savings-calculator"}>
        Add Savings Entry
      </button>
          <PieChart width={300} height={300}>
            <Pie
              data={[
                { name: 'Saved', value: savingsData.savedAmount },
                { name: 'Remaining', value: savingsData.goalAmount - savingsData.savedAmount }
              ]}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              <Cell fill="#00C49F" />
              <Cell fill="#FFBB28" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  </>
) : (
  <p>No budget data available yet.</p>
)}
    </section>
  </>
  );
};

export default Admin;

