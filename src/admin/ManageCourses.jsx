import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import './CssFile.css';
const initialCourses = [
  // ... (your initial courses array)
];

const ManageCourses = () => {
  const { courseId: routeCourseId } = useParams(); // Rename the route parameter
  const [courses, setCourses] = useState(initialCourses);
  const [expandedSections, setExpandedSections] = useState({});
  const [newHandout, setNewHandout] = useState({});
  const [newTopic, setNewTopic] = useState({ name: "", files: [] });
  const [extraFiles, setExtraFiles] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [coFiles, setCoFiles] = useState({
    co1: [],
    co2: [],
    co3: [],
    co4: [],
  });
  const [newCourse, setNewCourse] = useState({
    id: "",
    title: "",
    teacher: { name: "", id: "" },
  });

  // Use a local state to track the currently viewed course ID
  const [viewingCourseId, setViewingCourseId] = useState(null);

  // Determine the selected course based on the local state
  const selectedCourse = courses.find((course) => course.id === viewingCourseId);

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const handleAddHandout = () => {
    if (newHandout.name && newHandout.fileUrl && selectedCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? { ...course, details: { ...course.details, handouts: [...course.details.handouts, { name: newHandout.name, fileUrl: newHandout.fileUrl }] } }
          : course
      );
      setCourses(updatedCourses);
      setNewHandout({});
    } else {
      alert("Please enter a handout name and choose a file.");
    }
  };

  const handleDeleteHandout = (index) => {
    if (selectedCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? { ...course, details: { ...course.details, handouts: course.details.handouts.filter((_, i) => i !== index) } }
          : course
      );
      setCourses(updatedCourses);
    }
  };

  const handleAddTopic = () => {
    if (newTopic.name && newTopic.files?.length > 0 && selectedCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? { ...course, details: { ...course.details, topics: [...course.details.topics, { name: newTopic.name, files: newTopic.files }] } }
          : course
      );
      setCourses(updatedCourses);
      setNewTopic({ name: "", files: [] });
    } else {
      alert("Please enter a topic name and choose files.");
    }
  };

  const handleDeleteTopic = (index) => {
    if (selectedCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? { ...course, details: { ...course.details, topics: course.details.topics.filter((_, i) => i !== index) } }
          : course
      );
      setCourses(updatedCourses);
    }
  };

  const handleDeleteCourse = (courseIdToDelete) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      const updatedCourses = courses.filter((course) => course.id !== courseIdToDelete);
      setCourses(updatedCourses);
      setViewingCourseId(null); // Clear the viewed course if it was deleted
    }
  };

  const handleViewCourse = (id) => {
    setViewingCourseId(id);
  };

  const handleAddExtraFile = () => {
    if (newHandout.extraFileName && newHandout.extraFile && selectedCourse) {
      const newFile = {
        name: newHandout.extraFileName,
        file: {
          name: newHandout.extraFile.name,
          url: URL.createObjectURL(newHandout.extraFile),
        },
      };
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? { ...course, details: { ...course.details, extras: [...course.details.extras, newFile] } }
          : course
      );
      setCourses(updatedCourses);
      setNewHandout({});
    } else {
      alert("Please enter a file name and select a file.");
    }
  };

  const handleDeleteExtraFile = (index) => {
    if (selectedCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? { ...course, details: { ...course.details, extras: course.details.extras.filter((_, i) => i !== index) } }
          : course
      );
      setCourses(updatedCourses);
    }
  };

  const handleAddYoutubeLink = () => {
    if (youtubeLink && newHandout.youtubeName && selectedCourse) {
      const newLink = {
        name: newHandout.youtubeName,
        file: {
          name: "YouTube Video",
          url: youtubeLink,
        },
      };
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? { ...course, details: { ...course.details, extras: [...course.details.extras, newLink] } }
          : course
      );
      setCourses(updatedCourses);
      setYoutubeLink("");
      setNewHandout({});
    } else {
      alert("Please provide a video name and a valid URL.");
    }
  };

  const handleAddCOFile = (coKey, files) => {
    if (selectedCourse) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? { ...course, details: { ...course.details, [coKey]: [...(course.details[coKey] || []), ...newFiles] } }
          : course
      );
      setCourses(updatedCourses);
    }
  };

  const handleDeleteCOFile = (coKey, fileIndex) => {
    if (selectedCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              details: {
                ...course.details,
                [coKey]: (course.details[coKey] || []).filter((_, i) => i !== fileIndex),
              },
            }
          : course
      );
      setCourses(updatedCourses);
    }
  };

  const handleAddNewCourse = () => {
    if (
      newCourse.id &&
      newCourse.title &&
      newCourse.teacher.name &&
      newCourse.teacher.id
    ) {
      const newEntry = {
        ...newCourse,
        details: {
          handouts: [],
          topics: [],
          submissions: [],
          extras: [],
          co1: [],
          co2: [],
          co3: [],
          co4: [],
        },
      };
      setCourses([...courses, newEntry]);
      setNewCourse({ id: "", title: "", teacher: { name: "", id: "" } });
    } else {
      alert("Please fill all course details.");
    }
  };

  return (
    <div className="course-container">
      <br />
      {!selectedCourse ? (
        <div>
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>
                Instructor:{" "}
                <Link to={`/teachers/${course.teacher.id}`} className="instructor-link">
                  {course.teacher.name}
                </Link>
              </p>
              <button onClick={() => handleViewCourse(course.id)} className="course-button">
                View Course
              </button>
              <button onClick={() => handleDeleteCourse(course.id)}>
                Delete Course
              </button>
            </div>
          ))}
          <div className="add-course-form">
            <h2>Add New Course</h2>
            <input
              type="text"
              placeholder="Course ID"
              value={newCourse.id}
              onChange={(e) => setNewCourse({ ...newCourse, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Teacher Name"
              value={newCourse.teacher.name}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  teacher: { ...newCourse.teacher, name: e.target.value },
                })
              }
            />
            <input
              type="text"
              placeholder="Teacher ID"
              value={newCourse.teacher.id}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  teacher: { ...newCourse.teacher, id: e.target.value },
                })
              }
            />
            <button onClick={handleAddNewCourse}>
              Add Course
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>{selectedCourse.title}</h2>
          <p>Instructor: <Link to={`/teachers/${selectedCourse.teacher.id}`}>{selectedCourse.teacher.name}</Link> ({selectedCourse.teacher.id})</p>
          <ul>
            <li onClick={() => toggleSection("handouts")} className="clickable">📄 Handouts</li>
            {expandedSections.handouts && (
              <ul>
                {selectedCourse.details.handouts.map((handout, index) => (
                  <li key={index}>
                    <a href={handout.fileUrl} target="_blank" rel="noopener noreferrer">
                      {handout.name}
                    </a>{" "}
                    <button onClick={() => handleDeleteHandout(index)}>Delete</button>
                  </li>
                ))}
                <li>
                  <input
                    type="text"
                    placeholder="Handout Name"
                    value={newHandout.name || ""}
                    onChange={(e) =>
                      setNewHandout((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      setNewHandout((prev) => ({
                        ...prev,
                        fileUrl: URL.createObjectURL(e.target.files[0]),
                      }))
                    }
                  />
                  <button onClick={handleAddHandout}>Add</button>
                </li>
              </ul>
            )}

            <li onClick={() => toggleSection("courseOutcomes")} className="clickable">🎯 Course Outcomes</li>
            {expandedSections.courseOutcomes && (
              <ul>
                {["co1", "co2", "co3", "co4"].map((coKey, index) => (
                  <li key={index}>
                    <strong>{coKey.toUpperCase()}</strong>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.ppt,.pptx,.doc,.docx"
                      onChange={(e) => handleAddCOFile(coKey, e.target.files)}
                    />
                    <ul>
                      {(selectedCourse.details[coKey] || []).map((file, fileIndex) => (
                        <li key={fileIndex}>
                          <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                          <button onClick={() => handleDeleteCOFile(coKey, fileIndex)} style={{ marginLeft: "10px" }}>Delete</button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}

            <li onClick={() => toggleSection("topics")} className="clickable">📁 Topics</li>
            {expandedSections.topics && (
              <ul>
                {selectedCourse.details.topics.map((topic, index) => (
                  <li key={index}>
                    <strong>{topic.name}</strong>
                    <ul>
                      {topic.files.map((file, fileIndex) => (
                        <li key={fileIndex}>
                          <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => handleDeleteTopic(index)}>Delete</button>
                  </li>
                ))}
                <li>
                  <input
                    type="text"
                    placeholder="Topic Name"
                    value={newTopic.name}
                    onChange={(e) => setNewTopic((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.ppt,.pptx,.doc,.docx"
                    onChange={(e) =>
                      setNewTopic((prev) => ({ ...prev, files: Array.from(e.target.files).map((file) => ({ name: file.name, url: URL.createObjectURL(file) })) }))
                    }
                  />
                  <button onClick={handleAddTopic}>Add</button>
                </li>
              </ul>
            )}

            <li onClick={() => toggleSection("extras")} className="clickable">📎 Extras</li>
            {expandedSections.extras && (
              <ul>
                <li>
                  <strong>Upload Extra Files</strong>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter file name/description"
                      value={newHandout.extraFileName || ""}
                      onChange={(e) =>
                        setNewHandout((prev) => ({ ...prev, extraFileName: e.target.value }))
                      }
                    />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={(e) =>
                        setNewHandout((prev) => ({ ...prev, extraFile: e.target.files[0] }))
                      }
                    />
                    <button onClick={handleAddExtraFile}>Upload</button>
                  </div>
                  <ul>
                    {(selectedCourse.details.extras || []).map((item, index) => (
                      <li key={index}>
                        <strong>{item.name}:</strong>{" "}
                        <a href={item.file.url} target="_blank" rel="noopener noreferrer">
                          {item.file.name}
                        </a>
                        <button
                          onClick={() => handleDeleteExtraFile(index)}
                          style={{ marginLeft: "10px" }}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>

                <li>
                  <strong>Add YouTube Link</strong>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter video name/title"
                      value={newHandout.youtubeName || ""}
                      onChange={(e) =>
                        setNewHandout((prev) => ({ ...prev, youtubeName: e.target.value }))
                      }
                    /><br/>
                    <input
                      type="text"
                      placeholder="Enter YouTube video URL"
                      value={youtubeLink}
                      onChange={(e) => setYoutubeLink(e.target.value)}
                      style={{ width: "300px", marginLeft: "10px" }}
                    />
                    <button
                      onClick={handleAddYoutubeLink}
                      style={{ marginLeft: "10px" }}
                    >
                      Add Link
                    </button>
                  </div>
                </li>
              </ul>
            )}
          </ul>

          <button onClick={() => setViewingCourseId(null)} className="back-button">← Back to Courses</button>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;