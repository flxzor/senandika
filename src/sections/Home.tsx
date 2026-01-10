import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-(--background)">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl text-(--prime-color) font-bold leading-tight">
          Welcome to Space of Senandika
        </h1>

       <h2 className="text-2xl md:text-4xl mt-4 text-(--text-color) font-medium">
        Merangkai Karya, Merawat Jiwa
       </h2>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-(--btn-bg) hover:bg-(--btn-hover) text-white font-medium transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home