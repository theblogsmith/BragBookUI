import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, TagIcon, PaperclipIcon, EyeIcon, EyeOffIcon, UsersIcon, EditIcon, TrashIcon, ThumbsUpIcon } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import { fetchEntryById, deleteEntry, EntryWithDetails } from '../services/entryService';
import { useAuth } from '../contexts/AuthContext';

const ViewEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [entry, setEntry] = useState<EntryWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadEntry();
    }
  }, [id]);

  const loadEntry = async () => {
    try {
      setLoading(true);
      const data = await fetchEntryById(id!);
      setEntry(data);
    } catch (err) {
      console.error('Error loading entry:', err);
      setError('Failed to load entry');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;

    try {
      await deleteEntry(id!);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error deleting entry:', err);
      alert('Failed to delete entry');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-black font-bold">Loading achievement...</p>
        </div>
      </div>
    );
  }

  if (error || !entry) {
    return <div className="max-w-3xl mx-auto text-center py-12">
        <h2 className="text-xl font-black text-black mb-2">Entry not found</h2>
        <p className="text-black mb-6 font-bold">
          The achievement you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/dashboard" className="inline-flex items-center px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-sm font-bold rounded-none text-white bg-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>;
  }
  const getPrivacyLabel = () => {
    switch (entry.privacy_level) {
      case 'private':
        return {
          icon: EyeOffIcon,
          label: 'Private',
          color: 'text-black'
        };
      case 'team':
        return {
          icon: UsersIcon,
          label: 'Team Visible',
          color: 'text-black'
        };
      case 'organization':
        return {
          icon: EyeIcon,
          label: 'Organization Visible',
          color: 'text-black'
        };
      default:
        return {
          icon: EyeOffIcon,
          label: 'Private',
          color: 'text-black'
        };
    }
  };

  const getCategoryColor = () => {
    const colors = ['bg-green-400', 'bg-cyan-400', 'bg-purple-400', 'bg-yellow-400', 'bg-pink-400'];
    const hash = entry.category?.name?.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0) || 0;
    return `${colors[hash % colors.length]} text-black`;
  };

  const privacyInfo = getPrivacyLabel();
  return <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-sm text-black hover:text-gray-700 font-bold bg-yellow-300 px-3 py-2 rounded-none border-2 border-black">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </button>
      <div className="bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] rounded-none overflow-hidden border-4 border-black transform -rotate-1">
        <div className="px-6 py-5 border-b-4 border-black bg-pink-300 flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-2">
              {entry.category && (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-none text-xs font-bold ${getCategoryColor()} border-2 border-black`}>
                  {entry.category.name}
                </span>
              )}
              <div className={`flex items-center ${privacyInfo.color} bg-yellow-300 px-2.5 py-1 rounded-none border-2 border-black`}>
                <privacyInfo.icon className="h-4 w-4 mr-1" />
                <span className="text-xs font-bold">{privacyInfo.label}</span>
              </div>
            </div>
            <h1 className="mt-2 text-2xl font-black text-black">
              {entry.title}
            </h1>
            {entry.category && (
              <p className="mt-1 text-sm text-black font-bold">
                {entry.category.name}
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-cyan-300 rounded-none text-black hover:bg-cyan-400 border-2 border-black">
              <EditIcon className="h-5 w-5" />
            </button>
            <button onClick={handleDelete} className="p-2 bg-pink-400 rounded-none text-black hover:bg-pink-500 border-2 border-black">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-center text-sm text-black mb-6 font-bold">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{formatDate(entry.achievement_date)}</span>
          </div>
          <div className="prose max-w-none">
            <p className="text-black whitespace-pre-line font-medium">
              {entry.description}
            </p>
          </div>
          {entry.tags && entry.tags.length > 0 && <div className="mt-6">
              <div className="flex items-center mb-2">
                <TagIcon className="h-4 w-4 text-black mr-1" />
                <span className="text-sm font-bold text-black">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => <span key={tag.id} className="bg-yellow-300 text-black text-sm px-2 py-1 rounded-none border-2 border-black font-bold">
                    {tag.name}
                  </span>)}
              </div>
            </div>}
          {entry.attachments && entry.attachments.length > 0 && <div className="mt-6">
              <div className="flex items-center mb-2">
                <PaperclipIcon className="h-4 w-4 text-black mr-1" />
                <span className="text-sm font-bold text-black">
                  Attachments ({entry.attachments.length})
                </span>
              </div>
              <div className="space-y-3">
                {entry.attachments.map((attachment) => (
                  <div key={attachment.id} className="border-4 border-black rounded-none overflow-hidden">
                    {attachment.file_type.startsWith('image/') ? (
                      <div className="relative">
                        <img src={attachment.file_path} alt={attachment.file_name} className="w-full object-cover max-h-96" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                          <a href={attachment.file_path} target="_blank" rel="noopener noreferrer" className="bg-white text-black text-sm px-3 py-1 rounded-none border-2 border-black font-bold">
                            View Full Size
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 flex items-center justify-between bg-cyan-200">
                        <div className="flex items-center">
                          <PaperclipIcon className="h-8 w-8 text-black" />
                          <div className="ml-3">
                            <p className="text-sm font-bold text-black">
                              {attachment.file_name}
                            </p>
                            <p className="text-xs text-black font-medium">
                              {(attachment.file_size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <a href={attachment.file_path} target="_blank" rel="noopener noreferrer" className="bg-green-400 hover:bg-green-500 text-black text-sm px-3 py-1 rounded-none border-2 border-black font-bold">
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>}
        </div>
        <div className="px-6 py-4 bg-yellow-300 border-t-4 border-black">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center text-black hover:text-gray-700 bg-pink-400 px-3 py-2 rounded-none border-2 border-black font-bold hover:translate-y-0.5 hover:translate-x-0.5 transition-transform">
                <ThumbsUpIcon className="h-5 w-5 mr-1" />
                <span className="text-sm">Endorse</span>
              </button>
            </div>
            {entry.privacy_level !== 'private' && <button className="inline-flex items-center px-3 py-2 border-2 border-black text-sm leading-5 font-bold rounded-none text-black bg-cyan-300 hover:bg-cyan-400 hover:translate-y-0.5 hover:translate-x-0.5 transition-all">
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>}
          </div>
        </div>
      </div>
    </div>;
};
export default ViewEntry;