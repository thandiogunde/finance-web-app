import React from 'react';
import './DailyTipsPreview.css';
import tip1 from '../../assets/tip1.png';
import tip2 from '../../assets/tip2.png';
import tip3 from '../../assets/tip3.png';
import { Link } from 'react-router-dom';

const DailyTipsPreview = () => {
  const cards = [
    { icon: tip1, title: 'Track Your Spending' },
    { icon: tip2, title: 'Cook at Home' },
    { icon: tip3, title: '24 Hour Rule' }
  ];

  return (
    <section className="daily-tips-preview">
      <h2>Daily Tips</h2>
      <div className="cards">
        {cards.map((tip, i) => (
          <div key={i} className="card">
            <div className="card-image">
              <img src={tip.icon} alt={tip.title} />
            </div>
            <h3>{tip.title}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        ))}
      </div>
      <Link to="/daily-tips">
        <button className="learn-btn">See all tips</button>
      </Link>
    </section>
  );
};

export default DailyTipsPreview;
