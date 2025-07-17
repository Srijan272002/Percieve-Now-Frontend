import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeSwitch from './ThemeSwitch';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <aside
      className={`z-20 h-full bg-white dark:bg-dark-bg-secondary overflow-y-auto transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-0 md:w-64'
      }`}
    >
      <div className="py-4 text-gray-500 dark:text-dark-text-secondary">
        <div className="flex items-center justify-between px-6">
          <Link to="/" className="ml-6">
            <div className="flex items-center">
              <span className="text-lg font-bold font-serif text-perceive-purple dark:text-perceive-gold">
                Perceive Now
              </span>
            </div>
          </Link>
          <button
            className="md:hidden p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-perceive-purple dark:focus:ring-perceive-gold"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="mt-6">
          <ul className="font-serif">
            <li className="relative px-6 py-3">
              <span
                className="absolute inset-y-0 left-0 w-1 bg-perceive-purple dark:bg-perceive-gold rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
              <Link
                to="/"
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-perceive-purple dark:text-perceive-gold"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <span className="ml-4">Reports</span>
              </Link>
            </li>
          </ul>
          <div className="px-6 mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium font-serif">
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
              <ThemeSwitch />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 