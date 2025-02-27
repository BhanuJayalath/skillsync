
export default function CoursesManagement() {

    return (
        <div className="courses-container">
          <h2>Courses Management</h2>

          <div className="add-course-form">
            <input type="text" placeholder="Title" value="01"></input>
            <input type="text" placeholder="Description" value="02"></input>
            <input type="text" placeholder="Price" value="03"></input>
          </div>
        </div>
    );
}