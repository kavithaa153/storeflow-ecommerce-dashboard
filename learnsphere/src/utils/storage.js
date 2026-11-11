export const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getEnrolled = () => read('enrolledCourses', [])

export const getCompletedLessons = () => read('completedLessons', {})

export const getQuizResults = () => read('quizResults', {})

export const getCompletedCourses = () => read('completedCourses', [])

export const getCourseProgress = (courseId) => {
  const completed = getCompletedLessons()[courseId] || []
  return Math.round((completed.length / 6) * 100)
}

export const markLessonComplete = (courseId, lessonId) => {
  const all = getCompletedLessons()
  const current = all[courseId] || []

  if (!current.includes(lessonId)) {
    all[courseId] = [...current, lessonId]
  }

  write('completedLessons', all)

  const progress = Object.fromEntries(
    Object.keys(all).map(id => [
      id,
      Math.round((all[id].length / 6) * 100)
    ])
  )

  write('courseProgress', progress)

  if (all[courseId].length >= 6) {
    const completedCourses = getCompletedCourses()
    const numericId = Number(courseId)

    if (!completedCourses.includes(numericId)) {
      write('completedCourses', [...completedCourses, numericId])
    }
  }
}

export const saveQuizResult = (courseId, result) => {
  const results = getQuizResults()

  results[courseId] = result
  write('quizResults', results)

  if (result.percentage >= 60) {
    const completed = getCompletedCourses()
    const numericId = Number(courseId)

    if (!completed.includes(numericId)) {
      write('completedCourses', [...completed, numericId])
    }
  }
}