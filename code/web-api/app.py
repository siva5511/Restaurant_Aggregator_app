from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine, text, inspect

app = Flask(__name__)
CORS(app)

# database connection
DATABASE_URL = 'sqlite:///C:/Users/nvsiv/OneDrive/Desktop/Assignment-TypeFace/restaurants.db'
engine = create_engine(DATABASE_URL)

def get_country_code(country_name):
    query = "SELECT \"Country Code\" FROM countries WHERE lower(\"Country\") = :country_name"
    with engine.connect() as conn:
        result = conn.execute(text(query), {"country_name": country_name.lower()}).fetchone()
        if result:
            return result[0]
        return None

@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 15, type=int)
    country_name = request.args.get('country', '').strip()
    avg_cost = request.args.get('avg_cost', '').strip()
    cuisines = request.args.get('cuisines', '').strip().lower()
    search = request.args.get('search', '').strip().lower()

    offset = (page - 1) * limit

    # Fetching country code from country name
    country_code = get_country_code(country_name) if country_name else None

    query = "SELECT * FROM restaurants WHERE 1=1"
    params = {}

    if country_code:
        query += " AND \"Country Code\" = :country_code"
        params["country_code"] = country_code
    if avg_cost:
        query += " AND \"Average Cost for two\" <= :avg_cost"
        params["avg_cost"] = avg_cost
    if cuisines:
        query += " AND lower(\"Cuisines\") LIKE :cuisines"
        params["cuisines"] = f"%{cuisines}%"
    if search:
        query += " AND (lower(\"Restaurant Name\") LIKE :search OR lower(\"Description\") LIKE :search)"
        params["search"] = f"%{search}%"

    query += " LIMIT :limit OFFSET :offset"
    params["limit"] = limit
    params["offset"] = offset

    try:
        with engine.connect() as conn:
            result = conn.execute(text(query), params)
            
            count_query = "SELECT COUNT(*) FROM restaurants WHERE 1=1"
            count_params = params.copy()
            if country_code:
                count_query += " AND \"Country Code\" = :country_code"
            if avg_cost:
                count_query += " AND \"Average Cost for two\" <= :avg_cost"
            if cuisines:
                count_query += " AND lower(\"Cuisines\") LIKE :cuisines"
            if search:
                count_query += " AND (lower(\"Restaurant Name\") LIKE :search OR lower(\"Description\") LIKE :search)"
                
            count_result = conn.execute(text(count_query), count_params).fetchone()
            total_count = count_result[0]
            
            inspector = inspect(engine)
            columns = [col['name'] for col in inspector.get_columns('restaurants')]
            
            restaurants = []
            for row in result.fetchall():
                restaurant_dict = {columns[i]: row[i] for i in range(len(columns))}
                restaurants.append(restaurant_dict)
            
            return jsonify({
                "restaurants": restaurants,
                "totalCount": total_count,
                "page": page,
                "totalPages": (total_count + limit - 1) // limit
            })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/restaurants/<int:restaurant_id>', methods=['GET'])
def get_restaurant_by_id(restaurant_id):
    query = "SELECT * FROM restaurants WHERE \"Restaurant ID\" = :id"
    
    with engine.connect() as conn:
        result = conn.execute(text(query), {"id": restaurant_id}).fetchone()
        
        if result:
            inspector = inspect(engine)
            columns = [col['name'] for col in inspector.get_columns('restaurants')]
            
            restaurant_dict = {columns[i]: result[i] for i in range(len(columns))}
            
            for key, value in restaurant_dict.items():
                if isinstance(value, (int, float)):
                    restaurant_dict[key] = str(value)
                    
            return jsonify(restaurant_dict)
        else:
            return jsonify({"error": "Restaurant not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
