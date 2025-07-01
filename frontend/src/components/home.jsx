import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/home.png";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import boqueImg from "../assets/categories/Boque.jpg";
import freshFlowersImg from "../assets/categories/freshflowers.jpg";
import giftHampersImg from "../assets/categories/gifthampers.jpg";
import plantsImg from "../assets/categories/palnts.jpg";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaChevronDown,
} from "react-icons/fa";
import "../css/home.css";
import { getAllFlowers } from "../services/flowerervices";
import { getusercount } from "../services/authservices";

function Home() {
  const navigate = useNavigate();
  const [displayUserCount, setDisplayUserCount] = useState(0);
  const [flowerCount, setFlowerCount] = useState(0);
  const [actualFlowerCount, setActualFlowerCount] = useState(0);

  const fetchFlowerscount = React.useCallback(async () => {
    try {
      const data = await getAllFlowers();
      setActualFlowerCount(data.length); // Store the actual count from database
    } catch (error) {
      console.error("Error fetching flowers count:", error);
    }
  }, []);

  const fetchUserCount = React.useCallback(async () => {
    try {
      const count = await getusercount();
      console.log("Fetched user count:", count); // For debugging
      animateCount(0, count, setDisplayUserCount);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  }, []);

  useEffect(() => {
    fetchFlowerscount();
    fetchUserCount();
  }, [fetchFlowerscount, fetchUserCount]);

  const animateCount = (start, end, setter) => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = (end - start) / steps;
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setter(end);
        clearInterval(timer);
      } else {
        setter(Math.floor(current));
      }
    }, duration / steps);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "welcome-section") {
              const title = document.getElementById("welcome-title");
              const subtitle = document.getElementById("welcome-subtitle");
              const counters = document.getElementById("counters-section");

              if (title) {
                title.classList.remove(
                  "opacity-0",
                  "-translate-y-10",
                  "scale-95"
                );
                title.classList.add("translate-y-0", "scale-100");
              }

              if (subtitle) {
                subtitle.classList.remove(
                  "opacity-0",
                  "translate-y-10",
                  "scale-95"
                );
                subtitle.classList.add("translate-y-0", "scale-100");
              }

              if (counters) {
                counters.classList.remove(
                  "opacity-0",
                  "translate-y-10",
                  "scale-95"
                );
                counters.classList.add("translate-y-0", "scale-100");
                // Start the counter animations
                fetchUserCount();
                animateCount(0, actualFlowerCount, setFlowerCount);
              }
            }

            if (entry.target.id === "categories-section") {
              const title = document.getElementById("categories-title");
              const line = document.getElementById("categories-line");
              const subtitle = document.getElementById("categories-subtitle");

              if (title) {
                title.classList.remove(
                  "opacity-0",
                  "-translate-y-10",
                  "scale-95"
                );
                title.classList.add("translate-y-0", "scale-100");
              }

              if (line) {
                line.classList.remove("opacity-0", "scale-x-0");
                line.classList.add("scale-x-100");
              }

              if (subtitle) {
                subtitle.classList.remove(
                  "opacity-0",
                  "translate-y-10",
                  "scale-95"
                );
                subtitle.classList.add("translate-y-0", "scale-100");
              }
            }

            if (entry.target.id === "get-started-section") {
              const title = entry.target.querySelector("h1");
              const description = entry.target.querySelector("p");
              const button = entry.target.querySelector("button");

              if (title) {
                title.classList.remove("opacity-0", "-translate-y-10");
                title.classList.add("opacity-100", "translate-y-0");
              }

              if (description) {
                description.classList.remove("opacity-0", "translate-y-10");
                description.classList.add("opacity-100", "translate-y-0");
              }

              if (button) {
                button.classList.remove("opacity-0", "translate-y-10");
                button.classList.add("opacity-100", "translate-y-0");
              }
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const sections = [
      document.getElementById("welcome-section"),
      document.getElementById("categories-section"),
      document.getElementById("get-started-section"), // Add new section
    ];

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [actualFlowerCount, fetchUserCount]); // Added dependencies

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Full-screen image container */}
      <div
        className="h-screen relative"
        style={{
          backgroundImage: `url(${homeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Scroll Down Button */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => {
            const contentSection = document.getElementById("welcome-section");
            if (contentSection) {
              contentSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <div className="animate-bounce flex flex-col items-center text-white">
            <FaChevronDown size={24} className="text-[#06D6A0] mb-2" />
            <FaChevronDown
              size={24}
              className="text-[#06D6A0] -mt-4 opacity-70"
            />
          </div>
        </div>
      </div>

      {/* Flower Information Section */}
      <div className="py-16" style={{ backgroundColor: "#F8FFE5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" id="welcome-section">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 opacity-0 -translate-y-10 scale-95 transition-all duration-1000 ease-out tracking-tight"
              id="welcome-title"
            >
              Welcome to BloomBliss
            </h2>
            <p
              className="mt-6 text-2xl md:text-3xl text-gray-500 opacity-0 translate-y-10 scale-95 transition-all duration-1000 delay-300 ease-out"
              id="welcome-subtitle"
            >
              The Beauty of Flowers
            </p>
            <div
              id="counters-section"
              className="mt-12 grid grid-cols-2 gap-8 max-w-2xl mx-auto opacity-0 translate-y-10 scale-95 transition-all duration-1000 delay-500 ease-out"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-[#06D6A0]">
                  {displayUserCount}+
                </div>
                <div className="text-gray-600 mt-2">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#06D6A0]">
                  {flowerCount}+
                </div>
                <div className="text-gray-600 mt-2">Fresh Flowers</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="card">
              <p style={{ backgroundImage: `url(${img1})` }}>
                <span>
                  <h3>The Language of Flowers</h3>
                  <p>
                    Discover the hidden meanings behind every petal. From roses
                    that whisper love to lilies that express purity — flowers
                    speak a timeless language.
                  </p>
                </span>
              </p>
              <p style={{ backgroundImage: `url(${img2})` }}>
                <span>
                  <h3>Petals with Purpose</h3>
                  <p>
                    Our blooms aren't just beautiful — they’re handpicked to
                    brighten moments, celebrate milestones, and say what words
                    sometimes can’t.
                  </p>
                </span>
              </p>
              <p style={{ backgroundImage: `url(${img3})` }}>
                <span>
                  <h3>Crafted by Nature, Styled by Us</h3>
                  <p>
                    Each arrangement is a blend of nature’s finest and our
                    florists’ creative touch. Designed to inspire, comfort, and
                    connect.
                  </p>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Categories Section */}
      <div className="py-20" style={{ backgroundColor: "#F8FFE5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" id="categories-section">
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 opacity-0 -translate-y-10 scale-95 transition-all duration-1000 ease-out"
              id="categories-title"
            >
              Our Categories
            </h2>
            <div
              className="w-24 h-1 bg-[#06D6A0] mx-auto mb-8 opacity-0 scale-x-0 transition-all duration-1000 delay-200 ease-out"
              id="categories-line"
            ></div>
            <p
              className="text-xl text-gray-600 max-w-2xl mx-auto opacity-0 translate-y-10 scale-95 transition-all duration-1000 delay-300 ease-out"
              id="categories-subtitle"
            >
              Explore our carefully curated collection of floral arrangements
              for every occasion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              onClick={() =>
                navigate("/shop", { state: { category: "Bouquets" } })
              }
              className="cursor-pointer h-96 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 relative group"
            >
              <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h3 className="text-2xl font-bold mb-2">Bouquets</h3>
                <p className="text-sm text-center px-4">
                  Handcrafted arrangements for every occasion
                </p>
              </div>
              <img
                src={boqueImg}
                alt="Bouquet"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              onClick={() =>
                navigate("/shop", { state: { category: "Fresh Flowers" } })
              }
              className="cursor-pointer h-96 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 relative group"
            >
              <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h3 className="text-2xl font-bold mb-2">Fresh Flowers</h3>
                <p className="text-sm text-center px-4">
                  Daily fresh cuts for natural beauty
                </p>
              </div>
              <img
                src={freshFlowersImg}
                alt="Fresh Flowers"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              onClick={() =>
                navigate("/shop", { state: { category: "Gift Hampers" } })
              }
              className="cursor-pointer h-96 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 relative group"
            >
              <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h3 className="text-2xl font-bold mb-2">Gift Hampers</h3>
                <p className="text-sm text-center px-4">
                  Curated gifts with floral elegance
                </p>
              </div>
              <img
                src={giftHampersImg}
                alt="Gift Hampers"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              onClick={() => navigate("/shop", { state: { category: "Plants" } })}
              className="cursor-pointer h-96 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 relative group"
            >
              <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h3 className="text-2xl font-bold mb-2">Plants</h3>
                <p className="text-sm text-center px-4">
                  Long-lasting green companions
                </p>
              </div>
              <img
                src={plantsImg}
                alt="Plants"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Let's get started section */}
      <section id="get-started-section" className="py-6 bg-[#F8FFE5] text-gray-900">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
          <h1 className="text-5xl font-bold leading-none text-center opacity-0 -translate-y-10 transition-all duration-1000 ease-out">
            Brighten Someone's Day with Blooms
          </h1>
          <p className="pt-2 pb-8 text-xl font-medium text-center opacity-0 translate-y-10 transition-all duration-1000 delay-200 ease-out">
            Discover the perfect bouquet for every occasion — from birthdays and
            anniversaries to everyday smiles. Fresh flowers, handcrafted with
            love, delivered to your door.
          </p>
          <button
            onClick={handleGetStarted}
            className="cursor-pointer group relative bg-[#06D6A0] hover:bg-[#05bf8f] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-1000 delay-400 ease-out opacity-0 translate-y-10 shadow hover:shadow-lg w-40 h-12"
          >
            <div className="relative flex items-center justify-center gap-2">
              <span className="relative inline-block overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  Get Started
                </span>
                <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                  Right Now
                </span>
              </span>

              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                viewBox="0 0 24 24"
              >
                <circle fill="currentColor" r="11" cy="12" cx="12"></circle>
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="white"
                  d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#06D6A0]">
                BloomBliss
              </h3>
              <p className="text-gray-400 text-sm leading-loose">
                Bringing nature's beauty to your doorstep. We specialize in
                creating memorable moments through our stunning floral
                arrangements.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#06D6A0]">
                Quick Links
              </h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#06D6A0] transition-colors duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#06D6A0] transition-colors duration-300"
                  >
                    Our Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#06D6A0] transition-colors duration-300"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#06D6A0] transition-colors duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#06D6A0]">
                Contact Us
              </h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>123 Flower Street</li>
                <li>Garden City, GC 12345</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: hello@bloombliss.com</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#06D6A0]">
                Newsletter
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to receive updates and special offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-[#06D6A0] flex-grow"
                />
                <button className="bg-[#06D6A0] px-4 py-2 rounded-r hover:bg-[#05bf8f] transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} BloomBliss. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#06D6A0] transition-colors duration-300"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#06D6A0] transition-colors duration-300"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#06D6A0] transition-colors duration-300"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#06D6A0] transition-colors duration-300"
                >
                  <FaPinterest size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
