import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon, TagIcon, PaperclipIcon, LockIcon, AlertCircleIcon } from 'lucide-react';
import TagInput from './TagInput';
import { categories } from '../utils/mockData';
const EntryForm = ({
  onSubmit,
  initialData = {}
}) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      date: initialData.date || new Date().toISOString().split('T')[0],
      category: initialData.category || 'professional',
      subcategory: initialData.subcategory || 'project_win',
      privacy: initialData.privacy || 'private',
      tags: initialData.tags || []
    }
  });
  const selectedCategory = watch('category');
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [tags, setTags] = useState(initialData.tags || []);
  const [attachments, setAttachments] = useState([]);
  useEffect(() => {
    const category = categories.find(cat => cat.id === selectedCategory);
    if (category) {
      setAvailableSubcategories(category.subcategories);
      // Set default subcategory when category changes
      const hasMatchingSubcategory = category.subcategories.some(sub => sub.id === watch('subcategory'));
      if (!hasMatchingSubcategory && category.subcategories.length > 0) {
        setValue('subcategory', category.subcategories[0].id);
      }
    }
  }, [selectedCategory, setValue, watch]);
  const handleTagsChange = newTags => {
    setTags(newTags);
    setValue('tags', newTags);
  };
  const handleAttachmentChange = e => {
    if (e.target.files.length > 0) {
      const newAttachments = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        file
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };
  const removeAttachment = index => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  const submitForm = data => {
    onSubmit({
      ...data,
      tags,
      attachments
    });
  };
  return <form onSubmit={handleSubmit(submitForm)} className="p-6 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-bold text-black mb-1">
          Title*
        </label>
        <input type="text" id="title" className={`mt-1 block w-full border-4 ${errors.title ? 'border-red-500' : 'border-black'} rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] py-3 px-3 text-black bg-white`} placeholder="E.g., Completed Q3 marketing campaign" {...register('title', {
        required: 'Title is required'
      })} />
        {errors.title && <p className="mt-1 text-sm text-red-600 flex items-center font-bold">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            {errors.title.message}
          </p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-bold text-black mb-1">
          Description*
        </label>
        <textarea id="description" rows={4} className={`mt-1 block w-full border-4 ${errors.description ? 'border-red-500' : 'border-black'} rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] py-3 px-3 text-black bg-white`} placeholder="Describe your achievement in detail..." {...register('description', {
        required: 'Description is required'
      })}></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-600 flex items-center font-bold">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            {errors.description.message}
          </p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-bold text-black mb-1">
            Date*
          </label>
          <div className="mt-1 relative rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-black" />
            </div>
            <input type="date" id="date" className="block w-full pl-10 py-3 text-black border-4 border-black rounded-none bg-cyan-200" {...register('date', {
            required: 'Date is required'
          })} />
          </div>
          {errors.date && <p className="mt-1 text-sm text-red-600 font-bold">
              {errors.date.message}
            </p>}
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-bold text-black mb-1">
            Category
          </label>
          <select id="category" className="mt-1 block w-full bg-green-300 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] py-3 px-3 text-black" {...register('category')}>
            {categories.map(category => <option key={category.id} value={category.id}>
                {category.name}
              </option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="subcategory" className="block text-sm font-bold text-black mb-1">
          Subcategory
        </label>
        <select id="subcategory" className="mt-1 block w-full bg-pink-300 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] py-3 px-3 text-black" {...register('subcategory')}>
          {availableSubcategories.map(subcategory => <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>)}
        </select>
        <p className="mt-1 text-xs text-black font-bold">
          Select a specific type within the chosen category
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-black mb-1">
          <div className="flex items-center">
            <TagIcon className="h-5 w-5 text-black mr-2" />
            Tags
          </div>
        </label>
        <TagInput tags={tags} onChange={handleTagsChange} />
        <p className="mt-1 text-xs text-black font-bold">
          Add tags to categorize your achievement (e.g., project name, skills
          used)
        </p>
      </div>
      <div>
        <label className="block text-sm font-bold text-black mb-1">
          <div className="flex items-center">
            <PaperclipIcon className="h-5 w-5 text-black mr-2" />
            Attachments
          </div>
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-4 border-black border-dashed rounded-none bg-yellow-200">
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex text-sm text-black font-bold">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-cyan-300 rounded-none font-bold text-black hover:bg-cyan-400 px-3 py-2 border-2 border-black">
                <span>Upload files</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleAttachmentChange} />
              </label>
              <p className="pl-1 self-center">or drag and drop</p>
            </div>
            <p className="text-xs text-black font-bold">
              PNG, JPG, PDF up to 10MB
            </p>
          </div>
        </div>
        {attachments.length > 0 && <ul className="mt-3 divide-y divide-black border-4 border-black rounded-none">
            {attachments.map((attachment, index) => <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm bg-white">
                <div className="flex items-center">
                  <PaperclipIcon className="h-5 w-5 text-black mr-2" />
                  <span className="truncate font-bold text-black">
                    {attachment.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-black mr-2 font-bold">
                    {Math.round(attachment.size / 1024)} KB
                  </span>
                  <button type="button" onClick={() => removeAttachment(index)} className="text-black hover:text-red-700 bg-pink-400 p-1 rounded-none border-2 border-black">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>)}
          </ul>}
      </div>
      <div>
        <label className="block text-sm font-bold text-black mb-2">
          <div className="flex items-center">
            <LockIcon className="h-5 w-5 text-black mr-2" />
            Privacy Setting
          </div>
        </label>
        <div className="space-y-3 bg-yellow-200 p-4 rounded-none border-4 border-black">
          <div className="flex items-center">
            <input id="privacy-private" name="privacy" type="radio" value="private" className="h-5 w-5 text-black border-black" {...register('privacy')} />
            <label htmlFor="privacy-private" className="ml-3 block text-sm font-bold text-black">
              Private (Only you)
            </label>
          </div>
          <div className="flex items-center">
            <input id="privacy-team" name="privacy" type="radio" value="team" className="h-5 w-5 text-black border-black" {...register('privacy')} />
            <label htmlFor="privacy-team" className="ml-3 block text-sm font-bold text-black">
              Team (Visible to your team members)
            </label>
          </div>
          <div className="flex items-center">
            <input id="privacy-organization" name="privacy" type="radio" value="organization" className="h-5 w-5 text-black border-black" {...register('privacy')} />
            <label htmlFor="privacy-organization" className="ml-3 block text-sm font-bold text-black">
              Organization (Visible to everyone in your organization)
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-4 border-t-4 border-black">
        <button type="button" onClick={() => window.history.back()} className="bg-white py-3 px-6 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-sm font-bold text-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all">
          Cancel
        </button>
        <button type="submit" className="ml-3 py-3 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-sm font-bold rounded-none text-white bg-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all">
          Save Achievement
        </button>
      </div>
    </form>;
};
export default EntryForm;