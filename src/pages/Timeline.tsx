import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import { useAuth } from '../contexts/AuthContext';
import { fetchEntries, EntryWithDetails } from '../services/entryService';
import { fetchCategories } from '../services/categoryService';

const Timeline = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<EntryWithDetails[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; color: string | null }>>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [entriesData, categoriesData] = await Promise.all([
        fetchEntries(user!.id),
        fetchCategories(user!.id)
      ]);
      setEntries(entriesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading timeline data:', error);
    } finally {
      setLoading(false);
    }
  };
  // Get current period label (month name or year)
  const currentPeriodLabel = useMemo(() => {
    if (viewMode === 'month') {
      return new Date(currentDate.getFullYear(), currentDate.getMonth()).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });
    } else {
      return currentDate.getFullYear().toString();
    }
  }, [currentDate, viewMode]);
  // Navigate to previous period
  const goToPreviousPeriod = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
    }
  };
  // Navigate to next period
  const goToNextPeriod = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
    }
  };
  // Go to current period
  const goToCurrentPeriod = () => {
    setCurrentDate(new Date());
  };
  // Filter and group entries based on the current view mode and date
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.achievement_date);
      if (viewMode === 'month') {
        return entryDate.getMonth() === currentDate.getMonth() && entryDate.getFullYear() === currentDate.getFullYear();
      } else {
        return entryDate.getFullYear() === currentDate.getFullYear();
      }
    }).sort((a, b) => new Date(b.achievement_date).getTime() - new Date(a.achievement_date).getTime());
  }, [entries, currentDate, viewMode]);
  // Group entries by date for month view or by month for year view
  const groupedEntries = useMemo(() => {
    const groups: { [key: number]: EntryWithDetails[] } = {};
    filteredEntries.forEach(entry => {
      const entryDate = new Date(entry.achievement_date);
      let groupKey;
      if (viewMode === 'month') {
        groupKey = entryDate.getDate();
      } else {
        groupKey = entryDate.getMonth();
      }
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(entry);
    });
    return groups;
  }, [filteredEntries, viewMode]);
  // Get category info for an entry
  const getCategoryInfo = (entry: EntryWithDetails) => {
    if (entry.category) {
      const colors = ['bg-green-400', 'bg-cyan-400', 'bg-purple-400', 'bg-yellow-400', 'bg-pink-400'];
      const colorIndex = categories.findIndex(cat => cat.id === entry.category?.id);
      const color = colorIndex >= 0 ? colors[colorIndex % colors.length] : 'bg-gray-100';
      return {
        name: entry.category.name,
        color: `${color} border-black`
      };
    }
    return {
      name: 'Uncategorized',
      color: 'bg-gray-100 border-black'
    };
  };
  // Render month labels for year view
  const renderMonthLabels = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return <div className="grid grid-cols-4 gap-4 mb-6">
        {months.map((month, index) => <div key={month} className={`p-2 text-center rounded-none border-2 ${groupedEntries[index] ? 'bg-pink-400 text-black font-bold border-black' : 'text-black bg-white border-black'}`}>
            {month}
            {groupedEntries[index] && <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-none bg-white border-2 border-black">
                {groupedEntries[index].length}
              </span>}
          </div>)}
      </div>;
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-black text-black">
            ACHIEVEMENT TIMELINE
          </h1>
          <p className="mt-1 text-sm text-black font-bold">
            Visualize your achievements over time
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <button onClick={() => setViewMode('month')} className={`px-3 py-2 text-sm font-bold rounded-none border-2 border-black ${viewMode === 'month' ? 'bg-yellow-400 text-black' : 'bg-white text-black hover:bg-yellow-200'}`}>
            Month View
          </button>
          <button onClick={() => setViewMode('year')} className={`px-3 py-2 text-sm font-bold rounded-none border-2 border-black ${viewMode === 'year' ? 'bg-yellow-400 text-black' : 'bg-white text-black hover:bg-yellow-200'}`}>
            Year View
          </button>
        </div>
      </div>
      <div className="bg-white rounded-none border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] p-4 transform rotate-1">
        <div className="flex items-center justify-between mb-6">
          <button onClick={goToPreviousPeriod} className="p-2 rounded-none text-black bg-cyan-300 hover:bg-cyan-400 border-2 border-black">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-black">
              {currentPeriodLabel}
            </h2>
            <button onClick={goToCurrentPeriod} className="ml-2 text-xs text-black bg-pink-300 hover:bg-pink-400 flex items-center px-2 py-1 rounded-none border-2 border-black font-bold">
              <ClockIcon className="h-3 w-3 mr-1" />
              Current
            </button>
          </div>
          <button onClick={goToNextPeriod} className="p-2 rounded-none text-black bg-cyan-300 hover:bg-cyan-400 border-2 border-black">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
        {viewMode === 'year' && renderMonthLabels()}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
              <p className="mt-4 text-black font-bold">Loading timeline...</p>
            </div>
          </div>
        ) : filteredEntries.length > 0 ? <div className="space-y-6">
            {viewMode === 'month' ?
        // Month view - group by days
        Object.keys(groupedEntries).sort((a, b) => Number(b) - Number(a))
        .map(day => <div key={day} className="relative">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-none bg-cyan-400 flex items-center justify-center text-black font-bold border-4 border-black">
                          {day}
                        </div>
                        <div className="ml-4 text-sm font-bold text-black">
                          {new Date(currentDate.getFullYear(), currentDate.getMonth(), Number(day)).toLocaleDateString('en-US', {
                weekday: 'long'
              })}
                        </div>
                      </div>
                      <div className="mt-2 ml-14 space-y-3">
                        {groupedEntries[Number(day)].map(entry => <TimelineEntry key={entry.id} entry={entry} getCategoryInfo={getCategoryInfo} />)}
                      </div>
                    </div>) :
        // Year view - group by months
        Object.keys(groupedEntries).sort((a, b) => Number(b) - Number(a))
        .map(month => <div key={month} className="relative">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-none bg-pink-400 flex items-center justify-center text-black font-bold border-4 border-black">
                          {Number(month) + 1}
                        </div>
                        <div className="ml-4 text-sm font-bold text-black">
                          {new Date(currentDate.getFullYear(), Number(month)).toLocaleDateString('en-US', {
                month: 'long'
              })}
                        </div>
                      </div>
                      <div className="mt-2 ml-14 space-y-3">
                        {groupedEntries[Number(month)].map(entry => <TimelineEntry key={entry.id} entry={entry} getCategoryInfo={getCategoryInfo} />)}
                      </div>
                    </div>)}
          </div> : <div className="flex flex-col items-center justify-center py-12 text-center">
            <CalendarIcon className="h-12 w-12 text-black mb-4" />
            <h3 className="text-lg font-bold text-black mb-1">
              No achievements found
            </h3>
            <p className="text-black mb-4 font-medium">
              {viewMode === 'month' ? `You don't have any recorded achievements for ${currentPeriodLabel}.` : `You don't have any recorded achievements for ${currentPeriodLabel}.`}
            </p>
            <Link to="/dashboard/new" className="inline-flex items-center px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-sm font-bold rounded-none text-white bg-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all">
              Log a new achievement
            </Link>
          </div>}
      </div>
    </div>;
};
// Timeline Entry Component
const TimelineEntry = ({
  entry,
  getCategoryInfo
}: {
  entry: EntryWithDetails;
  getCategoryInfo: (entry: EntryWithDetails) => { name: string; color: string };
}) => {
  const categoryInfo = getCategoryInfo(entry);
  const randomRotation = Math.random() > 0.5 ? 'rotate-1' : '-rotate-1';
  return <Link to={`/entry/${entry.id}`} className={`block p-4 border-4 rounded-none ${categoryInfo.color} hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all transform ${randomRotation}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-black font-bold">{entry.title}</h3>
        <div className="text-xs text-black font-bold bg-yellow-300 px-2 py-1 rounded-none border-2 border-black">
          {formatDate(entry.achievement_date)}
        </div>
      </div>
      <p className="mt-1 text-sm text-black line-clamp-2 font-medium">
        {entry.description}
      </p>
      {entry.tags && entry.tags.length > 0 && <div className="mt-2 flex flex-wrap gap-1">
          {entry.tags.slice(0, 3).map((tag) => <span key={tag.id} className="text-xs bg-white px-2 py-1 rounded-none border-2 border-black font-bold">
              {tag.name}
            </span>)}
          {entry.tags.length > 3 && <span className="text-xs bg-white px-2 py-1 rounded-none border-2 border-black font-bold">
              +{entry.tags.length - 3}
            </span>}
        </div>}
    </Link>;
};
export default Timeline;