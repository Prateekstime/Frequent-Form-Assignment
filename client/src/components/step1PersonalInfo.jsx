import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

export default function Step1PersonalInfo() {
  const navigate = useNavigate(); // ✅ hook for navigation

  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [username, setUsername] = useState("");
  const [availabilityMsg, setAvailabilityMsg] = useState("");

  const [gender, setGender] = useState("");
  const [customGender, setCustomGender] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [strength, setStrength] = useState("");

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function checkAvailability() {
    if (username.length < 4) {
      setAvailabilityMsg("Username must be at least 4 characters");
    } else if (username === "taken") {
      setAvailabilityMsg("Username is already taken");
    } else {
      setAvailabilityMsg("Username is available ✅");
    }
  }

  function checkStrength(e) {
    const value = e.target.value;
    setNewPassword(value);
    if (value.length < 6) {
      setStrength("weak");
    } else if (value.length < 10) {
      setStrength("medium");
    } else {
      setStrength("strong");
    }
  }

  // ✅ Previous button handler with routing
  function handlePrevious() {
    navigate(-1); // go back to previous page in history
  }

  // ✅ Next button handler with routing
  function handleNext() {
    navigate("/step2"); // navigate to next step
  }

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto">
      <div className="flex flex-col">
        <div className="flex justify-center">
          <div className="justify-center">
            <label className="block mb-1 font-medium">Profile Photo</label>

            {!preview && (
              <div className="flex justify-center">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFile}
                  className="block text-transparent bg-red-800 opacity-20 h-14 w-14 rounded-full"
                />
                <h1 className="relative -bottom-6 right-4 text-3xl text-gray-500">
                  +
                </h1>
              </div>
            )}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 rounded-full mt-3 object-cover border"
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Username</label>
        <input
          className="input-style text-black w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={checkAvailability}
          placeholder="Enter username"
        />
        {availabilityMsg && (
          <p className="text-sm mt-1">{availabilityMsg}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Gender</label>
        <select
          className="input-style w-full border p-2 rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {gender === "Other" && (
          <input
            className="input-style w-full border p-2 rounded mt-2"
            placeholder="Enter your gender"
            value={customGender}
            onChange={(e) => setCustomGender(e.target.value)}
          />
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Current Password</label>
        <input
          type="password"
          className="input-style w-full border p-2 rounded"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">New Password</label>
        <input
          type="password"
          className="input-style w-full border p-2 rounded"
          value={newPassword}
          onChange={checkStrength}
          placeholder="Enter new password"
        />
        <div className="h-2 bg-gray-200 rounded mt-2">
          <div
            className={`h-2 rounded transition-all duration-700 ${
              strength === "weak"
                ? "bg-red-500 w-1/3"
                : strength === "medium"
                ? "bg-yellow-500 w-2/3"
                : strength === "strong"
                ? "bg-green-500 w-full"
                : ""
            }`}
          />
        </div>
        {strength && (
          <p className="text-sm mt-1 capitalize">Strength: {strength}</p>
        )}
      </div>

      {/* NEW BUTTONS */}
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
