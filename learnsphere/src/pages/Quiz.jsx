import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Trophy, RotateCcw, CheckCircle2, XCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import courses from '../data/courses'
import { lessons } from '../data/lessons'
import { getCompletedLessons, saveQuizResult } from '../utils/storage'

const questions = [
  {
    question: 'What is React?',
    options: ['A database', 'A JavaScript library', 'A programming language', 'An operating system'],
    answer: 1
  },
  {
    question: 'Which company developed React?',
    options: ['Google', 'Microsoft', 'Facebook', 'Amazon'],
    answer: 2
  },
  {
    question: 'Which method is used to create a React component?',
    options: ['Function', 'SELECT', 'PRINT', 'CREATE TABLE'],
    answer: 0
  },
  {
    question: 'What is JSX?',
    options: ['A database', 'A CSS framework', 'A JavaScript syntax extension', 'A server'],
    answer: 2
  },
  {
    question: 'Which hook manages state in a functional component?',
    options: ['useEffect', 'useState', 'useRef', 'useMemo'],
    answer: 1
  },
  {
    question: 'What is used to pass data from parent to child?',
    options: ['Props', 'Routes', 'Events', 'CSS'],
    answer: 0
  },
  {
    question: 'What is the purpose of useEffect?',
    options: ['Create styles', 'Manage side effects', 'Create HTML', 'Delete components'],
    answer: 1
  },
  {
    question: 'Which command creates a new React app using Vite?',
    options: ['npm start react', 'npm create vite@latest', 'node create app', 'react install'],
    answer: 1
  },
  {
    question: 'Which syntax is used to render a list in React?',
    options: ['forEach only', 'map()', 'switch()', 'while()'],
    answer: 1
  },
  {
    question: 'Which hook is used for context data?',
    options: ['useContext', 'useState', 'useId', 'useRef'],
    answer: 0
  }
]

export default function Quiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = courses.find(item => item.id === Number(id))

  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

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

  const completedLessons = getCompletedLessons()[id] || []
  const allLessonsCompleted = lessons.every(lesson =>
    completedLessons.includes(lesson.id)
  )

  if (!allLessonsCompleted) {
    return (
      <div className="min-h-screen bg-[#080d1c] text-white">
        <Navbar />
        <div className="px-5 py-32 text-center">
          <h1 className="text-2xl font-bold">Complete your lessons first</h1>
          <p className="mt-3 text-slate-400">
            Finish all course lessons before attempting the quiz.
          </p>
          <Link
            to={`/learn/${id}`}
            className="mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 font-bold"
          >
            Continue lessons
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const answeredCount = Object.keys(answers).length

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  )

  const percentage = Math.round((score / questions.length) * 100)
  const passed = percentage >= 60

  const handleSubmit = () => {
    if (answeredCount !== questions.length) return

    saveQuizResult(id, {
      score,
      total: questions.length,
      percentage,
      passed,
      date: new Date().toISOString()
    })

    setSubmitted(true)
  }

  const handleRetake = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-[#080d1c] text-white">
      <Navbar />

      <main className="mx-auto max-w-4xl px-5 py-12">
        <Link
          to={`/learn/${id}`}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-300"
        >
          <ArrowLeft size={17} />
          Back to lessons
        </Link>

        {!submitted ? (
          <>
            <div className="mt-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
                Course assessment
              </p>
              <h1 className="mt-3 text-3xl font-extrabold">
                {course.title} Quiz
              </h1>
              <p className="mt-3 text-slate-400">
                Answer all 10 questions. You need at least 60% to pass.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#111a31] p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Your progress</span>
                <span className="font-bold text-violet-300">
                  {answeredCount}/{questions.length} answered
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all"
                  style={{ width: `${answeredCount * 10}%` }}
                />
              </div>
            </div>

            <div className="mt-7 grid gap-6">
              {questions.map((question, index) => (
                <section
                  key={index}
                  className="rounded-2xl border border-white/10 bg-[#111a31] p-6"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-violet-300">
                    Question {index + 1}
                  </p>

                  <h2 className="mt-3 text-lg font-bold">
                    {question.question}
                  </h2>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {question.options.map((option, optionIndex) => (
                      <button
                        type="button"
                        key={option}
                        onClick={() =>
                          setAnswers(previous => ({
                            ...previous,
                            [index]: optionIndex
                          }))
                        }
                        className={`rounded-xl border p-4 text-left text-sm transition ${
                          answers[index] === optionIndex
                            ? 'border-violet-400 bg-violet-500/15 text-white'
                            : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-violet-400/40'
                        }`}
                      >
                        <span className="mr-3 font-bold text-violet-300">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={answeredCount !== questions.length}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-4 font-bold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit quiz
              <ArrowRight size={18} />
            </button>
          </>
        ) : (
          <section className="mt-12 rounded-3xl border border-white/10 bg-[#111a31] p-8 text-center sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
              <Trophy size={38} />
            </div>

            <h1 className="mt-6 text-3xl font-extrabold">
              {passed ? 'Congratulations!' : 'Keep practicing!'}
            </h1>

            <p className="mt-3 text-slate-400">
              {passed
                ? 'You successfully passed the course quiz.'
                : 'You did not reach the passing score. Try again.'}
            </p>

            <div className="mt-9 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 p-5">
                <p className="text-sm text-slate-400">Your score</p>
                <p className="mt-2 text-3xl font-extrabold text-violet-300">
                  {score}/{questions.length}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-5">
                <p className="text-sm text-slate-400">Percentage</p>
                <p className="mt-2 text-3xl font-extrabold text-violet-300">
                  {percentage}%
                </p>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-center gap-2">
              {passed ? (
                <CheckCircle2 className="text-emerald-400" />
              ) : (
                <XCircle className="text-rose-400" />
              )}
              <span className={passed ? 'text-emerald-400' : 'text-rose-400'}>
                {passed ? 'Passed — 60% or above' : 'Not passed — minimum 60% required'}
              </span>
            </div>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleRetake}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold hover:bg-white/5"
              >
                <RotateCcw size={17} />
                Retake quiz
              </button>

              <button
                type="button"
                onClick={() => navigate('/my-courses')}
                className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500"
              >
                My Learning
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}