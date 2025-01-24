import React from 'react';
import Home from './components/Home';
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
        <Home />
        <Toaster/>
    </div>
  );
};

export default App;
