import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CourseCard from '../components/CourseCard'
import courses from '../data/courses'

export default function Courses() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('popular')

  const categories = ['All', ...new Set(courses.map(course => course.category))]

  const filteredCourses = useMemo(() => {
    let result = courses.filter(course => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        category === 'All' || course.category === category

      return matchesSearch && matchesCategory
    })

    if (sort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    }

    if (sort === 'name') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [search, category, sort])

  return (
    <div className="min-h-screen bg-[#080d1c] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
            Explore LearnSphere
          </p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Discover your next course
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            Explore practical courses and develop skills that help you reach your goals.
          </p>
        </div>

        <div className="mb-7 grid gap-4 md:grid-cols-[1fr_220px]">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111a31] px-4">
            <Search size={19} className="text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search courses or instructors..."
              className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111a31] px-4">
            <SlidersHorizontal size={18} className="text-slate-400" />
            <select
              value={sort}
              onChange={event => setSort(event.target.value)}
              className="w-full bg-transparent py-4 text-sm text-white outline-none"
            >
              <option value="popular" className="bg-[#111a31]">Most popular</option>
              <option value="rating" className="bg-[#111a31]">Highest rated</option>
              <option value="name" className="bg-[#111a31]">Course name</option>
            </select>
          </div>
        </div>

        <div className="mb-9 flex flex-wrap gap-3">
          {categories.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? 'border-violet-500 bg-violet-600 text-white'
                  : 'border-white/10 bg-[#111a31] text-slate-300 hover:border-violet-400/50'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            {filteredCourses.length} courses found
          </p>
          <span className="flex items-center gap-2 text-sm text-slate-400">
            <BookOpen size={16} />
            Learn at your own pace
          </span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#111a31] px-6 py-16 text-center">
            <Search size={35} className="mx-auto text-slate-500" />
            <h2 className="mt-4 text-xl font-bold">No courses found</h2>
            <p className="mt-2 text-sm text-slate-400">
              Try another search term or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setCategory('All')
              }}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}