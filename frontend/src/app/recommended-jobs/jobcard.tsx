import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Clock, MapPin, Building, DollarSign, Star, ExternalLink, Briefcase } from "lucide-react"

interface JobProps {
  job: {
    id: string
    title: string
    duration?: string
    category?: string
    instructor?: string
    company?: string
    location?: string
    salary?: string
    matchScore?: number
    skills?: string[]
    postedDate?: string
    link: string
  }
}

const JobCard = ({ job }: JobProps) => {
  // Use a default image from the public folder
  const imageSrc = job.company?.toLowerCase().includes("google")
    ? "/jobs/jobs.png"
    : job.company?.toLowerCase().includes("microsoft")
      ? "/jobs/jobs.png"
      : "/jobs/jobs.png"

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 h-full flex flex-col group">
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

        {/* Match score badge */}
        {job.matchScore && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-amber-500 text-white hover:bg-amber-600 flex items-center gap-1 px-2 py-1">
              <Star className="h-3 w-3" />
              {job.matchScore}% Match
            </Badge>
          </div>
        )}

        {/* Job image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={job.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>

          {/* Company name overlay */}
          {job.company && (
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="font-medium">{job.company}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <CardContent className="pt-4 flex-grow">
        {/* Category */}
        {job.category && (
          <div className="mb-2">
            <Badge variant="outline" className="text-xs font-medium text-primary border-primary/30">
              {job.category}
            </Badge>
          </div>
        )}

        {/* Title */}
        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">{job.title}</h3>

        {/* Job details */}
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          {/* Location */}
          {job.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
              <span>{job.location}</span>
            </div>
          )}

          {/* Instructor/Hiring Manager */}
          {job.instructor && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5 text-muted-foreground/70" />
              <span>{job.instructor}</span>
            </div>
          )}

          {/* Salary */}
          {job.salary && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground/70" />
              <span>{job.salary}</span>
            </div>
          )}

          {/* Posted date */}
          {job.postedDate && (
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
              <span>Posted {job.postedDate}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {job.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{job.skills.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 pb-4">
        <div className="flex gap-2 w-full">
          <Button asChild className="bg-gray-100 w-full" size="sm">
            <Link href={job.link} target="_blank" rel="noopener noreferrer">
              View Details
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default JobCard

