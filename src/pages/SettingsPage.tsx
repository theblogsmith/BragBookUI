import React, { useState } from 'react';
import { SaveIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import EmailSettingsSection from '../components/EmailSettingsSection';
import { BillingSection } from '../components/BillingSection';
import { EntryLimitIndicator } from '../components/EntryLimitIndicator';

export default function SettingsPage() {
  const { profile, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [defaultPrivacy, setDefaultPrivacy] = useState<'private' | 'team' | 'organization'>(
    profile?.default_privacy || 'private'
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await updateProfile({
        full_name: fullName,
        default_privacy: defaultPrivacy
      });

      if (error) throw error;
      setMessage('Settings saved successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-black">SETTINGS</h1>
        <p className="mt-1 text-sm font-bold text-black">
          Manage your account and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
        {message && (
          <div className={`mb-6 p-4 border-4 border-black ${message.includes('success') ? 'bg-green-400' : 'bg-red-400'}`}>
            <p className="text-black font-bold">{message}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={profile?.email || ''}
              disabled
              className="block w-full px-4 py-3 border-4 border-black rounded-none bg-gray-200 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-black">Email cannot be changed</p>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-bold text-black mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full px-4 py-3 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Default Privacy Level
            </label>
            <div className="space-y-3 bg-yellow-200 p-4 rounded-none border-4 border-black">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="defaultPrivacy"
                  value="private"
                  checked={defaultPrivacy === 'private'}
                  onChange={(e) => setDefaultPrivacy(e.target.value as any)}
                  className="h-5 w-5 text-black border-black"
                />
                <span className="ml-3 text-sm font-bold text-black">
                  Private (Only you)
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="defaultPrivacy"
                  value="team"
                  checked={defaultPrivacy === 'team'}
                  onChange={(e) => setDefaultPrivacy(e.target.value as any)}
                  className="h-5 w-5 text-black border-black"
                />
                <span className="ml-3 text-sm font-bold text-black">
                  Team (Visible to team members)
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="defaultPrivacy"
                  value="organization"
                  checked={defaultPrivacy === 'organization'}
                  onChange={(e) => setDefaultPrivacy(e.target.value as any)}
                  className="h-5 w-5 text-black border-black"
                />
                <span className="ml-3 text-sm font-bold text-black">
                  Organization (Visible to everyone)
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-black text-white border-4 border-black rounded-none font-bold hover:translate-y-0.5 hover:translate-x-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] disabled:opacity-50"
          >
            <SaveIcon className="h-5 w-5 mr-2" />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <BillingSection />
      </div>

      <div className="mt-8">
        <EntryLimitIndicator />
      </div>

      <div className="mt-8">
        <EmailSettingsSection />
      </div>
    </div>
  );
}
