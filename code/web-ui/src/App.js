import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import Footer from './components/Footer'; // Import the Footer component

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
