from flask import Flask, jsonify
from sqlalchemy import create_engine, inspect

app = Flask(__name__)

# Database connection
DATABASE_URL = 'sqlite:///C:/Users/nvsiv/OneDrive/Desktop/Assignment-TypeFace/restaurants.db'
engine = create_engine(DATABASE_URL)

@app.route('/tables', methods=['GET'])
def get_table_info():
    inspector = inspect(engine)
    
    db_info = {}
    for table_name in inspector.get_table_names():
        columns = inspector.get_columns(table_name)
        db_info[table_name] = [
            {
                'name': col['name'],
                'type': str(col['type']),
                'nullable': col['nullable'],
                'default': col.get('default', None)
            }
            for col in columns
        ]

    return jsonify(db_info)

if __name__ == '__main__':
    app.run(debug=True)
