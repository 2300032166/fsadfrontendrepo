import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // To get params from URL
import './AssignmentUpload.css';

const AssignmentUpload = () => {
  const { id } = useParams(); // Get assignment ID from URL
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // File type validation (PDF or PPT)
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/vnd.ms-powerpoint')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please upload a PDF or PPT file.');
      setFile(null);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      setMessage('Uploading file...');
      // Simulating file upload progress
      let progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress === 100) {
            clearInterval(progressInterval);
            setMessage('File uploaded successfully!');
            return 100;
          }
          return prevProgress + 20; // Increase progress by 20% each interval
        });
      }, 500);
    } else {
      setError('No file selected!');
    }
  };

  return (
    <div className="assignment-upload">
      <h2>Upload Assignment {id}</h2>
      <p className="assignment-description">
        Please upload your completed assignment in PDF or PPT format. Ensure that your file follows the guidelines and is ready for submission.
      </p>

      {/* File upload section */}
      <div className="file-upload">
        <input type="file" onChange={handleFileChange} />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleFileUpload}>Upload File</button>
      </div>

      {/* File upload progress */}
      {progress > 0 && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {/* Success or error message */}
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default AssignmentUpload;
