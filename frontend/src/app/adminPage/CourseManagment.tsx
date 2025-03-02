import { useState } from "react";
import styles from "./adminPage.module.css";

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

    const [newCourse, setNewCourse] = useState<Course>({ id: 0, title: "", description: "", price: "", enrolled: 0 });

    const handleAddCourse = () => {
        if (!newCourse.title || !newCourse.description || !newCourse.price) return;
        const courseWithId = { ...newCourse, id: Date.now() };
        setCourses([...courses, courseWithId]);
        setNewCourse({ id: 0, title: "", description: "", price: "", enrolled: 0 });
    };
    

    const handleDeleteCourse = (id: number) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    return (
        <div className={styles.coursesSection}>
          <h2>Courses Management</h2>

            <div className="add-course-form">
                <input type="text" placeholder="Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
                <input type="text" placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
                <input type="text" placeholder="Price" value={newCourse.price} onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })} />
                <button onClick={handleAddCourse}>Add Course</button>
            </div>

            <div className={styles.coursesList2}>
                {courses.map((course) => (
                    <div key={course.id} className={styles.courseItem2}>
                        <h5 className={styles.courseName}>{course.title}</h5>
                        <div>
                            <p>{course.description}</p>
                            <p><strong>Price:</strong> {course.price}</p>
                            <p><strong>Enrolled:</strong> {course.enrolled} students</p>
                        </div>
                        <button className={styles.deleteButton} onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}