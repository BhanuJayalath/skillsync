"use client"

import type React from "react"

import { useEffect, useState, type ChangeEvent } from "react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Search, BookOpen, Loader2 } from "lucide-react"
import CourseCard from "./coursecard"

const API_URL = "http://www.example.com/api/courses" // Replace with your actual courses API endpoint

const Page = () => {
  const [courses, setCourses] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const searchCourses = async (title: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}?search=${title}`)
      const data = await response.json()
      setCourses(data?.courses || [])
    } catch (error) {
      console.error("Error fetching courses:", error)
      setCourses([])
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-primary py-16 px-4 sm:px-6 lg:px-8 text-blue-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-center">Discover Your Next Course</h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Expand your knowledge with our extensive library of high-quality courses
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                className="pl-10 border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
            <Button
              onClick={() => searchCourses(searchTerm)}
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <BookOpen className="text-primary mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Available Courses</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : courses?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-600">No courses found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page

