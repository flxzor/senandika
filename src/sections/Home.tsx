import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-senandika">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl text-senandika-bold font-bold leading-tight">
          Welcome to Space of Senandika
        </h1>

       <h2 className="text-2xl md:text-4xl mt-4 text-senandika">
        Merangkai Karya, Merawat Jiwa
       </h2>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-800 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home