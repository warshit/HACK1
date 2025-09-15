import React, { useState } from 'react';
import { Play, History, Languages, FileText, BrainCircuit, HelpCircle, ExternalLink } from 'lucide-react';
import TranscriptionUploader from './TranscriptionUploader';

interface Transcription {
  id: string;
  title: string;
  date: string;
  duration: string;
  url: string;
}

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [transcriptionText, setTranscriptionText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock transcription history
  const transcriptionHistory: Transcription[] = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      date: '2024-01-15',
      duration: '12:45',
      url: 'https://youtube.com/watch?v=example1'
    },
    {
      id: '2',
      title: 'React Hooks Tutorial',
      date: '2024-01-14',
      duration: '8:30',
      url: 'https://youtube.com/watch?v=example2'
    },
    {
      id: '3',
      title: 'Python Data Analysis',
      date: '2024-01-13',
      duration: '15:20',
      url: 'https://youtube.com/watch?v=example3'
    },
    {
      id: '4',
      title: 'CSS Grid Layout',
      date: '2024-01-12',
      duration: '6:15',
      url: 'https://youtube.com/watch?v=example4'
    }
  ];

  const handleTranscribe = async () => {
    if (!videoUrl.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTranscriptionText(`Hello everyone, welcome back to another episode. Today we're going to be discussing the fundamentals of machine learning and how it's transforming various industries. 

Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It's based on the idea that systems can automatically learn and improve from data, identify patterns, and make decisions with minimal human intervention.

There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Each type serves different purposes and is suitable for different kinds of problems.

Supervised learning involves training algorithms on labeled data, where the correct answers are provided during training. This approach is commonly used for classification and regression tasks.

Unsupervised learning, on the other hand, works with unlabeled data to find hidden patterns or structures. This is often used for clustering, dimensionality reduction, and anomaly detection.

Finally, reinforcement learning is about training agents to make sequences of decisions by rewarding good actions and penalizing bad ones. This approach has been particularly successful in game playing and robotics.

The applications of machine learning are vast and growing every day, from recommendation systems and fraud detection to autonomous vehicles and medical diagnosis.`);
      setIsLoading(false);
    }, 2000);
  };

  const handleHistoryItemClick = (transcription: Transcription) => {
    setVideoUrl(transcription.url);
    setTranscriptionText(`Sample transcription for: ${transcription.title}\n\nThis is a mock transcription that would normally be generated from the video content. In a real application, this would contain the actual transcribed text from the video.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Play className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">EduTranscribe</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Transcribe Your Video</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="video-url" className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube or Video URL
                  </label>
                  <input
                    type="url"
                    id="video-url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <button
                  onClick={handleTranscribe}
                  disabled={!videoUrl.trim() || isLoading}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Transcribing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      <span>Transcribe Video</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Area */}
            {transcriptionText && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transcription Result</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">{transcriptionText}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 font-medium">
                    <Languages className="h-4 w-4" />
                    <span className="hidden sm:inline">Translate</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200 font-medium">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Summarize</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors duration-200 font-medium">
                    <BrainCircuit className="h-4 w-4" />
                    <span className="hidden sm:inline">Key Points</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium">
                    <HelpCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Generate Quiz</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <History className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Recent Transcriptions</h3>
              </div>
              <div className="space-y-3">
                {transcriptionHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleHistoryItemClick(item)}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                          {item.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{item.date}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{item.duration}</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <nav className="flex justify-around py-2">
          <a href="#" className="flex flex-col items-center py-2 text-blue-600">
            <Play className="h-5 w-5" />
            <span className="text-xs font-medium">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center py-2 text-gray-600">
            <FileText className="h-5 w-5" />
            <span className="text-xs font-medium">About</span>
          </a>
          <a href="#" className="flex flex-col items-center py-2 text-gray-600">
            <HelpCircle className="h-5 w-5" />
            <span className="text-xs font-medium">Contact</span>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default App;