import React, { useState } from 'react';
import './FAQs.css';
import HeaderBar from '../../components/header-bar/HeaderBar';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const faqs = [
  {
    question: "What is Fortuna and how can it help me?",
    answer: "Fortuna is a financial literacy platform designed to help young adults learn how to manage money through tools, tips, and engaging content."
  },
  {
    question: "Do I need to register to use the tools?",
    answer: "Yes, you'll need to register and login to have access to personalised budgeting and savings tools. This allows you to save your progress and view visual summaries of your spending and so your data can be saved securely."
  },
  {
    question: "How do I track my savings goals?",
    answer: "You can use the Savings Calculator to set a goal amount and log how much you've saved so far. A visual chart will help you track your progress toward your target."
  },
  {
    question: "What is the Budget Calculator and how does it work?",
    answer: "The Budget Calculator allows you to enter your monthly income and expenses. It shows how much money you have left after your bills and helps you organize your spending into categories like groceries, rent, and entertainment."
  },
  {
    question: "Where can I find tips or resources to help with money management?",
    answer: "Check out the Daily Tips page and the Learning Hub for helpful advice, budgeting tricks, and beginner-friendly financial education."
  },
  {
    question: "Is Fortuna free to use?",
    answer: "Absolutely! Fortuna is completely free to use for all users."
  },
  {
    question: "Can I access Fortuna on my phone?",
    answer: "Yes, Fortuna is fully responsive and works on mobile, tablet, and desktop devices."
  },
];

const FAQs = ({ user, onLogout }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <>
      <HeaderBar isLoggedIn={!!user} onLogout={onLogout} />
      <Navbar isAdmin={!!user} />
      <div className="breadcrumb">Home <span>&gt;</span> <span className="active">FAQs</span></div>

      <section className="faq-banner">
        <h1>Frequently Asked Questions</h1>
        <p>Got questions? We've got answers! Learn more about how Fortuna works and how it can help you manage your money smarter.</p>
      </section>

      <section className="faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className={`faq-item ${activeIndex === i ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFAQ(i)}>
              {faq.question}
              <span className="toggle-icon">{activeIndex === i ? '-' : '+'}</span>
            </div>
            {activeIndex === i && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </section>

      <div className="faq-contact-link">
        <p>Still have questions? <a href="/contact">Contact Us</a></p>
      </div>
    </>
  );
};

export default FAQs;
