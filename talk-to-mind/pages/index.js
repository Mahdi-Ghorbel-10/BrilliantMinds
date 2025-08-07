import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#073B4C] text-white flex flex-col justify-center items-center">
      <h1 className="text-5xl text-[#FFD166] mb-4 font-bold">Talk to a Mind</h1>
      <p className="mb-8 text-lg">Choose a digital legacy to speak with:</p>
      <div className="space-x-4">
        <Link href="/mind/einstein" className="bg-[#06D6A0] px-4 py-2 rounded">Einstein</Link>
        <Link href="/mind/sagan" className="bg-[#06D6A0] px-4 py-2 rounded">Sagan</Link>
        <Link href="/mind/turing" className="bg-[#06D6A0] px-4 py-2 rounded">Turing</Link>
        <Link href="/mind/jobs" className="bg-[#06D6A0] px-4 py-2 rounded">Steve Jobs</Link>
      </div>
    </div>
  )
}
