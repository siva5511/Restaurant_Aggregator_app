#Project : Zomato Restaurant Listing & Searching
 
## Key Use Cases
 
### Data Loading
Created an independent script to load the Zomato restaurant data available [here](https://www.kaggle.com/datasets/shrutimehta/zomato-restaurants-data) into a database.
 
### Web API Service
Developed web API service with the following endpoints to serve the content loaded in the previous step:
  - **Get Restaurant by ID**: Retrieve details of a specific restaurant by its ID.
  - **Get List of Restaurants**: Fetch a list of restaurants with pagination support.
 
### User Interface
Developed web application with the following pages,connecting to the web API service:
  - **Restaurant List Page**: Display a list of restaurants. Clicking on a restaurant should navigate the user to the restaurant's detail page.
  - **Restaurant Detail Page**: Show details of a specific restaurant.
 
## Additional Use Cases:
Implemented the following additional features, ensuring they are supported in both the API and the UI:
- **Filtering Options**:
  - By Country
  - By Average Spend for Two People
  - By Cuisines
- **Search Functionality**: Enable search for restaurants by name and description.
