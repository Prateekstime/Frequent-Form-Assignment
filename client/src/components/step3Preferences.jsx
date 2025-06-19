import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Step3Preferences() {
  const navigate = useNavigate();

  // States
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  // Sample data (replace with API later if needed)
  const countries = ["USA", "India", "Canada"];
  const states = ["California", "Texas", "New York"];
  const cities = ["Los Angeles", "Houston", "New York City"];

  // Handlers
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);

  const handlePlanChange = (e) => setSubscriptionPlan(e.target.value);
  const handleNewsletterChange = (e) => setNewsletter(e.target.checked);

  const handleNext = () => navigate("/step4");
  const handlePrevious = () => navigate("/step2");

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">Country</label>
        <select
          className="w-full p-3 border border-gray-300 rounded"
          value={country}
          onChange={handleCountryChange}
        >
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">State</label>
        <select
          className="w-full p-3 border border-gray-300 rounded"
          value={state}
          onChange={handleStateChange}
        >
          <option value="">Select state</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">City</label>
        <select
          className="w-full p-3 border border-gray-300 rounded"
          value={city}
          onChange={handleCityChange}
        >
          <option value="">Select city</option>
          {cities.map((ci) => (
            <option key={ci} value={ci}>{ci}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Subscription Plan</label>
        <div className="space-x-6">
          {['Basic', 'Pro', 'Enterprise'].map(plan => (
            <label key={plan} className="inline-flex items-center">
              <input
                type="radio"
                name="plan"
                value={plan}
                checked={subscriptionPlan === plan}
                onChange={handlePlanChange}
              />
              <span className="ml-2">{plan}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={handleNewsletterChange}
          />
          <span className="ml-2">Subscribe to Newsletter</span>
        </label>
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
