import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SaveIcon, XIcon, PlusIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createEntry, addTagsToEntry } from '../services/entryService';
import { fetchCategories, createCategory } from '../services/categoryService';
import { fetchTags, createTag } from '../services/tagService';

export default function NewEntryPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [allTags, setAllTags] = useState<Array<{ id: string; name: string }>>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [achievementDate, setAchievementDate] = useState(new Date().toISOString().split('T')[0]);
  const [privacyLevel, setPrivacyLevel] = useState<'private' | 'team' | 'organization'>(
    profile?.default_privacy || 'private'
  );
  const [categoryId, setCategoryId] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [categoriesData, tagsData] = await Promise.all([
        fetchCategories(user!.id),
        fetchTags(user!.id)
      ]);
      setCategories(categoriesData);
      setAllTags(tagsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleAddTag = async () => {
    if (!tagInput.trim()) return;

    try {
      const trimmedTag = tagInput.trim();
      let existingTag = allTags.find(t => t.name.toLowerCase() === trimmedTag.toLowerCase());

      if (!existingTag) {
        existingTag = await createTag(trimmedTag, user!.id);
        setAllTags([...allTags, existingTag]);
      }

      if (!selectedTags.includes(existingTag.id)) {
        setSelectedTags([...selectedTags, existingTag.id]);
      }

      setTagInput('');
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId));
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const colors = ['#06b6d4', '#10b981', '#f59e0b', '#f472b6', '#8b5cf6', '#ef4444'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const newCategory = await createCategory(newCategoryName.trim(), user!.id, randomColor);
      setCategories([...categories, newCategory]);
      setCategoryId(newCategory.id);
      setNewCategoryName('');
      setShowNewCategoryInput(false);
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      const entry = await createEntry({
        title: title.trim(),
        description: description.trim(),
        achievement_date: achievementDate,
        privacy_level: privacyLevel,
        category_id: categoryId || null,
        user_id: user!.id
      });

      if (selectedTags.length > 0) {
        await addTagsToEntry(entry.id, selectedTags);
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating entry:', error);
      alert('Failed to create entry. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-black">LOG NEW ACHIEVEMENT</h1>
        <p className="mt-1 text-sm font-bold text-black">
          Record your professional wins and accomplishments
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-black mb-2">
              Achievement Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-3 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="e.g., Successfully launched Q3 marketing campaign"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-bold text-black mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="block w-full px-4 py-3 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Describe your achievement, the impact, and any key metrics..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-bold text-black mb-2">
                Achievement Date *
              </label>
              <input
                type="date"
                id="date"
                value={achievementDate}
                onChange={(e) => setAchievementDate(e.target.value)}
                className="block w-full px-4 py-3 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-bold text-black mb-2">
                Category
              </label>
              {!showNewCategoryInput ? (
                <div className="flex gap-2">
                  <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="flex-1 px-4 py-3 border-4 border-black rounded-none bg-cyan-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="">No Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowNewCategoryInput(true)}
                    className="px-4 py-3 bg-green-400 border-4 border-black rounded-none font-bold hover:translate-y-0.5 hover:translate-x-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
                    title="Add new category"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleCreateCategory())}
                    placeholder="Enter category name"
                    className="flex-1 px-4 py-3 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleCreateCategory}
                    className="px-4 py-3 bg-green-400 border-4 border-black rounded-none font-bold hover:translate-y-0.5 hover:translate-x-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCategoryInput(false);
                      setNewCategoryName('');
                    }}
                    className="px-4 py-3 bg-red-400 border-4 border-black rounded-none font-bold hover:translate-y-0.5 hover:translate-x-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
              <p className="mt-1 text-xs text-black">
                {showNewCategoryInput
                  ? 'Enter a category name and press Enter or click + to create'
                  : 'Select a category or click + to create a new one'}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Privacy Level *
            </label>
            <div className="space-y-3 bg-yellow-200 p-4 rounded-none border-4 border-black">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={privacyLevel === 'private'}
                  onChange={(e) => setPrivacyLevel(e.target.value as any)}
                  className="h-5 w-5 text-black border-black"
                />
                <span className="ml-3 text-sm font-bold text-black">
                  Private (Only you)
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="team"
                  checked={privacyLevel === 'team'}
                  onChange={(e) => setPrivacyLevel(e.target.value as any)}
                  className="h-5 w-5 text-black border-black"
                />
                <span className="ml-3 text-sm font-bold text-black">
                  Team (Visible to team members)
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="organization"
                  checked={privacyLevel === 'organization'}
                  onChange={(e) => setPrivacyLevel(e.target.value as any)}
                  className="h-5 w-5 text-black border-black"
                />
                <span className="ml-3 text-sm font-bold text-black">
                  Organization (Visible to everyone)
                </span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-bold text-black mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 px-4 py-3 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Add tags (press Enter)"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-3 bg-pink-400 border-4 border-black rounded-none font-bold hover:translate-y-0.5 hover:translate-x-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tagId => {
                  const tag = allTags.find(t => t.id === tagId);
                  return tag ? (
                    <span
                      key={tag.id}
                      className="inline-flex items-center bg-yellow-300 px-3 py-1 rounded-none border-2 border-black font-bold"
                    >
                      {tag.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag.id)}
                        className="ml-2 text-black hover:text-gray-700"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 border-4 border-black rounded-none font-bold hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-0.5 hover:translate-x-0.5"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-black text-white border-4 border-black rounded-none font-bold hover:translate-y-0.5 hover:translate-x-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] disabled:opacity-50"
          >
            <SaveIcon className="h-5 w-5 mr-2" />
            {loading ? 'Saving...' : 'Save Achievement'}
          </button>
        </div>
      </form>
    </div>
  );
}
