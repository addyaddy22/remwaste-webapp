import { useEffect, useState } from 'react';
import { steps } from './constants/steps';
import { getSkipImage } from './utils/getSkipImage';
import type { Skip } from './types/Skip';
import {  ExclamationTriangleIcon } from '@heroicons/react/24/outline';


const SkipSelection = () => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [skips, setSkips] = useState<Skip[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [warningSkip, setWarningSkip] = useState<Skip | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/skips/by-location?postcode=NR32&area=Lowestoft`)
      .then((res) => res.json())
      .then((data) => setSkips(data))
      .catch((err) => console.error("Failed to load skips", err));
  }, []);

  const handleSelect = (skip: Skip) => {
    if (skip.size >= 10) {
      setShowPopup(true);
      setWarningSkip(skip);
      return;
    }
    setSelectedSkip(skip);
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 p-4 md:p-8 font-sans text-white">
      {/* App Bar */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-4xl font-extrabold text-white">Select Your Skip</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">Help</button>
      </header>
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex flex-col items-center relative">
              {/* Connector line between steps */}
              {index !== 0 && (
                <div className="absolute -left-1/2 top-1/2 w-full h-1 bg-gray-300 z-0"></div>
              )}

              <button
                type="button"
                onClick={() => setCurrentStep(index)}
                className={`z-10 relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${isComplete
                  ? 'bg-green-500 border-green-500 text-white'
                  : isCurrent
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                  }`}
              >
                {isComplete ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </button>

              <span className="text-xs mt-2 text-center w-24 font-medium text-gray-400">
                {step.name}
              </span>
            </div>
          );
        })}
      </div>


      {/* Skip Grid */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-28">
        {skips.map((skip, index) => (
          <div
            key={index}
            onClick={() => handleSelect(skip)}
            className={`relative flex flex-col justify-between bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition transform hover:scale-105 ${selectedSkip === skip ? 'ring-4 ring-blue-400' : ''
              }`}
          >
            {skip.size >= 10 && (
              <div className="absolute top-2 left-2 bg-black text-yellow-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                ⚠ Not Allowed On The Road
              </div>
            )}
            <div>
              <img
                src={getSkipImage(skip.size)}
                alt={`${skip.size} Yards`}
                className="rounded-xl mb-4 w-full h-40 object-cover"
              />
              <h2 className="text-lg font-bold text-gray-800 mb-1">{skip.size} Yard Skip</h2>
              <p className="text-sm text-gray-500 mb-1">Hire: {skip.hire_period_days} days</p>
              <p className="text-xl text-blue-600 font-bold">£{skip.price_before_vat}</p>
            </div>
            <div className="mt-4">
              <button
                className={`w-full py-2 rounded-xl font-semibold text-sm ${selectedSkip === skip
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
              >
                {selectedSkip === skip ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 shadow-lg px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 z-50 animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <p className="text-gray-800 text-sm font-medium">
            {selectedSkip
              ? `${selectedSkip.size} Yard Skip • £${selectedSkip.price_before_vat} • ${selectedSkip.hire_period_days} day hire`
              : 'No skip selected'}
          </p>
          {selectedSkip && (
            <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              Road permit may be required
            </span>
          )}
        </div>
        <button
          className={`w-full md:w-auto px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${selectedSkip
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          disabled={!selectedSkip}
          onClick={() => alert(`Proceeding with: ${selectedSkip?.size}`)}
        >
          Continue
        </button>
      </div>



      {/* Modal Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="warning-title"
            className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg border-l-4 border-yellow-500"
          >
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 mt-1" />
              <div>
                <h2
                  id="warning-title"
                  className="text-lg font-bold text-yellow-700"
                >
                  Warning
                </h2>
                <p className="text-sm text-gray-700 mt-1">
                  Skips of 10 yards or more are not allowed on the road. Please choose a smaller size or place it on private property.
                </p>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SkipSelection;
