import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react'
import { motion } from 'motion/react'
import courses from '../data/courses'
import CourseCard from './CourseCard'

const categories = [
  'All',
  'Development',
  'Design',
  'Technology',
  'Business'
]

export default function CourseCatalogue() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('popular')

  const filteredCourses = useMemo(() => {
    let result = courses.filter(course => {
      const searchText = search.toLowerCase()

      const matchesSearch =
        course.title.toLowerCase().includes(searchText) ||
        course.instructor.toLowerCase().includes(searchText) ||
        course.category.toLowerCase().includes(searchText)

      const matchesCategory =
        category === 'All' || course.category === category

      return matchesSearch && matchesCategory
    })

    if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sort === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [search, category, sort])

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
    setSort('popular')
  }

  return (
    <section className="catalogue-section" id="catalogue">
      <div className="section-heading">
        <div>
          <span className="section-label">
            DISCOVER YOUR POTENTIAL
          </span>

          <h2>
            Explore Our <span>Courses</span>
          </h2>

          <p>
            Find the right learning path for your career.
          </p>
        </div>

        <span className="course-count">
          <BookOpen size={17} />
          {filteredCourses.length} Courses Found
        </span>
      </div>

      <div className="catalogue-toolbar">
        <div className="search-box">
          <Search size={19} />

          <input
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search courses or instructors..."
            aria-label="Search courses"
          />
        </div>

        <div className="sort-box">
          <SlidersHorizontal size={17} />

          <select
            value={sort}
            onChange={event => setSort(event.target.value)}
            aria-label="Sort courses"
          >
            <option value="popular">Popular</option>
            <option value="rating">Highest Rating</option>
            <option value="name">Course Name</option>
          </select>
        </div>
      </div>

      <div className="category-list">
        {categories.map(item => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={
              category === item
                ? 'category-btn selected'
                : 'category-btn'
            }
          >
            {item}
          </button>
        ))}
      </div>

      <div className="course-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
            />
          ))
        ) : (
          <motion.div
            className="empty-courses"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Search size={35} />

            <h3>No courses found</h3>

            <p>
              Try another search or select a different category.
            </p>

            <button onClick={clearFilters}>
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}