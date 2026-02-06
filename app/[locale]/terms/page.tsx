import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowLeft, FileText, AlertTriangle, DollarSign, Scale, ShieldCheck, Ban } from 'lucide-react'

export default function TermsOfServicePage() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
            Terms of Service
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
              <FileText className="w-6 h-6 mr-3 text-primary-400" />
              Agreement to Terms
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to <strong className="text-white">BioNXA Academy</strong> ("BioNXA", "we", "us", or "our"). 
              These Terms of Service ("Terms") govern your access to and use of our AI-powered bioinformatics learning platform, 
              including our website, mobile applications, and any related services (collectively, the "Platform").
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              By accessing or using the Platform, you agree to be bound by these Terms and our 
              <Link href="/privacy" className="text-primary-400 hover:text-primary-300 transition"> Privacy Policy</Link>. 
              If you do not agree to these Terms, you must not use the Platform.
            </p>
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mt-4">
              <p className="text-amber-300 text-sm">
                ⚠️ <strong>IMPORTANT:</strong> These Terms include an arbitration agreement and class action waiver. 
                Please read Section 14 carefully.
              </p>
            </div>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <ShieldCheck className="w-6 h-6 mr-3 text-secondary-400" />
              Eligibility
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              To use BioNXA, you must:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Be at least <strong className="text-white">13 years old</strong> (or the age of majority in your jurisdiction)</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Not be prohibited from using the Platform under applicable laws</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
            </ul>
            <p className="text-gray-400 text-sm mt-4">
              Users under 18 must have parental or guardian consent to use the Platform.
            </p>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Account Registration & Security</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Account Creation</h3>
                <p className="text-gray-300 leading-relaxed">
                  You may create an account using email/password or third-party authentication (Google, Apple, GitHub). 
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-2">
                  <li>Maintaining the confidentiality of your password</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Account Termination</h3>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to suspend or terminate your account if you:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-2">
                  <li>Violate these Terms or our Community Guidelines</li>
                  <li>Engage in fraudulent or illegal activities</li>
                  <li>Provide false or misleading information</li>
                  <li>Abuse or harass other users or staff</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Platform Access */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <DollarSign className="w-6 h-6 mr-3 text-accent-400" />
              Platform Access & Pricing
            </h2>
            <div className="bg-gradient-to-br from-primary-900/20 to-secondary-900/20 border border-primary-700/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Current Free Access</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                BioNXA is currently <strong className="text-white">free to use</strong> for all registered users. 
                You have access to:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>✓ All Linux and bioinformatics tutorials</li>
                <li>✓ AI Learning Assistant and Code Analyzer</li>
                <li>✓ Interactive code playground</li>
                <li>✓ Community forums and resources</li>
              </ul>
            </div>
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-6 mt-4">
              <h3 className="text-xl font-semibold text-amber-300 mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Future Paid Features
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong className="text-white">We may introduce paid premium features in the future.</strong> 
                If we do, we will:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Notify all users at least <strong className="text-white">30 days in advance</strong></li>
                <li>• Keep core educational content free</li>
                <li>• Offer special pricing for existing users</li>
                <li>• Provide clear information about free vs. premium features</li>
                <li>• Offer institutional and student discounts</li>
              </ul>
              <p className="text-gray-400 text-sm mt-4">
                Premium features may include: advanced courses, unlimited AI queries, certificates, 1-on-1 mentorship, 
                private repositories, and enterprise features.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white mb-3">Refund Policy (Future)</h3>
              <p className="text-gray-300 leading-relaxed">
                Once paid features are introduced, we will offer a <strong className="text-white">14-day money-back guarantee</strong> 
                for all subscriptions. Refunds will not be provided for:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-2">
                <li>Accounts suspended for Terms violations</li>
                <li>Partial months of subscription</li>
                <li>Third-party services or certifications</li>
              </ul>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <Ban className="w-6 h-6 mr-3 text-red-400" />
              User Conduct & Prohibited Activities
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You agree <strong className="text-white">NOT</strong> to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-900/10 border border-red-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-2">🚫 Illegal Activities</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Violate any laws or regulations</li>
                  <li>• Infringe intellectual property rights</li>
                  <li>• Share illegal or harmful content</li>
                </ul>
              </div>
              <div className="bg-red-900/10 border border-red-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-2">🚫 Platform Abuse</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Hack, reverse engineer, or exploit vulnerabilities</li>
                  <li>• Scrape or crawl the Platform without permission</li>
                  <li>• Overload or disrupt Platform infrastructure</li>
                </ul>
              </div>
              <div className="bg-red-900/10 border border-red-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-2">🚫 Account Misuse</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Create fake or multiple accounts</li>
                  <li>• Share or sell your account</li>
                  <li>• Impersonate others</li>
                </ul>
              </div>
              <div className="bg-red-900/10 border border-red-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-2">🚫 Harmful Behavior</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Harass, bully, or threaten users</li>
                  <li>• Post spam or unsolicited content</li>
                  <li>• Distribute malware or viruses</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Violations may result in account suspension, termination, and legal action.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Intellectual Property Rights</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Our Content</h3>
                <p className="text-gray-300 leading-relaxed">
                  All Platform content (tutorials, courses, videos, code, design, logos, trademarks) is owned by BioNXA 
                  or our licensors and protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-gray-300 leading-relaxed mt-2">
                  You may <strong className="text-white">not</strong> copy, modify, distribute, sell, or create derivative 
                  works from our content without explicit written permission.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Your Content</h3>
                <p className="text-gray-300 leading-relaxed">
                  You retain ownership of content you create or upload (code, comments, forum posts). By posting content, you grant BioNXA:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-2">
                  <li>A worldwide, non-exclusive, royalty-free license to use, display, and distribute your content</li>
                  <li>The right to use your content for Platform improvements and marketing (with anonymization if requested)</li>
                  <li>Permission to sublicense content to other users for educational purposes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Open Source & Third-Party Content</h3>
                <p className="text-gray-300 leading-relaxed">
                  BioNXA uses open-source software and third-party libraries. Attributions and licenses are available at 
                  <Link href="/licenses" className="text-primary-400 hover:text-primary-300 transition"> /licenses</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* AI Features */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">AI Features & Limitations</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              BioNXA provides AI-powered features (Learning Assistant, Code Analyzer) to enhance your learning. 
              You acknowledge that:
            </p>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-6">
              <ul className="text-gray-300 space-y-3">
                <li>
                  <strong className="text-white">• Accuracy:</strong> AI responses may contain errors or outdated information. 
                  Always verify critical information from authoritative sources.
                </li>
                <li>
                  <strong className="text-white">• Educational Use:</strong> AI features are for learning purposes only, 
                  not for production or clinical use.
                </li>
                <li>
                  <strong className="text-white">• Data Privacy:</strong> Your AI interactions may be used to improve our services 
                  (see Privacy Policy for details).
                </li>
                <li>
                  <strong className="text-white">• No Professional Advice:</strong> AI-generated content is not a substitute for 
                  professional advice (medical, legal, financial).
                </li>
              </ul>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-amber-400" />
              Disclaimers & Limitations of Liability
            </h2>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">"AS IS" Service</h3>
                <p className="text-gray-300 text-sm">
                  The Platform is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, express or implied. 
                  We do not guarantee that the Platform will be error-free, secure, or uninterrupted.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Limitation of Liability</h3>
                <p className="text-gray-300 text-sm">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, BioNXA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR USE, ARISING FROM YOUR USE OF THE PLATFORM.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Maximum Liability</h3>
                <p className="text-gray-300 text-sm">
                  Our total liability to you for any claims arising from these Terms or your use of the Platform shall not exceed 
                  the amount you paid us in the 12 months preceding the claim (or $100 USD if you haven't paid anything).
                </p>
              </div>
            </div>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Indemnification</h2>
            <p className="text-gray-300 leading-relaxed">
              You agree to indemnify, defend, and hold harmless BioNXA, its officers, directors, employees, and agents from any claims, 
              liabilities, damages, losses, costs, or expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-3">
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights (including intellectual property)</li>
              <li>Your misuse of the Platform</li>
              <li>Content you post or share on the Platform</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center">
              <Scale className="w-6 h-6 mr-3 text-accent-400" />
              Dispute Resolution & Arbitration
            </h2>
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Informal Resolution</h3>
                <p className="text-gray-300 text-sm">
                  Before filing a claim, you agree to contact us at <a href="mailto:legal@bionxa.com" className="text-primary-400 hover:text-primary-300 transition">legal@bionxa.com</a> and 
                  attempt to resolve the dispute informally for at least 30 days.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Binding Arbitration</h3>
                <p className="text-gray-300 text-sm">
                  If informal resolution fails, disputes will be resolved through binding arbitration in accordance with Saudi Arabian law, 
                  rather than in court. Arbitration will be conducted by [Arbitration Authority] in Riyadh, Saudi Arabia.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Class Action Waiver</h3>
                <p className="text-gray-300 text-sm">
                  You agree that disputes will be resolved on an individual basis only. You waive the right to participate in class actions, 
                  class arbitrations, or representative actions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Exceptions</h3>
                <p className="text-gray-300 text-sm">
                  Small claims court disputes and intellectual property disputes are exempt from mandatory arbitration.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">🇸🇦 Governing Law & Jurisdiction</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms are governed by the laws of the <strong className="text-white">Kingdom of Saudi Arabia</strong>, 
              without regard to conflict of law principles. Any legal action or proceeding shall be brought exclusively in the courts 
              of Riyadh, Saudi Arabia.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              For international users, local consumer protection laws may provide additional rights that cannot be waived by these Terms.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. If we make material changes, we will:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-3">
              <li>Update the "Last Updated" date at the top of this page</li>
              <li>Notify you via email or a prominent Platform notice</li>
              <li>Provide at least 30 days' notice for significant changes</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              Your continued use of the Platform after changes take effect constitutes acceptance of the updated Terms. 
              If you do not agree to changes, you must stop using the Platform and delete your account.
            </p>
          </section>

          {/* Miscellaneous */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Miscellaneous</h2>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>
                <strong className="text-white">Severability:</strong> If any provision of these Terms is found to be unenforceable, 
                the remaining provisions will remain in full effect.
              </p>
              <p>
                <strong className="text-white">Entire Agreement:</strong> These Terms, along with our Privacy Policy, constitute 
                the entire agreement between you and BioNXA.
              </p>
              <p>
                <strong className="text-white">No Waiver:</strong> Our failure to enforce any right or provision does not constitute 
                a waiver of such right or provision.
              </p>
              <p>
                <strong className="text-white">Assignment:</strong> You may not assign these Terms without our written consent. 
                We may assign these Terms to any affiliate or successor.
              </p>
              <p>
                <strong className="text-white">Force Majeure:</strong> We are not liable for delays or failures due to circumstances 
                beyond our reasonable control (natural disasters, wars, pandemics, etc.).
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-primary-900/20 to-secondary-900/20 border border-primary-700/30 rounded-xl p-6">
            <h2 className="text-2xl font-display font-bold mb-4">Contact & Questions</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong className="text-white">Email:</strong> <a href="mailto:legal@bionxa.com" className="text-primary-400 hover:text-primary-300 transition">legal@bionxa.com</a></p>
              <p><strong className="text-white">Support:</strong> <a href="mailto:support@bionxa.com" className="text-primary-400 hover:text-primary-300 transition">support@bionxa.com</a></p>
              <p><strong className="text-white">Address:</strong> [Your Saudi Arabia Office Address]</p>
              <p><strong className="text-white">Business Hours:</strong> Sunday-Thursday, 9:00 AM - 5:00 PM AST</p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            By using BioNXA, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
          <p className="text-gray-500 text-sm">
            © 2026 BioNXA Academy. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
