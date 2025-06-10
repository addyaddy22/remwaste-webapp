import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to REM Waste</h1>
        <p className="text-gray-600 mb-6">
          This is a test component styled with Tailwind CSS.
        </p>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Clicked {count} {count === 1 ? 'time' : 'times'}
        </button>
      </div>
    </div>
  );
}

export default App;
