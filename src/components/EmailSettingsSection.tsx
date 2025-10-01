import React, { useState, useEffect } from 'react';
import { Mail, Clock, Calendar, Copy, CheckCircle, Send } from 'lucide-react';
import { fetchEmailSettings, updateEmailSettings, sendTestEmail, EmailSettings } from '../services/emailService';
import { useAuth } from '../contexts/AuthContext';

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

export default function EmailSettingsSection() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<EmailSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  const [emailEnabled, setEmailEnabled] = useState(true);
  const [weeklyPromptEnabled, setWeeklyPromptEnabled] = useState(true);
  const [promptDayOfWeek, setPromptDayOfWeek] = useState(5);
  const [promptTime, setPromptTime] = useState('14:00');
  const [promptTimezone, setPromptTimezone] = useState('America/New_York');
  const [additionalDays, setAdditionalDays] = useState<number[]>([]);

  useEffect(() => {
    loadSettings();
  }, [user]);

  const loadSettings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await fetchEmailSettings(user.id);

      if (data) {
        setSettings(data);
        setEmailEnabled(data.email_enabled);
        setWeeklyPromptEnabled(data.weekly_prompt_enabled);
        setPromptDayOfWeek(data.prompt_day_of_week);
        setPromptTime(data.prompt_time);
        setPromptTimezone(data.prompt_timezone);
        setAdditionalDays(data.additional_prompt_days || []);
      }
    } catch (error) {
      console.error('Error loading email settings:', error);
      setMessage('Failed to load email settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);
      setMessage('');

      await updateEmailSettings(user.id, {
        email_enabled: emailEnabled,
        weekly_prompt_enabled: weeklyPromptEnabled,
        prompt_day_of_week: promptDayOfWeek,
        prompt_time: promptTime,
        prompt_timezone: promptTimezone,
        additional_prompt_days: additionalDays,
      });

      setMessage('Email settings saved successfully!');
      await loadSettings();
    } catch (error) {
      console.error('Error saving email settings:', error);
      setMessage('Failed to save email settings');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyEmail = () => {
    if (settings?.unique_email_address) {
      navigator.clipboard.writeText(settings.unique_email_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendTest = async () => {
    if (!user) return;

    try {
      setSendingTest(true);
      setMessage('');
      await sendTestEmail(user.id);
      setMessage('Test email sent! Check your inbox.');
    } catch (error) {
      console.error('Error sending test email:', error);
      setMessage('Failed to send test email');
    } finally {
      setSendingTest(false);
    }
  };

  const toggleAdditionalDay = (day: number) => {
    setAdditionalDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  if (loading) {
    return (
      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
      <div className="flex items-center mb-6">
        <Mail className="h-8 w-8 text-black mr-3" />
        <div>
          <h2 className="text-xl font-black text-black">EMAIL SETTINGS</h2>
          <p className="text-sm text-black font-bold">
            Configure your email-based achievement logging
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 border-4 border-black ${
            message.includes('success') ? 'bg-green-400' : 'bg-red-400'
          }`}
        >
          <p className="text-black font-bold">{message}</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-cyan-200 border-4 border-black p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-black">YOUR UNIQUE EMAIL ADDRESS</label>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center px-3 py-1 bg-yellow-400 border-2 border-black rounded-none text-xs font-bold hover:translate-y-0.5"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </>
              )}
            </button>
          </div>
          <code className="block p-3 bg-white border-2 border-black font-mono text-sm">
            {settings?.unique_email_address}
          </code>
          <p className="mt-2 text-xs text-black font-bold">
            Email achievements to this address anytime to automatically log them!
          </p>
        </div>

        <div className="flex items-center justify-between bg-yellow-200 border-4 border-black p-4">
          <div>
            <label className="text-sm font-bold text-black block mb-1">
              ENABLE EMAIL LOGGING
            </label>
            <p className="text-xs text-black">
              Allow achievements to be created via email
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={(e) => setEmailEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-gray-400 peer-checked:bg-green-500 border-4 border-black peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-4 after:border-black after:h-7 after:w-5 after:transition-all"></div>
          </label>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-pink-200 border-4 border-black p-4">
            <div>
              <label className="text-sm font-bold text-black block mb-1">
                WEEKLY EMAIL PROMPTS
              </label>
              <p className="text-xs text-black">
                Receive regular reminders to log your achievements
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={weeklyPromptEnabled}
                onChange={(e) => setWeeklyPromptEnabled(e.target.checked)}
                className="sr-only peer"
                disabled={!emailEnabled}
              />
              <div className="w-14 h-8 bg-gray-400 peer-checked:bg-green-500 border-4 border-black peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-4 after:border-black after:h-7 after:w-5 after:transition-all peer-disabled:opacity-50"></div>
            </label>
          </div>

          {weeklyPromptEnabled && emailEnabled && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    PRIMARY DAY
                  </label>
                  <select
                    value={promptDayOfWeek}
                    onChange={(e) => setPromptDayOfWeek(Number(e.target.value))}
                    className="block w-full px-4 py-3 border-4 border-black rounded-none bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
                  >
                    {DAYS_OF_WEEK.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    TIME
                  </label>
                  <input
                    type="time"
                    value={promptTime}
                    onChange={(e) => setPromptTime(e.target.value)}
                    className="block w-full px-4 py-3 border-4 border-black rounded-none bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  ADDITIONAL DAYS (OPTIONAL)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {DAYS_OF_WEEK.filter((d) => d.value !== promptDayOfWeek).map((day) => (
                    <label
                      key={day.value}
                      className={`px-3 py-2 border-4 border-black text-center cursor-pointer font-bold text-xs ${
                        additionalDays.includes(day.value)
                          ? 'bg-green-400'
                          : 'bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={additionalDays.includes(day.value)}
                        onChange={() => toggleAdditionalDay(day.value)}
                        className="sr-only"
                      />
                      {day.label.substring(0, 3)}
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-xs text-black">
                  Select additional days to receive email prompts
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white border-4 border-black rounded-none font-bold hover:translate-y-0.5 hover:translate-x-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] disabled:opacity-50"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          {saving ? 'Saving...' : 'Save Email Settings'}
        </button>

        <button
          onClick={handleSendTest}
          disabled={sendingTest || !emailEnabled}
          className="inline-flex items-center justify-center px-6 py-3 bg-cyan-400 text-black border-4 border-black rounded-none font-bold hover:translate-y-0.5 hover:translate-x-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] disabled:opacity-50"
        >
          <Send className="h-5 w-5 mr-2" />
          {sendingTest ? 'Sending...' : 'Send Test Email'}
        </button>
      </div>
    </div>
  );
}
