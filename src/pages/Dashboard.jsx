import React, { useEffect, useState } from 'react';
import { Bell, Settings, Search, ChevronRight, Calendar, Activity, Users, PieChart, LogOut, HelpCircle } from 'lucide-react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { WorkoutContainer } from '../components/WorkoutComponents';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const DashboardLayout = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
 


  const navigation = [
    { name: 'Overview', icon: Activity },
    { name: 'Workouts', icon: Users },
    { name: 'Diet Plan', icon: PieChart },
    { name: 'Goals', icon: Calendar },
    { name: 'My Schedule', icon: Calendar },
    { name: 'Progress', icon: Activity },
  ];

  const scheduleItems = [
    { day: 'Monday', activity: 'Stretch', time: '08:00', count: '20 Pieces' },
    { day: 'Tuesday', activity: 'Back Stretch', time: '08:00', count: '10 Round' },
    { day: 'Wednesday', activity: 'Yoga', time: '08:00', count: '20 min' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Workouts':
        return <WorkoutContainer />;
      case 'Overview':
        return (
          <>
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl p-6 text-white mb-6">
              <h2 className="text-2xl font-bold mb-2">Track Your Daily Activities</h2>
              <p className="opacity-90">Keep track of your fitness journey and achieve your goals.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-cyan-500 p-6 rounded-xl text-white">
                <h3 className="text-lg font-semibold mb-2">Workout</h3>
                <p className="text-2xl font-bold">4 hrs</p>
              </div>
              <div className="bg-orange-500 p-6 rounded-xl text-white">
                <h3 className="text-lg font-semibold mb-2">Calories</h3>
                <p className="text-2xl font-bold">1800 kcl</p>
              </div>
              <div className="bg-purple-500 p-6 rounded-xl text-white">
                <h3 className="text-lg font-semibold mb-2">Steps</h3>
                <p className="text-2xl font-bold">2200 steps</p>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">My Schedule</h3>
                <button className="text-orange-500 flex items-center">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {scheduleItems.map((item) => (
                  <div key={item.day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.activity}</h4>
                        <p className="text-sm text-gray-500">At {item.time}</p>
                      </div>
                    </div>
                    <span className="text-orange-500">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Coming Soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <span className="text-orange-500 font-bold text-xl">Fitness</span>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 ${
                activeTab === item.name ? 'bg-orange-50 text-orange-500' : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold">Good Morning</h1>
              <p className="text-gray-600">Welcome Back!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;