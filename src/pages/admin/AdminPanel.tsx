import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { products } from '../../data/mockData';
import { LayoutDashboard, Package, Users, Megaphone, Tag, Plus, Trash2, Edit, ShoppingBag, DollarSign, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const { orders, staff, banners, campaigns, updateOrderStatus, addStaff, removeStaff, addBanner, removeBanner, addCampaign, removeCampaign } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'banners', label: 'Banners', icon: Megaphone },
    { id: 'campaigns', label: 'Campaigns', icon: Tag },
  ];

  const totalRevenue = orders.filter(o => o.status === 'completed' || o.status === 'delivered').reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const activeStaff = staff.filter(s => s.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2"><span className="text-2xl">🍕</span><span className="text-lg font-bold">FoodHub Admin</span></Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === tab.id ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
              <tab.icon size={18} />{tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"><ArrowLeft size={16} /> Back to Site</Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Total Revenue</p><p className="text-2xl font-bold text-gray-800">${totalRevenue.toFixed(2)}</p></div><div className="bg-green-100 p-3 rounded-lg"><DollarSign className="text-green-600" size={20} /></div></div></div>
                <div className="bg-white rounded-xl p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Total Orders</p><p className="text-2xl font-bold text-gray-800">{orders.length}</p></div><div className="bg-blue-100 p-3 rounded-lg"><ShoppingBag className="text-blue-600" size={20} /></div></div></div>
                <div className="bg-white rounded-xl p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Pending Orders</p><p className="text-2xl font-bold text-gray-800">{pendingOrders}</p></div><div className="bg-orange-100 p-3 rounded-lg"><Clock className="text-orange-600" size={20} /></div></div></div>
                <div className="bg-white rounded-xl p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Active Staff</p><p className="text-2xl font-bold text-gray-800">{activeStaff}</p></div><div className="bg-purple-100 p-3 rounded-lg"><Users className="text-purple-600" size={20} /></div></div></div>
              </div>
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-bold text-gray-800">Recent Orders</h2></div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50"><tr><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Order ID</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Customer</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Type</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Total</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="p-3 text-sm font-medium text-gray-800">{order.id}</td>
                          <td className="p-3 text-sm text-gray-600">{order.customerName}</td>
                          <td className="p-3 text-sm text-gray-600 capitalize">{order.type}</td>
                          <td className="p-3 text-sm font-medium text-gray-800">${order.total.toFixed(2)}</td>
                          <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-700' : order.status === 'delivered' ? 'bg-blue-100 text-blue-700' : order.status === 'preparing' ? 'bg-yellow-100 text-yellow-700' : order.status === 'ready' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{order.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders Management</h1>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50"><tr><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Order</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Customer</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Items</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Type</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Total</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="p-3 text-sm font-medium text-gray-800">{order.id}</td>
                          <td className="p-3 text-sm text-gray-600">{order.customerName}</td>
                          <td className="p-3 text-sm text-gray-600">{order.items.length} items</td>
                          <td className="p-3 text-sm text-gray-600 capitalize">{order.type}</td>
                          <td className="p-3 text-sm font-medium">${order.total.toFixed(2)}</td>
                          <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-700' : order.status === 'delivered' ? 'bg-blue-100 text-blue-700' : order.status === 'preparing' ? 'bg-yellow-100 text-yellow-700' : order.status === 'ready' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{order.status}</span></td>
                          <td className="p-3">
                            <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value as any)} className="text-xs border border-gray-200 rounded px-2 py-1">
                              <option value="pending">Pending</option><option value="preparing">Preparing</option><option value="ready">Ready</option><option value="delivered">Delivered</option><option value="completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-gray-800">Products Management</h1><button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-orange-700"><Plus size={16} /> Add Product</button></div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50"><tr><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Product</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Category</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Price</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Variants</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Addons</th><th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="p-3"><div className="flex items-center gap-3"><span className="text-2xl">{product.image}</span><div><p className="text-sm font-medium text-gray-800">{product.name}</p><p className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</p></div></div></td>
                          <td className="p-3 text-sm text-gray-600 capitalize">{product.category}</td>
                          <td className="p-3 text-sm font-medium text-gray-800">${product.price.toFixed(2)}</td>
                          <td className="p-3 text-sm text-gray-600">{product.variants.length}</td>
                          <td className="p-3 text-sm text-gray-600">{product.addons.length}</td>
                          <td className="p-3 flex gap-2"><button className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button><button className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-8"><h2 className="text-lg font-bold text-gray-800 mb-4">Ingredients Inventory</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Mozzarella', 'Tomato Sauce', 'Beef Patty', 'Chicken', 'Coffee Beans', 'Lettuce', 'Bread', 'Oat Milk'].map(ing => (
                    <div key={ing} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <p className="font-medium text-gray-800 text-sm">{ing}</p>
                      <div className="mt-2 bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.random() * 60 + 40}%` }} /></div>
                      <p className="text-xs text-gray-500 mt-1">{Math.floor(Math.random() * 50 + 10)} kg available</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'staff' && (
            <StaffManagement staff={staff} addStaff={addStaff} removeStaff={removeStaff} />
          )}

          {activeTab === 'banners' && (
            <div>
              <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-gray-800">Banners Management</h1><button onClick={() => addBanner({ id: `b${Date.now()}`, title: 'New Banner', subtitle: 'Banner subtitle', image: '🎯', active: true })} className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-orange-700"><Plus size={16} /> Add Banner</button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {banners.map(banner => (
                  <div key={banner.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-3"><span className="text-4xl">{banner.image}</span><div className="flex gap-2"><span className={`px-2 py-1 text-xs rounded-full ${banner.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{banner.active ? 'Active' : 'Inactive'}</span><button onClick={() => removeBanner(banner.id)} className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button></div></div>
                    <h3 className="font-bold text-gray-800">{banner.title}</h3>
                    <p className="text-sm text-gray-500">{banner.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div>
              <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-gray-800">Campaigns & Discounts</h1><button onClick={() => addCampaign({ id: `c${Date.now()}`, name: 'New Campaign', description: 'Campaign description', discount: 10, type: 'percentage', startDate: '2026-01-01', endDate: '2026-12-31', active: true })} className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-orange-700"><Plus size={16} /> Add Campaign</button></div>
              <div className="space-y-4">
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${campaign.active ? 'bg-green-100' : 'bg-gray-100'}`}><Tag className={campaign.active ? 'text-green-600' : 'text-gray-400'} size={20} /></div>
                      <div><h3 className="font-bold text-gray-800">{campaign.name}</h3><p className="text-sm text-gray-500">{campaign.description}</p><p className="text-xs text-gray-400 mt-1">{campaign.startDate} to {campaign.endDate}</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-orange-600">{campaign.type === 'percentage' ? `${campaign.discount}%` : `$${campaign.discount}`}</span>
                      <button onClick={() => removeCampaign(campaign.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StaffManagement: React.FC<{ staff: any[]; addStaff: (s: any) => void; removeStaff: (id: string) => void }> = ({ staff, addStaff, removeStaff }) => {
  const [showForm, setShowForm] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', role: 'waiter' as const, email: '', phone: '' });

  const handleAdd = () => {
    if (newStaff.name && newStaff.email) {
      addStaff({ ...newStaff, id: `s${Date.now()}`, status: 'active' });
      setNewStaff({ name: '', role: 'waiter', email: '', phone: '' });
      setShowForm(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-gray-800">Staff Management</h1><button onClick={() => setShowForm(!showForm)} className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-orange-700"><Plus size={16} /> Add Staff</button></div>
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Add New Staff Member</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <select value={newStaff.role} onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as any })} className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              {['manager', 'chef', 'waiter', 'delivery', 'cashier'].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <input type="email" placeholder="Email" value={newStaff.email} onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })} className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input type="text" placeholder="Phone" value={newStaff.phone} onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })} className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleAdd} className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700">Add Staff</button>
            <button onClick={() => setShowForm(false)} className="text-gray-500 text-sm hover:text-gray-700">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map(member => (
          <div key={member.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center"><span className="text-orange-600 font-bold text-sm">{member.name.charAt(0)}</span></div>
                <div><p className="font-medium text-gray-800">{member.name}</p><p className="text-xs text-gray-500 capitalize">{member.role}</p></div>
              </div>
              <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} /><button onClick={() => removeStaff(member.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button></div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500"><p>{member.email}</p><p>{member.phone}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
