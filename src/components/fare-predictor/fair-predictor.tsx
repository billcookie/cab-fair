import useCalculateFare from '@/hooks/useCalculateFare'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'

const FarePredictor: React.FC = () => {
  const [distance, setDistance] = useState<number>(0)
  const [isLateNight, setIsLateNight] = useState<boolean>(false)
  // const [zone, setZone] = useState<"tokyo" | "tama">("tokyo")
  const [predictedFare, setPredictedFare] = useState<number | null>(null)
  const zone = 'tokyo'
  const { t } = useTranslation()
  const handleCalculateFare = () => {
    const fareParams = {
      totalDistance: distance,
      isLateNight,
      timeAtLowSpeed: 0,
      zone,
      additionalCharges: 0,
      legs: [],
    }

    const fare = useCalculateFare(fareParams)
    setPredictedFare(fare);
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">{t('taxiFarePredictor')}</h1>
      <div className="mb-4">
        <label className="block mb-2">
          {t('distance')}
          <Input
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
          {t("lateNight")}
          <input
            type="checkbox"
            checked={isLateNight}
            onChange={(e) => setIsLateNight(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
      <Button onClick={handleCalculateFare} className="text-white px-4 py-2 rounded mb-4">
        {t("predictFare")}
      </Button>
      {predictedFare !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">{t("predictedFareResult")} ¥{predictedFare}</h2>
        </div>
      )}
    </div>
  )
}

export default FarePredictor
