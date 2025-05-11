// Reports.jsx
import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import './CssFile.css';
// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

export default function AdminReports() {
  const [reportData, setReportData] = useState({
    courseCompletion: [],
    activeUsers: 0,
    assessmentScores: [],
  });

  useEffect(() => {
    const dummyData = {
      courseCompletion: [
        { course: "Math", completed: 80 },
        { course: "Science", completed: 65 },
        { course: "English", completed: 92 },
        { course: "History", completed: 73 },
      ],
      activeUsers: 128,
      assessmentScores: [
        { assessment: "Quiz 1", avgScore: 78 },
        { assessment: "Quiz 2", avgScore: 85 },
        { assessment: "Final Exam", avgScore: 69 },
      ],
    };
    setReportData(dummyData);
  }, []);

  const downloadCSV = () => {
    const headers = ["Course,Completed (%)"];
    const rows = reportData.courseCompletion.map(
      (item) => `${item.course},${item.completed}`
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "course_completion_report.csv";
    link.click();
  };

  return (
    <div className="reports-container">
      <h2>📊 Admin Analytics & Reports</h2><br/>

      <div className="chart-section">
        <div className="chart-box">
          <h3>Course Completion Rates</h3>
          <Bar
            data={{
              labels: reportData.courseCompletion.map((c) => c.course),
              datasets: [
                {
                  label: "Completion (%)",
                  data: reportData.courseCompletion.map((c) => c.completed),
                  backgroundColor: "#4caf50",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

        <div className="chart-box">
          <h3>Assessment Scores</h3>
          <Pie
            data={{
              labels: reportData.assessmentScores.map((a) => a.assessment),
              datasets: [
                {
                  label: "Average Score",
                  data: reportData.assessmentScores.map((a) => a.avgScore),
                  backgroundColor: ["#36a2eb", "#ffcd56", "#ff6384"],
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="summary">
        <h3>
          Active Users This Week: <span>{reportData.activeUsers}</span>
        </h3>
        <button onClick={downloadCSV}>📥 Download Report</button>
      </div>
    </div>
  );
}
