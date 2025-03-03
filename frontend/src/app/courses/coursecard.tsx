import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Clock } from "lucide-react";

interface CourseProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    duration?: string;
    category?: string;
    link?: string; // URL for redirection
  };
}

const CourseCard = ({ course }: CourseProps) => {
  return (
    <Link href={course.link || "#"} passHref>
      <a className="block">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 h-full flex flex-col">
          <div className="relative">
            {/* Duration badge positioned on top of the image */}
            {course.duration && (
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-primary text-white hover:bg-primary/90 flex items-center gap-1 px-2 py-1">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </Badge>
              </div>
            )}

            {/* Course image - using the public folder path */}
            <div className="relative h-48 w-full">
              <Image
                src="/courses/course2.png"
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <CardContent className="pt-4">
            {/* Category */}
            {course.category && (
              <div className="mb-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {course.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="font-bold text-lg mb-1 line-clamp-2">{course.title}</h3>

            {/* Instructor */}
            <p className="text-sm text-gray-500">{course.instructor}</p>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
