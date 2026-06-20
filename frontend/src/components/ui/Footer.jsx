import React from 'react';
import { Mail, Globe, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 dark:bg-gray-950 dark:border-gray-800 mt-auto">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start space-y-4 max-w-sm text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.svg" alt="HirePilot-AI Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white animate-gradient-text">HirePilot-AI</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The AI-powered operating system for your career. Manage applications, optimize your resume, and land your dream job faster.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-center sm:text-left">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Product</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li><Link to="/features" className="hover:text-[var(--primary)] transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-[var(--primary)] transition-colors">Pricing</Link></li>
                <li><Link to="/testimonials" className="hover:text-[var(--primary)] transition-colors">Testimonials</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li><Link to="/privacy-policy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-[var(--primary)] transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookie-policy" className="hover:text-[var(--primary)] transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Company</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li><Link to="/contact" className="hover:text-[var(--primary)] transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            © {new Date().getFullYear()} HirePilot-AI, Inc. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-[var(--primary)] transition-colors">
              <span className="sr-only">Social</span>
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[var(--primary)] transition-colors">
              <span className="sr-only">Website</span>
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[var(--primary)] transition-colors">
              <span className="sr-only">Email</span>
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
