import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Clock, Star, Users, BookOpen, GraduationCap, BarChart, Play } from "lucide-react"

interface CourseProps {
  course: {
    id: string
    title: string
    duration?: string
    category?: string
    instructor?: string
    rating?: number
    studentsEnrolled?: number
    level?: "Beginner" | "Intermediate" | "Advanced" | "All Levels"
    topics?: string[]
    lastUpdated?: string
    link: string
  }
}

const CourseCard = ({ course }: CourseProps) => {
  // Use a default image or dynamically select based on category
  const getImageSrc = () => {
    if (course.category?.toLowerCase().includes("programming")) {
      return "/courses/programming.png"
    } else if (course.category?.toLowerCase().includes("design")) {
      return "/courses/design.png"
    } else if (course.category?.toLowerCase().includes("business")) {
      return "/courses/business.png"
    }
    return "/courses/course1.png"
  }

  const imageSrc = getImageSrc()

  // Get level badge color
  const getLevelColor = () => {
    switch (course.level) {
      case "Beginner":
        return "bg-green-500 hover:bg-green-600"
      case "Intermediate":
        return "bg-blue-500 hover:bg-blue-600"
      case "Advanced":
        return "bg-purple-500 hover:bg-purple-600"
      default:
        return "bg-slate-500 hover:bg-slate-600"
    }
  }

  // Format student count
  const formatStudentCount = (count?: number) => {
    if (!count) return ""
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString()
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 h-full flex flex-col group">
      <div className="relative">
        {/* Duration badge */}
        {course.duration && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-primary text-white hover:bg-primary/90 flex items-center gap-1 px-2 py-1">
              <Clock className="h-3 w-3" />
              {course.duration}
            </Badge>
          </div>
        )}

        {/* Level badge */}
        {course.level && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className={`text-white flex items-center gap-1 px-2 py-1 ${getLevelColor()}`}>
              <BarChart className="h-3 w-3" />
              {course.level}
            </Badge>
          </div>
        )}

        {/* Course image with play button overlay */}
        <div className="relative h-48 w-full overflow-hidden group">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/60 rounded-full p-3 transform group-hover:scale-110 transition-transform">
              <Play className="h-8 w-8 text-white fill-white" />
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      <CardContent className="pt-4 flex-grow">
        {/* Category */}
        {course.category && (
          <div className="mb-2">
            <Badge variant="outline" className="text-xs font-medium text-primary border-primary/30">
              {course.category}
            </Badge>
          </div>
        )}

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        {course.instructor && (
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{course.instructor}</p>
          </div>
        )}

        {/* Course stats */}
        <div className="flex items-center gap-4 mb-3">
          {/* Rating */}
          {course.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
            </div>
          )}

          {/* Students enrolled */}
          {course.studentsEnrolled && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {formatStudentCount(course.studentsEnrolled)} students
              </span>
            </div>
          )}

          {/* Last updated */}
          {course.lastUpdated && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Updated {course.lastUpdated}</span>
            </div>
          )}
        </div>

        {/* Topics */}
        {course.topics && course.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {course.topics.slice(0, 3).map((topic, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
            {course.topics.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.topics.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 pb-4">
        <div className="flex gap-2 w-full">
          <Button asChild className="w-full" size="sm">
            <Link href={course.link} target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-1.5 h-4 w-4" />
              View Course
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CourseCard

