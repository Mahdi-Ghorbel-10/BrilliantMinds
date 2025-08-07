import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SYSTEM_PROMPTS from '../../data/systemPrompts'

const mindProfiles = {
  einstein: {
    displayName: "Albert Einstein",
    subtitle: "Theoretical Physicist",
    avatar: "/images/einestein.jpeg",
    color: "from-blue-500 to-purple-600"
  },
  sagan: {
    displayName: "Carl Sagan",
    subtitle: "Astronomer & Science Communicator", 
    avatar: "/images/carlsagan.jpeg",
    color: "from-indigo-500 to-blue-600"
  },
  turing: {
    displayName: "Alan Turing",
    subtitle: "Computer Scientist",
    avatar: "/images/alanturin.jpeg",
    color: "from-green-500 to-teal-600"
  },
  jobs: {
    displayName: "Steve Jobs",
    subtitle: "Visionary Entrepreneur",
    avatar: "/images/stevejobs.jpeg",
    color: "from-purple-500 to-pink-600"
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
    subtitle: "Great Mind",
    color: "from-gray-500 to-gray-600"
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

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              
                             <div className="flex items-center space-x-3">
                 {/* Avatar */}
                 <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${profile.color} p-0.5 shadow-lg`}>
                   <div className="w-full h-full rounded-full overflow-hidden">
                     {profile.avatar ? (
                       <Image
                         src={profile.avatar}
                         alt={profile.displayName}
                         width={48}
                         height={48}
                         className="w-full h-full object-cover"
                       />
                     ) : (
                       <div className="w-full h-full bg-gray-800/30 rounded-full flex items-center justify-center">
                         <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                         </svg>
                       </div>
                     )}
                   </div>
                 </div>
                
                <div>
                  <h1 className="text-xl font-bold text-white">{profile.displayName}</h1>
                  <p className="text-sm text-gray-400">{profile.subtitle}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col h-[calc(100vh-140px)]">
        <div className="flex-1 overflow-y-auto space-y-6 mb-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} items-end space-x-2`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 ${msg.role === "user" ? "ml-2" : "mr-2"}`}>
                  {msg.role === "user" ? (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">You</span>
                    </div>
                                     ) : (
                     <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${profile.color} p-0.5`}>
                       <div className="w-full h-full rounded-full overflow-hidden">
                         {profile.avatar ? (
                           <Image
                             src={profile.avatar}
                             alt={profile.displayName}
                             width={32}
                             height={32}
                             className="w-full h-full object-cover"
                           />
                         ) : (
                           <div className="w-full h-full bg-gray-800/30 rounded-full flex items-center justify-center">
                             <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                             </svg>
                           </div>
                         )}
                       </div>
                     </div>
                   )}
                </div>
                
                {/* Message Bubble */}
                <div className={`px-4 py-3 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                    : "bg-white/10 backdrop-blur-lg border border-white/20 text-white"
                } shadow-lg`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  {msg.timestamp && (
                    <p className={`text-xs mt-1 ${msg.role === "user" ? "text-purple-100" : "text-gray-400"}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  )}
                </div>
              </div>
          </div>
        ))}
          
                     {/* Loading Indicator */}
           {isLoading && (
             <div className="flex justify-start">
               <div className="flex items-end space-x-2">
                 <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${profile.color} p-0.5`}>
                   <div className="w-full h-full rounded-full overflow-hidden">
                     {profile.avatar ? (
                       <Image
                         src={profile.avatar}
                         alt={profile.displayName}
                         width={32}
                         height={32}
                         className="w-full h-full object-cover"
                       />
                     ) : (
                       <div className="w-full h-full bg-gray-800/30 rounded-full flex items-center justify-center">
                         <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                         </svg>
                       </div>
                     )}
                   </div>
                 </div>
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-3 rounded-2xl">
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

        {/* Input Area */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
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
                placeholder={`Ask ${profile.displayName} anything...`}
                className="w-full bg-transparent text-white placeholder-gray-400 resize-none border-0 outline-none max-h-32"
                rows="1"
                style={{ 
                  minHeight: '24px',
                  height: Math.min(input.split('\n').length * 24, 96) + 'px'
                }}
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{input.length}/2000</span>
          </div>
        </div>
      </main>
    </div>
  )
}
