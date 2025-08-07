import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SYSTEM_PROMPTS from '../../data/systemPrompts'

const mindProfiles = {
  einstein: {
    displayName: "Albert Einstein",
    subtitle: "Theoretical Physicist",
    avatar: "/images/einestein.jpeg"
  },
  gandhi: {
    displayName: "Mahatma Gandhi",
    subtitle: "Leader & Philosopher", 
    avatar: "/images/gandhi.jpeg"
  },
  hawking: {
    displayName: "Stephen Hawking",
    subtitle: "Theoretical Physicist",
    avatar: "/images/stephen-hawking.jpeg"
  },
  jobs: {
    displayName: "Steve Jobs",
    subtitle: "Visionary Entrepreneur",
    avatar: "/images/stevejobs.jpeg"
  }
}

export default function MindChat() {
  const { name } = useRouter().query
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  
  const profile = mindProfiles[name] || {
    displayName: name?.charAt(0).toUpperCase() + name?.slice(1),
    subtitle: "Great Mind"
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (name && messages.length === 0) {
      setMessages([{
        role: "assistant",
        text: `Hello! I'm ${profile.displayName}. I'm delighted to have this opportunity to discuss ideas with you. What would you like to explore together?`,
        timestamp: new Date()
      }])
    }
  }, [name, profile.displayName])

  const handleSend = async () => {
    if (!input.trim()) return
    
    const userMessage = { 
      role: "user", 
      text: input.trim(),
      timestamp: new Date()
    }
    
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)
    
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: input.trim(),
          systemPrompt: SYSTEM_PROMPTS[name] || "You are a helpful expert.",
        }),
      })
      const data = await res.json()
      setMessages([...newMessages, { 
        role: "assistant", 
        text: data.response,
        timestamp: new Date()
      }])
    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, { 
        role: "assistant", 
        text: "I apologize, but I'm having trouble responding right now. Please try again.",
        timestamp: new Date()
      }])
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile.displayName}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                <div>
                  <h1 className="text-base font-medium text-gray-900">{profile.displayName}</h1>
                  <p className="text-xs text-gray-500">{profile.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className="group">
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      {msg.role === "user" ? (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">U</span>
                        </div>
                      ) : (
                        profile.avatar ? (
                          <Image
                            src={profile.avatar}
                            alt={profile.displayName}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                        )
                      )}
                    </div>
                    
                    {/* Message Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {msg.role === "user" ? "You" : profile.displayName}
                        </span>
                      </div>
                      <div className="text-gray-800 leading-relaxed">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="group">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      {profile.avatar ? (
                        <Image
                          src={profile.avatar}
                          alt={profile.displayName}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">{profile.displayName}</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
      </main>

      {/* Fixed Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder={`Message ${profile.displayName}...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-400 transition-colors"
                rows="1"
                style={{ 
                  minHeight: '44px',
                  height: Math.min(input.split('\n').length * 24 + 20, 120) + 'px'
                }}
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
