import React from 'react';
import "./Badges.css";
import trophyIcon from '../assets/trophy.jpeg';
import lockIcon from '../assets/lock.jpeg';
import avatar1 from '../assets/avatar1.jpeg';
import avatar2 from '../assets/avatar2.jpeg';
import avatar3 from '../assets/avatar3.jpeg';

// Badge Data
const badgesEarned = [
  { name: 'Math Whiz', description: 'Scored 100% in Math Quiz' },
  { name: 'Science Star', description: 'Completed all science modules' },
  { name: 'Perfect Attendance', description: '100% Attendance this semester' }
];

const badgesLocked = [
  { name: 'Coding Champ', progress: 60, description: 'Solve 5 coding challenges' },
  { name: 'Art Master', progress: 30, description: 'Submit 3 digital artworks' }
];

const leaderboard = [
  { name: 'John Doe', badges: 10, avatar: avatar1 },
  { name: 'Alice Smith', badges: 8, avatar: avatar2 },
  { name: 'Bob Johnson', badges: 6, avatar: avatar3 }
];

const Badges = () => {
  return (
    <div className="badges-page">
      <div className="badges-container">
        
        {/* Badges Section */}
        <div className="badges-content">
          
          {/* Earned Badges */}
          <div className="badges-earned">
            <h2>Badges Earned</h2>
            <div className="badges-list">
              {badgesEarned.map((badge, index) => (
                <div key={index} className="badge-item">
                  <img src={trophyIcon} alt="Trophy" />
                  <div className="badge-info">
                    <span className="badge-title">{badge.name}</span>
                    <span className="badge-desc">{badge.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Locked Badges with Progress */}
          <div className="badges-locked">
            <h2>Badges Locked</h2>
            <div className="badges-list">
              {badgesLocked.map((badge, index) => (
                <div key={index} className="badge-item locked">
                  <img src={lockIcon} alt="Locked" />
                  <div className="badge-info">
                    <span className="badge-title">{badge.name}</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${badge.progress}%` }}></div>
                    </div>
                    <span className="badge-desc">{badge.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Leaderboard */}
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <div className="leaderboard-list">
            {leaderboard.map((student, index) => (
              <div key={index} className={`leaderboard-item ${index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""}`}>
                <span className="rank">#{index + 1}</span>
                <img src={student.avatar} alt={student.name} />
                <div className="leaderboard-info">
                  <span className="leader-name">{student.name}</span>
                  <span className="leader-badges">{student.badges} Badges</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Badges;
