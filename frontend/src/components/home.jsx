import React, { useEffect } from "react";
import homeImage from "../assets/home.png";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import boqueImg from "../assets/categories/Boque.jpg";
import freshFlowersImg from "../assets/categories/freshflowers.jpg";
import giftHampersImg from "../assets/categories/gifthampers.jpg";
import plantsImg from "../assets/categories/palnts.jpg";
import "../css/home.css"

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'welcome-section') {
              const title = document.getElementById('welcome-title');
              const subtitle = document.getElementById('welcome-subtitle');
              
              if (title) {
                title.classList.remove('opacity-0', '-translate-y-10', 'scale-95');
                title.classList.add('translate-y-0', 'scale-100');
              }
              
              if (subtitle) {
                subtitle.classList.remove('opacity-0', 'translate-y-10', 'scale-95');
                subtitle.classList.add('translate-y-0', 'scale-100');
              }
            }
            
            if (entry.target.id === 'categories-section') {
              const title = document.getElementById('categories-title');
              const line = document.getElementById('categories-line');
              const subtitle = document.getElementById('categories-subtitle');
              
              if (title) {
                title.classList.remove('opacity-0', '-translate-y-10', 'scale-95');
                title.classList.add('translate-y-0', 'scale-100');
              }
              
              if (line) {
                line.classList.remove('opacity-0', 'scale-x-0');
                line.classList.add('scale-x-100');
              }
              
              if (subtitle) {
                subtitle.classList.remove('opacity-0', 'translate-y-10', 'scale-95');
                subtitle.classList.add('translate-y-0', 'scale-100');
              }
            }
          }
        });
      },
      { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const sections = [
      document.getElementById('welcome-section'),
      document.getElementById('categories-section')
    ];

    sections.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Full-screen image container */}
      <div
        className="h-screen"
        style={{
          backgroundImage: `url(${homeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Flower Information Section */}
      <div className="py-16" style={{ backgroundColor: "#F8FFE5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" id="welcome-section">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 opacity-0 -translate-y-10 scale-95 transition-all duration-1000 ease-out tracking-tight" id="welcome-title">
              Welcome to BloomBliss
            </h2>
            <p className="mt-6 text-2xl md:text-3xl text-gray-500 opacity-0 translate-y-10 scale-95 transition-all duration-1000 delay-300 ease-out" id="welcome-subtitle">
              The Beauty of Flowers
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="card">
              <p style={{ backgroundImage: `url(${img1})` }}>
                <span>
                  <h3>The Language of Flowers</h3>
                  <p>Discover the hidden meanings behind every petal. From roses that whisper love to lilies that express purity — flowers speak a timeless language.</p>
                </span>
              </p>
              <p style={{ backgroundImage: `url(${img2})` }}>
                <span>
                  <h3>Petals with Purpose</h3>
                  <p>Our blooms aren't just beautiful — they’re handpicked to brighten moments, celebrate milestones, and say what words sometimes can’t.</p>
                </span>
              </p>
              <p style={{ backgroundImage: `url(${img3})` }}>
                <span>
                  <h3>Crafted by Nature, Styled by Us</h3>
                  <p>Each arrangement is a blend of nature’s finest and our florists’ creative touch. Designed to inspire, comfort, and connect.</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 opacity-0 -translate-y-10 scale-95 transition-all duration-1000 ease-out" id="categories-title">
              Our Categories
            </h2>
            <div className="w-24 h-1 bg-[#06D6A0] mx-auto mb-8 opacity-0 scale-x-0 transition-all duration-1000 delay-200 ease-out" id="categories-line"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto opacity-0 translate-y-10 scale-95 transition-all duration-1000 delay-300 ease-out" id="categories-subtitle">
              Explore our carefully curated collection of floral arrangements for every occasion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="h-96 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 relative group">
              <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h3 className="text-2xl font-bold mb-2">Bouquets</h3>
                <p className="text-sm text-center px-4">Handcrafted arrangements for every occasion</p>
              </div>
              <img 
                src={boqueImg} 
                alt="Bouquet" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-96 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 relative group">
              <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h3 className="text-2xl font-bold mb-2">Fresh Flowers</h3>
                <p className="text-sm text-center px-4">Daily fresh cuts for natural beauty</p>
              </div>
              <img 
                src={freshFlowersImg} 
                alt="Fresh Flowers" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-96 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 relative group">
              <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h3 className="text-2xl font-bold mb-2">Gift Hampers</h3>
                <p className="text-sm text-center px-4">Curated gifts with floral elegance</p>
              </div>
              <img 
                src={giftHampersImg} 
                alt="Gift Hampers" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-96 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 relative group">
              <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h3 className="text-2xl font-bold mb-2">Plants</h3>
                <p className="text-sm text-center px-4">Long-lasting green companions</p>
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
    </div>
  );
}

export default Home;
