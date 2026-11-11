import { Link } from 'react-router-dom'
import { Clock, Star, ArrowUpRight, BookOpen } from 'lucide-react'
import { motion } from 'motion/react'

export default function CourseCard({ course }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111a31] hover:border-violet-400/50 hover:shadow-xl hover:shadow-violet-950/30"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white">
          {course.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-amber-300">
            <Star size={14} fill="currentColor" />
            {course.rating}
          </span>
          <span>{course.level}</span>
        </div>

        <h3 className="mt-4 min-h-12 text-lg font-bold text-white">
          {course.title}
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          By {course.instructor}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {course.duration}
          </span>

          <span className="flex items-center gap-1">
            <BookOpen size={14} />
            {course.lessons} lessons
          </span>
        </div>

        <Link
          to={`/courses/${course.id}`}
          className="mt-5 flex items-center justify-between rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
        >
          Explore course
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </motion.article>
  )
}