import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import './CssFile.css';
const initialCourses = [
  // {
  //   id: "full-stack",
  //   title: "Full Stack Application Development",
  //   teacher: { name: "Balajee R M", id: "6298" },
  //   details: {
  //     handouts: [],
  //     topics: [],
  //     submissions: ["ALM-1", "ALM-2"],
  //     extras: [],
  //   },
  // },
  // {
  //   id: "operating-systems",
  //   title: "Operating Systems",
  //   teacher: { name: "Ms. S N V Jyotsna devi K", id: "8000" },
  //   details: {
  //     handouts: [],
  //     topics: [],
  //     submissions: ["OS-Assignment1", "OS-Assignment2"],
  //     extras: [],
  //   },
  // },
  // {
  //   id: "adaptive-software",
  //   title: "Adaptive Software Engineering",
  //   teacher: { name: "Bandla Nirosha", id: "8492" },
  //   details: {
  //     handouts: [],
  //     topics: [],
  //     submissions: ["Assignment1", "Assignment2"],
  //     extras: [],
  //   },
  // },
];

const AdminCourses = () => {
  const { courseId } = useParams();
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

  const selectedCourseIndex = courses.findIndex((course) => course.id === courseId);
  const selectedCourse = courses[selectedCourseIndex];

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const handleAddHandout = () => {
    if (newHandout.name && newHandout.fileUrl) {
      const updated = [...courses];
      updated[selectedCourseIndex].details.handouts.push({
        name: newHandout.name,
        fileUrl: newHandout.fileUrl,
      });
      setCourses(updated);
      setNewHandout({});
    } else {
      alert("Please enter a handout name and choose a file.");
    }
  };

  const handleDeleteHandout = (index) => {
    const updated = [...courses];
    updated[selectedCourseIndex].details.handouts.splice(index, 1);
    setCourses(updated);
  };

  const handleAddTopic = () => {
    if (newTopic.name && newTopic.files?.length > 0) {
      const updated = [...courses];
      updated[selectedCourseIndex].details.topics.push({
        name: newTopic.name,
        files: newTopic.files,
      });
      setCourses(updated);
      setNewTopic({ name: "", files: [] });
    } else {
      alert("Please enter a topic name and choose files.");
    }
  };

  const handleDeleteTopic = (index) => {
    const updated = [...courses];
    updated[selectedCourseIndex].details.topics.splice(index, 1);
    setCourses(updated);
  };

  const handleDeleteCourse = (courseIdToDelete) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      const updatedCourses = courses.filter((course) => course.id !== courseIdToDelete);
      setCourses(updatedCourses);
    }
  };

  return (
    <div className="course-container">
      {/* <h1 className="page-heading">All Courses</h1> */}
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
              <Link to={`/courses/${course.id}`} className="course-button">
                View Course
              </Link>
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
            <button
              onClick={() => {
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
                    },
                  };
                  setCourses([...courses, newEntry]);
                  setNewCourse({ id: "", title: "", teacher: { name: "", id: "" } });
                } else {
                  alert("Please fill all course details.");
                }
              }}
            >
              Add Course
            </button>
          </div>
        </div>
      ) : (
        <div>
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
                      onChange={(e) => {
                        const files = Array.from(e.target.files).map((file) => ({
                          name: file.name,
                          url: URL.createObjectURL(file),
                        }));

                        setCoFiles((prev) => ({
                          ...prev,
                          [coKey]: [...(prev[coKey] || []), ...files],
                        }));
                      }}
                    />
                    <ul>
                      {coFiles[coKey]?.map((file, fileIndex) => (
                        <li key={fileIndex}>
                          <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                          <button onClick={() => {
                            setCoFiles((prev) => ({
                              ...prev,
                              [coKey]: prev[coKey].filter((_, i) => i !== fileIndex),
                            }));
                          }} style={{ marginLeft: "10px" }}>Delete</button>
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
                    onChange={(e) => {
                      const filesArray = Array.from(e.target.files).map((file) => ({
                        name: file.name,
                        url: URL.createObjectURL(file),
                      }));
                      setNewTopic((prev) => ({ ...prev, files: filesArray }));
                    }}
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
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && newHandout.extraFileName) {
                          const newFile = {
                            name: newHandout.extraFileName,
                            file: {
                              name: file.name,
                              url: URL.createObjectURL(file),
                            },
                          };
                          setExtraFiles((prev) => [...prev, newFile]);
                          setNewHandout({});
                        } else {
                          alert("Please enter a file name and select a file.");
                        }
                      }}
                    />
                  </div>
                  <ul>
                    {extraFiles.map((item, index) => (
                      <li key={index}>
                        <strong>{item.name}:</strong>{" "}
                        <a href={item.file.url} target="_blank" rel="noopener noreferrer">
                          {item.file.name}
                        </a>
                        <button
                          onClick={() =>
                            setExtraFiles((prev) => prev.filter((_, i) => i !== index))
                          }
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
                      onClick={() => {
                        if (youtubeLink && newHandout.youtubeName) {
                          setExtraFiles((prev) => [
                            ...prev,
                            {
                              name: newHandout.youtubeName,
                              file: {
                                name: "YouTube Video",
                                url: youtubeLink,
                              },
                            },
                          ]);
                          setYoutubeLink("");
                          setNewHandout({});
                        } else {
                          alert("Please provide a video name and a valid URL.");
                        }
                      }}
                      style={{ marginLeft: "10px" }}
                    >
                      Add Link
                    </button>
                  </div>
                </li>
              </ul>
            )}
          </ul>

          <Link to="/courses" className="back-button">← Back to Courses</Link>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;