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
  Star,
  Search,
  Filter,
  Grid,
  List,
  ChevronRight,
  TrendingUp,
  Target,
  Zap
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

// Sample batch data for demonstration
const sampleBatches: BatchData[] = [
  {
    _id: "6774ebb37aa1a60276d43e7c",
    batch_name: "NEEV 2026 (Class 9th)",
    class: 9,
    subject: "Mathematics",
    teacher_name: "Alakh Pandey",
    description: "Complete foundation course for Class 9th students preparing for competitive exams",
    total_students: 15420,
    start_date: "2024-01-15",
    end_date: "2024-12-31",
    total_lectures: 120,
    completed_lectures: 45,
    batch_image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
    status: "ongoing",
    price: 15000,
    discount_price: 8999,
    rating: 4.8,
    total_reviews: 2340
  },
  {
    _id: "6774ebb37aa1a60276d43e7d",
    batch_name: "ARJUNA JEE 2025",
    class: 12,
    subject: "Physics",
    teacher_name: "Pankaj Sijairya",
    description: "Advanced JEE preparation with comprehensive problem solving",
    total_students: 8750,
    start_date: "2024-02-01",
    end_date: "2025-05-31",
    total_lectures: 200,
    completed_lectures: 89,
    batch_image: "https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg",
    status: "ongoing",
    price: 25000,
    discount_price: 18999,
    rating: 4.9,
    total_reviews: 1890
  },
  {
    _id: "6774ebb37aa1a60276d43e7e",
    batch_name: "LAKSHYA NEET 2025",
    class: 12,
    subject: "Biology",
    teacher_name: "Vipin Sharma",
    description: "Complete NEET preparation with medical entrance focus",
    total_students: 12300,
    start_date: "2024-01-20",
    end_date: "2025-05-15",
    total_lectures: 180,
    completed_lectures: 67,
    batch_image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg",
    status: "ongoing",
    price: 22000,
    discount_price: 16999,
    rating: 4.7,
    total_reviews: 3120
  },
  {
    _id: "6774ebb37aa1a60276d43e7f",
    batch_name: "FOUNDATION 2027 (Class 8th)",
    class: 8,
    subject: "Science",
    teacher_name: "Prateek Jain",
    description: "Early foundation building for competitive exam preparation",
    total_students: 6890,
    start_date: "2024-03-01",
    end_date: "2025-02-28",
    total_lectures: 100,
    completed_lectures: 23,
    batch_image: "https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg",
    status: "ongoing",
    price: 12000,
    discount_price: 7999,
    rating: 4.6,
    total_reviews: 890
  }
];

function BatchCard({ batch }: { batch: BatchData }) {
  const progress = (batch.completed_lectures / batch.total_lectures) * 100;
  const discount = Math.round(((batch.price - batch.discount_price) / batch.price) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      {/* Batch Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={batch.batch_image} 
          alt={batch.batch_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {batch.status === 'ongoing' ? 'Live' : batch.status}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {discount}% OFF
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center gap-2 text-white">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="text-sm font-medium">{batch.rating}</span>
            <span className="text-sm opacity-80">({batch.total_reviews})</span>
          </div>
        </div>
      </div>

      {/* Batch Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
            Class {batch.class}
          </div>
          <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-xs font-medium">
            {batch.subject}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {batch.batch_name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {batch.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {batch.teacher_name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="text-gray-700 font-medium text-sm">{batch.teacher_name}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-900">
              {batch.completed_lectures}/{batch.total_lectures}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 mt-1">{progress.toFixed(1)}% Complete</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{batch.total_students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <PlayCircle className="w-4 h-4" />
            <span>{batch.total_lectures} lectures</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">₹{batch.discount_price.toLocaleString()}</span>
              <span className="text-lg text-gray-500 line-through">₹{batch.price.toLocaleString()}</span>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
            View Details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function BatchesPage() {
  const [batches, setBatches] = useState<BatchData[]>(sampleBatches);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.batch_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || batch.class.toString() === selectedClass;
    const matchesSubject = selectedSubject === 'all' || batch.subject.toLowerCase() === selectedSubject.toLowerCase();
    
    return matchesSearch && matchesClass && matchesSubject;
  });

  const uniqueClasses = [...new Set(batches.map(batch => batch.class))].sort();
  const uniqueSubjects = [...new Set(batches.map(batch => batch.subject))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">StudyStark</h1>
                <p className="text-xs text-gray-500">Learn with the best</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Learning Batch
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of students in our expert-led batches designed for competitive exam success
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search batches, teachers, or subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">100+</div>
              <div className="text-sm text-gray-600">Expert Teachers</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Live Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filters:</span>
            </div>
            
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Classes</option>
              {uniqueClasses.map(cls => (
                <option key={cls} value={cls.toString()}>Class {cls}</option>
              ))}
            </select>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Subjects</option>
              {uniqueSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <div className="ml-auto text-sm text-gray-600">
              Showing {filteredBatches.length} of {batches.length} batches
            </div>
          </div>
        </div>

        {/* Batches Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="ml-3 text-lg text-gray-600">Loading batches...</span>
          </div>
        ) : (
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredBatches.map(batch => (
              <BatchCard key={batch._id} batch={batch} />
            ))}
          </div>
        )}

        {filteredBatches.length === 0 && !loading && (
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No batches found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
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

  const fetchBatchData = async () => {
    if (!currentBatchId) {
      setError('No batch ID provided');
      setLoading(false);
      return;
    }

    try {
      setError(null);
      // Try to fetch from API, fallback to sample data
      const response = await fetch(`https://pw-api1-ab3091004643.herokuapp.com/batch/${currentBatchId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBatchData(data);
      setLastUpdated(new Date());
    } catch (err) {
      // Fallback to sample data if API fails
      const sampleBatch = sampleBatches.find(batch => batch._id === currentBatchId);
      if (sampleBatch) {
        setBatchData(sampleBatch);
        setLastUpdated(new Date());
      } else {
        setError(err instanceof Error ? err.message : 'Failed to fetch batch data');
      }
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BatchesPage />} />
        <Route path="/batch/:batchId" element={<BatchDetails />} />
        <Route path="/batches" element={<BatchesPage />} />
      </Routes>
    </Router>
  );
}

export default App;