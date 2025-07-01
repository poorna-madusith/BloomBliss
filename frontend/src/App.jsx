import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/signup'
import Login from './components/login'
import Profile from './components/profile'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Home from './components/home'
import FlowersPage from './components/flowersPage'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import OrderSuccess from './components/OrderSuccess'
import AboutUs from './components/aboutus'
import { CartProvider } from './context/CartProvider.jsx'
import { useCart } from './context/useCart';

function NavbarContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isShopPage = location.pathname === '/shop';
  const { cartItems } = useCart();
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo on the left */}
          <div className="w-1/4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src="/logo.webp" alt="BloomBliss Logo" className="h-12" />
              </Link>
            </div>
          </div>
          {/* Navigation links in the center */}
          <div className="w-2/4 flex justify-center">
            <div className="hidden md:flex items-center justify-center space-x-12">
              <Link to="/home" className="py-2 font-medium px-3 text-gray-700 hover:text-[#06D6A0] transition duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#06D6A0] after:left-1/2 after:-translate-x-1/2 after:-bottom-0.5 after:transition-all after:duration-500 hover:after:w-full">Home</Link>
              <Link to="/shop" className="py-2 font-medium px-3 text-gray-700 hover:text-[#06D6A0] transition duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#06D6A0] after:left-1/2 after:-translate-x-1/2 after:-bottom-0.5 after:transition-all after:duration-500 hover:after:w-full">Shop</Link>
              <Link to="/about" className="py-2 font-medium px-3 text-gray-700 hover:text-[#06D6A0] transition duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#06D6A0] after:left-1/2 after:-translate-x-1/2 after:-bottom-0.5 after:transition-all after:duration-500 hover:after:w-full">About Us</Link>
            </div>
          </div>
          {/* Profile button on the right */}
          <div className="w-1/4 flex justify-end space-x-4">
            {isShopPage && (
              <div className="hidden md:block relative">
                <Link to="/cart" className="py-2 px-3 text-gray-700 hover:text-[#06D6A0] transition duration-300">
                  <ShoppingCartIcon fontSize="large" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#06D6A0] text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] h-[20px] flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            )}
            <div className="hidden md:block">
              <Link to="/profile" className="py-2 px-3 text-gray-700 hover:text-[#06D6A0] transition duration-300">
                <AccountCircleOutlinedIcon fontSize="large" />
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMobileMenu}
                className="outline-none mobile-menu-button">
                <svg className="w-6 h-6 text-gray-500 hover:text-[#06D6A0]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <ul className="pt-4 pb-3">
          <li><Link to="/home" className="block pl-4 py-2 text-gray-700 hover:bg-pink-50">Home</Link></li>
          <li><Link to="/shop" className="block pl-4 py-2 text-gray-700 hover:bg-pink-50">Shop</Link></li>
          <li><Link to="/about" className="block pl-4 py-2 text-gray-700 hover:bg-pink-50">About Us</Link></li>
          {isShopPage && (
            <li>
              <Link to="/cart" className="block pl-4 py-2 text-gray-700 hover:bg-pink-50 flex items-center justify-between pr-4">
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="bg-[#06D6A0] text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] h-[20px] flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </li>
          )}
          <li><Link to="/profile" className="block pl-4 py-2 text-gray-700 hover:bg-pink-50">Profile</Link></li>
          <li><Link to="/login" className="block pl-4 py-2 text-gray-700 hover:bg-pink-50">Login</Link></li>
          <li><Link to="/signup" className="block pl-4 py-2 text-gray-700 hover:bg-pink-50">Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen font-[Montserrat]">
          <NavbarContent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/shop" element={<FlowersPage />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/checkout" element={<Checkout />}/>
            <Route path="/order-success" element={<OrderSuccess />}/>
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App;
