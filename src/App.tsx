import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
          <Route path="/menu" element={<ClientLayout><Menu /></ClientLayout>} />
          <Route path="/product/:id" element={<ClientLayout><ProductDetail /></ClientLayout>} />
          <Route path="/cart" element={<ClientLayout><Cart /></ClientLayout>} />
          <Route path="/checkout" element={<ClientLayout><Checkout /></ClientLayout>} />
          <Route path="/login" element={<ClientLayout><Login /></ClientLayout>} />
          <Route path="/locations" element={<ClientLayout><Locations /></ClientLayout>} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/kitchen" element={<KitchenDisplay />} />
          <Route path="/pos" element={<POS />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
