import pandas as pd
from sqlalchemy import create_engine


# function to load CSV
def load_csv_with_fallback(filepath, encodings=['MacRoman', 'ISO-8859-1']):
    for encoding in encodings:
        try:
            return pd.read_csv(filepath, encoding=encoding)
        except UnicodeDecodeError:
            continue
    raise UnicodeDecodeError("Failed to read the file with provided encodings.")



# Load restaurant data
try:
    restaurants_data = load_csv_with_fallback('zomato.csv')
except Exception as e:
    print(f"Error loading restaurants data: {e}")
    raise
# load country data
try:
    countries_data = load_csv_with_fallback(r'C:\Users\nvsiv\OneDrive\Desktop\Assignment-TypeFace\code\data-loading\countries.csv')
except Exception as e:
    print(f"Error loading countries data: {e}")
    raise




# Database Connection
engine = create_engine('sqlite:///restaurants.db')

# create tables and inserting data
with engine.connect() as conn:
    try:
        # Inserting countries data
        countries_data.to_sql('countries', con=engine, if_exists='replace', index=False)
        print("Countries table updated successfully.")
    except Exception as e:
        print(f"Error inserting countries data: {e}")
        raise

    try:
        # Inserting restaurants data
        restaurants_data.to_sql('restaurants', con=engine, if_exists='replace', index=False)
        print("Restaurants table updated successfully.")
    except Exception as e:
        print(f"Error inserting restaurants data: {e}")
        raise
