import { useEffect, useState } from 'react'

export default function Supporters() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    fetch(`${baseUrl}/api/contributions`).then(r => r.json()).then(setItems).catch(()=>{})
  }, [])

  const publicItems = items.filter(x => x.is_public)

  return (
    <section className="w-full max-w-4xl mx-auto py-10 px-4">
      <h3 className="text-xl font-semibold mb-4">Supporters</h3>
      {publicItems.length === 0 ? (
        <p className="text-gray-600">Be the first to contribute!</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-4">
          {publicItems.map((x) => (
            <li key={x.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="font-medium">{x.name}</div>
              <div className="text-sm text-gray-500">${x.amount.toLocaleString()}</div>
              {x.message && <p className="mt-2 text-gray-600">“{x.message}”</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
