import { useEffect, useState } from "react";
import { getAllFlowers, getCategories } from "../services/flowerervices";
import background2 from "../assets/background2.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const FlowersPage = () => {
  const [flowers, setFlowers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState({});

  const fetchFlowers = async () => {
    try {
      const data = await getAllFlowers();
      setFlowers(data);
      // Initialize quantities state for each flower
      const initialQuantities = {};
      data.forEach((flower) => {
        initialQuantities[flower._id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching flowers:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchFlowers();
    fetchCategories();
  }, []);

  const handleQuantityChange = (flowerId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [flowerId]: Math.max(1, Math.min(value, 10)), // Limit between 1 and 10
    }));
  };

  const filteredFlowers = selectedCategory === 'all'
    ? flowers
    : flowers.filter(flower => flower.category._id === parseInt(selectedCategory));

  return (
    <div
      className="min-h-screen w-full pt-24"
      style={{
        backgroundImage: `url(${background2})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg">
          Our Beautiful Flowers
        </h1>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full shadow-lg p-2 flex gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-[#06D6A0] text-white shadow-md scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Flowers
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id.toString())}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id.toString()
                    ? 'bg-[#06D6A0] text-white shadow-md scale-105'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          {filteredFlowers.map((flower) => (
            <div
              key={flower._id}
              className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="w-full h-72 object-cover"
                />
                <span className="absolute top-4 right-4 text-sm font-medium text-white px-3 py-1 bg-[#06D6A0] rounded-full shadow-md">
                  {flower.category.name}
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {flower.name}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {flower.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-[#06D6A0]">
                    ₹{flower.price}
                  </span>
                  <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
                    <button
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors border-r"
                      onClick={() =>
                        handleQuantityChange(
                          flower._id,
                          quantities[flower._id] - 1
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={quantities[flower._id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          flower._id,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-14 text-center focus:outline-none font-medium"
                    />
                    <button
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors border-l"
                      onClick={() =>
                        handleQuantityChange(
                          flower._id,
                          quantities[flower._id] + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="w-full bg-[#06D6A0] hover:bg-[#05bf8f] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                  <ShoppingCartIcon className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowersPage;
