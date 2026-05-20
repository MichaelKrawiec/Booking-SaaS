function App() {
  return (
    <div className="min-h-screen bg-red-100">

      <h1 className="flex flex-col items-center justify-center gap-16 text-center  pt-6 text-4xl font-black">

        {/* Text - Pulses independently with the gradient */}
        <span className="animate-pulse py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          Booking Saas with a Heartbeat!
        </span>

        {/* SVG Graphic - Centered underneath and bouncing independently */}
        <svg 
          xmlns="http://w3.org" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-28 h-28 text-pink-600 shrink-0 animate-bounce"
        >
          <path 
            fillRule="evenodd" 
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" 
            clipRule="evenodd"/>
        </svg>
      </h1>
    </div>
    
  )
}

export default App