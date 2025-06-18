import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { therapists } from "../Data/Data"; // List of therapist data
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { HiCalendarDateRange } from "react-icons/hi2";

const Userview = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // Hook for navigation

  // Find the therapist with the matching ID
  const selectedTherapist = therapists.find((therapist) => therapist.id.toString() === id);

  // If therapist is not found
  if (!selectedTherapist) {
    return <div className="p-10 text-center">Therapist not found</div>;
  }

  // Navigate to the detailed profile
  const goToProfile = () => {
    navigate(`/userprofile/${selectedTherapist.id}`);
  };

  return (
    <div className="bg-[#d1dbe7] min-h-screen px-4 py-8 flex flex-col items-center mt-[5rem]">
      {/* Profile Info */}
      <div
        onClick={goToProfile}
        className="bg-white rounded-xl shadow-md p-6 mb-8 w-full max-w-4xl cursor-pointer"
      >
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <img
            src={selectedTherapist.imageUrl}
            alt={selectedTherapist.name}
            className="w-32 h-32 lg:w-60 lg:h-60 rounded-full object-cover"
          />
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">{selectedTherapist.name}</h2>
            <p className="text-sm text-gray-500">Member since January 2020</p>
            <p className="font-semibold mt-2">Mental Health Consultant</p>
            <p className="text-gray-700 mt-2">{selectedTherapist.description}</p>
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-4">Ratings</h3>
        <div className="space-y-4">
          <div>
            <p className="text-yellow-500 text-lg">★★★★☆</p>
            <p className="text-gray-700">"Helped me manage my anxiety!" - Client</p>
          </div>
          <div>
            <p className="text-yellow-500 text-lg">★★★☆☆</p>
            <p className="text-gray-700">"Very understanding and kind." - Client</p>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-4">Availability & Contact</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <HiCalendarDateRange className="bg-yellow-400 rounded-full h-10 w-10 p-1" />
            <p><strong>Sessions:</strong> Sun, Tue, Thu (8:00 AM - 4:00 PM)</p>
          </div>
          <div className="flex items-start gap-3">
            <IoLocationOutline className="bg-yellow-400 rounded-full h-10 w-10 p-1" />
            <p><strong>Location:</strong> Kathmandu</p>
          </div>
          <div className="flex items-start gap-3">
            <IoCallOutline className="bg-yellow-400 rounded-full h-10 w-10 p-1" />
            <p><strong>Phone:</strong> 980754858</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userview;
