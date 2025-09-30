import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, FilterIcon } from 'lucide-react';
import EntryCard from '../components/EntryCard';
import { mockEntries, categories } from '../utils/mockData';
const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSubcategory, setFilterSubcategory] = useState('all');
  // Get available subcategories based on selected category
  const availableSubcategories = filterCategory !== 'all' ? categories.find(cat => cat.id === filterCategory)?.subcategories || [] : [];
  // Filter entries based on search term and category/subcategory filters
  const filteredEntries = mockEntries.filter(entry => {
    // Search term filter
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    // Category filter
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;
    // Subcategory filter (only apply if a category is selected)
    const matchesSubcategory = filterCategory === 'all' || filterSubcategory === 'all' || entry.subcategory === filterSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });
  // Handle category change
  const handleCategoryChange = e => {
    const newCategory = e.target.value;
    setFilterCategory(newCategory);
    setFilterSubcategory('all'); // Reset subcategory when category changes
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-black text-black">YOUR BRAG BOOK</h1>
          <p className="mt-1 text-sm font-bold text-black">
            Track and celebrate your professional achievements
          </p>
        </div>
        <Link to="/dashboard/new" className="mt-4 sm:mt-0 inline-flex items-center px-4 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] text-sm font-bold rounded-none text-white bg-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all">
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
            <select id="category-filter" className="block w-full pl-3 pr-10 py-3 text-black bg-cyan-300 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]" value={filterCategory} onChange={handleCategoryChange}>
              <option value="all">All Categories</option>
              {categories.map(category => <option key={category.id} value={category.id}>
                  {category.name}
                </option>)}
            </select>
          </div>
          {filterCategory !== 'all' && <div>
              <label htmlFor="subcategory-filter" className="sr-only">
                Filter by Subcategory
              </label>
              <select id="subcategory-filter" className="block w-full pl-3 pr-10 py-3 text-black bg-pink-300 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]" value={filterSubcategory} onChange={e => setFilterSubcategory(e.target.value)}>
                <option value="all">All Subcategories</option>
                {availableSubcategories.map(subcategory => <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>)}
              </select>
            </div>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.length > 0 ? filteredEntries.map(entry => <EntryCard key={entry.id} entry={entry} />) : <div className="col-span-full flex flex-col items-center justify-center p-8 bg-white rounded-none border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)]">
            <p className="text-black text-center mb-4 font-bold">
              No achievements found. Start by adding your first win!
            </p>
            <Link to="/dashboard/new" className="inline-flex items-center px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-sm font-bold rounded-none text-white bg-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all">
              <PlusIcon className="h-4 w-4 mr-2" />
              Log New Achievement
            </Link>
          </div>}
      </div>
    </div>;
};
export default Dashboard;