import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Step2ProfessionalDetails() {
  const navigate = useNavigate();

  const [profession, setProfession] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");

  // Handlers
  const handleNext = () => {
    navigate("/step3");
  };

  const handlePrevious = () => {
    navigate("/step1");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">Profession</label>
        <select
          className="w-full p-3 border border-gray-300 rounded"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        >
          <option value="">Select your profession</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>
      </div>

      {profession === 'Entrepreneur' && (
        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
      )}

      <div>
        <label className="block mb-1 font-medium">Address Line 1</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
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
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
