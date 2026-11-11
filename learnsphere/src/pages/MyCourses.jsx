import { Link } from 'react-router-dom'
import { BookOpen, Clock, PlayCircle, Trophy, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import courses from '../data/courses'
import { getEnrolled, getCourseProgress, getCompletedCourses } from '../utils/storage'

export default function MyCourses() {
  const enrolledIds = getEnrolled()
  const completedIds = getCompletedCourses()

  const enrolledCourses = courses.filter(course =>
    enrolledIds.includes(course.id)
  )

  const completedCount = enrolledCourses.filter(course =>
    completedIds.includes(course.id)
  ).length

  const averageProgress = enrolledCourses.length
    ? Math.round(
        enrolledCourses.reduce(
          (total, course) => total + getCourseProgress(course.id),
          0
        ) / enrolledCourses.length
      )
    : 0

  return (
    <div className="min-h-screen bg-[#080d1c] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-14">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
            Student dashboard
          </p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            My Learning
          </h1>
          <p className="mt-3 text-slate-400">
            Continue your courses and track your learning progress.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#111a31] p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Enrolled courses</span>
              <BookOpen className="text-violet-300" size={23} />
            </div>
            <p className="mt-4 text-3xl font-extrabold">{enrolledCourses.length}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111a31] p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Completed courses</span>
              <Trophy className="text-emerald-400" size={23} />
            </div>
            <p className="mt-4 text-3xl font-extrabold">{completedCount}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111a31] p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Average progress</span>
              <Clock className="text-sky-300" size={23} />
            </div>
            <p className="mt-4 text-3xl font-extrabold">{averageProgress}%</p>
          </div>
        </div>

        <section className="mt-14">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Your enrolled courses</h2>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200"
            >
              Explore more <ArrowRight size={17} />
            </Link>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {enrolledCourses.map(course => {
                const progress = getCourseProgress(course.id)
                const isCompleted = completedIds.includes(course.id)

                return (
                  <article
                    key={course.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-[#111a31] transition hover:border-violet-400/40"
                  >
                    <div className="grid sm:grid-cols-[180px_1fr]">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-48 w-full object-cover sm:h-full"
                      />

                      <div className="p-5">
                        <span className="text-xs font-semibold text-violet-300">
                          {course.category}
                        </span>

                        <h3 className="mt-2 text-lg font-bold">
                          {course.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          By {course.instructor}
                        </p>

                        <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                          <span>Course progress</span>
                          <span className="font-bold text-white">{progress}%</span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-violet-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <Link
                          to={`/learn/${course.id}`}
                          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold hover:bg-violet-500"
                        >
                          {isCompleted ? 'Review course' : 'Continue learning'}
                          <PlayCircle size={17} />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#111a31] px-6 py-16 text-center">
              <BookOpen size={40} className="mx-auto text-violet-300" />
              <h3 className="mt-5 text-xl font-bold">No enrolled courses yet</h3>
              <p className="mt-2 text-sm text-slate-400">
                Explore the catalogue and enroll in your first course.
              </p>
              <Link
                to="/courses"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500"
              >
                Browse courses <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}