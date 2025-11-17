import { useState } from 'react'
import Hero from './components/Hero'
import ContributionForm from './components/ContributionForm'
import Supporters from './components/Supporters'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSuccess = () => {
    setShowForm(false)
    setRefreshKey(k => k + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-white">
      <div className="py-10">
        <Hero onContribute={() => setShowForm(true)} key={`hero-${refreshKey}`} />
        {showForm && (
          <div className="py-6">
            <ContributionForm onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
          </div>
        )}
        <Supporters key={`supporters-${refreshKey}`} />
      </div>
    </div>
  )
}

export default App
