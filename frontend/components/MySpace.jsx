import Link from 'next/link'
import React from 'react'

const MySpace = () => {
  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 overflow-x-hidden">

      <div className="w-full max-w-md mx-auto text-center space-y-5 bg-gradient-to-b from-zinc-900/50 to-zinc-950 p-8 rounded-2xl shadow-2xl">
        
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-wide text-zinc-100">
            Login to JioHotStar
          </h2>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-medium">
            Start watching from where you left off, personalized for kids and more.
          </p>
        </div>

        <div className="pt-2">
          <Link 
            href="" 
            className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] tracking-wide text-base shadow-lg shadow-blue-900/20"
          >
            Login
          </Link>
        </div>

      </div>

    </div>
  )
}

export default MySpace