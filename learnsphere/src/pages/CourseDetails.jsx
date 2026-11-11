import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Star,
  CheckCircle2,
  PlayCircle,
  GraduationCap
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import courses from '../data/courses'
import { lessons } from '../data/lessons'
import { getEnrolled, write } from '../utils/storage'

export default function CourseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = courses.find(item => item.id === Number(id))

  const [enrolled, setEnrolled] = useState(
    getEnrolled().includes(Number(id))
  )

  const handleEnroll = () => {
    const current = getEnrolled()

    if (!current.includes(Number(id))) {
      write('enrolledCourses', [...current, Number(id)])
    }

    setEnrolled(true)
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#080d1c] text-white">
        <Navbar />
        <div className="px-5 py-32 text-center">
          <h1 className="text-3xl font-bold">Course not found</h1>
          <Link to="/courses" className="mt-6 inline-block text-violet-300">
            Back to courses
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080d1c] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-12">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-300"
        >
          <ArrowLeft size={17} />
          Back to courses
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <section>
            <span className="rounded-lg bg-violet-500/15 px-3 py-2 text-xs font-bold text-violet-300">
              {course.category}
            </span>

            <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-5xl">
              {course.title}
            </h1>

            <p className="mt-5 max-w-3xl leading-8 text-slate-400">
              {course.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-6 text-sm text-slate-300">
              <span className="flex items-center gap-2 text-amber-300">
                <Star size={17} fill="currentColor" />
                {course.rating} rating
              </span>
              <span className="flex items-center gap-2">
                <Clock size={17} />
                {course.duration}
              </span>
              <span className="flex items-center gap-2">
                <BookOpen size={17} />
                {course.lessons} lessons
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap size={17} />
                {course.level}
              </span>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
              <img
                src={course.image}
                alt={course.title}
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">What you will learn</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  'Understand the core concepts',
                  'Practice with real examples',
                  'Build reusable solutions',
                  'Learn development best practices'
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">Course curriculum</h2>

              <div className="mt-6 grid gap-3">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#111a31] p-4"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-sm font-bold text-violet-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-white">
                          {lesson.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          {lesson.duration}
                        </p>
                      </div>
                    </div>

                    <PlayCircle size={20} className="shrink-0 text-violet-300" />
                  </div>
                ))}
              </div>
            </section>
          </section>

          <aside>
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#111a31] p-6">
              <img
                src={course.image}
                alt={course.title}
                className="h-44 w-full rounded-xl object-cover"
              />

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-slate-400">Course access</span>
                <span className="text-xl font-extrabold text-emerald-400">
                  {course.price}
                </span>
              </div>

              <div className="mt-6 grid gap-4 border-y border-white/10 py-5 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Instructor</span>
                  <span className="font-semibold text-white">{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold text-white">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lessons</span>
                  <span className="font-semibold text-white">{course.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Level</span>
                  <span className="font-semibold text-white">{course.level}</span>
                </div>
              </div>

              {enrolled ? (
                <button
                  type="button"
                  onClick={() => navigate(`/learn/${course.id}`)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white transition hover:bg-emerald-500"
                >
                  Continue learning
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEnroll}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-4 font-bold text-white transition hover:bg-violet-500"
                >
                  Enroll in course
                  <ArrowRight size={18} />
                </button>
              )}

              <p className="mt-4 text-center text-xs text-slate-500">
                Your learning progress is saved in this browser.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}