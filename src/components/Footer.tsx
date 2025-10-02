'use client';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'For Talent',
      links: [
        { name: 'How to Find Work', href: '/how-to-find-work' },
        { name: 'Direct Contracts', href: '/direct-contracts' },
        { name: 'Freelance Jobs', href: '/freelance-jobs' },
        { name: 'Career Resources', href: '/career-resources' },
        { name: 'Salary Calculator', href: '/salary-calculator' },
        { name: 'Success Stories', href: '/success-stories' },
      ]
    },
    {
      title: 'For Clients',
      links: [
        { name: 'How to Hire', href: '/how-to-hire' },
        { name: 'Enterprise Solutions', href: '/enterprise' },
        { name: 'Project Catalog', href: '/project-catalog' },
        { name: 'Hiring Resources', href: '/hiring-resources' },
        { name: 'Client Success', href: '/client-success' },
        { name: 'API Documentation', href: '/api-docs' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press Kit', href: '/press' },
        { name: 'Partners', href: '/partners' },
        { name: 'Investors', href: '/investors' },
        { name: 'Contact Us', href: '/contact' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Community Forum', href: '/community' },
        { name: 'Status Page', href: '/status' },
        { name: 'Bug Reports', href: '/bug-reports' },
        { name: 'Feature Requests', href: '/feature-requests' },
        { name: 'System Status', href: '/system-status' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR Compliance', href: '/gdpr' },
        { name: 'Data Processing', href: '/data-processing' },
        { name: 'Security', href: '/security' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/wearejobpilot' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/wearejobpilot' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/wearejobpilot' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/wearejobpilot' },
  ];

  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">✈️</span>
              </div>
              <span className="text-2xl font-bold">WeAreJobPilot</span>
            </div>
            <p className="text-secondary-300 mb-6 leading-relaxed">
              AI-powered job discovery platform connecting top talent with amazing opportunities. 
              Your career journey starts here.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-secondary-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@wearejobpilot.com</span>
              </div>
              <div className="flex items-center space-x-3 text-secondary-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+31 20 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 text-secondary-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Amsterdam, Netherlands</span>
              </div>
          </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-secondary-300 hover:text-primary transition-colors duration-200 text-sm"
                        >
                          {link.name}
                </a>
              </li>
                    ))}
            </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
          </div>

      {/* Newsletter Signup */}
      <div className="border-t border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Stay updated with job opportunities</h3>
              <p className="text-secondary-300">Get the latest job matches delivered to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 bg-secondary-800 border border-secondary-700 rounded-l-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-3 bg-primary hover:bg-primary-600 text-white font-semibold rounded-r-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
          </div>
        </div>

        {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-secondary-400 text-sm mb-4 md:mb-0">
              © {currentYear} WeAreJobPilot. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-secondary-400">
              <span>Made with ❤️ in Amsterdam</span>
              <span>•</span>
              <span>GDPR Compliant</span>
              <span>•</span>
              <span>ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}