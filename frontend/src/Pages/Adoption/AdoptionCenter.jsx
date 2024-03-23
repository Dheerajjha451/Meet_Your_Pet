import { useState, useEffect } from 'react';
import axios from 'axios';

const AdoptionCentersPage = () => {
  const [adoptionCenters, setAdoptionCenters] = useState([]);

  useEffect(() => {
    fetchAdoptionCenters();
  }, []);

  const fetchAdoptionCenters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/adoption-centers');
      setAdoptionCenters(response.data);
    } catch (error) {
      console.error('Error fetching adoption centers:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Adoption Centers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {adoptionCenters.map((center, index) => (
          <div key={index} className="border p-4">
            <h2 className="text-lg font-semibold mb-2">{center.name}</h2>
            <p><strong>Location:</strong> {center.location}</p>
            <p><strong>Contact:</strong> {center.contact}</p>
            <h3 className="text-lg font-semibold mt-4 mb-2">Dogs Available</h3>
            <ul>
              {center.dogs.map((dog, dogIndex) => (
                <li key={dogIndex}>{dog.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdoptionCentersPage;
