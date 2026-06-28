import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import PortfolioPage from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [blogId, setBlogId] = useState(null);

  // Simple state-based routing as a robust fallback
  const renderPage = () => {
    switch (currentPage) {
      case 'services': return <Services />;
      case 'portfolio': return <PortfolioPage />;
      case 'blog': return <Blog />;
      case 'blog-entry': return <BlogDetail blogId={blogId} />;
      case 'contact': return <Contact />;
      case 'vousadmin': return <Admin />;
      default: return <Home />;
    }
  };

  // Listen for hash changes for basic routing support
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('blog-entry?id=')) {
        const id = hash.replace('blog-entry?id=', '');
        setBlogId(id);
        setCurrentPage('blog-entry');
      } else {
        if (hash) setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="app-container">
      {currentPage !== 'vousadmin' && <Navbar />}
      {currentPage !== 'vousadmin' && <MobileNav />}
      <main>
        {renderPage()}
      </main>
      {currentPage !== 'vousadmin' && <Footer />}
    </div>
  );
}

export default App;
