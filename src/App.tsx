import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useSearchParams } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  BookOpen, 
  Calendar, 
  PlayCircle, 
  FileText, 
  Award, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Star
} from 'lucide-react';

interface BatchData {
  _id: string;
  batch_name: string;
  class: number;
  subject: string;
  teacher_name: string;
  description: string;
  total_students: number;
  start_date: string;
  end_date: string;
  total_lectures: number;
  completed_lectures: number;
  batch_image: string;
  status: string;
  price: number;
  discount_price: number;
  rating: number;
  total_reviews: number;
}

function BatchDetails() {
  const { batchId } = useParams<{ batchId: string }>();
  const [searchParams] = useSearchParams();
  const [batchData, setBatchData] = useState<BatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Get batch ID from URL params or search params
  const currentBatchId = batchId || searchParams.get('batch_id');
  const API_URL = `/api/batch/${currentBatchId}`;

  const fetchBatchData = async () => {
    if (!currentBatchId) {
      setError('No batch ID provided');
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBatchData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch batch data');
      console.error('Error fetching batch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatchData();
    
    // Set up interval to fetch data every 5 minutes (300000 ms)
    const interval = setInterval(fetchBatchData, 300000);
    
    return () => clearInterval(interval);
  }, [currentBatchId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateProgress = () => {
    if (!batchData) return 0;
    return (batchData.completed_lectures / batchData.total_lectures) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading batch details for ID: {currentBatchId}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchBatchData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!batchData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600">No batch data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">StudyStark</h1>
                <p className="text-sm text-gray-500">Batch Details</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium text-gray-700">
                {lastUpdated.toLocaleTimeString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Batch Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{batchData.batch_name}</h1>
                <p className="text-blue-100 mb-4">{batchData.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">Class {batchData.class}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{batchData.total_students} Students</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{batchData.rating}/5 ({batchData.total_reviews})</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/20 p-4 rounded-xl">
                  <p className="text-blue-100 text-sm">Course Fee</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">₹{batchData.discount_price?.toLocaleString()}</span>
                    {batchData.price > batchData.discount_price && (
                      <span className="text-blue-200 line-through text-lg">₹{batchData.price?.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-blue-600" />
                Course Progress
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Lectures Completed</span>
                  <span className="font-semibold">{batchData.completed_lectures} / {batchData.total_lectures}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">{calculateProgress().toFixed(1)}% Complete</p>
              </div>
            </div>

            {/* Course Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Course Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Subject</p>
                      <p className="font-semibold text-gray-900">{batchData.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Users className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Teacher</p>
                      <p className="font-semibold text-gray-900">{batchData.teacher_name}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-semibold text-gray-900">{formatDate(batchData.start_date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-semibold text-gray-900 capitalize">{batchData.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Lectures</span>
                  <span className="font-semibold text-blue-600">{batchData.total_lectures}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Enrolled Students</span>
                  <span className="font-semibold text-green-600">{batchData.total_students}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Course Rating</span>
                  <span className="font-semibold text-yellow-600">{batchData.rating}/5</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-semibold text-purple-600">{batchData.total_reviews}</span>
                </div>
              </div>
            </div>

            {/* Auto Refresh Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Auto Refresh</span>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Data automatically refreshes every 5 minutes to show the latest information.
              </p>
              <button
                onClick={fetchBatchData}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="text-center">
          <div className="bg-blue-600 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">StudyStark Batch Details</h1>
          <p className="text-gray-600 mb-8">
            Welcome to the batch details interface. Use the following URL formats to view specific batches:
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">URL Formats:</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-blue-600">Method 1: Path Parameter</p>
                <code className="bg-white px-2 py-1 rounded text-gray-800 block mt-1">
                  /batch/YOUR_BATCH_ID
                </code>
              </div>
              <div>
                <p className="font-medium text-green-600">Method 2: Query Parameter</p>
                <code className="bg-white px-2 py-1 rounded text-gray-800 block mt-1">
                  /?batch_id=YOUR_BATCH_ID
                </code>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Example Links:</h4>
            <div className="space-y-2 text-sm">
              <a 
                href="/batch/6774ebb37aa1a60276d43e7c" 
                className="block text-blue-600 hover:text-blue-800 underline"
              >
                /batch/6774ebb37aa1a60276d43e7c
              </a>
              <a 
                href="/?batch_id=6774ebb37aa1a60276d43e7c" 
                className="block text-green-600 hover:text-green-800 underline"
              >
                /?batch_id=6774ebb37aa1a60276d43e7c
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BatchDetails />} />
        <Route path="/batch/:batchId" element={<BatchDetails />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;