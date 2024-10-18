import './App.css'
import FareSplitForm from './components/fare-split-form/fair-split-form'
import FarePredictor from './components/fare-predictor/fair-predictor'
import { useState } from 'react'
import { Button } from './components/ui/button'
import { Navigation } from './components/navigation/navigation'
import { SiteFooter } from './components/navigation/footer'
import { useTranslation } from 'react-i18next'

function App() {
  const [showFairPreditor, setShowFairPredictor] = useState<boolean>(false)
  const { t, i18n: { changeLanguage, language } } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "jp" : "en"
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  }
  const handleShowFairPredictor = () => {
    setShowFairPredictor(prev => !prev)
  }
  return (
    <>
      <Navigation handleChangeLanguage={handleChangeLanguage} currentLanguage={currentLanguage} />
      <div className='flex flex-col mt-8'>
        <img src="/cab-fair-logo.svg" className='self-center' style={{ width: '60px', height: '60px' }} />
        <h1 className="text-3xl text-white font-bold mb-4 mt-4">
          {t('websiteTitle')}
        </h1>
      </div>
      <Button onClick={handleShowFairPredictor} className="text-white px-4 py-2 rounded mb-4">
        {t("needAnEstimate")}
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
