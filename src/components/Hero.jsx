import { useEffect, useState } from 'react'

export default function Hero({ onContribute }) {
  const [summary, setSummary] = useState({ goal: 100000, raised: 0, backers: 0, percent: 0, remaining_supporters: 100 })

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    fetch(`${baseUrl}/api/summary`).then(r => r.json()).then(setSummary).catch(() => {})
  }, [])

  const remaining = Math.max(0, summary.goal - summary.raised)

  return (
    <section className="w-full max-w-4xl mx-auto text-center py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">Help Build Our App Over the Holidays</h1>
      <p className="mt-4 text-lg text-gray-600">We're inviting 100 friends to lend $1,000 each to fund development over Xmas. You'll get early access, regular updates, and full transparency.</p>

      <div className="mt-8 bg-white rounded-xl shadow p-6 text-left">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">{summary.percent}% funded</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${Math.min(100, summary.percent)}%` }} />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">${summary.raised.toLocaleString()}</div>
            <div className="text-xs text-gray-500">raised</div>
          </div>
          <div>
            <div className="text-2xl font-bold">${summary.goal.toLocaleString()}</div>
            <div className="text-xs text-gray-500">goal</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{summary.backers}</div>
            <div className="text-xs text-gray-500">backers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">${remaining.toLocaleString()}</div>
            <div className="text-xs text-gray-500">remaining</div>
          </div>
        </div>
        <button onClick={onContribute} className="mt-6 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">Contribute $1,000</button>
      </div>
    </section>
  )
}
