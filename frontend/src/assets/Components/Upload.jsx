import React, { useState } from "react";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [description, setDescription] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.prediction);
      setDescription(data.description.join("\n"));
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {prediction && <p>Prediction: {prediction}</p>}
      {description && (
        <div>
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}

export default UploadImage;
