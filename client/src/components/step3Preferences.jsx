import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from "./FormContext";

export default function Step3Preferences() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormContext);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState(formData.country || '');
  const [stateVal, setStateVal] = useState(formData.state || '');
  const [city, setCity] = useState(formData.city || '');
  const [subscriptionPlan, setSubscriptionPlan] = useState(formData.subscriptionPlan || '');
  const [newsletter, setNewsletter] = useState(
    formData.newsletter !== undefined ? formData.newsletter : true
  );

  const [errors, setErrors] = useState({});

  // ✅ Fetch countries from DB API (replace with your real API)
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch('/api/countries'); // ✅ your API endpoint
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  // ✅ Fetch states when country changes
  useEffect(() => {
    async function fetchStates() {
      if (!country) {
        setStates([]);
        return;
      }
      try {
        const response = await fetch(`/api/states?country=${country}`);
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    }
    fetchStates();
    setStateVal('');
    setCity('');
    setCities([]);
  }, [country]);

  // ✅ Fetch cities when state changes
  useEffect(() => {
    async function fetchCities() {
      if (!stateVal) {
        setCities([]);
        return;
      }
      try {
        const response = await fetch(`/api/cities?state=${stateVal}`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
    fetchCities();
    setCity('');
  }, [stateVal]);

  const handleNext = () => {
    const newErrors = {};

    // if (!country) newErrors.country = "Country is required";
    // if (!stateVal) newErrors.stateVal = "State is required";
    // if (!city) newErrors.city = "City is required";
    if (!subscriptionPlan) newErrors.subscriptionPlan = "Please select a plan";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setFormData({
        ...formData,
        country,
        state: stateVal,
        city,
        subscriptionPlan,
        newsletter 
      });
      navigate('/step4');
    }
  };

  const handlePrevious = () => navigate('/step2');

  return (
    <div className="space-y-4 p-4">
      <div>
        <label>Country</label>
        <select
          className="input-style w-full border p-2 rounded"
          value={country}
          onChange={e => setCountry(e.target.value)}
        >
          <option value="">Select...</option>
          {countries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-600 text-sm">{errors.country}</p>
        )}
      </div>

      <div>
        <label>State</label>
        <select
          className="input-style w-full border p-2 rounded"
          value={stateVal}
          onChange={e => setStateVal(e.target.value)}
        >
          <option value="">Select...</option>
          {states.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.stateVal && (
          <p className="text-red-600 text-sm">{errors.stateVal}</p>
        )}
      </div>

      <div>
        <label>City</label>
        <select
          className="input-style w-full border p-2 rounded"
          value={city}
          onChange={e => setCity(e.target.value)}
        >
          <option value="">Select...</option>
          {cities.map(ci => (
            <option key={ci} value={ci}>{ci}</option>
          ))}
        </select>
        {errors.city && (
          <p className="text-red-600 text-sm">{errors.city}</p>
        )}
      </div>

      <div>
        <label>Subscription Plan</label>
        <div className="space-x-4">
          {['Basic', 'Pro', 'Enterprise'].map(plan => (
            <label key={plan} className="inline-flex items-center">
              <input
                type="radio"
                value={plan}
                checked={subscriptionPlan === plan}
                onChange={e => setSubscriptionPlan(e.target.value)}
              />
              <span className="ml-2">{plan}</span>
            </label>
          ))}
        </div>
        {errors.subscriptionPlan && (
          <p className="text-red-600 text-sm">{errors.subscriptionPlan}</p>
        )}
      </div>

      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={e => setNewsletter(e.target.checked)}
          />
          <span className="ml-2">Subscribe to Newsletter</span>
        </label>
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
