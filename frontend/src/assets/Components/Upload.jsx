import React, { useState } from "react";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    console.log(formData);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      console.log(response);

      const data = await response.json();
      console.log(data);
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  console.log(prediction);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default UploadImage;
