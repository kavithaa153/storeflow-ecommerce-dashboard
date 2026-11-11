import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GraduationCap, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'My Learning', path: '/my-courses' },
    { label: 'Profile', path: '/profile' }
  ]

  const linkStyle = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-violet-300'
        : 'text-slate-300 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1125]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold">
          <GraduationCap size={28} className="text-violet-400" />
          LearnSphere<span className="text-violet-400">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={linkStyle}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/admin"
          className="hidden rounded-xl border border-violet-400/30 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/10 md:block"
        >
          Admin
        </Link>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="grid gap-4 border-t border-white/10 bg-[#10172f] px-5 py-5 md:hidden">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setOpen(false)}
              className={linkStyle}
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-violet-300"
          >
            Admin
          </Link>
        </nav>
      )}
    </header>
  )
}