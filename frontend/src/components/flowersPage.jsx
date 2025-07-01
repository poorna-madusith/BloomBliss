import { useEffect, useState } from "react";
import { getAllFlowers } from "../services/flowerervices";

const FlowersPage = () => {
  const [flowers, setFlowers] = useState([]);

  const fetchFlowers = async () => {
    try {
      const data = await getAllFlowers();
      setFlowers(data);
    } catch (error) {
      console.error("Error fetching flowers:", error);
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flowers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {flowers.map((flower) => (
          <div key={flower._id} className="border rounded-lg p-4">
            <img
              src={flower.image}
              alt={flower.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{flower.name}</h2>
            <p>{flower.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowersPage;
