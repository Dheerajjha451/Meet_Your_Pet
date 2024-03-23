import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'; 

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [containerWidth, setContainerWidth] = useState('400px');
  const [containerHeight, setContainerHeight] = useState('400px');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
      setUploaded(true);

      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        setContainerWidth(`${img.width}px`);
        setContainerHeight(`${img.height}px`);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4" style={{ width: containerWidth, height: containerHeight }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="max-w-full max-h-full object-contain"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          ) : (
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-customBlue text-white px-4 py-2 rounded flex items-center"
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              Upload Image
            </label>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
      </div>
      {uploaded && (
        <div className="text-center">
          <button className="bg-customButton text-customBlue px-4 py-2 rounded mb-4">
            Know About Me
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
