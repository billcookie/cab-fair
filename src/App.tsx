import './App.css'
import FareSplitForm from './components/fare-split-form/fair-split-form'
import FarePredictor from './components/fare-predictor/fair-predictor'
import { useState } from 'react'

function App() {
  const [showFairPreditor, setShowFairPredictor] = useState<boolean>(false)

  const handleShowFairPredictor = () => {
    setShowFairPredictor(prev => !prev)
  }
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">
          Cab Fair
        </h1>
      </div>
      <button onClick={handleShowFairPredictor} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Need an Estimate?
      </button>
      <div className="card">
        {showFairPreditor && <FarePredictor />}
        <FareSplitForm />
      </div>
    </>
  )
}

export default App
