
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, UserCircle, LogOut, Plus, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/index';
import { toast } from 'react-hot-toast';

const DashBoard = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const fetchedCars = await api.getCars(token);
        if (fetchedCars.success) {
          setCars(fetchedCars.cars);
        }
      } catch (error) {
        toast.error('Error fetching cars:', error.message);
      }
    };

    fetchCars();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-indigo-600 shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">CarNation</h1>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 transition duration-200 text-white"
              >
                <UserCircle className="h-6 w-6" />
                <span>{user?.username}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500 break-all">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Cars</h2>
            <p className="text-gray-600 mt-1">Manage and track your vehicle collection</p>
          </div>
          <Link
            to="/car/new"
            className="flex items-center justify-center bg-orange-400 text-white px-5 py-3 rounded-lg hover:bg-black transition duration-200 shadow-md space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Car</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by title, description, or tags..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Cars List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <Link
              key={car._id}
              to={`/car/${car._id}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={car.images[0]}
                  alt={car.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {car.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">{car.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {car.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}

          {filteredCars.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No cars found</h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search terms' : 'Start by adding your first car'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
