import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { locations } from '../../data/mockData';

const Locations: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Locations</h1>
        <p className="text-gray-500 text-lg">Find a FoodHub restaurant near you</p>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl h-64 md:h-80 flex items-center justify-center border-2 border-dashed border-orange-200 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-6xl">📍</div>
          <div className="absolute bottom-10 right-10 text-5xl">🗺️</div>
        </div>
        <div className="text-center text-orange-400 relative z-10">
          <MapPin size={56} className="mx-auto mb-3" />
          <p className="text-xl font-bold text-orange-600">Interactive Map</p>
          <p className="text-sm mt-1">View all our locations on the map</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {locations.map((loc, i) => (
          <div key={loc.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 group">
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="text-orange-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{loc.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{loc.address}</p>
            <div className="space-y-2.5 text-sm text-gray-600 mb-5">
              <div className="flex items-center gap-2"><Clock size={16} className="text-gray-400" /><span>Open: 10:00 AM - 11:00 PM</span></div>
              <div className="flex items-center gap-2"><Phone size={16} className="text-gray-400" /><span>555-0100</span></div>
            </div>
            <button className="w-full bg-orange-100 text-orange-600 py-3 rounded-xl font-bold hover:bg-orange-200 transition-all flex items-center justify-center gap-2 group-hover:bg-orange-600 group-hover:text-white">
              <Navigation size={16} /> Get Directions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
