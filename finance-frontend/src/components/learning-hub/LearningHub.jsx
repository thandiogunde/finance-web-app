import React from 'react';
import './LearningHub.css';
import taxIcon from '../../assets/icon-tax.png';
import inflationIcon from '../../assets/icon-inflation.png';
import creditIcon from '../../assets/icon-credit.png';
import { Link } from 'react-router-dom';

const LearningHub = () => {
  const cards = [
    { 
      icon: taxIcon, 
      title: 'Taxes', 
      description: 'Understand tax basics, deductions, and strategies to optimize your tax planning efficiently.',
      link: '/learning/taxes'
    },
    { 
      icon: inflationIcon, 
      title: 'Inflation', 
      description: 'Learn how inflation affects your savings and discover ways to protect your financial future.',
      link: '/learning/inflation'
    },
    { 
      icon: creditIcon, 
      title: 'Credit', 
      description: 'Build a strong credit history and learn how to manage debt responsibly for long-term success.',
      link: '/learning/credit'
    }
  ];

  return (
    <section className="learning-hub">
      <div className="learning-hub-container">
        <div className="learning-hub-header">
          <h2>Learning Hub</h2>
          <p className="learning-hub-subtitle">Explore financial topics that matter to you</p>
        </div>
        
        <div className="cards">
          {cards.map((card, i) => (
            <div key={i} className="card">
              <div className="card-image">
                <img src={card.icon} alt={`${card.title} icon`} />
              </div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link to={card.link} className="read-more-link">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="learning-hub-footer">
          <Link to="/learning" className="learn-btn-link">
            <button className="learn-btn">Explore all topics</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearningHub;