import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, ChefHat, CheckCircle, AlertCircle, ArrowLeft, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Order } from '../../data/mockData';

const KitchenDisplay: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'preparing' | 'ready'>('all');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeOrders = orders.filter(o => o.status !== 'completed' && o.status !== 'delivered');
  const filteredOrders = filter === 'all' ? activeOrders : activeOrders.filter(o => o.status === filter);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'border-yellow-400 bg-yellow-50';
      case 'preparing': return 'border-blue-400 bg-blue-50';
      case 'ready': return 'border-green-400 bg-green-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <AlertCircle className="text-yellow-500" size={20} />;
      case 'preparing': return <Flame className="text-blue-500" size={20} />;
      case 'ready': return <CheckCircle className="text-green-500" size={20} />;
      default: return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getNextStatus = (status: Order['status']): Order['status'] | null => {
    switch (status) { case 'pending': return 'preparing'; case 'preparing': return 'ready'; default: return null; }
  };

  const getTimeElapsed = (date: Date) => {
    const diff = Math.floor((currentTime.getTime() - new Date(date).getTime()) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} min ago`;
    return `${Math.floor(diff / 60)}h ${diff % 60}m ago`;
  };

  const pendingCount = activeOrders.filter(o => o.status === 'pending').length;
  const preparingCount = activeOrders.filter(o => o.status === 'preparing').length;
  const readyCount = activeOrders.filter(o => o.status === 'ready').length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <div className="flex items-center gap-2"><ChefHat size={24} className="text-orange-500" /><h1 className="text-xl font-bold">Kitchen Display</h1></div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-400 rounded-full" />Pending: {pendingCount}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-400 rounded-full" />Preparing: {preparingCount}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded-full" />Ready: {readyCount}</span>
            </div>
            <div className="text-sm text-gray-400">{currentTime.toLocaleTimeString()}</div>
          </div>
        </div>
      </header>

      <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
        <div className="flex gap-2">
          {[{ id: 'all', label: 'All Orders', count: activeOrders.length }, { id: 'pending', label: 'Pending', count: pendingCount }, { id: 'preparing', label: 'Preparing', count: preparingCount }, { id: 'ready', label: 'Ready', count: readyCount }].map(tab => (
            <button key={tab.id} onClick={() => setFilter(tab.id as any)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === tab.id ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}>
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16"><ChefHat size={64} className="text-gray-600 mx-auto mb-4" /><h2 className="text-xl font-semibold text-gray-400">No active orders</h2><p className="text-gray-500 mt-2">Orders will appear here when they come in</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOrders.map(order => (
              <div key={order.id} className={`rounded-xl border-2 p-4 ${getStatusColor(order.status)} transition-all`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">{getStatusIcon(order.status)}<span className="font-bold text-lg text-gray-800">{order.id}</span></div>
                  <span className="text-xs text-gray-500">{getTimeElapsed(order.createdAt)}</span>
                </div>
                <div className="text-sm text-gray-600 mb-3 space-y-1">
                  <p><span className="font-medium">Customer:</span> {order.customerName}</p>
                  <p><span className="font-medium">Type:</span> <span className="capitalize">{order.type}</span></p>
                  <p><span className="font-medium">Time:</span> {order.time}</p>
                  {order.isGift && <p className="text-purple-600 font-medium">🎁 Gift Order</p>}
                </div>
                <div className="border-t border-gray-200 pt-3 mb-3">
                  <h4 className="font-medium text-gray-800 text-sm mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="bg-white rounded-lg p-2 border border-gray-100">
                        <div className="flex justify-between items-center"><span className="text-sm font-medium text-gray-800">{item.quantity}× {item.product.name}</span><span className="text-xs text-gray-500">{item.product.image}</span></div>
                        {item.selectedVariant && <p className="text-xs text-gray-500 ml-4">{item.selectedVariant.name}</p>}
                        {item.selectedAddons.length > 0 && <p className="text-xs text-orange-600 ml-4">+ {item.selectedAddons.map(a => a.name).join(', ')}</p>}
                        {item.notes && <p className="text-xs text-red-600 ml-4 font-medium mt-1">📝 {item.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
                {order.kitchenNotes && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3"><p className="text-xs text-red-700 font-medium">⚠️ Kitchen Notes: {order.kitchenNotes}</p></div>
                )}
                {getNextStatus(order.status) && (
                  <button onClick={() => updateOrderStatus(order.id, getNextStatus(order.status)!)} className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${order.status === 'pending' ? 'bg-yellow-500 text-white hover:bg-yellow-600' : order.status === 'preparing' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-green-500 text-white hover:bg-green-600'}`}>
                    {order.status === 'pending' ? '🔥 Start Preparing' : order.status === 'preparing' ? '✅ Mark Ready' : '📦 Mark Completed'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenDisplay;
