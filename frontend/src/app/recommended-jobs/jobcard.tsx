import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Clock } from "lucide-react";

interface CourseProps {
  course: {
    id: string;
    title: string;
    duration?: string;
    category?: string;
    instructor?: string;
    link: string;
  };
}

const CourseCard = ({ course }: CourseProps) => {
  // Use a default image from the public folder
  const imageSrc = "/jobs/jobs1.png";

  return (
    <Link href={course.link} target="_blank" rel="noopener noreferrer">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 h-full flex flex-col">
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
          {/* Course image */}
          <div className="relative h-48 w-full">
            <Image
              src={imageSrc}
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
          {course.instructor && (
            <p className="text-sm text-gray-500">{course.instructor}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
