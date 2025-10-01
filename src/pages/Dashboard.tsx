import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon } from 'lucide-react';
import EntryCard from '../components/EntryCard';
import { useAuth } from '../contexts/AuthContext';
import { fetchEntries, EntryWithDetails } from '../services/entryService';
import { fetchCategories } from '../services/categoryService';

const Dashboard = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<EntryWithDetails[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; color: string | null }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

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
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || entry.category_id === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-black font-bold">Loading your achievements...</p>
        </div>
      </div>
    );
  }
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-black text-black">YOUR BRAG LEDGER</h1>
          <p className="mt-1 text-sm font-bold text-black">
            Track and celebrate your professional achievements
          </p>
        </div>
        <Link to="/new" className="mt-4 sm:mt-0 inline-flex items-center px-4 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] text-sm font-bold rounded-none text-white bg-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all">
          <PlusIcon className="h-4 w-4 mr-2" />
          Log New Achievement
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-black" />
          </div>
          <input type="text" className="block w-full pl-10 py-3 text-black border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]" placeholder="Search achievements..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div>
            <label htmlFor="category-filter" className="sr-only">
              Filter by Category
            </label>
            <select id="category-filter" className="block w-full pl-3 pr-10 py-3 text-black bg-cyan-300 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map(category => <option key={category.id} value={category.id}>
                  {category.name}
                </option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.length > 0 ? filteredEntries.map(entry => <EntryCard key={entry.id} entry={entry} />) : <div className="col-span-full flex flex-col items-center justify-center p-8 bg-white rounded-none border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)]">
            <p className="text-black text-center mb-4 font-bold">
              No achievements found. Start by adding your first win!
            </p>
            <Link to="/new" className="inline-flex items-center px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-sm font-bold rounded-none text-white bg-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all">
              <PlusIcon className="h-4 w-4 mr-2" />
              Log New Achievement
            </Link>
          </div>}
      </div>
    </div>;
};
export default Dashboard;