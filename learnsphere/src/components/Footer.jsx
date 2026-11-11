import { GraduationCap, Mail, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0b1125]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold">
            <GraduationCap size={27} className="text-violet-400" />
            LearnSphere<span className="text-violet-400">.</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            Learn new skills, build confidence and move forward with a learning experience designed for you.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white">Explore</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <Link to="/courses" className="transition hover:text-violet-300">Course catalogue</Link>
            <Link to="/my-courses" className="transition hover:text-violet-300">My courses</Link>
            <Link to="/profile" className="transition hover:text-violet-300">Student profile</Link>
            <Link to="/admin" className="transition hover:text-violet-300">Admin dashboard</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Stay connected</h3>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
            <Mail size={16} />
            hello@learnsphere.example
          </p>
          <Link to="/courses" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300">
            Start learning <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} LearnSphere. All rights reserved.
      </div>
    </footer>
  )
}