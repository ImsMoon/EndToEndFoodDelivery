import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { locations } from '../../data/mockData';

const Locations: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Our Locations</h1>
        <p className="text-ink-light text-lg">Find a FoodHub restaurant near you</p>
      </div>

      <div className="bg-white border border-line rounded-2xl h-64 flex items-center justify-center mb-10">
        <div className="text-center text-ink-muted">
          <MapPin size={48} className="mx-auto mb-3 text-brand" />
          <p className="font-semibold text-lg text-ink">Interactive Map</p>
          <p className="text-sm">View all locations on the map</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {locations.map(loc => (
          <div key={loc.id} className="bg-white border border-line rounded-2xl p-6 hover:border-brand/30 hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-4">
              <MapPin className="text-brand" size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">{loc.name}</h3>
            <p className="text-ink-light text-sm mb-4">{loc.address}</p>
            <div className="space-y-2 text-sm text-ink-light mb-4">
              <div className="flex items-center gap-2"><Clock size={14} /><span>10:00 AM - 11:00 PM</span></div>
              <div className="flex items-center gap-2"><Phone size={14} /><span>555-0100</span></div>
            </div>
            <button className="w-full bg-brand hover:bg-brand-dark text-white py-3 rounded-xl font-semibold">
              Get Directions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
