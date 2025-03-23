import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Clock } from "lucide-react";
import "./JobRecommendations.css";

interface JobProps {
  job: {
    id: string;
    title: string;
    duration?: string;
    category?: string;
    instructor?: string;
    link: string;
  };
}

const JobCard = ({ job }: JobProps) => {
  // Use a default image from the public folder
  const imageSrc = "/jobs/jobs1.png";

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 h-full flex flex-col">
      <div className="relative">
        {/* Duration badge */}
        {job.duration && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-primary text-white hover:bg-primary/90 flex items-center gap-1 px-2 py-1">
              <Clock className="h-3 w-3" />
              {job.duration}
            </Badge>
          </div>
        )}
        {/* Job image */}
        <div className="relative h-48 w-full">
          <Image
            src={imageSrc}
            alt={job.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <CardContent className="pt-4 flex flex-col flex-grow">
        {/* Category */}
        {job.category && (
          <div className="mb-2">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {job.category}
            </span>
          </div>
        )}
        {/* Title */}
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{job.title}</h3>
        {/* Instructor */}
        {job.instructor && (
          <p className="text-sm text-gray-500 mb-4">{job.instructor}</p>
        )}

        {/* View Details Button */}
        <Link
        href={job.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto bg-blue-300 hover:bg-blue-400 text-white !text-white text-center py-2 px-4 rounded transition-all duration-300"
      >
        View Details
        </Link>

              </CardContent>
            </Card>
  );
};

export default JobCard;
