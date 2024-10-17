import useCalculateFare from '@/hooks/useCalculateFare'
import React, { useState } from 'react';

const FarePredictor: React.FC = () => {
  const [distance, setDistance] = useState<number>(0)
  const [isLateNight, setIsLateNight] = useState<boolean>(false)
  const [zone, setZone] = useState<"tokyo" | "tama">("tokyo")
  const [predictedFare, setPredictedFare] = useState<number | null>(null)

  const handleCalculateFare = () => {
    const fareParams = {
      totalDistance: distance,
      isLateNight,
      timeAtLowSpeed: 0,
      zone,
      additionalCharges: 0,
      legs: [],
    };

    const fare = useCalculateFare(fareParams)
    setPredictedFare(fare);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Taxi Fare Predictor</h1>
      <div className="mb-4">
        <label className="block mb-2">
          Distance (km):
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
            step="0.01"
            min="0"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Late Night (10 p.m. to 5 a.m.):
          <input
            type="checkbox"
            checked={isLateNight}
            onChange={(e) => setIsLateNight(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Zone:
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value as "tokyo" | "tama")}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="tokyo">Tokyo</option>
            <option value="tama">Tama</option>
          </select>
        </label>
      </div>
      <button onClick={handleCalculateFare} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Predict Fare
      </button>
      {predictedFare !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Predicted Fare: ¥{predictedFare}</h2>
        </div>
      )}
    </div>
  );
};

export default FarePredictor;
