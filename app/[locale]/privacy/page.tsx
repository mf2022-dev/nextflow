import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, Database, Globe, Mail } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const t = useTranslations()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Last Updated: February 5, 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="glass-strong rounded-2xl p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-3 text-primary-400" />
              Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to <strong className="text-white">BioNXA Academy</strong> ("BioNXA", "we", "us", or "our"). 
              We are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              use our AI-powered bioinformatics learning platform.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              By accessing or using BioNXA, you agree to this Privacy Policy. If you do not agree with the terms 
              of this Privacy Policy, please do not access the platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <Database className="w-6 h-6 mr-3 text-secondary-400" />
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">1. Information You Provide</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-white">Account Information:</strong> Name, email address, password (encrypted)</li>
              <li><strong className="text-white">Profile Data:</strong> Optional information like institution, country, bio, profile picture</li>
              <li><strong className="text-white">Learning Progress:</strong> Courses completed, quiz scores, certificates earned</li>
              <li><strong className="text-white">User-Generated Content:</strong> Code submissions, comments, forum posts</li>
              <li><strong className="text-white">Communication:</strong> Messages you send us, feedback, support requests</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2. Information Collected Automatically</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-white">Usage Data:</strong> Pages visited, time spent, features used, learning patterns</li>
              <li><strong className="text-white">Device Information:</strong> IP address, browser type, operating system, device type</li>
              <li><strong className="text-white">Cookies & Tracking:</strong> Session cookies, analytics cookies, preference cookies</li>
              <li><strong className="text-white">AI Interaction Data:</strong> Questions asked to AI Assistant, code analyzed</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3. Third-Party Authentication</h3>
            <p className="text-gray-300 leading-relaxed">
              When you sign in using Google, Apple, or GitHub, we receive:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-2">
              <li>Your name and email address</li>
              <li>Profile picture (if public)</li>
              <li>Unique identifier from the authentication provider</li>
            </ul>
            <p className="text-gray-400 text-sm mt-3">
              We do not receive your password from third-party providers.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-3 text-accent-400" />
              How We Use Your Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use your information for the following purposes:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">🎓 Educational Services</h4>
                <p className="text-gray-400 text-sm">Deliver courses, track progress, issue certificates</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">🤖 AI Features</h4>
                <p className="text-gray-400 text-sm">Personalize learning paths, provide code analysis</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">🔐 Account Security</h4>
                <p className="text-gray-400 text-sm">Authenticate users, prevent fraud, protect accounts</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">📊 Platform Improvement</h4>
                <p className="text-gray-400 text-sm">Analyze usage, improve content, fix bugs</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">📧 Communication</h4>
                <p className="text-gray-400 text-sm">Send updates, course notifications, support responses</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">⚖️ Legal Compliance</h4>
                <p className="text-gray-400 text-sm">Comply with laws, enforce terms, protect rights</p>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-primary-400" />
              How We Share Your Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We <strong className="text-white">do NOT sell</strong> your personal information. We may share data with:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-3 ml-4">
              <li><strong className="text-white">Service Providers:</strong> Hosting (AWS/Azure), analytics (Google Analytics), email (SendGrid), authentication (Auth0/Supabase)</li>
              <li><strong className="text-white">AI Partners:</strong> OpenAI API for AI Assistant features (anonymized data only)</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law, court orders, or government requests</li>
              <li><strong className="text-white">Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
              <li><strong className="text-white">With Your Consent:</strong> When you explicitly authorize sharing</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-secondary-400" />
              Data Security
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <div className="bg-gradient-to-br from-primary-900/20 to-secondary-900/20 border border-primary-700/30 rounded-lg p-6">
              <ul className="space-y-2 text-gray-300">
                <li>✓ <strong className="text-white">Encryption:</strong> SSL/TLS for data in transit, AES-256 for data at rest</li>
                <li>✓ <strong className="text-white">Authentication:</strong> Secure OAuth 2.0 with industry-leading providers</li>
                <li>✓ <strong className="text-white">Access Controls:</strong> Role-based permissions, multi-factor authentication</li>
                <li>✓ <strong className="text-white">Regular Audits:</strong> Security assessments and vulnerability testing</li>
                <li>✓ <strong className="text-white">Data Backups:</strong> Regular encrypted backups with disaster recovery</li>
              </ul>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              ⚠️ <em>No security system is 100% secure. We cannot guarantee absolute security but continuously work to protect your data.</em>
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-3 text-accent-400" />
              Your Privacy Rights
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Under GDPR, CCPA, and Saudi data protection laws, you have the following rights:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-primary-500 bg-gray-800/30 p-4">
                <h4 className="font-semibold text-white mb-2">📄 Access</h4>
                <p className="text-gray-400 text-sm">Request a copy of your personal data</p>
              </div>
              <div className="border-l-4 border-secondary-500 bg-gray-800/30 p-4">
                <h4 className="font-semibold text-white mb-2">✏️ Correction</h4>
                <p className="text-gray-400 text-sm">Update or correct inaccurate information</p>
              </div>
              <div className="border-l-4 border-accent-500 bg-gray-800/30 p-4">
                <h4 className="font-semibold text-white mb-2">🗑️ Deletion</h4>
                <p className="text-gray-400 text-sm">Request deletion of your account and data</p>
              </div>
              <div className="border-l-4 border-primary-500 bg-gray-800/30 p-4">
                <h4 className="font-semibold text-white mb-2">📤 Portability</h4>
                <p className="text-gray-400 text-sm">Export your data in a machine-readable format</p>
              </div>
              <div className="border-l-4 border-secondary-500 bg-gray-800/30 p-4">
                <h4 className="font-semibold text-white mb-2">🚫 Opt-Out</h4>
                <p className="text-gray-400 text-sm">Unsubscribe from marketing emails</p>
              </div>
              <div className="border-l-4 border-accent-500 bg-gray-800/30 p-4">
                <h4 className="font-semibold text-white mb-2">⚖️ Complaint</h4>
                <p className="text-gray-400 text-sm">File a complaint with data protection authorities</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mt-4">
              To exercise these rights, contact us at: <a href="mailto:privacy@bionxa.com" className="text-primary-400 hover:text-primary-300 transition">privacy@bionxa.com</a>
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Cookies & Tracking Technologies</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-white">Type</th>
                  <th className="text-left py-2 text-white">Purpose</th>
                  <th className="text-left py-2 text-white">Duration</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800">
                  <td className="py-2">Essential</td>
                  <td className="py-2">Authentication, security</td>
                  <td className="py-2">Session</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2">Analytics</td>
                  <td className="py-2">Usage statistics, improvements</td>
                  <td className="py-2">2 years</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2">Preferences</td>
                  <td className="py-2">Language, theme settings</td>
                  <td className="py-2">1 year</td>
                </tr>
              </tbody>
            </table>
            <p className="text-gray-400 text-sm mt-4">
              You can control cookies through your browser settings. Note that disabling cookies may affect platform functionality.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">International Data Transfers</h2>
            <p className="text-gray-300 leading-relaxed">
              BioNXA operates globally. Your data may be transferred to and processed in countries outside Saudi Arabia, 
              including the United States and European Union. We ensure appropriate safeguards are in place through:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-3">
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
              <li>Data Processing Agreements with all service providers</li>
              <li>Compliance with Saudi Data & AI Authority (SDAIA) regulations</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              BioNXA is intended for users aged <strong className="text-white">13 and above</strong>. We do not knowingly 
              collect personal information from children under 13. If you believe we have collected data from a child under 13, 
              please contact us immediately at <a href="mailto:privacy@bionxa.com" className="text-primary-400 hover:text-primary-300 transition">privacy@bionxa.com</a>.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-3">
              <li>Posting the updated policy on this page with a new "Last Updated" date</li>
              <li>Sending an email notification to registered users</li>
              <li>Displaying a prominent notice on the platform</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              Continued use of BioNXA after changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-primary-900/20 to-secondary-900/20 border border-primary-700/30 rounded-xl p-6">
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <Mail className="w-6 h-6 mr-3 text-primary-400" />
              Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong className="text-white">Email:</strong> <a href="mailto:privacy@bionxa.com" className="text-primary-400 hover:text-primary-300 transition">privacy@bionxa.com</a></p>
              <p><strong className="text-white">Data Protection Officer:</strong> <a href="mailto:dpo@bionxa.com" className="text-primary-400 hover:text-primary-300 transition">dpo@bionxa.com</a></p>
              <p><strong className="text-white">Address:</strong> [Your Saudi Arabia Office Address]</p>
              <p><strong className="text-white">Response Time:</strong> We respond to privacy requests within 30 days</p>
            </div>
          </section>

          {/* Saudi Compliance */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">🇸🇦 Saudi Arabia Compliance</h2>
            <p className="text-gray-300 leading-relaxed">
              BioNXA complies with the <strong className="text-white">Saudi Data & Artificial Intelligence Authority (SDAIA)</strong> 
              regulations and the <strong className="text-white">Personal Data Protection Law (PDPL)</strong>. We are committed to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-3">
              <li>Storing Saudi user data within Saudi Arabia or approved regions</li>
              <li>Reporting data breaches to SDAIA within 72 hours</li>
              <li>Conducting Data Protection Impact Assessments (DPIAs) for high-risk processing</li>
              <li>Appointing a local Data Protection Officer for Saudi operations</li>
            </ul>
          </section>

        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            © 2026 BioNXA Academy. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
