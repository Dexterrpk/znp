from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

@app.route('/')
def index():
    return send_from_directory('.', 'login.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy", "version": "1.0.0"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

