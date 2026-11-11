import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  PlayCircle,
  Users,
  Award,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { motion } from 'motion/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CourseCard from '../components/CourseCard'
import courses from '../data/courses'

export default function Home() {
  const featuredCourses = courses.slice(0, 3)

  const features = [
    {
      icon: BookOpen,
      title: 'Expert-led courses',
      description: 'Learn practical skills through structured lessons created by experienced instructors.'
    },
    {
      icon: Users,
      title: 'Learn at your pace',
      description: 'Study whenever you want and continue from where you left off.'
    },
    {
      icon: Award,
      title: 'Track your progress',
      description: 'Monitor completed lessons, quiz scores and your learning achievements.'
    }
  ]

  return (
    <div className="min-h-screen overflow-hidden bg-[#080d1c] text-white">
      <Navbar />

      <section className="relative flex min-h-[680px] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=2000"
            alt="Students learning together"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080d1c] via-[#080d1c]/90 to-[#080d1c]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080d1c] via-transparent to-[#080d1c]/30" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
              <Sparkles size={16} />
              Your learning journey starts here
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Learn skills.
              <span className="block text-violet-400">Build your future.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Discover practical courses, learn from expert instructors and
              build the confidence to achieve your career goals.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-bold text-white transition hover:bg-violet-500"
              >
                Explore Courses
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/my-courses"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                <PlayCircle size={18} />
                My Learning
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8">
              <div>
                <p className="text-2xl font-extrabold">6+</p>
                <p className="mt-1 text-sm text-slate-400">Learning courses</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold">24/7</p>
                <p className="mt-1 text-sm text-slate-400">Flexible learning</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold">100%</p>
                <p className="mt-1 text-sm text-slate-400">Learn at your pace</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden justify-center lg:flex"
          >
            <div className="max-w-sm rounded-3xl border border-white/15 bg-[#111a31]/80 p-6 shadow-2xl shadow-violet-950/40 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Learning dashboard</p>
                  <h3 className="mt-1 text-xl font-bold">Keep growing</h3>
                </div>
                <span className="rounded-xl bg-violet-500/15 p-3 text-violet-300">
                  <GraduationCap size={25} />
                </span>
              </div>

              <div className="mt-7 rounded-2xl bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Your next step</span>
                  <span className="text-xs text-violet-300">Start today</span>
                </div>
                <h4 className="mt-3 text-lg font-bold">Explore a new course</h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Choose a learning path and build a skill one lesson at a time.
                </p>
                <Link
                  to="/courses"
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold hover:bg-violet-500"
                >
                  Browse courses <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-5 flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-emerald-400" />
                Learn at your own pace
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
            Why LearnSphere
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            A better way to learn
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
            Everything you need to make learning simple, flexible and meaningful.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#111a31] p-7 transition hover:border-violet-400/40"
              >
                <div className="inline-flex rounded-xl bg-violet-500/15 p-3 text-violet-300">
                  <Icon size={25} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
              Featured learning
            </p>
            <h2 className="mt-3 text-3xl font-extrabold">
              Popular courses
            </h2>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200"
          >
            View all courses <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="mx-5 mt-16 rounded-3xl border border-violet-400/20 bg-gradient-to-r from-violet-950/70 to-[#151d3b] px-6 py-16 text-center sm:mx-auto sm:max-w-7xl sm:px-12">
        <h2 className="text-3xl font-extrabold sm:text-4xl">
          Ready to start learning?
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
          Take the next step in your learning journey. Find a course and start building your future.
        </p>
        <Link
          to="/courses"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 font-bold hover:bg-violet-500"
        >
          Get Started <ArrowRight size={18} />
        </Link>
      </section>

      <Footer />
    </div>
  )
}