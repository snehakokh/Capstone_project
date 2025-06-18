import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME } from "../Data/Data"; // Article data

const Home = () => {
  const navigate = useNavigate();

  // Navigate to the AI chatbot page
  const goToChatbot = () => {
    navigate("/ai");
  };

  // Navigate to the quiz page
  const goToQuiz = () => {
    navigate("/quiz");
  };

  const goToTherapist = () => {
    navigate("/therapist");
  };

  // Navigate to full article page
  const handleReadmore = (id) => {
    console.log("Navigating to id:", id);
    navigate(`/readmore/${id}`);
  };

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden mt-[5rem]">
      {/* Hero Section */}
      <div
        className="flex flex-col lg:flex-row-reverse lg:gap-40 items-center justify-center w-full py-12 px-4 gap-6 bg-[#b2c5e5] md:flex-row md:py-16 md:px-8 lg:px-16 max-w-screen overflow-x-hidden"
        data-aos="zoom-out"
        data-aos-duration="500"
        data-aos-once="true"
      >
        <img
          src="homeimage.png"
          className="rounded-md w-full max-w-sm sm:max-w-md lg:max-w-lg"
          alt="Empower Your Mind"
        />
        <div className="flex flex-col items-center md:items-start md:max-w-[50%]">
          <h2 className="text-2xl font-bold text-center md:text-left md:text-3xl lg:text-4xl">
            Empower Your Mind,
            <br />
            One Step at a Time
          </h2>
          <button
            onClick={goToTherapist}
            className="bg-[#f6ca56] w-full max-w-[300px] h-[40px] rounded-[10px] mt-4 hover:bg-[#e5b945] transition-colors"
          >
            Find the therapist
          </button>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="flex flex-col items-center text-center w-full px-4 py-12 md:px-8 md:py-16  lg:bg-white">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-[800px]">
          Your journey to a brighter mind starts here.
        </h2>
        <p className="text-xl md:text-2xl mt-4 max-w-[800px]">
          Take our free mental health quiz and get matched with the right
          therapist.
        </p>
        <button
          onClick={goToQuiz}
          className="bg-[#f6ca56] hover:bg-[#e5b945] mt-6 w-full max-w-[300px] h-[40px] rounded-[10px]"
        >
          Take free quiz
        </button>
      </div>

      {/* Articles Section */}
      <div className="flex flex-col items-center w-full px-4 py-12 md:px-8 md:py-16 bg-[#bcccdc]">
        <h3 className="text-xl md:text-2xl font-bold mb-8">Latest Articles</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px]">
          {HOME.map((article) => (
            <Link
              key={article.id}
              to={`/blogs/${article.id}`}
              className="bg-white p-4 rounded-[10px] hover:shadow-lg transition-shadow"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto rounded-[8px]"
              />
              <h4 className="text-lg font-bold mt-4">{article.title}</h4>
              <p className="text-sm mt-2">{article.description}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleReadmore(article.id);
                }}
                className="text-sm mt-4 text-blue-600 hover:underline"
              >
                Read more →
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Chatbot Section */}
      <div className="flex flex-col items-center w-full px-4 py-12 md:px-8 md:py-16 bg-white">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center max-w-[800px]">
          A chatbot with a listening ear for your feelings.
        </h2>
        <p className="text-lg md:text-xl mt-4 text-center max-w-[800px]">
          Share your thoughts and let us help guide you through tough moments.
        </p>
        <button
          onClick={goToChatbot}
          className="bg-[#f6ca56] hover:bg-[#e5b945] mt-6 w-full max-w-[300px] h-[40px] rounded-[10px]"
        >
          Start chatting
        </button>
      </div>

      {/* Footer Spacing */}
      <div className="bg-[#bcccdc] h-20 w-full"></div>
    </div>
  );
};

export default Home;
