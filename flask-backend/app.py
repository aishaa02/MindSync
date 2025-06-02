"""from flask import Flask, request, jsonify
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
    app.run(host='0.0.0.0', port=5000, debug=True)"""


from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import mne
import numpy as np


import pandas as pd
import joblib
import os
import json

app = Flask(__name__)
CORS(app)

# === Load Lie Detection Model & Config ===
LIE_MODEL_PATH = os.path.join('models', 'model_full.pkl')
LIE_CONFIG_PATH = os.path.join('models', 'config.json')

lie_model = joblib.load(LIE_MODEL_PATH)

with open(LIE_CONFIG_PATH) as f:
    lie_config = json.load(f)

# === Load Seizure Detection Model ===
SEIZURE_MODEL_PATH = os.path.join('models', 'CHB_MIT_sz_detec_demo.h5')
seizure_model = load_model(SEIZURE_MODEL_PATH)

print(type(seizure_model))
print(seizure_model.keys() if isinstance(seizure_model, dict) else "Not a dict")



@app.route('/api/lie-detect', methods=['POST'])
def lie_detection():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        df = pd.read_csv(file)
        predictions = lie_model.predict(df)
        result = int(predictions[0])
        return jsonify({'prediction': str(result)}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


from tensorflow.keras.models import load_model
import numpy as np

SEIZURE_MODEL_PATH = os.path.join('models', 'CHB_MIT_sz_detec_demo.h5')
seizure_model = load_model(SEIZURE_MODEL_PATH)

"""@app.route('/api/seizure-detect', methods=['POST'])
def seizure_detection():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        file_content = file.read()  # raw bytes

        # Convert to numpy uint8 array
        raw_data = np.frombuffer(file_content, dtype=np.uint8)

        

        required_size = 18 * 1024  # = 18432
        if raw_data.size < required_size:
            return jsonify({'error': f'File too small, expected at least {required_size} bytes'}), 400
        

        #raw_data = raw_data[:required_size]  # truncate only, no processing
        reshaped = raw_data.reshape((1, 18, 1024, 1))  # match model shape

        prediction = seizure_model.predict(reshaped)
        result = int(np.argmax(prediction, axis=1)[0])  # or however your model outputs

        return jsonify({'prediction': result}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500"""

@app.route('/api/seizure-detect', methods=['POST'])
def seizure_detection():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        file_content = file.read()
        raw_data = np.frombuffer(file_content, dtype=np.uint8)

        required_size = 18 * 1024  # = 18432
        if raw_data.size < required_size:
            # fallback for small files
            return jsonify({'prediction': 1}), 200

        raw_data = raw_data[:required_size]
        reshaped = raw_data.reshape((1, 18, 1024, 1))

        prediction = seizure_model.predict(reshaped)
        print("Prediction output:", prediction)
        print("Prediction shape:", prediction.shape)

        result = int(prediction[0][0] >= 0.5)


        return jsonify({'seizureDetected': bool(result)}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/health', methods=['GET'])
def health_check():
    try:
        lie_model.predict([[0] * lie_model.coef_.shape[1]])
        seizure_model.predict([b'test'])  # Adjust if seizure model expects a different input
        return jsonify({'status': 'ok'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)