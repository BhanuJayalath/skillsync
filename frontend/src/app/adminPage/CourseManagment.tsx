import { useState } from "react";

interface Course {
    id: number;
    title: string;
    description: string;
    price: string;
    enrolled: number;
  }

export default function CoursesManagement() {
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, title: "Course 01", description: "Intro to Programming", price: "$49", enrolled: 120 },
        { id: 2, title: "Course 02", description: "JavaScript", price: "$79", enrolled: 85 },
        { id: 3, title: "Course 03", description: "Advanced JavaScript", price: "$99", enrolled: 55 },
        { id: 4, title: "Course 04", description: "CSS", price: "$79", enrolled: 105 },
      ]);

    const handleDeleteCourse = (id: number) => {
        setCourses(courses.filter(course => course.id !== id));
    };

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
                        <button className="delete-button" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}