import requests
from bs4 import BeautifulSoup
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

def format_breed_name(breed_name):
    # Split the breed name into words and capitalize the first letter of each word
    words = breed_name.split()
    formatted_words = [word.capitalize() for word in words]
    return "_".join(formatted_words)

def scrape_dog_description(dog_name):
    formatted_name = format_breed_name(dog_name)
    url = f"https://en.wikipedia.org/wiki/{formatted_name}"
    response = requests.get(url)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        content = soup.find(id='mw-content-text')
        
        description = []

        appearance_heading = content.find('span', {'id': 'Appearance'})
        temperament_heading = content.find('span', {'id': 'Temperament'})
        lifespan_heading = content.find('span', {'id': 'Lifespan'})
        cultural_significance_heading = content.find('span', {'id': 'Cultural_significance'})

        if appearance_heading:
            description.append(appearance_heading.find_next('p').get_text())
        if temperament_heading:
            description.append(temperament_heading.find_next('p').get_text())
        if lifespan_heading:
            description.append(lifespan_heading.find_next('p').get_text())
        if cultural_significance_heading:
            description.append(cultural_significance_heading.find_next('p').get_text())

        return description
    else:
        return ["Description not found."]


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
        breed_description = scrape_dog_description(breed_name_final)
        
        if breed_description[0] == "Description not found.":
            breed_description = ["Description not found for this breed."]
        
        return jsonify({"prediction": breed_name, "description": breed_description})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
