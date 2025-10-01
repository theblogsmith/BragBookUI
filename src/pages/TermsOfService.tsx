import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Last Updated: October 1, 2025</p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Agreement to Terms</h2>
            <p>
              By accessing or using Brag Ledger, you agree to be bound by these Terms of Service and our
              Privacy Policy. If you do not agree with any part of these terms, you may not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Description of Service</h2>
            <p>
              Brag Ledger is a personal achievement tracking platform that helps users document and organize
              their professional accomplishments. Our service includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Web-based achievement entry and management</li>
              <li>Email-based achievement submission via unique email addresses</li>
              <li>Automated categorization and organization of entries</li>
              <li>Optional weekly email prompts to encourage reflection</li>
              <li>Timeline and dashboard views of achievements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">User Accounts</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Account Creation</h3>
            <p>To use Brag Ledger, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 13 years of age</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Account Security</h3>
            <p>You are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintaining the confidentiality of your password</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Ensuring your account information remains accurate and up-to-date</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Account Termination</h3>
            <p>
              You may delete your account at any time. We reserve the right to suspend or terminate
              accounts that violate these terms or engage in prohibited activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Email Features</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Unique Email Addresses</h3>
            <p>When you enable email features, we provide you with a unique email address (e.g., abc123@bragledger.com). You agree that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>This email address is for personal use only</li>
              <li>You will not share this address publicly or use it for spam</li>
              <li>You are responsible for content sent to this address</li>
              <li>We may deactivate this address if it is abused or misused</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Email Processing</h3>
            <p>By using email features, you acknowledge that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Emails are processed through Mailgun, our email service provider</li>
              <li>Email content is parsed and stored to create achievement entries</li>
              <li>We retain email logs for service improvement and debugging</li>
              <li>You can disable email features at any time in Settings</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Weekly Email Prompts</h3>
            <p>If you enable weekly prompts:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We will send periodic emails to remind you to log achievements</li>
              <li>You can configure frequency, days, and times in Settings</li>
              <li>You can opt out at any time</li>
              <li>Replies to prompts are processed the same as any email submission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">User Content</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Your Content</h3>
            <p>
              You retain ownership of all achievement entries, descriptions, and other content you
              submit to Brag Ledger. By submitting content, you grant us a license to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Store and process your content to provide the service</li>
              <li>Display your content back to you through our interface</li>
              <li>Create backups of your content for data protection</li>
            </ul>
            <p className="mt-3">
              We will not share your private content with others unless you explicitly make it public
              or we are required by law.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Content Guidelines</h3>
            <p>You agree not to submit content that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Is illegal, harmful, or violates others' rights</li>
              <li>Contains malware, viruses, or malicious code</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains false or misleading information that could harm others</li>
              <li>Harasses, threatens, or abuses others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
              <li>Impersonate others or misrepresent your affiliation</li>
              <li>Attempt to reverse engineer or decompile the service</li>
              <li>Send spam or unsolicited messages through our email features</li>
              <li>Abuse our email system by sending excessive messages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Service Availability</h2>
            <p>We strive to maintain high availability, but we do not guarantee that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The service will be uninterrupted or error-free</li>
              <li>Email delivery will be immediate or guaranteed</li>
              <li>All features will be available at all times</li>
              <li>Data will be backed up in all circumstances</li>
            </ul>
            <p className="mt-3">
              We reserve the right to modify, suspend, or discontinue any part of the service
              with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Third-Party Services</h2>
            <p>Brag Ledger relies on third-party services, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Supabase for database and authentication</li>
              <li>Mailgun for email processing and delivery</li>
            </ul>
            <p className="mt-3">
              These services have their own terms and privacy policies. We are not responsible
              for the practices or failures of third-party services, though we carefully select
              reputable providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
            <p>
              The Brag Ledger service, including its design, code, features, and branding, is
              owned by us and protected by intellectual property laws. You may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Copy, modify, or create derivative works</li>
              <li>Use our branding or trademarks without permission</li>
              <li>Remove or alter copyright notices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
              INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="mt-3">
              We do not warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The service will meet your requirements</li>
              <li>The service will be secure, accurate, or reliable</li>
              <li>Email delivery will be guaranteed</li>
              <li>Your data will never be lost (though we implement best practices)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS,
              REVENUE, DATA, OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
            </p>
            <p className="mt-3">
              Our total liability for any claims related to the service shall not exceed the
              amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Indemnification</h2>
            <p>
              You agree to indemnify and hold us harmless from any claims, damages, losses, or
              expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use of the service</li>
              <li>Your violation of these terms</li>
              <li>Your violation of any rights of others</li>
              <li>Content you submit through the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Backup and Loss</h2>
            <p>
              While we implement backup procedures, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Data loss can occur due to various factors</li>
              <li>You are responsible for maintaining your own backups of important data</li>
              <li>We are not liable for any data loss or corruption</li>
              <li>You should export your data regularly if it is critical</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Modifications to Terms</h2>
            <p>
              We may update these Terms of Service from time to time. We will notify you of
              material changes by:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Posting the updated terms on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending an email notification for significant changes</li>
            </ul>
            <p className="mt-3">
              Your continued use of the service after changes take effect constitutes acceptance
              of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the
              jurisdiction in which we operate, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Dispute Resolution</h2>
            <p>
              Any disputes arising from these terms or your use of the service shall be resolved
              through good faith negotiation. If negotiation fails, disputes may be resolved
              through arbitration or in the courts of our jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Severability</h2>
            <p>
              If any provision of these terms is found to be invalid or unenforceable, the
              remaining provisions will continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-3">
              Email: support@bragledger.com
            </p>
          </section>

          <section className="mt-12 p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              By using Brag Ledger, you acknowledge that you have read, understood, and agree to be
              bound by these Terms of Service and our Privacy Policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
