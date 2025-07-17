import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ReportList from './components/ReportList'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-white dark:bg-dark-bg-primary">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main Content */}
          <div className="flex flex-col flex-1 w-full">
            {/* Header */}
            <header className="z-10 py-4 bg-white shadow-md dark:bg-dark-bg-secondary">
              <div className="container flex items-center justify-between h-full px-6 mx-auto">
                {/* Mobile hamburger */}
                <button
                  className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-perceive-purple"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  aria-label="Menu"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-dark-text-secondary"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>

                <div className="flex justify-center flex-1 lg:mr-32">
                  <h2 className="text-2xl font-bold text-perceive-purple dark:text-perceive-gold">
                    Perceive Now Report Viewer
                  </h2>
                </div>
              </div>
            </header>

            {/* Main content */}
            <main className="h-full overflow-y-auto bg-gray-50 dark:bg-dark-bg-primary">
              <div className="container px-6 mx-auto grid">
                <Routes>
                  <Route path="/" element={<ReportList />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App 