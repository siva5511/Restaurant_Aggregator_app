const API_BASE_URL = 'http://localhost:5000';

export const fetchRestaurants = async (page = 1, limit = 15, country = '', avgCost = '', cuisines = '', search = '') => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
      country,
      avg_cost: avgCost,
      cuisines,
      search
    }).toString();

    const response = await fetch(`${API_BASE_URL}/restaurants?${queryParams}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return { restaurants: [], totalCount: 0, page: 1, totalPages: 1 }; // Return default values if there's an error
  }
};

export const fetchRestaurantById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurants/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    return null;
  }
};
