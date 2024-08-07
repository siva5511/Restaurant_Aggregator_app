from sqlalchemy import create_engine, text

# Database connection
engine = create_engine('C:\Users\nvsiv\OneDrive\Desktop\Assignment-TypeFace')

# SQL statements to create tables
create_countries_table_sql = """
CREATE TABLE IF NOT EXISTS countries (
    country_code VARCHAR(10) PRIMARY KEY,
    country_name VARCHAR(255)
);
"""

create_restaurants_table_sql = """
CREATE TABLE IF NOT EXISTS restaurants (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    country_code VARCHAR(10),
    city VARCHAR(255),
    address TEXT,
    locality VARCHAR(255),
    locality_verbose TEXT,
    longitude DECIMAL(9, 6),
    latitude DECIMAL(9, 6),
    cuisine TEXT,
    average_cost DECIMAL(10, 2),
    currency VARCHAR(10),
    has_table_booking BOOLEAN,
    has_online_delivery BOOLEAN,
    is_delivering_now BOOLEAN,
    switch_to_order_menu BOOLEAN,
    price_range INT,
    aggregate_rating DECIMAL(3, 2),
    rating_color VARCHAR(10),
    rating_text VARCHAR(50),
    votes INT,
    FOREIGN KEY (country_code) REFERENCES countries(country_code)
);
"""

with engine.connect() as conn:
    conn.execute(text(create_countries_table_sql))
    conn.execute(text(create_restaurants_table_sql))
    print("tables created successfully.")
