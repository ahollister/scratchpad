import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Posts from './components/Posts'
import New from './components/New'
import Edit from './components/Edit'
import IconAdd from './icons/IconAdd'
import IconSun from './icons/IconSun'
import IconMoon from './icons/IconMoon'

export default function App() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [isDark])

  const toggleDark = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="dark:bg-zinc-900 dark:text-white min-h-screen p-6 md:p-10 pt-20">
      <header className="flex fixed top-0 right-0">
        <button
          className="w-8 dark:w-10 p-2 bg-transparent fill-gray-600 dark:fill-gray-400 hover:fill-gray-400"
          onClick={toggleDark}
          title={isDark ? 'Light Mode' : 'Dark Mode'}
        >
          {isDark ? <IconSun /> : <IconMoon />}
        </button>
        <Link
          className="inline-block w-14 p-2 bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-400 uppercase font-bold"
          to="/new"
          title="Add New"
        >
          <IconAdd />
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/new" element={<New isDark={isDark} />} />
          <Route path="/edit/:id" element={<Edit isDark={isDark} />} />
        </Routes>
      </main>
    </div>
  )
}
