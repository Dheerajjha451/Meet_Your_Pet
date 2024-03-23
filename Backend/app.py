from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
from dog_breed_names import dog_names

app = Flask(__name__)
CORS(app)
model = load_model("dog_model.keras")
class_names = dog_names()

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        image = Image.open(file)
        image = image.resize((256, 256))
        image = np.array(image)
        image = image / 255.0

        prediction = model.predict(image[np.newaxis, ...])
        predicted_class = np.argmax(prediction)
        breed_name = class_names[predicted_class]

        breed_name_final = breed_name.split("-")[1]
        

        return jsonify({"prediction": breed_name_final})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
