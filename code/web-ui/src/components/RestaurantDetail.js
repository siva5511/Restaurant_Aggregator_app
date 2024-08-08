import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRestaurantById, fetchCountryByCode } from '../api'; 
import './RestaurantDetail.css'; 

import restaurantImage from '../assets/detail-page-background.jpg'; 

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRestaurantAndCountry = async () => {
      try {
        // fetching restaurant details
        const data = await fetchRestaurantById(id);
        if (data) {
          setRestaurant(data);

          // to fetch country name based on country code
          const countryData = await fetchCountryByCode(data['Country Code']);
          if (countryData && countryData.name) {
            setCountryName(countryData.name);
          } else {
            setCountryName('Country not found');
          }
        } else {
          setError('Restaurant not found.');
        }
      } catch (err) {
        setError('Failed to fetch details.');
      } finally {
        setLoading(false);
      }
    };

    loadRestaurantAndCountry();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!restaurant) return <div>Restaurant not found.</div>;


  const {
    'Restaurant Name': restaurantName,
    'Aggregate rating': aggregateRating,
    'Rating color': ratingColor,
    'Cuisines': cuisines,
    'Locality': locality,
    'City': city,
    'Address': address,
    'Votes': votes,
    'Price range': priceRange,
    'Country Code': countryCode,
    'Rating text': ratingText,
    'Average Cost for two': averageCostForTwo,
  } = restaurant;

  return (
    <div className="restaurant-detail-container">
      <header className="header">
        <h1>Zomato</h1>
      </header>
      <img 
        src={restaurantImage} 
        alt={restaurantName} 
        className="restaurant-image"
      />
      <div className="restaurant-info">
        <h1 className="restaurant-name">{restaurantName}</h1>
        <p className="cuisine">{cuisines}</p>
        <p className="location">{locality}, {city}</p>
        <p className="details">{address}</p>
        <div className="rating-box" style={{ backgroundColor: ratingColor }}>
          Rating: {aggregateRating}
        </div>
      </div>
      <div className="details-table">
        <div className="sub-details-cont">
          <div className="details-row">
            <span className="label">Votes:</span>
            <span className="value">{votes} People</span>
          </div>
          <div className="details-row">
            <span className="label">Price Range:</span>
            <span className="value">{priceRange}</span>
          </div>
          <div className="details-row">
            <span className="label">Country:</span>
            <span className="value">{countryName}</span>
          </div>
          <div className="details-row">
            <span className="label">Rating Text:</span>
            <span className="value">{ratingText}</span>
          </div>
          <div className="details-row">
            <span className="label">Average Cost for Two:</span>
            <span className="value">{averageCostForTwo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
