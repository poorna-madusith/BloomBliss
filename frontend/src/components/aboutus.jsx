import React, { useState } from "react";
import background from "../assets/background2.png";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);
  
  const handleGetStarted = () => {
    setIsLeaving(true);
    setTimeout(() => {
      navigate('/home');
    }, 300);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={`w-[800px] h-[500px] duration-300 group overflow-hidden relative rounded bg-[#06D6A0] text-[#F8FFE5] p-10 flex flex-col justify-between shadow-lg transform transition-all ${isLeaving ? 'opacity-0 -translate-y-6' : 'opacity-100 translate-y-0'}`}>
        <div className="absolute blur duration-500 group-hover:blur-none w-96 h-96 rounded-full group-hover:translate-x-16 group-hover:translate-y-16 bg-[#04b586] right-1 -bottom-24"></div>
        <div className="absolute blur duration-500 group-hover:blur-none w-20 h-20 rounded-full group-hover:translate-x-16 group-hover:translate-y-2 bg-[#05c193] right-16 bottom-16"></div>
        <div className="absolute blur duration-500 group-hover:blur-none w-48 h-48 rounded-full group-hover:translate-x-16 group-hover:-translate-y-16 bg-[#03a077] right-1 -top-12"></div>
        <div className="absolute blur duration-500 group-hover:blur-none w-32 h-32 bg-[#058d6c] rounded-full group-hover:-translate-x-16"></div>
        <div className="z-10 flex flex-col space-y-6 w-full h-full">
          <h1 className="text-3xl font-bold mt-2">About BloomBliss</h1>
          <p className="text-lg leading-relaxed">
            At BloomBliss, we believe flowers speak the language of the heart.
            Whether it's a celebration, a gesture of love, or simply to brighten
            someone's day, our mission is to deliver joy through beautifully
            crafted floral arrangements. Rooted in a passion for nature and
            creativity, we source only the freshest blooms and hand-arrange
            every bouquet with care. From romantic roses to cheerful sunflowers,
            elegant lilies to lush plants, every order is a promise of quality,
            beauty, and happiness. We're more than just a flower shop — we're
            your partner in making every moment memorable. Let's spread smiles,
            one petal at a time.
          </p>
          <button 
            onClick={handleGetStarted} 
            className="hover:bg-[#F8FFE5] bg-[#F8FFE5]/90 rounded text-[#06D6A0] font-extrabold w-full p-4 text-lg mt-auto transition-all duration-300 transform active:scale-95 hover:shadow-md hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
