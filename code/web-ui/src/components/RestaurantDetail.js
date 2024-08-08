// src/components/RestaurantDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRestaurantById } from '../api'; 
import './RestaurantDetail.css'; 

import restaurantImage from '../assets/pexels-pixabay-265940.jpg'; 

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const data = await fetchRestaurantById(id);
        if (data) {
          setRestaurant(data);
        } else {
          setError('Restaurant not found.');
        }
      } catch (err) {
        setError('Failed to fetch restaurant details.');
      } finally {
        setLoading(false);
      }
    };

    loadRestaurant();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!restaurant) return <div>Restaurant not found.</div>;

  return (
    <div className="restaurant-detail-container">

      <div className='name-caption-prop'>
                <h1 className="name-stl-in_detail_page">Zomato</h1>
        <p className='caption-stl-in-detail-page'>"Great choice! This restaurant is celebrated for its superb food and exceptional dining experience."</p>
        </div>


        <img 
          src={restaurantImage} 
          alt={restaurant['Restaurant Name']} 
          className="restaurant-image"
        />
        <h1 >{restaurant['Restaurant Name']}</h1>

        <div className="details-table">
  <div className="sub-details-cont">
    <div className="details-row">
      <span className="label">Rating:</span>
      <span className="value">{restaurant['Aggregate rating']}</span>
    </div>
    <div className="details-row">
      <span className="label">Votes:</span>
      <span className="value">{restaurant['Votes']}</span>
    </div>
    <div className="details-row">
      <span className="label">City:</span>
      <span className="value">{restaurant['City']}</span>
    </div>
    <div className="details-row">
      <span className="label">Price Range:</span>
      <span className="value">{restaurant['Price range']}</span>
    </div>
  </div>

  <div className="sub-details-cont">
    <div className="details-row">
      <span className="label">Country Code:</span>
      <span className="value">{restaurant['Country Code']}</span>
    </div>
    <div className="details-row">
      <span className="label">Rating Color:</span>
      <span className="value">{restaurant['Rating color']}</span>
    </div>
    <div className="details-row">
      <span className="label">Rating Text:</span>
      <span className="value">{restaurant['Rating text']}</span>
    </div>
    <div className="details-row">
      <span className="label">Average Cost for Two:</span>
      <span className="value">{restaurant['Average Cost for two']}</span>
    </div>
    <div className="details-row">
      <span className="label">Cuisines:</span>
      <span className="value">{restaurant['Cuisines']}</span>
    </div>
  </div>

  <div className="sub-details-cont">
    <div className="details-row">
      <span className="label">Locality:</span>
      <span className="value">{restaurant['Locality']}</span>
    </div>
    <div className="details-row">
      <span className="label">Address:</span>
      <span className="value">{restaurant['Address']}</span>
    </div>
  </div>
</div>

      </div>

  );
};

export default RestaurantDetail;