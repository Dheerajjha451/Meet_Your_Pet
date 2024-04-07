import { useState, useEffect } from 'react';
import adoptionCentersData from '../../../adoption_center.json'

const AdoptionCenters = () => {
  const [adoptionCenters, setAdoptionCenters] = useState([]);

  useEffect(() => {
    setAdoptionCenters(adoptionCentersData);
  }, []);

  const renderCard = (center, index) => {
    return (
      <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg border hover:shadow-2xl transition duration-300">
        <div className="flex justify-center items-center h-72">
          <img src={center['NGO Photo']} alt={center['NGO Name']} className="h-full" />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-customBlue">NGO Name: {center['NGO Name']}</div>
          <p className="text-gray-700 text-base mb-2"><strong>NGO Details:</strong> {center['NGO Details']}</p>
          <p className="text-gray-700 text-base mb-2"><strong>Contact Details:</strong> {center['contact']}</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Dogs Available</h3>
          <ul>
            {center.Pets.map((dog, dogIndex) => (
              <li key={dogIndex}>{dog['Dog Breed']}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8 text-customBlue">Adoption Centers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {adoptionCenters.map(renderCard)}
      </div>
    </div>
  );
};

export default AdoptionCenters;
