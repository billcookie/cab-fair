import './App.css'
import FareSplitForm from './components/fare-split-form/fair-split-form'
import FarePredictor from './components/fare-predictor/fair-predictor'
import { useState } from 'react'
import { Button } from './components/ui/button'
import { Navigation } from './components/navigation/navigation'
import { SiteFooter } from './components/navigation/footer'

function App() {
  const [showFairPreditor, setShowFairPredictor] = useState<boolean>(false)

  const handleShowFairPredictor = () => {
    setShowFairPredictor(prev => !prev)
  }
  return (
    <>
      <Navigation />
      <div>
        <h1 className="text-3xl text-white font-bold mb-4 mt-4">
          Cab Fair
        </h1>
      </div>
      <Button onClick={handleShowFairPredictor} className="text-white px-4 py-2 rounded mb-4">
        Need an Estimate?
      </Button>
      <div className="card">
        {showFairPreditor && <FarePredictor />}
        <FareSplitForm />
      </div>
      <SiteFooter />
    </>
  )
}

export default App
