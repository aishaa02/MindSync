from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os
import json

app = Flask(__name__)
CORS(app)

# === Load Model and Config Once ===
MODEL_PATH = os.path.join('models', 'model_full.pkl')
CONFIG_PATH = os.path.join('models', 'config.json')
#EMOTION_MODEL_PATH = os.path.join('models', 'emotion_model.pkl')

lda_model = joblib.load(MODEL_PATH)
#emotion_model = joblib.load(EMOTION_MODEL_PATH)


with open(CONFIG_PATH) as f:
    config = json.load(f)

@app.route('/api/lie-detect', methods=['POST'])
def lie_detection():
    try:
        # Validate file presence
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Read uploaded CSV
        df = pd.read_csv(file)

        # Directly predict (data is already preprocessed in training)
        predictions = lda_model.predict(df)

        # Return only the first prediction
        result = int(predictions[0])
        return jsonify({'prediction': str(result)}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500





@app.route('/health', methods=['GET'])
def health_check():
    try:
        # Run a dummy prediction to verify model health
        dummy_input = [[0] * lda_model.coef_.shape[1]]
        lda_model.predict(dummy_input)
        return jsonify({'status': 'ok'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
