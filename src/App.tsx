function App() {
    const handleClick = () => {
        window.open('https://github.com/Harshit-Bafna/React-Project-Setup', '_blank')
    }

    return (
        <div className='bg-gradient-to-br from-gray-950 via-black to-gray-800 h-screen w-screen flex items-center justify-center p-4'>
            <div className='bg-gray-900 bg-opacity-80 p-10 md:p-16 rounded-3xl shadow-2xl text-white text-center max-w-xl animate-fadeIn'>
                <h1 className='text-4xl md:text-6xl font-extrabold mb-6 leading-tight'>🚀 React Project Setup</h1>
                <p className='text-gray-300 text-lg md:text-xl mb-8'>Kickstart your next big idea with a solid React foundation.</p>
                <button
                    onClick={handleClick}
                    className='bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-md'>
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default App
