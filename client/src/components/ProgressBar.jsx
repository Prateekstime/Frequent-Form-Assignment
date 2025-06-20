export default function ProgressBar({ step }) {
  const steps = ['Personal Info', 'Professional Details', 'Preferences', 'Summary', 'Success'];
  return (
   <div className="flex items-center justify-between w-3/4  mb-8 mt-10">
  {steps.map((label, idx) => (
    <div key={idx} className="flex-1 flex flex-col items-center relative">
    
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
          ${step > idx ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
      >
        {idx + 1}
      </div>

      
      <span className="text-xs mt-2 text-center whitespace-nowrap">{label}</span>

    
      {idx < steps.length - 1 && (
        <div className="absolute top-4 left-1/2 w-full border-t-2 border-gray-300 z-0"></div>
      )}
    </div>
  ))}
</div>

  );
}
