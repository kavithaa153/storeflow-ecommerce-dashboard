import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import MyCourses from './pages/MyCourses'
import LessonViewer from './pages/LessonViewer'
import Quiz from './pages/Quiz'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/learn/:id" element={<LessonViewer />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}