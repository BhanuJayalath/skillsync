import { useState } from "react";

interface Course {
    id: number;
    title: string;
    description: string;
    price: string;
    enrolled: number;
  }

export default function CoursesManagement() {
    const [courses] = useState<Course[]>([
        { id: 1, title: "Course 01", description: "Intro to Programming", price: "$49", enrolled: 120 },
        { id: 2, title: "Course 02", description: "Advanced JavaScript", price: "$79", enrolled: 85 },
      ]);

    return (
        <div className="courses-container">
          <h2>Courses Management</h2>

            <div className="courses-list">
                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p><strong>Price:</strong> {course.price}</p>
                        <p><strong>Enrolled:</strong> {course.enrolled} students</p>
                    </div>
                ))}
            </div>
        </div>
    );
}