import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { products } from '../../data/mockData';
import { LayoutDashboard, Package, Users, Megaphone, Tag, Plus, Trash2, ShoppingBag, DollarSign, Clock, ArrowLeft } from 'lucide-react';
import { Link } from '../../router';

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-xl">🍕</span>
            <span>Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === tab.id ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-black text-sm">
            <ArrowLeft size={16} /> Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="text-sm text-gray-600 mb-1">Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="text-sm text-gray-600 mb-1">Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold">{pendingOrders}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="text-sm text-gray-600 mb-1">Staff</p>
                <p className="text-2xl font-bold">{activeStaff}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-bold">Recent Orders</h2>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Order</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Total</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-t border-gray-200">
                      <td className="p-3 font-medium">{order.id}</td>
                      <td className="p-3 text-gray-600">{order.customerName}</td>
                      <td className="p-3 font-medium">${order.total.toFixed(2)}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 text-xs rounded bg-gray-100 font-medium">{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Orders</h1>
            <div className="bg-white border border-gray-200 rounded-xl">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Order</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Total</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-t border-gray-200">
                      <td className="p-3 font-medium">{order.id}</td>
                      <td className="p-3 text-gray-600">{order.customerName}</td>
                      <td className="p-3 font-medium">${order.total.toFixed(2)}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 text-xs rounded bg-gray-100 font-medium">{order.status}</span>
                      </td>
                      <td className="p-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="delivered">Delivered</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Products</h1>
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
                <Plus size={16} /> Add Product
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Product</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Category</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-t border-gray-200">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{product.image}</span>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600 capitalize">{product.category}</td>
                      <td className="p-3 font-medium">${product.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Staff</h1>
              <button
                onClick={() => addStaff({ id: `s${Date.now()}`, name: 'New Staff', role: 'waiter', email: 'new@foodhub.com', phone: '555-0000', status: 'active' })}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
              >
                <Plus size={16} /> Add Staff
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staff.map(member => (
                <div key={member.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-gray-600 capitalize">{member.role}</p>
                    </div>
                    <button onClick={() => removeStaff(member.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{member.email}</p>
                    <p>{member.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'banners' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Banners</h1>
              <button
                onClick={() => addBanner({ id: `b${Date.now()}`, title: 'New Banner', subtitle: 'Subtitle', image: '🎯', active: true })}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
              >
                <Plus size={16} /> Add Banner
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {banners.map(banner => (
                <div key={banner.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-3xl">{banner.image}</span>
                    <button onClick={() => removeBanner(banner.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <h3 className="font-semibold">{banner.title}</h3>
                  <p className="text-sm text-gray-600">{banner.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Campaigns</h1>
              <button
                onClick={() => addCampaign({ id: `c${Date.now()}`, name: 'New Campaign', description: 'Description', discount: 10, type: 'percentage', startDate: '2026-01-01', endDate: '2026-12-31', active: true })}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
              >
                <Plus size={16} /> Add Campaign
              </button>
            </div>
            <div className="space-y-3">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <p className="text-sm text-gray-600">{campaign.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold">
                      {campaign.type === 'percentage' ? `${campaign.discount}%` : `$${campaign.discount}`}
                    </span>
                    <button onClick={() => removeCampaign(campaign.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
