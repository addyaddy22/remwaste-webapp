import { useState } from 'react';
import {
  MapPinIcon,
  TrashIcon,
  CubeIcon,
  DocumentTextIcon,
  CalendarIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

type Skip = {
  size: string;
  period: string;
  price: number;
};

const skipSizes: Skip[] = [
  { size: '4 Yard Skip', period: '7 days', price: 227 },
  { size: '6 Yard Skip', period: '14 days', price: 300 },
  { size: '8 Yard Skip', period: '7 days', price: 325 },
  { size: '10 Yard Skip', period: '7 days', price: 325 },
  { size: '12 Yard Skip', period: '14 days', price: 400 },
  { size: '14 Yard Skip', period: '14 days', price: 450 },
];

const steps = [
  { name: 'Postcode', icon: MapPinIcon },
  { name: 'Waste Type', icon: TrashIcon },
  { name: 'Skip Size', icon: CubeIcon },
  { name: 'Permit', icon: DocumentTextIcon },
  { name: 'Date', icon: CalendarIcon },
  { name: 'Payment', icon: CreditCardIcon },
];

const SkipSelection = () => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(2); // Example: step 2 (Skip Size)

  const handleSelect = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-100 to-gray-200 p-4 md:p-8 font-sans">
      {/* App Bar */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">Select Your Skip</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">Help</button>
      </header>

      {/* Improved Progress Steps */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;

          return (
            <button
              key={index}
              type="button"
              className={`flex flex-col items-center justify-center min-w-[80px] px-3 py-2 rounded-lg transition ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
                } hover:scale-105`}
              onClick={() => setCurrentStep(index)}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6 mb-1" />
              <span className="text-xs md:text-sm font-semibold">{step.name}</span>
            </button>
          );
        })}
      </div>


      {/* Skip Selection Grid */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {skipSizes.map((skip, index) => (
          <div
            key={index}
            onClick={() => handleSelect(skip)}
            className={`relative flex flex-col justify-between bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition transform hover:scale-105 ${selectedSkip === skip ? 'ring-4 ring-blue-400' : ''
              }`}
          >
            <div>
              <img
                src={`https://via.placeholder.com/300x160/efefef/333?text=${encodeURIComponent(skip.size)}`}
                alt={skip.size}
                className="rounded-xl mb-4 w-full h-40 object-cover"
              />
              <h2 className="text-lg font-bold text-gray-800 mb-1">{skip.size}</h2>
              <p className="text-sm text-gray-500 mb-1">Hire: {skip.period}</p>
              <p className="text-xl text-blue-600 font-bold">£{skip.price}</p>
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
      <div className="fixed inset-x-0 bottom-0 bg-white shadow-t p-4 flex justify-between items-center md:static md:mt-8">
        <p className="text-gray-600 text-sm">
          {selectedSkip ? `Selected: ${selectedSkip.size}` : 'No skip selected'}
        </p>
        <button
          className={`px-6 py-3 rounded-full text-white font-semibold ${selectedSkip ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          disabled={!selectedSkip}
          onClick={() => alert(`Proceeding with: ${selectedSkip?.size}`)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SkipSelection;
