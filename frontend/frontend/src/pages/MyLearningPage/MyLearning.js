import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyLearning.css';
import emptyProfilePic from '../../assets/empty-profile-pic.png';

const MyLearning = () => {
  const navigate = useNavigate();
  const [expandedTopic, setExpandedTopic] = useState(null);

  // Mock data for current course
  const currentCourse = {
    name: "Python Programming",
    progress: 65,
    currentModule: "Python Functions",
    currentSection: "Lambda Functions"
  };

  // Mock data for topics
  const topics = [
    {
      id: 1,
      title: "Basic Syntax",
      description: "Learn the fundamental syntax and structure of Python programming",
      progress: 100,
      subtopics: [
        { id: 1, name: "Variables and Data Types", completed: true },
        { id: 2, name: "Operators", completed: true },
        { id: 3, name: "Input and Output", completed: true }
      ]
    },
    {
      id: 2,
      title: "Control Flow",
      description: "Master the art of controlling program flow with conditional statements and loops",
      progress: 100,
      subtopics: [
        { id: 1, name: "If-Else Statements", completed: true },
        { id: 2, name: "For Loops", completed: true },
        { id: 3, name: "While Loops", completed: true }
      ]
    },
    {
      id: 3,
      title: "Functions",
      description: "Learn how to create and use functions to organize and reuse code",
      progress: 65,
      subtopics: [
        { id: 1, name: "Function Basics", completed: true },
        { id: 2, name: "Parameters and Arguments", completed: true },
        { id: 3, name: "Lambda Functions", completed: false },
        { id: 4, name: "Recursion", completed: false }
      ]
    },
    {
      id: 4,
      title: "Modules",
      description: "Explore Python modules and how to organize code into reusable components",
      progress: 0,
      subtopics: [
        { id: 1, name: "Importing Modules", completed: false },
        { id: 2, name: "Creating Modules", completed: false },
        { id: 3, name: "Package Management", completed: false }
      ]
    }
  ];

  const toggleTopic = (topicId) => {
    if (expandedTopic === topicId) {
      setExpandedTopic(null);
    } else {
      setExpandedTopic(topicId);
    }
  };

  return (
    <div className="mylearning-container">
      {/* Header */}
      <header className="header">
        <div className="logo" onClick={() => navigate('/')}>LearnSync</div>
        <nav className="main-nav">
          <button className="nav-link" onClick={() => navigate('/')}>Home</button>
          <button className="nav-link active">My Learning</button>
          <button className="nav-link" onClick={() => navigate('/explore')}>Explore</button>
          <button className="nav-link" onClick={() => navigate('/community')}>Community</button>
        </nav>
        <div className="user-nav" onClick={() => navigate('/profile')}>
          <img src={emptyProfilePic} alt="Alex Johnson" className="nav-profile-pic" />
          <span>Alex Johnson</span>
        </div>
      </header>

      <div className="mylearning-content">
        {/* Get Back to Learning Section */}
        <div className="learning-banner">
          <div className="banner-content">
            <div className="banner-text">
              <h1>Get Back to Learning</h1>
              <h2>{currentCourse.name}</h2>
              <p>Currently on: <span className="highlight">{currentCourse.currentModule}</span></p>
              <p>Section: <span className="highlight">{currentCourse.currentSection}</span></p>
            </div>
            <div className="banner-progress">
              <div className="circular-progress">
                <div className="progress-value">{currentCourse.progress}%</div>
                <div className="progress-circle" style={{ 
                  background: `conic-gradient(#2e7d32 ${currentCourse.progress * 3.6}deg, #e8f5e9 ${currentCourse.progress * 3.6}deg)`
                }}></div>
              </div>
            </div>
          </div>
          <button className="continue-btn">Continue Learning</button>
        </div>

        {/* Topics Section */}
        <div className="topics-section">
          <h2>Course Topics</h2>
          <div className="topics-grid">
            {topics.map((topic) => (
              <div 
                key={topic.id} 
                className={`topic-card ${expandedTopic === topic.id ? 'expanded' : ''}`}
              >
                <div className="topic-header" onClick={() => toggleTopic(topic.id)}>
                  <div className="topic-info">
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                  </div>
                  <div className="topic-progress">
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${topic.progress}%` }}></div>
                    </div>
                    <span>{topic.progress}%</span>
                  </div>
                  <div className="expand-icon">
                    {expandedTopic === topic.id ? '−' : '+'}
                  </div>
                </div>
                
                {expandedTopic === topic.id && (
                  <div className="subtopics-list">
                    {topic.subtopics.map((subtopic) => (
                      <div key={subtopic.id} className="subtopic-item">
                        <span className={`check-icon ${subtopic.completed ? 'completed' : ''}`}>
                          {subtopic.completed ? '✓' : '○'}
                        </span>
                        <span className={subtopic.completed ? 'completed' : ''}>
                          {subtopic.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
