import React, { useState } from 'react';
import { BellIcon, UserIcon, LockIcon, BellOffIcon } from 'lucide-react';
const Settings = () => {
  const [settings, setSettings] = useState({
    defaultPrivacy: 'private',
    weeklyReminders: true,
    endorsementNotifications: true,
    viewNotifications: false
  });
  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  return <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-black text-black mb-6">SETTINGS</h1>
      <div className="bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] rounded-none overflow-hidden border-4 border-black">
        <div className="px-6 py-5 border-b-4 border-black bg-cyan-300">
          <h2 className="text-lg font-black text-black">ACCOUNT PREFERENCES</h2>
          <p className="mt-1 text-sm text-black font-bold">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="px-6 py-5 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-black flex items-center">
              <UserIcon className="h-5 w-5 text-black mr-2" />
              PROFILE INFORMATION
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-4">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-bold text-black">
                  First name
                </label>
                <input type="text" name="first-name" id="first-name" defaultValue="Emma" className="mt-1 block w-full border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] py-2 px-3 text-black bg-pink-200" />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-bold text-black">
                  Last name
                </label>
                <input type="text" name="last-name" id="last-name" defaultValue="Miller" className="mt-1 block w-full border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] py-2 px-3 text-black bg-pink-200" />
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="email" className="block text-sm font-bold text-black">
                  Email address
                </label>
                <input type="email" name="email" id="email" defaultValue="emma.miller@example.com" className="mt-1 block w-full border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] py-2 px-3 text-black bg-yellow-200" />
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="job-title" className="block text-sm font-bold text-black">
                  Job title
                </label>
                <input type="text" name="job-title" id="job-title" defaultValue="Marketing Specialist" className="mt-1 block w-full border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] py-2 px-3 text-black bg-green-200" />
              </div>
            </div>
          </div>
          <div className="pt-5 border-t-4 border-black">
            <h3 className="text-sm font-bold text-black flex items-center">
              <LockIcon className="h-5 w-5 text-black mr-2" />
              PRIVACY SETTINGS
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-bold text-black">
                  Default privacy for new entries
                </label>
                <div className="mt-2 space-y-2 bg-yellow-200 p-4 rounded-none border-4 border-black">
                  <div className="flex items-center">
                    <input id="privacy-private" name="default-privacy" type="radio" checked={settings.defaultPrivacy === 'private'} onChange={() => handleSettingChange('defaultPrivacy', 'private')} className="h-4 w-4 text-black border-black" />
                    <label htmlFor="privacy-private" className="ml-3 block text-sm font-bold text-black">
                      Private (Only you)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="privacy-team" name="default-privacy" type="radio" checked={settings.defaultPrivacy === 'team'} onChange={() => handleSettingChange('defaultPrivacy', 'team')} className="h-4 w-4 text-black border-black" />
                    <label htmlFor="privacy-team" className="ml-3 block text-sm font-bold text-black">
                      Team (Visible to your team members)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="privacy-organization" name="default-privacy" type="radio" checked={settings.defaultPrivacy === 'organization'} onChange={() => handleSettingChange('defaultPrivacy', 'organization')} className="h-4 w-4 text-black border-black" />
                    <label htmlFor="privacy-organization" className="ml-3 block text-sm font-bold text-black">
                      Organization (Visible to everyone in your organization)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5 border-t-4 border-black">
            <h3 className="text-sm font-bold text-black flex items-center">
              <BellIcon className="h-5 w-5 text-black mr-2" />
              NOTIFICATION PREFERENCES
            </h3>
            <div className="mt-4 space-y-4 bg-cyan-200 p-4 rounded-none border-4 border-black">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="weekly-reminder" name="weekly-reminder" type="checkbox" checked={settings.weeklyReminders} onChange={() => handleSettingChange('weeklyReminders', !settings.weeklyReminders)} className="h-4 w-4 text-black border-black rounded-none" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="weekly-reminder" className="font-bold text-black">
                    Weekly achievement reminders
                  </label>
                  <p className="text-black font-medium">
                    Receive a weekly reminder to log your achievements
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="endorsement-notifications" name="endorsement-notifications" type="checkbox" checked={settings.endorsementNotifications} onChange={() => handleSettingChange('endorsementNotifications', !settings.endorsementNotifications)} className="h-4 w-4 text-black border-black rounded-none" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="endorsement-notifications" className="font-bold text-black">
                    Endorsement notifications
                  </label>
                  <p className="text-black font-medium">
                    Receive notifications when someone endorses your
                    achievements
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="view-notifications" name="view-notifications" type="checkbox" checked={settings.viewNotifications} onChange={() => handleSettingChange('viewNotifications', !settings.viewNotifications)} className="h-4 w-4 text-black border-black rounded-none" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="view-notifications" className="font-bold text-black">
                    View notifications
                  </label>
                  <p className="text-black font-medium">
                    Receive notifications when someone views your shared
                    achievements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-pink-300 border-t-4 border-black flex justify-end">
          <button type="button" className="bg-white py-3 px-6 border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-sm font-bold text-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all">
            Cancel
          </button>
          <button type="button" className="ml-3 py-3 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-sm font-bold rounded-none text-white bg-black hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>;
};
export default Settings;