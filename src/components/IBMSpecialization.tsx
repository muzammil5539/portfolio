"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

interface Course {
  id: string;
  title: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'upcoming';
  skills: string[];
  projects: string[];
  certificate?: string;
}

export default function IBMSpecialization() {
  const { isDarkMode } = useTheme();
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/repos/muzammil5539/IBM-AI-Engineer-Specialization/commits?per_page=10'
      );
      if (response.ok) {
        const data = await response.json();
        setCommits(data);
      }
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    } finally {
      setLoading(false);
    }
  };

  const courses: Course[] = [
    {
      id: 'machine-learning',
      title: 'Machine Learning with Python',
      progress: 95,
      status: 'completed',
      skills: ['Scikit-learn', 'Regression', 'Classification', 'Clustering'],
      projects: ['Customer Segmentation', 'Loan Default Prediction'],
      certificate: 'ML-Certificate-2024'
    },
    {
      id: 'deep-learning',
      title: 'Introduction to Deep Learning & Neural Networks',
      progress: 88,
      status: 'in-progress',
      skills: ['TensorFlow', 'Keras', 'Neural Networks', 'Backpropagation'],
      projects: ['Image Classification', 'Sentiment Analysis']
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision and Image Processing',
      progress: 75,
      status: 'in-progress',
      skills: ['OpenCV', 'CNN', 'Image Processing', 'Object Detection'],
      projects: ['Face Recognition', 'Medical Image Analysis']
    },
    {
      id: 'building-ai',
      title: 'Building AI Applications with Watson APIs',
      progress: 60,
      status: 'in-progress',
      skills: ['Watson APIs', 'NLP', 'Speech Recognition', 'Visual Recognition'],
      projects: ['Chatbot Development', 'Document Analysis']
    },
    {
      id: 'ai-capstone',
      title: 'AI Capstone Project with Deep Learning',
      progress: 30,
      status: 'upcoming',
      skills: ['End-to-End ML', 'Model Deployment', 'MLOps'],
      projects: ['Comprehensive AI Solution']
    }
  ];

  const blogPosts = [
    {
      title: "Mastering Neural Network Architectures",
      date: "2024-01-15",
      excerpt: "Deep dive into CNN architectures and their applications in computer vision tasks.",
      readTime: "8 min read",
      tags: ["Deep Learning", "CNN", "Computer Vision"]
    },
    {
      title: "From Theory to Practice: Implementing ML Algorithms",
      date: "2024-01-10",
      excerpt: "Practical insights on implementing machine learning algorithms from scratch.",
      readTime: "12 min read",
      tags: ["Machine Learning", "Python", "Algorithms"]
    },
    {
      title: "Watson APIs: Building Intelligent Applications",
      date: "2024-01-05",
      excerpt: "Exploring IBM Watson's powerful APIs for natural language processing and computer vision.",
      readTime: "10 min read",
      tags: ["Watson", "APIs", "NLP"]
    }
  ];

  const overallProgress = courses.reduce((acc, course) => acc + course.progress, 0) / courses.length;

  return (
    <section className="py-24 relative overflow-hidden holographic-bg">
      {/* Animated Background Elements */}
      <div 
        className="absolute inset-0 geometric-pattern opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.05}px) translateZ(-20px)`
        }}
      ></div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 border border-blue-500/20 rotate-3d"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-cyan-400/20 rotate-3d" 
          style={{ animationDelay: '5s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 perspective-container">
          <div className="layer-2">
            <h1 className="text-6xl font-bold mb-6 text-white">
              IBM AI Engineering <span className="gradient-text text-glow">Specialization</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Comprehensive journey through IBM's AI Engineering program, mastering cutting-edge 
              technologies and building real-world AI solutions.
            </p>
            
            {/* Overall Progress */}
            <div className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-md rounded-lg p-6 
              border border-cyan-400/30 card-3d depth-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-cyan-400 font-medium">Overall Progress</span>
                <span className="text-white font-bold">{Math.round(overallProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full 
                    transition-all duration-1000 ease-out neon-glow"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Overview */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto perspective-container">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 
                rounded-lg blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              <div className="relative bg-gray-900/90 backdrop-blur-md rounded-lg p-8 
                border border-cyan-400/30 card-3d depth-shadow hover:depth-shadow-intense">
                
                <h2 className="text-3xl font-bold mb-6 text-white">
                  <span className="gradient-text text-glow">Professional Overview</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Current Progress</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Actively pursuing IBM's comprehensive AI Engineering Specialization, 
                      with {courses.filter(c => c.status === 'completed').length} courses completed 
                      and {courses.filter(c => c.status === 'in-progress').length} in progress.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Key Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {['TensorFlow', 'PyTorch', 'Watson APIs', 'OpenCV', 'Scikit-learn'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-cyan-400/10 text-cyan-400 
                          rounded-full text-sm border border-cyan-400/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Motivation</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Driven to master enterprise-level AI solutions and contribute to 
                      cutting-edge research in machine learning and computer vision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Progress Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            Course <span className="gradient-text text-glow">Progress</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div key={course.id} className="perspective-container"
                style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 
                    rounded-lg blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-gray-900/90 backdrop-blur-md rounded-lg p-6 
                    border border-cyan-400/30 card-3d depth-shadow hover:depth-shadow-intense">
                    
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{course.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                        course.status === 'in-progress' ? 'bg-yellow-400/20 text-yellow-400' :
                        'bg-gray-400/20 text-gray-400'
                      }`}>
                        {course.status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-cyan-400 font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full 
                            transition-all duration-1000 ease-out"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-cyan-400 mb-2">Skills Acquired</h4>
                        <div className="flex flex-wrap gap-2">
                          {course.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-blue-400/10 text-blue-400 
                              rounded text-xs border border-blue-400/30">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-cyan-400 mb-2">Key Projects</h4>
                        <ul className="space-y-1">
                          {course.projects.map((project) => (
                            <li key={project} className="text-gray-300 text-sm flex items-center">
                              <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></span>
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {course.certificate && (
                        <div className="pt-3 border-t border-gray-700">
                          <span className="inline-flex items-center gap-2 text-green-400 text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Certificate Earned
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Repository Showcase */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            GitHub <span className="gradient-text text-glow">Activity</span>
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Repository Info */}
              <div className="perspective-container">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 
                    rounded-lg blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-gray-900/90 backdrop-blur-md rounded-lg p-6 
                    border border-cyan-400/30 card-3d depth-shadow hover:depth-shadow-intense">
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">IBM AI Engineer Specialization</h3>
                        <p className="text-gray-400">Complete coursework and projects</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Repository Status</span>
                        <span className="text-green-400 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Active
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Commits</span>
                        <span className="text-cyan-400 font-medium">{commits.length}+</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Last Updated</span>
                        <span className="text-gray-400">
                          {commits[0] ? new Date(commits[0].commit.author.date).toLocaleDateString() : 'Loading...'}
                        </span>
                      </div>
                      
                      <a 
                        href="https://github.com/muzammil5539/IBM-AI-Engineer-Specialization"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 
                          text-black font-medium rounded-lg hover:from-cyan-400 hover:to-blue-500 
                          transition-all duration-300 transform hover:scale-105"
                      >
                        View Repository
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Commits */}
              <div className="perspective-container">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 
                    rounded-lg blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-gray-900/90 backdrop-blur-md rounded-lg p-6 
                    border border-cyan-400/30 card-3d depth-shadow hover:depth-shadow-intense">
                    
                    <h3 className="text-xl font-bold text-white mb-6">Recent Commits</h3>
                    
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      {loading ? (
                        <div className="text-center py-8">
                          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-gray-400 mt-2">Loading commits...</p>
                        </div>
                      ) : commits.length > 0 ? (
                        commits.slice(0, 5).map((commit) => (
                          <div key={commit.sha} className="border-l-2 border-cyan-400/30 pl-4 pb-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-white text-sm font-medium mb-1">
                                  {commit.commit.message.split('\n')[0]}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {new Date(commit.commit.author.date).toLocaleDateString()} • {commit.commit.author.name}
                                </p>
                              </div>
                              <a 
                                href={commit.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-white transition-colors ml-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center py-8">No commits found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Blog Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            Learning <span className="gradient-text text-glow">Journey</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="perspective-container"
                style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 
                    rounded-lg blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-gray-900/90 backdrop-blur-md rounded-lg p-6 
                    border border-cyan-400/30 card-3d depth-shadow hover:depth-shadow-intense h-full">
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-cyan-400 text-sm">{post.date}</span>
                      <span className="text-gray-400 text-sm">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 
                      transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-400/10 text-blue-400 
                          rounded text-xs border border-blue-400/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="text-cyan-400 text-sm font-medium hover:text-white 
                      transition-colors duration-300 flex items-center gap-2 group/btn">
                      <span>Read More</span>
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-md rounded-lg p-8 
            border border-cyan-400/30 card-3d depth-shadow">
            <h3 className="text-2xl font-bold text-white mb-4">
              Follow My <span className="gradient-text text-glow">AI Journey</span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Stay updated with my latest progress, projects, and insights from the 
              IBM AI Engineering Specialization program.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="https://github.com/muzammil5539/IBM-AI-Engineer-Specialization"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black 
                  font-medium rounded-lg hover:from-cyan-400 hover:to-blue-500 
                  transition-all duration-300 transform hover:scale-105"
              >
                View Repository
              </a>
              <a 
                href="#contact"
                className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 
                  hover:bg-cyan-400 hover:text-black font-medium rounded-lg 
                  transition-all duration-300 transform hover:scale-105"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full float-3d opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${10 + Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}