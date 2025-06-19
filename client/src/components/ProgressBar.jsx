export default function ProgressBar({ step }) {
  const steps = ['Personal Info', 'Professional Details', 'Preferences', 'Summary', 'Success'];
  return (
    <div className="flex items-center justify-between mb-8 mt-10">
      {steps.map((label, idx) => (
        <div key={idx} className="flex-1 flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center 
            ${step > idx ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
            {idx + 1}
          </div>
          <span className="text-xs mt-1">{label}</span>
          {idx < steps.length - 1 && <div className="w-full border-t-2 border-gray-300"></div>}
        </div>
      ))}
    </div>
  );
}
