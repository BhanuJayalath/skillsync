import { useState, useEffect } from "react";
import styles from "./adminPage.module.css";

interface Course {
    id: number;
    title: string;
    description: string;
    price: string;
    enrolled: number;
  }

export default function CoursesManagement() {
    const [courses, setCourses] = useState<Course[]>([]);

    const [newCourse, setNewCourse] = useState<Course>({ id: 0, title: "", description: "", price: "", enrolled: 0 });

    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    // Load courses from localStorage on component mount
    useEffect(() => {
        const savedCourses = localStorage.getItem("courses");
        if (savedCourses) {
        setCourses(JSON.parse(savedCourses));
        }
    }, []);

    // Save courses to localStorage whenever the courses state changes
    useEffect(() => {
        localStorage.setItem("courses", JSON.stringify(courses));
    }, [courses]);

    const handleAddCourse = () => {
        if (!newCourse.title || !newCourse.description || !newCourse.price) return;
        const courseWithId = { ...newCourse, id: Date.now() };
        setCourses([...courses, courseWithId]);
        setNewCourse({ id: 0, title: "", description: "", price: "", enrolled: 0 });
    };
    

    const handleDeleteCourse = (id: number) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    // Start editing a course
    const handleEditCourse = (course: Course) => {
        setEditingCourse(course);
        setNewCourse(course);
    };

    // Update course
    const handleUpdateCourse = () => {
        if (!newCourse.title || !newCourse.description || !newCourse.price) return;

        setCourses(courses.map((course) => (course.id === newCourse.id ? newCourse : course)));

        setNewCourse({ id: 0, title: "", description: "", price: "", enrolled: 0 });
        setEditingCourse(null);
    };

    return (
        <div className={styles.coursesSection}>
          <h2>Courses Management</h2>

            <div className={styles.addCourseForm}>
                <input type="text" placeholder="Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
                <input type="text" placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
                <input type="text" placeholder="Price" value={newCourse.price} onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })} />
                {editingCourse ? (
                    <button onClick={handleUpdateCourse}>Update Course</button>
                ) : (
                    <button onClick={handleAddCourse}>Add Course</button>
                )}

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
                        <div>
                            <button className={styles.editButtonCourse} onClick={() => handleEditCourse(course)}>Edit</button>
                            <button className={styles.deleteButton} onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}