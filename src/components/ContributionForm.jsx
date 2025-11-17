import { useState } from 'react'

export default function ContributionForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({ name: '', email: '', amount: 1000, message: '', is_public: true })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/contributions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to submit')
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-xl shadow p-6 space-y-4 w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold">Contribute</h2>
      <p className="text-sm text-gray-600">Enter your details to pledge your support. No payment collected here — we will follow up with instructions.</p>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Amount (USD)</label>
        <input type="number" min="1" step="1" value={form.amount} onChange={e=>setForm({...form, amount: Number(e.target.value)})} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium">Message (optional)</label>
        <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <label className="inline-flex items-center space-x-2">
        <input type="checkbox" checked={form.is_public} onChange={e=>setForm({...form, is_public: e.target.checked})} />
        <span className="text-sm">Show my name on the supporters list</span>
      </label>
      <div className="flex gap-3 pt-2">
        <button disabled={loading} className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">{loading? 'Submitting...' : 'Submit'}</button>
        <button type="button" onClick={onCancel} className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Cancel</button>
      </div>
    </form>
  )
}
