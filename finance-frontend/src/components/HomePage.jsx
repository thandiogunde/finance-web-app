import React from 'react';
import HeaderBar from './header-bar/HeaderBar';
import Navbar from './navbar/Navbar';
import BannerSection from './banner/BannerSection';
import LearningHub from './learning-hub/LearningHub';
import DailyTipsPreview from './daily-tips-preview/DailyTipsPreview';

const HomePage = () => {
  return (
    <>
      <BannerSection />
      <LearningHub />
      <DailyTipsPreview />
    </>
  );
};

export default HomePage;
