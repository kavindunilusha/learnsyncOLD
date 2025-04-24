import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import emptyProfilePic from '../../assets/empty-profile-pic.png';

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recent');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah Miller',
        profilePic: emptyProfilePic,
        currentTopic: 'Python Modules',
        progress: '78% complete'
      },
      content: 'Just completed the Python Modules section! Learning about importing and creating my own modules was fascinating.',
      likes: 24,
      comments: 5,
      shares: 2,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      user: {
        name: 'David Chen',
        profilePic: emptyProfilePic,
        currentTopic: 'Basic Syntax',
        progress: '25% complete'
      },
      content: 'Started learning Python today! The syntax is so clean and readable compared to other languages I\'ve used.',
      likes: 15,
      comments: 3,
      shares: 1,
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      user: {
        name: 'Emma Wilson',
        profilePic: emptyProfilePic,
        currentTopic: 'Web Scraping',
        progress: '92% complete'
      },
      content: 'Just built my first web scraper with BeautifulSoup! Check out my code in the comments.',
      likes: 42,
      comments: 8,
      shares: 6,
      timestamp: '1 day ago'
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: {
          name: 'Current User',
          profilePic: emptyProfilePic,
          currentTopic: 'Python Basics'
        },
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'Just now'
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo">LearnSync</div>
        <nav className="main-nav">
          <button className="nav-link active">Home</button>
          <button className="nav-link" onClick={() => navigate('/my-learning')}>My Learning</button>
          <button className="nav-link" onClick={() => navigate('/explore')}>Explore</button>
          <button className="nav-link" onClick={() => navigate('/community')}>Community</button>
        </nav>
        <div className="user-nav" onClick={() => navigate('/profile')}>
          <img src={emptyProfilePic} alt="Alex Johnson" className="nav-profile-pic" />
          <span>Alex Johnson</span>
        </div>
      </header>

      <div className="main-content">
        {/* Left Sidebar - User Profile */}
        <div className="profile-sidebar">
          <div className="profile-card">
            <img src={emptyProfilePic} alt="Profile" className="large-profile-pic" />
            <h2>Alex Johnson</h2>
            <p className="user-title">Python Enthusiast</p>
            
            <div className="progress-section">
              <div className="progress-header">
                <h3>Overall Progress</h3>
                <span>65%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="current-learning">
              <h3>Current Learning</h3>
              <p className="currently-studying">Currently Studying:</p>
              <h4>Python Functions</h4>
              
              <div className="progress-header">
                <span>Module Progress</span>
                <span>65%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '65%' }}></div>
              </div>

              <div className="completed-sections">
                <h4>Completed Sections:</h4>
                <ul>
                  <li>✓ Basic Syntax</li>
                  <li>✓ Data Types</li>
                  <li>✓ Control Flow</li>
                </ul>
              </div>

              <button className="continue-learning">Continue Learning</button>
            </div>
          </div>
          
          <button className="create-post-btn">
            <span>+</span> Create Post
          </button>
        </div>

        {/* Main Feed */}
        <div className="feed-container">
          <div className="feed-header">
            <h2>Learning Feed</h2>
            <div className="feed-tabs">
              <button 
                className={activeTab === 'recent' ? 'active' : ''} 
                onClick={() => setActiveTab('recent')}
              >
                Recent
              </button>
              <button 
                className={activeTab === 'popular' ? 'active' : ''} 
                onClick={() => setActiveTab('popular')}
              >
                Popular
              </button>
              <button 
                className={activeTab === 'following' ? 'active' : ''} 
                onClick={() => setActiveTab('following')}
              >
                Following
              </button>
            </div>
          </div>

          <div className="posts-feed">
            {posts.map((post) => (
              <div key={post.id} className="post">
                <div className="post-header">
                  <img src={post.user.profilePic} alt={post.user.name} />
                  <div className="post-user-info">
                    <div className="post-user-name-time">
                      <h3>{post.user.name}</h3>
                      <span className="timestamp">{post.timestamp}</span>
                    </div>
                    <p className="studying-info">
                      Studying: {post.user.currentTopic} • {post.user.progress}
                    </p>
                  </div>
                </div>
                <p className="post-content">{post.content}</p>
                <div className="progress-indicator"></div>
                <div className="post-actions">
                  <button><span>👍</span> {post.likes} Likes</button>
                  <button><span>💬</span> {post.comments} Comments</button>
                  <button><span>🔄</span> {post.shares} Shares</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
