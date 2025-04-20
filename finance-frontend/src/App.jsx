import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import Register from './pages/register-page/Register.jsx';
import Login from './pages/login-page/Login.jsx';
import Admin from './pages/admin-page/Admin.jsx';
import ManageMoney from './pages/manage-money-page/ManageMoney.jsx';
import SavingsCalculator from './pages/savings-calculator-page/SavingsCalculator.jsx';
import BudgetCalculator from './pages/budget-calculator/BudgetCalculator.jsx';
import Contact from './pages/contact-page/Contact.jsx';
import AboutUs from './pages/about-page/About.jsx';
import LearningPage from './pages/learning-page/LearningPage.jsx';
import DailyTips from './pages/daily-tips-page/DailyTips.jsx';
import FAQs from './pages/faqs-page/FAQs.jsx';
import PrivacyPolicy from './pages/privacy-policy-page/PrivacyPolicy.jsx';
import Footer from './components/footer/Footer.jsx';
import SearchResults from './pages/SearchResults';

// import HeaderBar from './components/header-bar/HeaderBar';
import Navbar from './components/navbar/Navbar';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowNav(false);
  };

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  const hideFooterRoutes = ['/login', '/register'];
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {/* <HeaderBar isLoggedIn={!!user} onLogout={handleLogout} onToggleNav={toggleNav} /> */}
      <Navbar
        isAdmin={!!user?.isAdmin}
        isLoggedIn={!!user}
        show={showNav}
        onLogout={handleLogout}
      />


      <Routes>
        <Route path="/" element={<HomePage user={user} onLogout={handleLogout} />} />
        <Route path="/about" element={<AboutUs user={user} onLogout={handleLogout} />} />
        <Route path="/learning" element={<LearningPage user={user} onLogout={handleLogout} />} />
        <Route path="/daily-tips" element={<DailyTips user={user} onLogout={handleLogout} />} />
        <Route path="/contact" element={<Contact user={user} onLogout={handleLogout} />} />
        <Route path="/faqs" element={<FAQs user={user} onLogout={handleLogout} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy user={user} onLogout={handleLogout} />} />

        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route path="/admin" element={user ? <Admin user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/manage-money" element={user ? <ManageMoney user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/budget-calculator" element={user ? <BudgetCalculator user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/savings-calculator" element={user ? <SavingsCalculator user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />

        <Route path="/search" element={<SearchResults user={user} onLogout={handleLogout} />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

export default App;
