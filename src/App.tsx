import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './router';
import { AppProvider } from './context/AppContext';
import ClientLayout from './components/ClientLayout';
import Home from './pages/client/Home';
import Menu from './pages/client/Menu';
import ProductDetail from './pages/client/ProductDetail';
import Cart from './pages/client/Cart';
import Checkout from './pages/client/Checkout';
import Login from './pages/client/Login';
import Locations from './pages/client/Locations';
import AdminPanel from './pages/admin/AdminPanel';
import KitchenDisplay from './pages/kitchen/KitchenDisplay';
import POS from './pages/pos/POS';

const AppRoutes: React.FC = () => {
  const { path } = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPath, setCurrentPath] = useState(path);

  useEffect(() => {
    if (path !== currentPath) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setCurrentPath(path);
        setIsTransitioning(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [path, currentPath]);

  const renderPage = () => {
    const p = currentPath;
    
    if (p === '/' || p === '') {
      return <ClientLayout><Home /></ClientLayout>;
    }
    if (p === '/menu' || p.startsWith('/menu?') || p.startsWith('/menu#')) {
      return <ClientLayout><Menu /></ClientLayout>;
    }
    if (p.startsWith('/product/')) {
      return <ClientLayout><ProductDetail /></ClientLayout>;
    }
    if (p === '/cart') {
      return <ClientLayout><Cart /></ClientLayout>;
    }
    if (p === '/checkout') {
      return <ClientLayout><Checkout /></ClientLayout>;
    }
    if (p === '/login') {
      return <ClientLayout><Login /></ClientLayout>;
    }
    if (p === '/locations') {
      return <ClientLayout><Locations /></ClientLayout>;
    }
    if (p === '/admin') {
      return <AdminPanel />;
    }
    if (p === '/kitchen') {
      return <KitchenDisplay />;
    }
    if (p === '/pos') {
      return <POS />;
    }

    // 404
    return (
      <ClientLayout>
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-6xl block mb-4">🔍</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Page not found</h2>
          <p className="text-gray-500">The page you're looking for doesn't exist.</p>
        </div>
      </ClientLayout>
    );
  };

  return (
    <div 
      className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
    >
      {renderPage()}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <RouterProvider>
        <AppRoutes />
      </RouterProvider>
    </AppProvider>
  );
}

export default App;
