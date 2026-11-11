import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  BookOpen,
  Users,
  GraduationCap,
  Save
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import courses from '../data/courses'
import { read, write } from '../utils/storage'

const emptyForm = {
  title: '',
  category: 'Development',
  instructor: '',
  rating: 4.5,
  level: 'Beginner',
  duration: '',
  lessons: 6,
  price: 'Free',
  image: '',
  description: ''
}

export default function Admin() {
  const [adminCourses, setAdminCourses] = useState(() =>
    read('adminCourses', courses)
  )
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const saveCourses = updatedCourses => {
    setAdminCourses(updatedCourses)
    write('adminCourses', updatedCourses)
  }

  const filteredCourses = adminCourses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.instructor.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = event => {
    const { name, value } = event.target

    setForm(previous => ({
      ...previous,
      [name]: ['rating', 'lessons'].includes(name)
        ? Number(value)
        : value
    }))
  }

  const openAddForm = () => {
    setEditingId(null)
    setForm(emptyForm)
    setError('')
    setShowForm(true)
  }

  const openEditForm = course => {
    setEditingId(course.id)
    setForm({ ...course })
    setError('')
    setShowForm(true)
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (!form.title.trim() || !form.instructor.trim() || !form.description.trim()) {
      setError('Please complete all required fields.')
      return
    }

    if (editingId !== null) {
      const updated = adminCourses.map(course =>
        course.id === editingId ? { ...form, id: editingId } : course
      )

      saveCourses(updated)
    } else {
      const newCourse = {
        ...form,
        id: Date.now()
      }

      saveCourses([...adminCourses, newCourse])
    }

    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    setError('')
  }

  const handleDelete = id => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this course?'
    )

    if (!confirmed) return

    saveCourses(adminCourses.filter(course => course.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#080d1c] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
              Administration
            </p>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Course Management
            </h1>
            <p className="mt-3 text-slate-400">
              Create, update and manage your learning courses.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold hover:bg-violet-500"
          >
            <Plus size={19} />
            Add course
          </button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#111a31] p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Total courses</p>
              <BookOpen className="text-violet-300" size={23} />
            </div>
            <p className="mt-4 text-3xl font-extrabold">{adminCourses.length}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111a31] p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Categories</p>
              <GraduationCap className="text-sky-300" size={23} />
            </div>
            <p className="mt-4 text-3xl font-extrabold">
              {new Set(adminCourses.map(course => course.category)).size}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111a31] p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Instructors</p>
              <Users className="text-emerald-300" size={23} />
            </div>
            <p className="mt-4 text-3xl font-extrabold">
              {new Set(adminCourses.map(course => course.instructor)).size}
            </p>
          </div>
        </div>

        <section className="mt-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">All courses</h2>

            <div className="flex min-w-[250px] items-center gap-3 rounded-xl border border-white/10 bg-[#111a31] px-4">
              <Search size={18} className="text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search courses..."
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111a31]">
            <table className="w-full min-w-[750px] text-left">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr className="text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-4">Course</th>
                  <th className="px-5 py-4">Instructor</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Level</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCourses.map(course => (
                  <tr
                    key={course.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-12 w-16 rounded-lg object-cover"
                        />
                        <span className="font-semibold">{course.title}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-300">
                      {course.instructor}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-300">
                      {course.category}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-300">
                      {course.level}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(course)}
                          aria-label={`Edit ${course.title}`}
                          className="rounded-lg border border-white/10 p-2 text-sky-300 hover:bg-sky-500/10"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(course.id)}
                          aria-label={`Delete ${course.title}`}
                          className="rounded-lg border border-white/10 p-2 text-rose-300 hover:bg-rose-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredCourses.length === 0 && (
              <p className="px-5 py-12 text-center text-sm text-slate-400">
                No courses found.
              </p>
            )}
          </div>
        </section>

        {showForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm">
            <div className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111a31] p-6 sm:p-8">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {editingId !== null ? 'Edit course' : 'Add new course'}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Enter the course information below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
                  aria-label="Close form"
                >
                  <X size={21} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm text-slate-300">
                    Course title *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none focus:border-violet-400"
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Instructor *
                  </label>
                  <input
                    name="instructor"
                    value={form.instructor}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none focus:border-violet-400"
                    placeholder="Instructor name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none"
                  >
                    <option>Development</option>
                    <option>Design</option>
                    <option>Technology</option>
                    <option>Business</option>
                    <option>Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Level
                  </label>
                  <select
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Duration
                  </label>
                  <input
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="8 weeks"
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none focus:border-violet-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Number of lessons
                  </label>
                  <input
                    type="number"
                    name="lessons"
                    min="1"
                    value={form.lessons}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none focus:border-violet-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none focus:border-violet-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm text-slate-300">
                    Image URL
                  </label>
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none focus:border-violet-400"
                    placeholder="https://example.com/course-image.jpg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm text-slate-300">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full resize-y rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none focus:border-violet-400"
                    placeholder="Describe this course"
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
                    {editingId !== null ? 'Save changes' : 'Create course'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/5"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}