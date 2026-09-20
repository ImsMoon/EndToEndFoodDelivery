import React from 'react';
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

  // Match routes
  if (path === '/' || path === '') {
    return <ClientLayout><Home /></ClientLayout>;
  }
  if (path === '/menu' || path.startsWith('/menu?')) {
    return <ClientLayout><Menu /></ClientLayout>;
  }
  if (path.startsWith('/product/')) {
    return <ClientLayout><ProductDetail /></ClientLayout>;
  }
  if (path === '/cart') {
    return <ClientLayout><Cart /></ClientLayout>;
  }
  if (path === '/checkout') {
    return <ClientLayout><Checkout /></ClientLayout>;
  }
  if (path === '/login') {
    return <ClientLayout><Login /></ClientLayout>;
  }
  if (path === '/locations') {
    return <ClientLayout><Locations /></ClientLayout>;
  }
  if (path === '/admin') {
    return <AdminPanel />;
  }
  if (path === '/kitchen') {
    return <KitchenDisplay />;
  }
  if (path === '/pos') {
    return <POS />;
  }

  // 404
  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl block mb-4">🔍</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Page not found</h2>
        <p className="text-gray-500">The page you're looking for doesn't exist.</p>
      </div>
    </ClientLayout>
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
