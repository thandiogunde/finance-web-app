import React from 'react';
import './LearningPage.css';
import studentIcon from '../../assets/icon-student.png';
import billsIcon from '../../assets/icon-bills.png';
import insuranceIcon from '../../assets/icon-insurance.png';
import taxesIcon from '../../assets/icon-tax.png';
import inflationIcon from '../../assets/icon-inflation.png';
import learningImage from '../../assets/learning-banner.png';
import creditIcon from '../../assets/icon-credit.png';
import Navbar from '../../components/navbar/Navbar';
import HeaderBar from '../../components/header-bar/HeaderBar';

const topics = [
  { title: "Student", description: "Understand your student loans, tuition, and budgeting at uni.", icon: studentIcon },
  { title: "Bills", description: "Learn how to manage utility bills, rent, and mobile contracts.", icon: billsIcon },
  { title: "Insurance", description: "Explore types of insurance: health, car, contents and more.", icon: insuranceIcon },
  { title: "Taxes", description: "Discover what taxes mean, how they work and your obligations.", icon: taxesIcon },
  { title: "Inflation", description: "Learn about inflation, interest rates and what they affect.", icon: inflationIcon },
  { title: "Credit", description: "Understand credit scores, cards, borrowing, and repayments.", icon: creditIcon }
];

const LearningPage = ({ user, onLogout}) => {
  return (
    <>
      <div className="breadcrumb">
        Home <span>&gt;</span> <span className="active">Learning</span>
      </div>

      <div className="learning-banner"> 
      <div className="learning-banner-text">
  <h1>Learning Hub</h1>
  <p>Explore essential financial topics, from budgeting to bills, designed to help you make smart, informed money decisions!</p>
</div>
<img src={learningImage} alt="Learning Hub Visual" />
</div>
<section

        className="learning-grid">
          {topics.map((topic, i) => (
            <div className="learning-card" key={i}>
              <img src={topic.icon} alt={topic.title} />
              <h2>{topic.title}</h2>
              <p>{topic.description}</p>
              <a href="#">Read more</a>
            </div>
          ))}
          </section>

<div className="load-btn-container">
  <button className="load-btn">Load all</button>
</div>
<br/>
      
    </>
  );
};

export default LearningPage;
