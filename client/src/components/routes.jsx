import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Step1PersonalInfo from "./step1PersonalInfo";
import Step2ProfessionalDetails from "./step2ProfessionalDetails";
import Step3Preferences from "./step3Preferences";
import Step4Summary from "./Step4Summery";
import Success from "./Success";
import ProgressBar from "./ProgressBar";

export default function RoutesComponent() {
  const location = useLocation();

  const stepMap = {
    "/": 1,
    "/step1": 1,
    "/step2": 2,
    "/step3": 3,
    "/step4": 4,
    "/success": 5
  };

  const step = stepMap[location.pathname] || 1;

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 flex flex-col items-center justify-center">
      <ProgressBar step={step} />

      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-2xl">
        <Routes>
          <Route path="/" element={<Step1PersonalInfo />} />
          <Route path="/step1" element={<Step1PersonalInfo />} />
          <Route path="/step2" element={<Step2ProfessionalDetails />} />
          <Route path="/step3" element={<Step3Preferences />} />
          <Route path="/step4" element={<Step4Summary />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </div>
  );
}
