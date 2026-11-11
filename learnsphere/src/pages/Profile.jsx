import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  UserRound,
  Mail,
  BookOpen,
  Trophy,
  Target,
  Pencil,
  Save,
  X,
  ArrowRight
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import courses from '../data/courses'
import {
  read,
  write,
  getEnrolled,
  getCompletedCourses,
  getQuizResults
} from '../utils/storage'

export default function Profile() {
  const [profile, setProfile] = useState(() =>
    read('studentProfile', {
      name: 'Kavitha',
      email: 'student@example.com',
      bio: 'Passionate learner exploring new skills and opportunities.',
      location: 'Tamil Nadu, India'
    })
  )

  const [form, setForm] = useState(profile)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState('')

  const enrolled = getEnrolled()
  const completed = getCompletedCourses()
  const quizResults = Object.values(getQuizResults())
  const averageScore = quizResults.length
    ? Math.round(
        quizResults.reduce((total, result) => total + result.percentage, 0) /
        quizResults.length
      )
    : 0

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSave = event => {
    event.preventDefault()

    if (!form.name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    write('studentProfile', form)
    setProfile(form)
    setEditing(false)
    setError('')
  }

  const stats = [
    {
      label: 'Enrolled courses',
      value: enrolled.length,
      icon: BookOpen
    },
    {
      label: 'Completed courses',
      value: completed.length,
      icon: Trophy
    },
    {
      label: 'Average quiz score',
      value: `${averageScore}%`,
      icon: Target
    }
  ]

  return (
    <div className="min-h-screen bg-[#080d1c] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-14">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
            Student account
          </p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-3 text-slate-400">
            Manage your personal information and learning achievements.
          </p>
        </div>

        <section className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#111a31]">
          <div className="h-36 bg-gradient-to-r from-violet-900 via-indigo-800 to-[#182447]" />

          <div className="px-6 pb-8 sm:px-9">
            <div className="-mt-12 flex flex-wrap items-end justify-between gap-5">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[#111a31] bg-violet-600 text-3xl font-extrabold">
                  {profile.name.charAt(0).toUpperCase()}
                </div>

                <div className="pb-2">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {profile.email}
                  </p>
                </div>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={() => {
                    setForm(profile)
                    setEditing(true)
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-400/30 px-4 py-3 text-sm font-semibold text-violet-200 hover:bg-violet-500/10"
                >
                  <Pencil size={16} />
                  Edit profile
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleSave} className="mt-10 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Full name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none focus:border-violet-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Email address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none focus:border-violet-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Location
                  </label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none focus:border-violet-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    About me
                  </label>
                  <input
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none focus:border-violet-400"
                  />
                </div>

                {error && (
                  <p className="text-sm text-rose-400 sm:col-span-2">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500"
                  >
                    <Save size={17} />
                    Save changes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setForm(profile)
                      setEditing(false)
                      setError('')
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/5"
                  >
                    <X size={17} />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-10 grid gap-6 border-t border-white/10 pt-7 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    About me
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {profile.bio}
                  </p>
                </div>

                <div className="grid gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Location
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      {profile.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Email
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                      <Mail size={16} className="text-violet-300" />
                      {profile.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Learning statistics</h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map(item => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-[#111a31] p-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <Icon size={22} className="text-violet-300" />
                  </div>
                  <p className="mt-4 text-3xl font-extrabold">{item.value}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-950/60 to-[#151d3b] p-7">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 className="text-xl font-bold">Continue your learning journey</h2>
              <p className="mt-2 text-sm text-slate-400">
                Explore courses and develop your skills.
              </p>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500"
            >
              Explore courses <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}