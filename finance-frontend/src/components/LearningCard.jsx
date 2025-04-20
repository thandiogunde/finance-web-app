// src/components/LearningCard.js
import React from 'react';
import './LearningCard.css';

const LearningCard = ({ icon, title, text }) => {
  return (
    <div className="learning-card">
      <img src={icon} alt={title} className="card-icon" />
      <h3>{title}</h3>
      <p>{text}</p>
      <a href="#">Read more</a>
    </div>
  );
};

export default LearningCard;
