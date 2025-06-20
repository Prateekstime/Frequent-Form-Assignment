import { useState } from "react";
import Step1PersonalInfo from "./components/step1PersonalInfo";
import Step2ProfessionalDetails from "./components/step2ProfessionalDetails";
import Step3Preferences from "./components/step3Preferences";
import Step4Summary from "./components/Step4Summery";
import ProgressBar from "./components/ProgressBar";
import Routes from "./components/routes";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // all fields here
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen  flex justify-center bg-gray-100  items-center ">
        <div className="bg-green-800  flex justify-center"> 
      
      <Routes />
        </div>

    </div>
  );
}

export default App;
