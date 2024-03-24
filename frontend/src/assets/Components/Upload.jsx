import  { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'; 

function UploadImage() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [description, setDescription] = useState(null);
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

      const response = await fetch("http://localhost:5000/predict", {
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
  
      if (data.description && Array.isArray(data.description)) {
        setDescription(data.description.join("\n"));
      } else {
        console.error("Unexpected format for description: ", data.description);
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
            className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded flex items-center justify-center"
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
          <ul className="mx-4 text-customBlue">
            {description.split("\n").map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadImage;
