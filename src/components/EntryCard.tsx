import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, EyeIcon, EyeOffIcon, UsersIcon } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import { categories } from '../utils/mockData';
const EntryCard = ({
  entry
}) => {
  const getPrivacyIcon = () => {
    switch (entry.privacy) {
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
  const getCategoryInfo = () => {
    const category = categories.find(cat => cat.id === entry.category);
    if (!category) return {
      name: 'Unknown',
      color: 'bg-gray-100 text-black'
    };
    const subcategory = category.subcategories.find(sub => sub.id === entry.subcategory);
    const subcategoryName = subcategory ? subcategory.name : 'Unknown';
    let color = 'bg-gray-100 text-black';
    switch (entry.category) {
      case 'professional':
        color = 'bg-green-400 text-black';
        break;
      case 'recognition':
        color = 'bg-cyan-400 text-black';
        break;
      case 'learning':
        color = 'bg-purple-400 text-black';
        break;
      case 'milestone':
        color = 'bg-yellow-400 text-black';
        break;
    }
    return {
      categoryName: category.name,
      subcategoryName,
      color
    };
  };
  const categoryInfo = getCategoryInfo();
  const randomRotation = Math.random() > 0.5 ? 'rotate-1' : '-rotate-1';
  return <Link to={`/entry/${entry.id}`} className="block transform hover:scale-105 transition-transform duration-200">
      <div className={`bg-white rounded-none border-4 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] ${randomRotation}`}>
        {entry.hasAttachment && <div className="h-32 bg-pink-300 flex items-center justify-center border-b-4 border-black">
            {entry.attachmentType === 'image' ? <img src={entry.attachmentUrl} alt={entry.title} className="w-full h-full object-cover" /> : <div className="text-black flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>}
          </div>}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-none text-xs font-bold ${categoryInfo.color} border-2 border-black`}>
              {categoryInfo.subcategoryName}
            </span>
            <div className="flex space-x-2">
              {getPrivacyIcon()}
              {entry.endorsed && <svg className="h-4 w-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>}
            </div>
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
              <span>{formatDate(entry.date)}</span>
            </div>
            {entry.tags && entry.tags.length > 0 && <div className="flex flex-wrap gap-1">
                {entry.tags.slice(0, 2).map((tag, index) => <span key={index} className="bg-yellow-300 px-2 py-1 rounded-none border-2 border-black">
                    {tag}
                  </span>)}
                {entry.tags.length > 2 && <span className="bg-yellow-300 px-2 py-1 rounded-none border-2 border-black">
                    +{entry.tags.length - 2}
                  </span>}
              </div>}
          </div>
        </div>
      </div>
    </Link>;
};
export default EntryCard;