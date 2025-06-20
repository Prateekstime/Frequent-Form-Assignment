import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
    const handlePrevious = () => navigate("/step4");
  return (
    <div>
        <div className="text-center">
  <h2 className="text-2xl font-bold text-green-600 mb-4">Profile Updated Successfully!</h2>
  <p className="text-gray-700">Thank you for updating your profile.</p>
</div>
 <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Previous
        </button>
       
      </div>

      
    </div>
  )
}
