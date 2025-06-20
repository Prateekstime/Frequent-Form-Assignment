import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from "./FormContext";

export default function Step2ProfessionalDetails() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormContext);

  const [profession, setProfession] = useState(formData.profession || '');
  const [companyName, setCompanyName] = useState(formData.companyName || '');
  const [addressLine1, setAddressLine1] = useState(formData.addressLine1 || '');

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};

    if (!profession) {
      newErrors.profession = "Required*";
    }
    if (profession === "Entrepreneur" && !companyName.trim()) {
      newErrors.companyName = "Required*";
    }
    if (!addressLine1.trim()) {
      newErrors.addressLine1 = "Required*";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
 
      setFormData({
        ...formData,
        profession,
        companyName,
        addressLine1
      });
      navigate('/step3');
    }
  };

  const handlePrevious = () => navigate('/step1');

  return (
    <div className="space-y-4 p-4">
      <div>
        <label>Profession</label>
        <select 
          className="input-style w-full border p-2 rounded"
          value={profession}
          onChange={e => setProfession(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>
        {errors.profession && (
          <p className="text-red-600 text-sm">{errors.profession}</p>
        )}
      </div>

      {profession === 'Entrepreneur' && (
        <div>
          <label>Company Name</label>
          <input 
            className="input-style w-full border p-2 rounded"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
          />
          {errors.companyName && (
            <p className="text-red-600 text-sm">{errors.companyName}</p>
          )}
        </div>
      )}

      <div>
        <label>Address Line 1</label>
        <input 
          className="input-style w-full border p-2 rounded"
          value={addressLine1}
          onChange={e => setAddressLine1(e.target.value)}
        />
        {errors.addressLine1 && (
          <p className="text-red-600 text-sm">{errors.addressLine1}</p>
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
