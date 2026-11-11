import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  PlayCircle,
  BookOpen,
  Trophy
} from 'lucide-react'
import Navbar from '../components/Navbar'
import { lessons } from '../data/lessons'
import courses from '../data/courses'
import {
  getEnrolled,
  getCompletedLessons,
  markLessonComplete
} from '../utils/storage'

export default function LessonViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = courses.find(item => item.id === Number(id))

  const [activeLesson, setActiveLesson] = useState(0)
  const [completed, setCompleted] = useState(
    getCompletedLessons()[id] || []
  )

  if (!course) {
    return (
      <div className="min-h-screen bg-[#080d1c] p-10 text-center text-white">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link to="/courses" className="mt-5 inline-block text-violet-300">
          Browse courses
        </Link>
      </div>
    )
  }

  if (!getEnrolled().includes(Number(id))) {
    return (
      <div className="min-h-screen bg-[#080d1c] text-white">
        <Navbar />
        <div className="px-5 py-32 text-center">
          <h1 className="text-2xl font-bold">You are not enrolled</h1>
          <p className="mt-3 text-slate-400">
            Enroll in this course before accessing the lessons.
          </p>
          <Link
            to={`/courses/${id}`}
            className="mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 font-bold"
          >
            View course
          </Link>
        </div>
      </div>
    )
  }

  const lesson = lessons[activeLesson]
  const progress = Math.round((completed.length / lessons.length) * 100)

  const handleComplete = () => {
    markLessonComplete(id, lesson.id)
    setCompleted(getCompletedLessons()[id] || [])
  }

  const handleNext = () => {
    if (activeLesson < lessons.length - 1) {
      setActiveLesson(activeLesson + 1)
    }
  }

  const handlePrevious = () => {
    if (activeLesson > 0) {
      setActiveLesson(activeLesson - 1)
    }
  }

  return (
    <div className="min-h-screen bg-[#080d1c] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-10">
        <Link
          to="/my-courses"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-300"
        >
          <ArrowLeft size={17} />
          Back to my courses
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <section>
            <div className="mb-6">
              <p className="text-sm font-semibold text-violet-300">
                {course.category}
              </p>
              <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                {course.title}
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Lesson {activeLesson + 1} of {lessons.length}
              </p>
            </div>

            <div className="flex aspect-video flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950 via-[#172044] to-[#080d1c] p-6 text-center">
              <div className="rounded-full bg-violet-500/20 p-5 text-violet-300">
                <PlayCircle size={48} />
              </div>
              <h2 className="mt-5 text-xl font-bold">{lesson.title}</h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">
                {lesson.description}
              </p>
              <span className="mt-4 rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300">
                Lesson duration: {lesson.duration}
              </span>
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-[#111a31] p-6">
              <h2 className="text-xl font-bold">About this lesson</h2>
              <p className="mt-3 leading-7 text-slate-400">
                {lesson.description} Follow the lesson in order and complete
                each section to track your learning progress.
              </p>

              <button
                type="button"
                onClick={handleComplete}
                disabled={completed.includes(lesson.id)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-900"
              >
                <CheckCircle2 size={18} />
                {completed.includes(lesson.id) ? 'Lesson completed' : 'Mark as completed'}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={activeLesson === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 disabled:opacity-40"
              >
                <ArrowLeft size={17} />
                Previous lesson
              </button>

              {activeLesson === lessons.length - 1 ? (
                <button
                  type="button"
                  onClick={() => navigate(`/quiz/${id}`)}
                  disabled={completed.length !== lessons.length}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Take course quiz
                  <Trophy size={17} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500"
                >
                  Next lesson
                  <ArrowRight size={17} />
                </button>
              )}
            </div>
          </section>

          <aside className="h-fit rounded-2xl border border-white/10 bg-[#111a31] p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Course content</h2>
              <BookOpen size={19} className="text-violet-300" />
            </div>

            <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
              <span>Your progress</span>
              <span className="font-bold text-white">{progress}%</span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-violet-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-400">
              {completed.length} of {lessons.length} lessons completed
            </p>

            <div className="mt-6 grid gap-2">
              {lessons.map((item, index) => {
                const isCompleted = completed.includes(item.id)
                const isActive = activeLesson === index

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActiveLesson(index)}
                    className={`flex items-center gap-3 rounded-xl p-3 text-left transition ${
                      isActive
                        ? 'border border-violet-400/30 bg-violet-500/10'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={19} className="shrink-0 text-emerald-400" />
                    ) : (
                      <Circle size={19} className="shrink-0 text-slate-500" />
                    )}

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-200">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        {item.duration}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}