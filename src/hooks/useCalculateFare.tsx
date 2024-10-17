// https://www.taxi-tokyo.or.jp/english/call/pricelist.html
interface FareParams {
  totalDistance: number // Total distance traveled in km
  isLateNight: boolean // Is the ride during late-night hours (10 p.m. to 5 a.m.)
  timeAtLowSpeed: number // Time spent below 10 km/h in seconds
  zone: string // Zone: 23 Wards of Tokyo or Tama area
  additionalCharges?: number // Optional additional charges (taxi order fee, freeway tolls, etc.)
  legs: number[] // Distances for each rider's leg of the journey in km
}

const useCalculateFare = ({
  totalDistance,
  isLateNight,
  timeAtLowSpeed,
  zone,
  additionalCharges = 0, // Default to 0 if not provided
}: FareParams): number => {
  // Zone-specific parameters
  let initialFare: number
  let initialDistance: number
  let additionalFarePerMeter: number
  let lowSpeedFarePerSecond: number

  if (zone === "tokyo") {
    initialFare = 500
    initialDistance = 1.096 // in km
    additionalFarePerMeter = 100 / 255 // 100 yen per 255 meters
    lowSpeedFarePerSecond = 100 / (1 * 60 + 35) // 100 yen per 1 minute 35 seconds
  } else if (zone === "tama") {
    initialFare = 500
    initialDistance = 1.091 // in km
    additionalFarePerMeter = 100 / 233 // 100 yen per 233 meters
    lowSpeedFarePerSecond = 100 / (1 * 60 + 25) // 100 yen per 1 minute 25 seconds
  } else {
    throw new Error("Invalid zone provided.")
  }

  // Calculate distance-based fare
  let totalFare = initialFare
  if (totalDistance > initialDistance) {
    const additionalDistance = totalDistance - initialDistance
    totalFare += additionalDistance * 1000 * additionalFarePerMeter
  }

  // Calculate low-speed fare if applicable
  if (timeAtLowSpeed > 0) {
    totalFare += timeAtLowSpeed * lowSpeedFarePerSecond
  }

  // Apply late-night surcharge if applicable
  if (isLateNight) {
    totalFare *= 1.2 // 20% increase for late-night fare
  }

  // Discount for fares over 9000 yen
  if (totalFare > 9000) {
    totalFare -= (totalFare - 9000) * 0.1 // 10% discount for fares over 9000
  }

  // Add additional charges if any
  totalFare += additionalCharges

  return Math.round(totalFare) // Return the final fare rounded to the nearest yen
}

export default useCalculateFare
