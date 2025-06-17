'use client'
import { useState, useRef, useEffect } from 'react'

type Msg = { from: 'user' | 'bot'; text: string }

export default function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  // unified send handler
  const send = async (text: string) => {
    if (!text.trim()) return
    const userMsg = { from: 'user' as const, text }
    setMsgs(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const { response, error } = await res.json()
      if (error) throw new Error(error)
      setMsgs(prev => [...prev, { from: 'bot', text: response }])
    } catch (err: any) {
      setMsgs(prev => [...prev, { from: 'bot', text: `Error: ${err.message}` }])
    } finally {
      setLoading(false)
    }
  }

  // form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={[
              'max-w-[80%] px-4 py-2 rounded-2xl',
              m.from === 'user'
                ? 'self-end bg-blue-600 text-white'
                : 'self-start bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
            ].join(' ')}
          >
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* input form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center space-x-2"
      >
        <input
          type="text"
          className="
            flex-1
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            rounded-full
            px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message…"
          autoFocus
        />

        <button
          type="submit"
          disabled={loading}
          className="
            px-5 py-2 
            bg-blue-500 hover:bg-blue-600 
            text-white font-medium 
            rounded-full
            disabled:opacity-50"
        >
          {loading ? '…' : 'Send'}
        </button>
      </form>
    </div>
  )
}
