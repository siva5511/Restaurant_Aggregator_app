import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRestaurants } from '../api';
import './RestaurantList.css';

// Import images
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
// Import up to 15.jpg
import img15 from '../assets/15.jpg';

const images = [img1, img2, img3, /* ... up to img15 */ img15];

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(15); // Displaying 15 items per page
  const [country, setCountry] = useState('');
  const [avgCost, setAvgCost] = useState('');
  const [cuisines, setCuisines] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const { restaurants: fetchedRestaurants, totalCount, page: currentPage, totalPages: totalPagesCount } = await fetchRestaurants(page, limit, country, avgCost, cuisines, search);
        setRestaurants(fetchedRestaurants);
        setTotalCount(totalCount);
        setTotalPages(totalPagesCount);
        setPage(currentPage);
      } catch (err) {
        setError('Failed to fetch restaurants.');
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, [page, limit, country, avgCost, cuisines, search]);

  const handleSearch = () => {
    setPage(1); // to reset to first page when searching
  };

  const handleFilterChange = (e) => {
    // Update the filters state
    const { name, value } = e.target;
    if (name === 'search') setSearch(value);
    if (name === 'country') setCountry(value);
    if (name === 'avgCost') setAvgCost(value);
    if (name === 'cuisines') setCuisines(value);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="restaurant-list-container">
      <div className='name-and-filters'>
        <div className='name-cont'>
          <h1 className="name-stl">Zomato</h1>
          <h2 className="caption-stl">Discover the best food & drinks</h2>
        </div>

        <div className="filters">
          <div className="filter-group">
            <input
              type="text"
              name="search"
              placeholder="Search by name or description"
              value={search}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <input
              type="text"
              name="country"
              placeholder="Filter by country"
              value={country}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <input
              type="number"
              name="avgCost"
              placeholder="Max avg cost for two"
              value={avgCost}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <input
              type="text"
              name="cuisines"
              placeholder="Filter by cuisines"
              value={cuisines}
              onChange={handleFilterChange}
            />
          </div>
          <button className="apply-filters-button" onClick={handleSearch}>Apply Filters</button>
        </div>
      </div>

      {restaurants.length === 0 ? (
        <p>No restaurants available.</p>
      ) : (
        <ol className="restaurant-list">
          {restaurants.map((restaurant, index) => (
            
            <li key={restaurant['Restaurant ID']}>
                
              <img src={images[index % images.length]} alt={`Restaurant ${index + 1}`} className="restaurant-image" />
              <Link to={`/restaurants/${restaurant['Restaurant ID']}`}>{restaurant['Restaurant Name']}</Link>
              
            </li>
            
          ))}
        </ol>
      )}

      <div className="pagination">
        <button className="nav-bttn" onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button className="nav-bttn" onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;
