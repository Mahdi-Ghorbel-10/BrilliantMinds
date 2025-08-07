import Link from "next/link"
import Image from "next/image"

const minds = [
  {
    name: "einstein",
    displayName: "Albert Einstein",
    description: "Theoretical physicist and father of modern physics",
    specialty: "Physics & Philosophy",
    image: "/images/einestein.jpeg"
  },
  {
    name: "sagan",
    displayName: "Carl Sagan",
    description: "Astronomer, cosmologist, and science communicator",
    specialty: "Astronomy & Cosmos",
    image: "/images/carlsagan.jpeg"
  },
  {
    name: "turing",
    displayName: "Alan Turing",
    description: "Computer scientist and cryptanalyst",
    specialty: "Computing & Mathematics",
    image: "/images/alanturin.jpeg"
  },
  {
    name: "jobs",
    displayName: "Steve Jobs",
    description: "Visionary entrepreneur and tech innovator",
    specialty: "Innovation & Design",
    image: "/images/stevejobs.jpeg"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BM</span>
            </div>
            <span className="text-white font-semibold text-xl">BrilliantMinds</span>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Talk to Brilliant Minds
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Engage in meaningful conversations with history's greatest thinkers
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Experience the wisdom of legendary minds through AI-powered conversations
          </p>

          {/* Minds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {minds.map((mind) => (
              <Link key={mind.name} href={`/mind/${mind.name}`}>
                <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/30 cursor-pointer">
                  {/* Profile Image */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 group-hover:shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={mind.image}
                        alt={mind.displayName}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {mind.displayName}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                    {mind.description}
                  </p>
                  
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-medium">
                    {mind.specialty}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center text-purple-300 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Start Conversation</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Features Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Natural Conversations</h3>
              <p className="text-gray-400">Engage in fluid, natural dialogue with AI personalities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Historical Insights</h3>
              <p className="text-gray-400">Learn from the wisdom and perspectives of great minds</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Educational Experience</h3>
              <p className="text-gray-400">Explore complex topics through interactive learning</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 BrilliantMinds. Connecting you with history's greatest thinkers.</p>
        </div>
      </footer>
    </div>
  )
}
