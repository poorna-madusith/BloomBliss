import { useEffect, useState } from "react";
import { getAllFlowers, getCategories } from "../services/flowerervices";
import background2 from "../assets/background2.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation } from "react-router-dom";

const FlowersPage = () => {
  const location = useLocation();
  const [flowers, setFlowers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchFlowers = async () => {
    try {
      const data = await getAllFlowers();
      console.log('Fetched flowers:', data);
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
      console.log('Fetched categories:', data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchFlowers();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Set the selected category from navigation state if it exists
    if (location.state?.category) {
      console.log('Setting category from navigation:', location.state.category);
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  const handleQuantityChange = (flowerId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [flowerId]: Math.max(1, Math.min(value, 10)), // Limit between 1 and 10
    }));
  };

  const filteredFlowers = selectedCategory === 'all'
    ? flowers
    : flowers.filter(flower => flower.category.name === selectedCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredFlowers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFlowers = filteredFlowers.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the flowers section smoothly
    document.getElementById('flowers-section').scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    console.log('Current selected category:', selectedCategory);
    const filtered = selectedCategory === 'all'
      ? flowers
      : flowers.filter(flower => flower.category.name === selectedCategory);
    console.log('Filtered flowers:', filtered);
  }, [selectedCategory, flowers]);

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
          <div className="bg-white rounded-full shadow-lg p-2 flex gap-2 flex-wrap justify-center">
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
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-[#06D6A0] text-white shadow-md scale-105'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Flowers Grid */}
        <div id="flowers-section" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          {paginatedFlowers.map((flower) => (
            <div
              key={flower._id}
              className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={flower.image}
                  alt={flower.name}
                  className={`w-full h-72 object-cover transition-all duration-300 ${
                    flower.quantity === 1 ? 'brightness-50' : ''
                  }`}
                />
                <span className="absolute top-4 right-4 text-sm font-medium text-white px-3 py-1 bg-[#06D6A0] rounded-full shadow-md z-10">
                  {flower.category.name}
                </span>
                {flower.quantity === 1 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
                    <span className="bg-red-500/80 px-6 py-3 rounded-lg text-lg font-bold tracking-wider transform -rotate-12 shadow-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
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
                  <div className={`flex items-center border rounded-lg overflow-hidden shadow-sm ${
                    flower.quantity === 1 ? 'opacity-50' : ''
                  }`}>
                    <button
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors border-r"
                      onClick={() =>
                        handleQuantityChange(
                          flower._id,
                          quantities[flower._id] - 1
                        )
                      }
                      disabled={flower.quantity === 1}
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
                      disabled={flower.quantity === 1}
                    />
                    <button
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors border-l"
                      onClick={() =>
                        handleQuantityChange(
                          flower._id,
                          quantities[flower._id] + 1
                        )
                      }
                      disabled={flower.quantity === 1}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  className={`w-full font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    flower.quantity === 1 
                    ? 'bg-gray-400 cursor-not-allowed opacity-60' 
                    : 'bg-[#06D6A0] hover:bg-[#05bf8f] text-white'
                  }`}
                  disabled={flower.quantity === 1}
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  {flower.quantity === 1 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full transition-all duration-300 ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-[#06D6A0] hover:text-white'
              }`}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-full transition-all duration-300 ${
                  currentPage === index + 1
                    ? 'bg-[#06D6A0] text-white shadow-md scale-105'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full transition-all duration-300 ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-[#06D6A0] hover:text-white'
              }`}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowersPage;
