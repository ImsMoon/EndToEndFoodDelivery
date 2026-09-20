import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { locations } from '../../data/mockData';

const Locations: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Locations</h1>
    <p className="text-gray-500 mb-8">Find a FoodHub restaurant near you</p>
    <div className="bg-gray-100 rounded-2xl h-64 md:h-80 flex items-center justify-center border-2 border-dashed border-gray-300 mb-8">
      <div className="text-center text-gray-400"><MapPin size={48} className="mx-auto mb-2" /><p className="text-lg font-medium">Interactive Map</p><p className="text-sm">View all our locations on the map</p></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {locations.map(loc => (
        <div key={loc.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4"><MapPin className="text-orange-600" size={24} /></div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">{loc.name}</h3>
          <p className="text-gray-500 text-sm mb-4">{loc.address}</p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2"><Clock size={14} className="text-gray-400" /><span>Open: 10:00 AM - 11:00 PM</span></div>
            <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /><span>555-0100</span></div>
          </div>
          <button className="mt-4 w-full bg-orange-100 text-orange-600 py-2 rounded-lg font-medium hover:bg-orange-200 transition-colors">Get Directions</button>
        </div>
      ))}
    </div>
  </div>
);

export default Locations;
