import React, { useState } from 'react';

const calculateSoloFare = (distance: number): number => {
  const baseFare = 500;
  const initialDistance = 1.096; // km
  const additionalFarePerMeter = 100 / 255 // 100 yen per 255 meters

  let fare = baseFare;
  if (distance > initialDistance) {
    const additionalDistance = distance - initialDistance
    fare += additionalDistance * 1000 * additionalFarePerMeter
  }

  return Math.round(fare)
};
const FareSplitCalculator: React.FC = () => {
  const [totalCabFare, setTotalCabFare] = useState<number>(0)
  const [distances, setDistances] = useState<number[]>([0, 0])
  const [results, setResults] = useState<{
    rider: number
    distance: number
    soloFare: number
    savings: number
    finalPayment: number
  }[]>([]);
  const [riders, setRiders] = useState<number>(0)

  const handleDistanceChange = (index: number, value: number) => {
    const newDistances = [...distances]
    newDistances[index] = value
    setDistances(newDistances)
  };

  const addRider = () => {
    setDistances([...distances, 0])
    setRiders(riders + 1)
  };

  const removeRider = () => {
    if (distances.length > 1) {
      setDistances(distances.slice(0, -1))
    }
    setRiders(riders - 1)
  };

  const calculateSplit = () => {
    const soloFares = distances.map(distance => calculateSoloFare(distance))
    const totalHypotheticalFare = soloFares.reduce((sum, fare) => sum + fare, 0)
    const totalGroupSavings = totalHypotheticalFare - totalCabFare
    const perPersonSavings = totalGroupSavings / distances.length

    const payments = distances.map((distance, index) => {
      const finalPayment = soloFares[index] - perPersonSavings
      const minimumFare = 500; // Set a minimum fare
      return {
        rider: index + 1,
        distance: distance,
        soloFare: soloFares[index],
        savings: perPersonSavings,
        finalPayment: Math.max(finalPayment, minimumFare) // Ensure it doesn't go below minimumFare
      };
    });

    setResults(payments)
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Taxi Fare Split Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">
          Total Cab Fare (¥):
          <input
            type="number"
            value={totalCabFare}
            onChange={(e) => setTotalCabFare(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </label>
      </div>
      {distances.map((distance, index) => (
        <div key={index} className="mb-2">
          <label className="block">
            Rider {index + 1} Distance (km):
            <input
              type="number"
              step="0.01"
              value={distance}
              onChange={(e) => handleDistanceChange(index, Number(e.target.value))}
              className="border rounded px-2 py-1 w-full"
              inputMode="numeric"
            />

          </label>
        </div>
      ))}
      <div className="mb-4">
        {riders > 5 && <button onClick={addRider} disabled className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add Rider</button>}
        {riders < 5 && <button onClick={addRider} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add Rider</button>}
        <button onClick={removeRider} className="bg-red-500 text-white px-4 py-2 rounded">Remove Rider</button>
      </div>
      <button onClick={calculateSplit} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Calculate Split and Savings</button>
      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Results:</h2>
          {results.map((result) => (
            <p key={result.rider} className="mb-1">
              Rider {result.rider}: Distance: {result.distance.toFixed(2)} km,
              Solo Fare: ¥{result.soloFare},
              Savings: ¥{result.savings.toFixed(0)},
              Final Payment: ¥{result.finalPayment.toFixed(0)}
            </p>
          ))}
          <p className="font-bold mt-4">
            Total Group Savings: ¥{(results[0].savings * results.length).toFixed(0)}
          </p>
          <p className="font-bold">
            Actual Total Paid: ¥{totalCabFare} (¥{(totalCabFare / results.length).toFixed(0)} per person if split equally)
          </p>
        </div>
      )}
    </div>
  );
};

export default FareSplitCalculator
