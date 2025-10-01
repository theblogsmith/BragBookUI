import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Last Updated: October 1, 2025</p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p>
              Welcome to Brag Ledger. We are committed to protecting your privacy and handling your data
              in an open and transparent manner. This Privacy Policy explains how we collect, use, store,
              and protect your personal information when you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Account Information</h3>
            <p>When you create an account, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address (for authentication and communication)</li>
              <li>Password (encrypted and securely stored)</li>
              <li>Profile information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Achievement Data</h3>
            <p>When you use Brag Ledger, we store:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Achievement entries you create or submit</li>
              <li>Categories, tags, and metadata you assign</li>
              <li>Privacy settings for each entry</li>
              <li>Dates and timestamps of entries</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Email-Based Submissions</h3>
            <p>If you use our email-to-entry feature:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We assign you a unique email address (e.g., abc123@bragledger.com)</li>
              <li>We process emails sent to this address through Mailgun</li>
              <li>We store sender information, subject lines, and email content</li>
              <li>We create achievement entries based on email content</li>
              <li>We retain email logs for debugging and service improvement</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Usage Data</h3>
            <p>We automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Usage patterns and feature interactions</li>
              <li>Error logs and diagnostic data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain the Brag Ledger service</li>
              <li>Create and manage your account</li>
              <li>Process and store your achievement entries</li>
              <li>Send you weekly email prompts (if enabled)</li>
              <li>Process inbound emails and create entries automatically</li>
              <li>Communicate with you about service updates and features</li>
              <li>Improve our service and develop new features</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Email Processing with Mailgun</h2>
            <p>
              We use Mailgun as our email service provider to enable email-based achievement submissions
              and to send weekly prompts. When you use email features:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Emails sent to your unique Brag Ledger address are received by Mailgun</li>
              <li>Mailgun processes the email and forwards the content to our system</li>
              <li>We parse the email content to create achievement entries</li>
              <li>Email content is stored in our database for your reference</li>
              <li>Mailgun stores emails according to their privacy policy</li>
              <li>You can disable email features at any time in Settings</li>
            </ul>
            <p className="mt-4">
              For more information about Mailgun's data handling practices, please review their{' '}
              <a href="https://www.mailgun.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                privacy policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Sharing and Disclosure</h2>
            <p>We do not sell, rent, or trade your personal information. We may share data with:</p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Service Providers</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Supabase (database hosting and authentication)</li>
              <li>Mailgun (email processing and delivery)</li>
              <li>Hosting providers (application infrastructure)</li>
            </ul>
            <p className="mt-3">
              These providers are contractually obligated to protect your data and use it only
              for providing services to us.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Legal Requirements</h3>
            <p>We may disclose your information if required by law or to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Comply with legal processes or government requests</li>
              <li>Enforce our Terms of Service</li>
              <li>Protect the rights, property, or safety of Brag Ledger, our users, or others</li>
              <li>Detect, prevent, or address fraud or security issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h2>
            <p>We implement industry-standard security measures to protect your data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All data is encrypted in transit using HTTPS/TLS</li>
              <li>Passwords are hashed using secure algorithms</li>
              <li>Database access is restricted and authenticated</li>
              <li>Row-level security policies protect user data</li>
              <li>Regular security audits and updates</li>
            </ul>
            <p className="mt-4">
              However, no method of transmission or storage is 100% secure. While we strive to protect
              your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights and Choices</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Access and Control</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>View and edit your profile information at any time</li>
              <li>Create, edit, or delete achievement entries</li>
              <li>Control privacy settings for each entry</li>
              <li>Enable or disable email features in Settings</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Email Preferences</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Opt in or out of weekly email prompts</li>
              <li>Choose which days to receive prompts</li>
              <li>Set your preferred time for prompts</li>
              <li>Disable email-to-entry functionality entirely</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Data Deletion</h3>
            <p>You can request account deletion at any time. When you delete your account:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your achievement entries are permanently deleted</li>
              <li>Your profile information is removed</li>
              <li>Your unique email address is deactivated</li>
              <li>Some data may be retained for up to 90 days for backup and legal purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Retention</h2>
            <p>We retain your data for as long as your account is active or as needed to provide services. Specifically:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Achievement entries: Retained until you delete them or close your account</li>
              <li>Email logs: Retained for 90 days for debugging and service improvement</li>
              <li>Account information: Retained until account deletion</li>
              <li>Backup data: May be retained for up to 90 days after deletion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
            <p>
              Brag Ledger is not intended for use by individuals under the age of 13. We do not
              knowingly collect personal information from children. If we become aware that a child
              has provided us with personal information, we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">International Data Transfers</h2>
            <p>
              Your data may be transferred to and processed in countries other than your country of
              residence. These countries may have data protection laws that differ from your country.
              By using Brag Ledger, you consent to the transfer of your data to our service providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new policy on this page and updating the "Last Updated" date. Significant
              changes will be communicated via email or a notice on our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mt-3">
              Email: privacy@bragledger.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
