import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderBar from '../components/header-bar/HeaderBar';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const dummyData = [
    { title: 'Budgeting Tips', description: 'Learn how to manage your monthly income and expenses.' },
    { title: 'Credit Score', description: 'How to build and improve your credit rating.' },
    { title: 'Saving for Emergencies', description: 'Why emergency funds are essential.' },
    { title: 'Inflation Explained', description: 'Understand how inflation affects your money.' }
  ];

const SearchResults = ({ user, onLogout }) => {
  const query = useQuery();
  const keyword = query.get('q')?.toLowerCase();

  const results = dummyData.filter(item =>
    item.title.toLowerCase().includes(keyword) ||
    item.description.toLowerCase().includes(keyword)
  );

  return (
    <>
      <HeaderBar isLoggedIn={!!user} onLogout={onLogout} />
      <Navbar isAdmin={!!user} />

      <div className="breadcrumb">Home <span>&gt;</span> <span className="active">Search</span></div>

      <section style={{ padding: "2rem"}}>
        
        <h2>Search Results for: <em>{keyword}</em></h2>
        {results.length > 0 ? (
          results.map((item, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </section>
    </>
  );
};

export default SearchResults;
