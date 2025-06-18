import React from "react";
import { useNavigate } from "react-router-dom";
import { blogsData } from "../Data/Data";
import usefetch from "../hook/usefetch"; // Custom hook to fetch API data

const Blogs = () => {
  const navigate = useNavigate(); // Initialize navigation

  // Custom function to go to the "Read More" page
  const handleReadmore = (id) => {
    navigate(`/readmore/${id}`);
  };

  const gotoCreatePost = () => {
    navigate("/createablogs");
  };

  // Use the custom hook to get posts from an API
  const [posts, loading, error] = usefetch("http://localhost:3000/post");

  return (
    <div className="bg-[#cbd5e1] min-h-screen py-20 overflow-x-hidden mt-[5rem]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-white mb-10">
          BLOGS
        </h1>
        <hr className="border-2 border-white mx-auto mb-8 hidden lg:block" />
        <p className="text-xl text-white mb-6 ml-4">Top articles</p>

        {/* Static Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogsData.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{blog.description}</p>
              <button
                onClick={() => handleReadmore(blog.id)}
                className="text-blue-600 hover:underline text-sm"
              >
                Read more →
              </button>
            </div>
          ))}
        </div>

        {/* API Fetched Blogs */}
        <div className="mt-10 px-2">
          <h2 className="text-white text-2xl font-semibold mb-4">Fetched Blogs</h2>

          {/* Show loading or error messages */}
          {loading && <p className="text-blue-400">Loading blogs...</p>}
          {error && <p className="text-red-400">{error.message}</p>}

          {/* Display fetched posts */}
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-lg shadow-md p-4 mb-6"
            >
              <p className="font-bold">ID: {post.id}</p>
              <p className="font-semibold">Title: {post.title}</p>
              <p className="mb-2">Content: {post.content}</p>

              {/* Images from API post */}
              {post.image && post.image.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {post.image.map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:3000/${img}`}
                      alt={`Post ${post.id}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No Image Available</p>
              )}
            </div>
          ))}
        </div>

        {/* Create Blog Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={gotoCreatePost}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm"
          >
            Create a blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
