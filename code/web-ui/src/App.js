// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
