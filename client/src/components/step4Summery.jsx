import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Step4Summary() {
  const navigate = useNavigate();

  // Dummy data for now; replace with props or context if needed
  const [data] = useState({
    username: "JohnDoe",
    gender: "Male",
    profession: "Developer",
    companyName: "Tech Inc.",
    addressLine1: "123 Main St",
    country: "USA",
    state: "California",
    city: "Los Angeles",
    subscriptionPlan: "Pro",
    newsletter: true
  });

  const handlePrevious = () => navigate("/step3");
  const handleFinish = () => navigate("/success");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Review Your Details</h2>

      <div className="grid grid-cols-1 gap-2 p-4 border border-gray-300 rounded">
        <p><strong>Username:</strong> {data.username}</p>
        <p><strong>Gender:</strong> {data.gender}</p>
        <p><strong>Profession:</strong> {data.profession}</p>
        {data.profession === "Entrepreneur" && (
          <p><strong>Company:</strong> {data.companyName}</p>
        )}
        <p><strong>Address:</strong> {data.addressLine1}</p>
        <p><strong>Country:</strong> {data.country}</p>
        <p><strong>State:</strong> {data.state}</p>
        <p><strong>City:</strong> {data.city}</p>
        <p><strong>Plan:</strong> {data.subscriptionPlan}</p>
        <p><strong>Newsletter:</strong> {data.newsletter ? "Yes" : "No"}</p>
      </div>

      {/* ✅ Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleFinish}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
