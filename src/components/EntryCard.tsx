import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, EyeIcon, EyeOffIcon, UsersIcon } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import { EntryWithDetails } from '../services/entryService';

interface EntryCardProps {
  entry: EntryWithDetails;
}

const EntryCard = ({ entry }: EntryCardProps) => {
  const getPrivacyIcon = () => {
    switch (entry.privacy_level) {
      case 'private':
        return <EyeOffIcon className="h-4 w-4 text-black" title="Private" />;
      case 'team':
        return <UsersIcon className="h-4 w-4 text-black" title="Team Visible" />;
      case 'organization':
        return <EyeIcon className="h-4 w-4 text-black" title="Organization Visible" />;
      default:
        return <EyeOffIcon className="h-4 w-4 text-black" title="Private" />;
    }
  };

  const getCategoryColor = () => {
    if (entry.category?.color) {
      return `bg-[${entry.category.color}] text-black`;
    }
    return 'bg-cyan-400 text-black';
  };

  const hasAttachments = entry.attachments && entry.attachments.length > 0;
  const randomRotation = Math.random() > 0.5 ? 'rotate-1' : '-rotate-1';
  return (
    <Link to={`/entry/${entry.id}`} className="block transform hover:scale-105 transition-transform duration-200">
      <div className={`bg-white rounded-none border-4 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] ${randomRotation}`}>
        {hasAttachments && entry.attachments![0].file_type.startsWith('image') && (
          <div className="h-32 bg-pink-300 flex items-center justify-center border-b-4 border-black">
            <img
              src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${entry.attachments![0].file_path}`}
              alt={entry.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            {entry.category && (
              <span className={`inline-flex items-center px-2.5 py-1 rounded-none text-xs font-bold ${getCategoryColor()} border-2 border-black`}>
                {entry.category.name}
              </span>
            )}
            {getPrivacyIcon()}
          </div>
          <h3 className="text-lg font-bold text-black mb-1 line-clamp-2">
            {entry.title}
          </h3>
          <p className="text-sm text-black mb-3 line-clamp-3">
            {entry.description}
          </p>
          <div className="flex items-center justify-between text-xs text-black">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>{formatDate(entry.achievement_date)}</span>
            </div>
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {entry.tags.slice(0, 2).map((tag) => (
                  <span key={tag.id} className="bg-yellow-300 px-2 py-1 rounded-none border-2 border-black">
                    {tag.name}
                  </span>
                ))}
                {entry.tags.length > 2 && (
                  <span className="bg-yellow-300 px-2 py-1 rounded-none border-2 border-black">
                    +{entry.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default EntryCard;