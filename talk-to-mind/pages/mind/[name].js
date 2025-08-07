import { useRouter } from 'next/router'
import { useState } from 'react'
import SYSTEM_PROMPTS from '../../data/systemPrompts'

export default function MindChat() {
  const { name } = useRouter().query
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    const newMessages = [...messages, { role: "user", text: input }]
    setMessages(newMessages)
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userMessage: input,
        systemPrompt: SYSTEM_PROMPTS[name] || "You are a helpful expert.",
      }),
    })
    const data = await res.json()
    setMessages([...newMessages, { role: "assistant", text: data.response }])
    setInput("")
  }

  return (
    <div className="min-h-screen bg-[#073B4C] text-white p-6">
      <h1 className="text-3xl text-[#FFD166] mb-4 font-bold">
        Talk to {name?.toUpperCase()}
      </h1>
      <div className="h-[60vh] overflow-y-auto bg-[#0A2E3C] p-4 rounded mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <b>{msg.role === "user" ? "You" : name}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask anything..."
        className="w-full p-2 rounded text-black"
      />
    </div>
  )
}
