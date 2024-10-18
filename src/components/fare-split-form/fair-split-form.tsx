import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DataTable } from '../data-table/data-table';
import { columns } from '../data-table/columns';
import { useTranslation } from 'react-i18next';

const calculateSoloFare = (distance: number): number => {
  const baseFare = 500;
  const initialDistance = 1.096; // km
  const additionalFarePerMeter = 100 / 255; // 100 yen per 255 meters

  let fare = baseFare;
  if (distance > initialDistance) {
    const additionalDistance = distance - initialDistance;
    fare += additionalDistance * 1000 * additionalFarePerMeter;
  }

  return Math.round(fare);
};

const FareSplitCalculator: React.FC = () => {
  const [totalCabFare, setTotalCabFare] = useState<string>('') // Changed to string
  const [distances, setDistances] = useState<string[]>(['', '']) // Changed to string[]
  const [splitMethod, setSplitMethod] = useState<string>('Fairly')
  const { t } = useTranslation()
  const [results, setResults] = useState<{
    rider: number
    distance: number
    soloFare: number
    savings: number
    finalPayment: number
  }[]>([]);
  const [riders, setRiders] = useState<number>(0);

  const handleDistanceChange = (index: number, value: string) => {
    const newDistances = [...distances]
    newDistances[index] = value
    setDistances(newDistances)
  };

  const addRider = () => {
    setDistances([...distances, ''])
    setRiders(riders + 1)
  };

  const removeRider = () => {
    if (distances.length > 1) {
      setDistances(distances.slice(0, -1))
    }
    setRiders(riders - 1)
  };

  const calculateSplit = () => {
    const numericDistances = distances.map(distance => Number(distance) || 0) // Convert to number
    const soloFares = numericDistances.map(distance => calculateSoloFare(distance))
    const totalHypotheticalFare = soloFares.reduce((sum, fare) => sum + fare, 0)
    const totalGroupSavings = totalHypotheticalFare - (Number(totalCabFare) || 0)
    const perPersonSavings = totalGroupSavings / numericDistances.length

    const payments = numericDistances.map((distance, index) => {
      const finalPayment = soloFares[index] - perPersonSavings
      const minimumFare = 500;
      return {
        rider: index + 1,
        distance: distance,
        soloFare: soloFares[index],
        savings: perPersonSavings,
        finalPayment: Math.max(finalPayment, minimumFare), // Ensure it doesn't go below minimumFare
      }
    })

    setResults(payments)
  }

  const handleSelectChange = (value: string) => {
    setSplitMethod(value)
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">{t("taxiFareSplitCalculator")}</h1>
      <div className="mb-4">
        <label className="block">
          {t("splitMethod")}:
          <Select onValueChange={handleSelectChange} value={splitMethod}>
            <SelectTrigger>
              <SelectValue placeholder={`${t("fairly")}`} />
            </SelectTrigger>
            <SelectContent className='bg-black text-white'>
              <SelectItem value="Fairly">{t("fairly")}</SelectItem>
              <SelectItem value="Evenly">{t("evenly")}</SelectItem>
              <SelectItem value="Proportionately">{t("proportionately")}</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          {t("totalCabFare")} (¥):
          <Input
            type="number"
            value={totalCabFare}
            onChange={(e) => setTotalCabFare(e.target.value)} // Keep as string
            placeholder={t('placeHolder')}
            className="border rounded px-2 py-1 w-full"
          />
        </label>
      </div>
      {distances.map((distance, index) => (
        <div key={index} className="mb-2">
          <label className="block">
            {t("rider")} {index + 1} {t("distance")}:
            <Input
              type="number"
              step="0.01"
              placeholder={t('placeHolder2')}
              value={distance}
              onChange={(e) => handleDistanceChange(index, e.target.value)} // Keep as string
              className="border rounded px-2 py-1 w-full"
              inputMode="numeric"
            />
          </label>
        </div>
      ))}
      <div className="mb-4">
        {riders > 5 && <Button onClick={addRider} className="px-4 py-2 mr-2">{t("addRider")}</Button>}
        {riders < 5 && <Button onClick={addRider} className="px-4 py-2 mr-2">{t("addRider")}</Button>}
        <Button onClick={removeRider}>{t("removeRider")}</Button>
      </div>
      <Button onClick={calculateSplit} className="px-4 py-2 mb-4">{t("calculateSplitSavings")}</Button>
      {splitMethod === 'Fairly' && results.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">{t("results")}:</h2>
          <DataTable columns={columns} data={results} />
          <p className="font-bold mt-4">
            {t("totalGroupSavings")} ¥{(results[0].savings * results.length).toFixed(0)}
          </p>
          <p className="font-bold">
            {t("actualTotalPaid")}: ¥{totalCabFare}
          </p>
        </div>
      )}
      {results.length > 0 && splitMethod === 'Evenly' && <div>
        <h2 className="text-xl font-bold mb-2">{t("results")}:</h2>
        <p className="font-bold">{t("totalToBePaidEqually")} ¥{(Number(totalCabFare) / results.length).toFixed(0)}</p>
        <p className="font-bold mt-4">
          {t("totalGroupSavings")}: ¥{(results[0].savings * results.length).toFixed(0)}
        </p>
        <p className="font-bold">
          {t("actualTotalPaid")}: ¥{totalCabFare}
        </p>
      </div>}
    </div>
  )
}

export default FareSplitCalculator
