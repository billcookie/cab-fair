import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { DataTable } from '../data-table/data-table'
import { columns } from '../data-table/columns'
import { useTranslation } from 'react-i18next'

const calculateSoloFare = (distance: number): number => {
  const baseFare = 500
  const initialDistance = 1.096 // km
  const additionalFarePerMeter = 100 / 255 // 100 yen per 255 meters

  let fare = baseFare
  if (distance > initialDistance) {
    const additionalDistance = distance - initialDistance
    fare += additionalDistance * 1000 * additionalFarePerMeter
  }

  return Math.floor(fare) // Floor the fare
}

const FareSplitCalculator: React.FC = () => {
  const [totalCabFare, setTotalCabFare] = useState<string>('')
  const [distances, setDistances] = useState<string[]>(['', ''])
  const [splitMethod, setSplitMethod] = useState<string>('Fairly')
  const { t } = useTranslation()
  const [results, setResults] = useState<{
    rider: number
    distance: number
    soloFare: number
    savings: number
    finalPayment: number
  }[]>([])
  const [riders, setRiders] = useState<number>(2)

  const handleDistanceChange = (index: number, value: string) => {
    const newDistances = [...distances]
    newDistances[index] = value
    setDistances(newDistances)
  }

  const addRider = () => {
    setDistances([...distances, ''])
    setRiders(riders + 1)
  }

  const removeRider = () => {
    if (distances.length > 1) {
      setDistances(distances.slice(0, -1))
      setRiders(riders - 1)
    }
  }

  const calculateSplit = () => {
    const numericDistances = distances.map(distance => Number(distance) || 0)
    const numericTotalCabFare = Math.floor(Number(totalCabFare) || 0)

    // Calculate Proportional split
    const totalDistance = numericDistances.reduce((sum, distance) => sum + distance, 0)
    const proportionalPayments = numericDistances.map((distance) =>
      Math.floor((distance / totalDistance) * numericTotalCabFare)
    )

    // Calculate Fair split
    const soloFares = numericDistances.map(distance => calculateSoloFare(distance))
    const totalHypotheticalFare = soloFares.reduce((sum, fare) => sum + fare, 0)
    const totalGroupSavings = totalHypotheticalFare - numericTotalCabFare
    const perPersonSavings = Math.floor(totalGroupSavings / numericDistances.length)
    const evenSplitSavings = soloFares.map(fare => Math.max(Math.floor(fare - perPersonSavings), 500))
    const fairlyPayments = proportionalPayments.map((prop, index) => Math.floor((prop + evenSplitSavings[index]) / 2))
    const evenlySplitPayments = numericDistances.map(() => Math.floor(numericTotalCabFare / numericDistances.length))
    let finalPayments

    switch (splitMethod) {
      case 'Fairly':
        finalPayments = fairlyPayments
        break;
      case 'EvenSplitSavings':
        finalPayments = evenSplitSavings
        break;
      case 'Proportionately':
        finalPayments = proportionalPayments
        break;
      case 'Evenly':
        finalPayments = evenlySplitPayments
        break;
      default:
        finalPayments = fairlyPayments
    }

    // Adjust for rounding errors
    const totalCalculated = finalPayments.reduce((sum, payment) => sum + payment, 0)
    if (totalCalculated !== numericTotalCabFare) {
      const difference = numericTotalCabFare - totalCalculated
      finalPayments[0] += difference // Add any difference to the first rider's payment
    }

    const results = numericDistances.map((distance, index) => ({
      rider: index + 1,
      distance: distance,
      soloFare: soloFares[index],
      savings: Math.floor(soloFares[index] - finalPayments[index]),
      finalPayment: finalPayments[index],
    }))

    setResults(results)
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
              <SelectItem value="EvenSplitSavings">{t("evenSplitSavings")}</SelectItem>
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
            onChange={(e) => setTotalCabFare(e.target.value)}
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
              onChange={(e) => handleDistanceChange(index, e.target.value)}
              className="border rounded px-2 py-1 w-full"
              inputMode="numeric"
            />
          </label>
        </div>
      ))}
      <div className="mb-4">
        {riders < 5 && <Button onClick={addRider} className="px-4 py-2 mr-2">{t("addRider")}</Button>}
        {riders > 2 && <Button onClick={removeRider}>{t("removeRider")}</Button>}
      </div>
      <Button onClick={calculateSplit} className="px-4 py-2 mb-4">{t("calculateSplitSavings")}</Button>
      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">{t("results")}:</h2>
          <DataTable columns={columns} data={results} />
          <p className="font-bold mt-4">
            {t("totalGroupSavings")}: ¥{Math.floor(results.reduce((sum, result) => sum + result.savings, 0))}
          </p>
          <p className="font-bold">
            {t("actualTotalPaid")}: ¥{totalCabFare}
          </p>
        </div>
      )}
    </div>
  )
}

export default FareSplitCalculator
