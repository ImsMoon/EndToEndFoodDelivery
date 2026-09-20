import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { locations } from '../../data/mockData';

const Locations: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Locations</h1>
        <p className="text-gray-600">Find a FoodHub restaurant near you</p>
      </div>

      <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-10">
        <div className="text-center text-gray-500">
          <MapPin size={48} className="mx-auto mb-2" />
          <p className="font-semibold">Interactive Map</p>
          <p className="text-sm">View all locations on the map</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {locations.map(loc => (
          <div key={loc.id} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="text-gray-700" size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">{loc.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{loc.address}</p>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>10:00 AM - 11:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>555-0100</span>
              </div>
            </div>
            <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800">
              Get Directions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
