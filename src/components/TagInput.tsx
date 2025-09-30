import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
const TagInput = ({
  tags = [],
  onChange
}) => {
  const [inputValue, setInputValue] = useState('');
  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };
  const addTag = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      const newTags = [...tags, trimmedInput];
      onChange(newTags);
      setInputValue('');
    }
  };
  const removeTag = tagToRemove => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    onChange(newTags);
  };
  return <div className="border-4 border-black rounded-none px-3 py-2 bg-yellow-200">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => <div key={index} className="bg-pink-400 text-black text-sm px-2 py-1 rounded-none border-2 border-black flex items-center">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-black hover:text-gray-700 focus:outline-none">
              <XIcon className="h-3 w-3" />
            </button>
          </div>)}
        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} onBlur={addTag} className="flex-grow min-w-[120px] outline-none text-sm bg-transparent" placeholder={tags.length === 0 ? 'Add tags separated by comma...' : ''} />
      </div>
    </div>;
};
export default TagInput;