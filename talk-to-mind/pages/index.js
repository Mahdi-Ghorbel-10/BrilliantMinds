import Link from "next/link"
import Image from "next/image"

const minds = [
  {
    name: "einstein",
    displayName: "Albert Einstein",
    description: "Theoretical physicist and father of modern physics",
    image: "/images/einestein.jpeg"
  },
  {
    name: "gandhi",
    displayName: "Mahatma Gandhi",
    description: "Leader of Indian independence movement and advocate of non-violence",
    image: "/images/gandhi.jpeg"
  },
  {
    name: "hawking",
    displayName: "Stephen Hawking",
    description: "Theoretical physicist and cosmologist",
    image: "/images/stephen-hawking.jpeg"
  },
  {
    name: "jobs",
    displayName: "Steve Jobs",
    description: "Visionary entrepreneur and tech innovator",
    image: "/images/stevejobs.jpeg"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">BrilliantMinds</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Chat with history's greatest minds
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have conversations with legendary thinkers, scientists, and innovators through AI
          </p>
        </div>

        {/* Minds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {minds.map((mind) => (
            <Link key={mind.name} href={`/mind/${mind.name}`}>
              <div className="group border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-pointer bg-white">
                {/* Profile Image */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={mind.image}
                    alt={mind.displayName}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
                  {mind.displayName}
                </h3>
                
                <p className="text-sm text-gray-600 text-center leading-relaxed mb-4">
                  {mind.description}
                </p>
                
                <div className="text-center">
                  <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                    Start Conversation
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features */}
        <div className="border-t border-gray-200 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">Natural Conversations</h3>
              <p className="text-sm text-gray-600">Engage in fluid dialogue with AI personalities</p>
            </div>
            
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">Historical Insights</h3>
              <p className="text-sm text-gray-600">Learn from the wisdom of great minds</p>
            </div>
            
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">Educational</h3>
              <p className="text-sm text-gray-600">Explore complex topics through conversation</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            BrilliantMinds - Connecting you with history's greatest thinkers
          </p>
        </div>
      </footer>
    </div>
  )
}
