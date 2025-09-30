import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import EntryForm from '../components/EntryForm';
const NewEntry = () => {
  const navigate = useNavigate();
  const handleSubmit = data => {
    // In a real app, this would save to a backend
    console.log('Submitted entry:', data);
    // Navigate back to dashboard
    navigate('/dashboard');
  };
  return <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-sm text-black hover:text-gray-700 font-bold bg-yellow-300 px-3 py-2 rounded-none border-2 border-black">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </button>
      <div className="bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] rounded-none overflow-hidden border-4 border-black">
        <div className="px-6 py-5 border-b-4 border-black bg-cyan-300">
          <h2 className="text-xl font-black text-black">
            LOG A NEW ACHIEVEMENT
          </h2>
          <p className="mt-1 text-sm text-black font-bold">
            Record your professional wins, feedback, and milestones
          </p>
        </div>
        <EntryForm onSubmit={handleSubmit} />
      </div>
    </div>;
};
export default NewEntry;