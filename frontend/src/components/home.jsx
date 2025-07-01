import React from "react";
import homeImage from "../assets/home.png";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import "../css/home.css"

function Home() {
  

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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Welcome to BloomBliss
            </h2>
            <p className="mt-4 text-xl text-gray-500">The Beauty of Flowers</p>
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
    </div>
  );
}

export default Home;
