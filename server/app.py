from flask import Flask, jsonify, request
import psycopg2
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token
from credentials import DB_PASSWORD, DB_NAME, DB_USERNAME, SECRET_KEY

app = Flask(__name__)

app.config['DB_NAME'] = DB_NAME
app.config['DB_USER'] = DB_USERNAME
app.config['DB_PASSWORD'] = DB_PASSWORD
app.config['DB_HOST'] = 'localhost'
app.config['DB_PORT'] = 5432

app.config['JWT_SECRET_KEY'] = SECRET_KEY
jwt = JWTManager(app)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

def connect_db():
    try:
        conn = psycopg2.connect(
            host=app.config['DB_HOST'],
            database=app.config['DB_NAME'],
            user=app.config['DB_USER'],
            password=app.config['DB_PASSWORD']
        )
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Username and password are required"}), 400

    username = data.get('username')
    password = data.get('password')
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    try:
        conn = connect_db()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users(username, password) VALUES (%s, %s) RETURNING id;", (username, hashed_password))
        user_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "User registered successfully", "user_id": user_id}), 201
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json();
    if not data or 'title' not in data:
        return jsonify({'error': "Title is required"}), 400
    
    title = data.get('title')
    description = data.get('description')
    genres = data.get('genres')
    image_url = data.get('image_url')
    
    try:
        conn = connect_db()
        if conn is None:
            return jsonify({'error':'Database connection failed'}), 500
        
        cursor = conn.cursor()
        cursor.execute("INSERT INTO tasks(title, description, category, image_url) VALUES(%s,%s,%s,%s);", (title, description, genres, image_url));
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        return jsonify({'message':'An error occurred', 'error': str(e)}), 500
    
    
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    conn = connect_db()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor()

    cursor.execute("SELECT id, password FROM users WHERE username = %s;", (username,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    user_id, db_password = user
    if not check_password_hash(db_password, password):
        return jsonify({"error": "Invalid username or password"}), 401

    access_token = create_access_token(identity=user_id)
    return jsonify({"message": "Login successful", "access_token": access_token}), 200

if __name__ == '__main__':
    app.run(debug=True)
