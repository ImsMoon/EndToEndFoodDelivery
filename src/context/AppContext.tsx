import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Order, Product, Variant, Addon, Staff, Banner, Campaign } from '../data/mockData';
import { sampleOrders } from '../data/mockData';

interface User { name: string; email: string; method: 'google' | 'email'; }

interface AppState {
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  staff: Staff[];
  banners: Banner[];
  campaigns: Campaign[];
  addToCart: (product: Product, variant?: Variant, addons?: Addon[], notes?: string) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  login: (user: User) => void;
  logout: () => void;
  placeOrder: (type: 'delivery' | 'takeaway' | 'dining', address?: string, notes?: string, isGift?: boolean, giftMessage?: string, time?: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addStaff: (staff: Staff) => void;
  removeStaff: (id: string) => void;
  addBanner: (banner: Banner) => void;
  removeBanner: (id: string) => void;
  addCampaign: (campaign: Campaign) => void;
  removeCampaign: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [staff, setStaff] = useState<Staff[]>([
    { id: 's1', name: 'John Manager', role: 'manager', email: 'john@foodhub.com', phone: '555-0101', status: 'active' },
    { id: 's2', name: 'Sarah Chef', role: 'chef', email: 'sarah@foodhub.com', phone: '555-0102', status: 'active' },
    { id: 's3', name: 'Mike Waiter', role: 'waiter', email: 'mike@foodhub.com', phone: '555-0103', status: 'active' },
    { id: 's4', name: 'Lisa Delivery', role: 'delivery', email: 'lisa@foodhub.com', phone: '555-0104', status: 'active' },
    { id: 's5', name: 'Tom Cashier', role: 'cashier', email: 'tom@foodhub.com', phone: '555-0105', status: 'active' },
  ]);
  const [banners, setBanners] = useState<Banner[]>([
    { id: 'b1', title: '50% Off First Order!', subtitle: 'Use code WELCOME50', image: '🎉', active: true },
    { id: 'b2', title: 'Free Delivery Weekend', subtitle: 'On all orders above $20', image: '🚚', active: true },
    { id: 'b3', title: 'New: Summer Coffee Menu', subtitle: 'Try our refreshing iced coffees', image: '☕', active: true },
  ]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 'c1', name: 'Summer Special', description: '20% off all cold beverages', discount: 20, type: 'percentage', startDate: '2026-06-01', endDate: '2026-08-31', active: true },
    { id: 'c2', name: 'Family Deal', description: '$5 off orders above $30', discount: 5, type: 'fixed', startDate: '2026-01-01', endDate: '2026-12-31', active: true },
  ]);

  const addToCart = (product: Product, variant?: Variant, addons?: Addon[], notes?: string) => {
    const variantPrice = variant?.priceModifier || 0;
    const addonsPrice = addons?.reduce((sum, a) => sum + a.price, 0) || 0;
    const totalPrice = product.price + variantPrice + addonsPrice;
    setCart([...cart, { product, quantity: 1, selectedVariant: variant, selectedAddons: addons || [], notes, totalPrice }]);
  };

  const removeFromCart = (index: number) => setCart(cart.filter((_, i) => i !== index));
  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) { removeFromCart(index); return; }
    const updated = [...cart];
    updated[index].quantity = quantity;
    setCart(updated);
  };
  const clearCart = () => setCart([]);
  const getCartTotal = () => cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const login = (newUser: User) => setUser(newUser);
  const logout = () => setUser(null);

  const placeOrder = (type: 'delivery' | 'takeaway' | 'dining', address?: string, notes?: string, isGift?: boolean, giftMessage?: string, time?: string) => {
    const newOrder: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`, items: [...cart], total: getCartTotal(),
      status: 'pending', type, customerName: user?.name || 'Guest', customerPhone: '',
      deliveryAddress: address, notes, isGift, giftMessage, time: time || 'ASAP',
      createdAt: new Date(), kitchenNotes: cart.filter(i => i.notes).map(i => i.notes).join('; '),
    };
    setOrders([newOrder, ...orders]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };
  const addStaff = (s: Staff) => setStaff([...staff, s]);
  const removeStaff = (id: string) => setStaff(staff.filter(s => s.id !== id));
  const addBanner = (b: Banner) => setBanners([...banners, b]);
  const removeBanner = (id: string) => setBanners(banners.filter(b => b.id !== id));
  const addCampaign = (c: Campaign) => setCampaigns([...campaigns, c]);
  const removeCampaign = (id: string) => setCampaigns(campaigns.filter(c => c.id !== id));

  return (
    <AppContext.Provider value={{ cart, user, orders, staff, banners, campaigns, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount, login, logout, placeOrder, updateOrderStatus, addStaff, removeStaff, addBanner, removeBanner, addCampaign, removeCampaign }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
