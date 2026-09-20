import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChefHat, ArrowLeft } from 'lucide-react';
import { Link } from '../../router';
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

  const getNextStatus = (status: Order['status']): Order['status'] | null => {
    switch (status) { case 'pending': return 'preparing'; case 'preparing': return 'ready'; default: return null; }
  };

  const getTimeElapsed = (date: Date) => {
    const diff = Math.floor((currentTime.getTime() - new Date(date).getTime()) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff / 60)}h ago`;
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
            <div className="flex items-center gap-2"><ChefHat size={24} /><h1 className="text-xl font-bold">Kitchen</h1></div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-amber rounded-full" />{pendingCount} pending</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-400 rounded-full" />{preparingCount} preparing</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green rounded-full" />{readyCount} ready</span>
            </div>
            <div className="text-sm text-gray-400">{currentTime.toLocaleTimeString()}</div>
          </div>
        </div>
      </header>

      <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
        <div className="flex gap-2">
          {[{ id: 'all', label: 'All', count: activeOrders.length }, { id: 'pending', label: 'Pending', count: pendingCount }, { id: 'preparing', label: 'Preparing', count: preparingCount }, { id: 'ready', label: 'Ready', count: readyCount }].map(tab => (
            <button key={tab.id} onClick={() => setFilter(tab.id as any)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === tab.id ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}>{tab.label} ({tab.count})</button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16"><ChefHat size={48} className="text-gray-600 mx-auto mb-4" /><h2 className="text-xl font-semibold text-gray-400">No active orders</h2></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOrders.map(order => (
              <div key={order.id} className={`rounded-xl border-2 p-4 ${order.status === 'pending' ? 'border-amber bg-amber/10' : order.status === 'preparing' ? 'border-blue-500 bg-blue-500/10' : 'border-green bg-green/10'}`}>
                <div className="flex items-center justify-between mb-3"><span className="font-bold text-lg">{order.id}</span><span className="text-xs text-gray-400">{getTimeElapsed(order.createdAt)}</span></div>
                <div className="text-sm text-gray-300 mb-3 space-y-1">
                  <p><span className="font-medium text-white">Customer:</span> {order.customerName}</p>
                  <p><span className="font-medium text-white">Type:</span> <span className="capitalize">{order.type}</span></p>
                </div>
                <div className="border-t border-gray-700 pt-3 mb-3">
                  <div className="space-y-2">
                    {order.items.map((item, i) => (<div key={i} className="bg-gray-800 rounded-lg p-2"><p className="text-sm font-medium">{item.quantity}× {item.product.name}</p>{item.notes && <p className="text-xs text-amber mt-1">📝 {item.notes}</p>}</div>))}
                  </div>
                </div>
                {order.kitchenNotes && <div className="bg-red-500/20 border border-red-500 rounded-lg p-2 mb-3"><p className="text-xs text-red-400">⚠️ {order.kitchenNotes}</p></div>}
                {getNextStatus(order.status) && (<button onClick={() => updateOrderStatus(order.id, getNextStatus(order.status)!)} className={`w-full py-2 rounded-lg font-medium text-sm ${order.status === 'pending' ? 'bg-amber hover:bg-yellow-600' : order.status === 'preparing' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green hover:bg-green-600'}`}>{order.status === 'pending' ? 'Start Preparing' : order.status === 'preparing' ? 'Mark Ready' : 'Complete'}</button>)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenDisplay;
