import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'; 
import dogDescriptions from '../../../dog_descriptions.json';
import adoptionCentersData from '../../../adoption_center.json';

function UploadImage() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [description, setDescription] = useState(null);
  const [adoptionCenter, setAdoptionCenter] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleKnowAboutMe = async () => {
    if (!file) {
      console.error("No file uploaded");
      return;
    }
  
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("https://backendmyp.onrender.com/predict", {
        method: "POST",
        body: formData,
      });    

      if (!response.ok) {
        console.error("Server response was not ok", response);
        return;
      }
  
      const data = await response.json();
      const breedName = data.prediction.split("-")[1]; 
      setPrediction(breedName);
  
      const breedDescription = dogDescriptions[breedName];
      if (breedDescription) {
        setDescription(breedDescription);
      } else {
        console.error("Description not found for breed: ", breedName);
      }

      const availableCenters = adoptionCentersData.filter(center => center.Pets.some(pet => pet['Dog Breed'] === breedName));
      if (availableCenters.length > 0) {
        setAdoptionCenter(availableCenters);
      } else {
        console.log("No adoption centers found for this breed.");
        setAdoptionCenter([]); 
      }
    } catch (error) {
      console.error("Error predicting: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mb-4">
        {!file ? (
          <label
            htmlFor="image-upload"
            className="cursor-pointer bg-customBlue text-white px-4 py-2 rounded flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faUpload} className="mr-4" />
            Upload Image
          </label>
        ) : (
          <img src={URL.createObjectURL(file)} alt="Uploaded" className="max-w-full max-h-full object-contain" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
      </div>
      {file && (
        <div className="text-center">
          <button onClick={handleKnowAboutMe} className="bg-customButton text-customBlue px-4 py-2 rounded mb-4" disabled={loading}>
            {loading ? "Loading..." : "Know About Me"}
          </button>
          <button onClick={() => window.location.reload()} className="bg-slate-50 text-customBlue px-4 py-2 rounded mb-4 ml-4">
            Upload New Image
          </button>
        </div>
      )}
      {prediction && (
        <div>
          <h3 className="font-bold text-4xl text-slate-950 mx-4">Prediction:</h3>
          <p className="text-customBlue mx-4 ">{prediction}</p>
        </div>
      )}
      {description && (
        <div>
          <h3 className="font-bold text-3xl mx-4 text-slate-950">Description:</h3>
          <p className="mx-4 text-customBlue">{description}</p>
        </div>
      )}
      {adoptionCenter && adoptionCenter.length > 0 && (
        <div>
          <h3 className="font-bold text-3xl mx-4 text-slate-950 text-center">Available at Adoption Center</h3>
          <ul className="mx-4">
            {adoptionCenter.map((center, index) => (
              <li key={index}>
                <div className="text-black ">NGO Name: {center['NGO Name']}</div>
                <div className="text-black ">NGO Details: {center['NGO Details']}</div>
                <div className="text-black ">Contact Details: {center['contact']}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {adoptionCenter && adoptionCenter.length === 0 && (
        <div className="text-center text-customBlue mx-4 font-bold">Currently not present at any adoption center.</div>
      )}
    </div>
  );
}

export default UploadImage;
