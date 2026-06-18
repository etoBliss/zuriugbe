import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import PortfolioPage from './pages/Portfolio';
import Blog from './pages/Blog';
import CV from './pages/CV';
import HireMe from './pages/HireMe';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Simple state-based routing as a robust fallback
  const renderPage = () => {
    switch (currentPage) {
      case 'services': return <Services />;
      case 'portfolio': return <PortfolioPage />;
      case 'blog': return <Blog />;
      case 'cv': return <CV />;
      case 'hire-me': return <HireMe />;
      default: return <Home />;
    }
  };

  // Listen for hash changes for basic routing support
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setCurrentPage(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
