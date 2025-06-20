import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "./FormContext";

export default function Step1PersonalInfo() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormContext);

  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [availabilityMsg, setAvailabilityMsg] = useState("");
  const [errors, setErrors] = useState({});


  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPG and PNG files are allowed");
        return;
      }
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
    const username = formData.username.trim();
    let msg = "";
    if (username.length < 4 || username.length > 20) {
      msg = "Username must be 4–20 characters";
    } else if (/\s/.test(username)) {
      msg = "Username cannot contain spaces";
    } else if (username.toLowerCase() === "taken") {
      msg = "Username is already taken";
    } else {
      msg = "Username is available ";
    }
    setAvailabilityMsg(msg);
  }


  function checkStrength(e) {
    const value = e.target.value;
    setFormData({ ...formData, newPassword: value });

    let strength = "";
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    if (value.length >= 8 && hasNumber && hasSpecial) {
      strength = "strong";
    } else if (value.length >= 6) {
      strength = "medium";
    } else {
      strength = "weak";
    }

    setFormData({ ...formData, newPassword: value, strength });
  }

  function handleNext() {
    const newErrors = {};

    if (!selectedFile) {
      newErrors.photo = "Profile photo is required (JPG/PNG)";
    }

    const username = formData.username.trim();
    if (username.length < 4 || username.length > 20 || /\s/.test(username)) {
      newErrors.username = "Invalid username! Fix and Try again";
    }

    if (formData.newPassword && !formData.currentPassword) {
      newErrors.currentPassword = "Current password is required to change password";
    }

  
    if (formData.newPassword) {
      const hasNumber = /\d/.test(formData.newPassword);
      const hasSpecial = /[^A-Za-z0-9]/.test(formData.newPassword);
      if (formData.newPassword.length < 8 || !hasNumber || !hasSpecial) {
        newErrors.newPassword = "Password must be 8+ chars, 1 number, 1 special char";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
     
      navigate("/step2");
    }
  }

  function handlePrevious() {
    navigate(-1);
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
                <h1 className="relative -bottom-6 right-4 text-3xl text-gray-500">+</h1>
              </div>
            )}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 rounded-full mt-3 object-cover border"
              />
            )}
            {errors.photo && <p className="text-red-600 text-sm">{errors.photo}</p>}
          </div>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Username</label>
        <input
          className="input-style text-black w-full border p-2 rounded"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          onBlur={checkAvailability}
          placeholder="Enter username"
        />
        {availabilityMsg && <p className="text-sm mt-1">{availabilityMsg}</p>}
        {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Gender</label>
        <select
          className="input-style w-full border p-2 rounded"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {formData.gender === "Other" && (
          <input
            className="input-style w-full border p-2 rounded mt-2"
            placeholder="Enter your gender"
            value={formData.customGender}
            onChange={(e) =>
              setFormData({ ...formData, customGender: e.target.value })
            }
          />
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Current Password</label>
        <input
          type="password"
          className="input-style w-full border p-2 rounded"
          value={formData.currentPassword}
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          placeholder="Enter current password"
        />
        {errors.currentPassword && (
          <p className="text-red-600 text-sm">{errors.currentPassword}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">New Password</label>
        <input
          type="password"
          className="input-style w-full border p-2 rounded"
          value={formData.newPassword}
          onChange={checkStrength}
          placeholder="Enter new password"
        />
        <div className="h-2 bg-gray-200 rounded mt-2">
          <div
            className={`h-2 rounded transition-all duration-700 ${
              formData.strength === "weak"
                ? "bg-red-500 w-1/3"
                : formData.strength === "medium"
                ? "bg-yellow-500 w-2/3"
                : formData.strength === "strong"
                ? "bg-green-500 w-full"
                : ""
            }`}
          />
        </div>
        {formData.strength && (
          <p className="text-sm mt-1 capitalize">Strength: {formData.strength}</p>
        )}
        {errors.newPassword && (
          <p className="text-red-600 text-sm">{errors.newPassword}</p>
        )}
      </div>

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
