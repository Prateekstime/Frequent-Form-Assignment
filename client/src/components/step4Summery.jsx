import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from "./FormContext";

export default function Step4Summary() {
  const navigate = useNavigate();
  const { formData } = useContext(FormContext);

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold mb-4">Review Your Details</h2>

      <div className="grid grid-cols-1 gap-2 p-4 border border-gray-300 rounded">
        <p><strong>Username:</strong> {formData.username}</p>
        <p><strong>Gender:</strong> {formData.gender === "Other" ? formData.customGender : formData.gender}</p>
        <p><strong>Profession:</strong> {formData.profession}</p>
        {formData.profession === "Entrepreneur" && (
          <p><strong>Company:</strong> {formData.companyName}</p>
        )}
        <p><strong>Address:</strong> {formData.addressLine1}</p>
        <p><strong>Country:</strong> {formData.country}</p>
        <p><strong>State:</strong> {formData.state}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>Plan:</strong> {formData.subscriptionPlan}</p>
        <p><strong>Newsletter:</strong> {formData.newsletter ? "Yes" : "No"}</p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/step3")}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => navigate("/success")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Subm
        </button>
      </div>
    </div>
  );
}
