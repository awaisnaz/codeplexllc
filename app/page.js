"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA v3 script
    const recaptchaScript = document.createElement('script');
    recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    recaptchaScript.async = true;
    recaptchaScript.onload = () => {
      setIsRecaptchaLoaded(true);
    };
    document.head.appendChild(recaptchaScript);

    // Load Calendly widget script
    const calendlyScript = document.createElement('script');
    calendlyScript.src = 'https://assets.calendly.com/assets/external/widget.js';
    calendlyScript.async = true;
    document.head.appendChild(calendlyScript);

    return () => {
      if (document.head.contains(recaptchaScript)) {
        document.head.removeChild(recaptchaScript);
      }
      if (document.head.contains(calendlyScript)) {
        document.head.removeChild(calendlyScript);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isRecaptchaLoaded) {
      alert('reCAPTCHA is still loading. Please wait a moment.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Execute reCAPTCHA v3
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
        action: 'submit'
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaValue: token })
      });

      if (response.ok) {
        setIsMessageSent(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setRecaptchaValue(null);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="text-3xl font-bold text-blue-600 tracking-tight">CodePlex</div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Navigation Links and Buttons */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Navigation Links */}
              <div className="flex items-center space-x-1 mr-8">
                <a href="#services" className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all duration-200">Services</a>
                <a href="#ai-expertise" className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all duration-200">AI Expertise</a>
                <a href="#industries" className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all duration-200">Industries</a>
                <a href="#case-studies" className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all duration-200">Case Studies</a>
                <a href="#hire-developers" className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all duration-200">Hire Developers</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all duration-200">About</a>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => window.open('https://calendly.com/codeplex/30min', '_blank')}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </button>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-blue-700 bg-white border border-blue-300 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message Us
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a
                href="#services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
              >
                Services
              </a>
              <a
                href="#ai-expertise"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
              >
                AI Expertise
              </a>
              <a
                href="#industries"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
              >
                Industries
              </a>
              <a
                href="#case-studies"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
              >
                Case Studies
              </a>
              <a
                href="#hire-developers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
              >
                Hire Developers
              </a>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
              >
                About
              </a>
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    window.open('https://calendly.com/codeplex/30min', '_blank');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </button>
                <button
                  onClick={() => {
                    setShowContactForm(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-blue-700 bg-white border border-blue-300 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message Us
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >

              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                CodePlex - Software Development and
                <span className="text-blue-600"> Consulting Company</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4 sm:px-0">
                From launching startups to expanding enterprises, or recovering from setbacks, 
                we help businesses overcome every challenge on their journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Software Development Services</h2>

          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Product Engineering"
              description="Transform your ideas into scalable, market-ready products"
              icon="🚀"
            />
            <ServiceCard 
              title="Data & Artificial Intelligence"
              description="Leverage AI and data analytics to drive business insights"
              icon="🤖"
            />
            <ServiceCard 
              title="DevOps & CloudOps"
              description="Streamline deployment and infrastructure management"
              icon="☁️"
            />
            <ServiceCard 
              title="Blockchain & Web 3.0"
              description="Build decentralized applications and smart contracts"
              icon="⛓️"
            />
            <ServiceCard 
              title="Emerging Technologies"
              description="Stay ahead with cutting-edge technology solutions"
              icon="⚡"
            />
            <ServiceCard 
              title="Hire Developers"
              description="Access skilled developers for your projects"
              icon="👥"
            />
          </div>
        </div>
      </section>

      {/* AI Expertise Section */}
      <section id="ai-expertise" className="py-12 sm:py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI & Machine Learning Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to transform your business operations, 
              enhance decision-making, and create intelligent solutions that drive growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <ServiceCard 
              title="Machine Learning Models"
              description="Custom ML models for predictive analytics, classification, and pattern recognition"
              icon="🧠"
            />
            <ServiceCard 
              title="Natural Language Processing"
              description="Text analysis, sentiment analysis, chatbots, and language understanding systems"
              icon="💬"
            />
            <ServiceCard 
              title="Computer Vision"
              description="Image recognition, object detection, facial recognition, and visual analytics"
              icon="👁️"
            />
            <ServiceCard 
              title="AI-Powered Automation"
              description="Intelligent process automation and workflow optimization using AI"
              icon="⚙️"
            />
            <ServiceCard 
              title="Data Science & Analytics"
              description="Advanced data analysis, statistical modeling, and business intelligence"
              icon="📊"
            />
            <ServiceCard 
              title="AI Integration"
              description="Seamlessly integrate AI capabilities into existing applications and systems"
              icon="🔗"
            />
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Technologies We Work With</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img src="/logos/python.svg" alt="Python" className="w-12 h-12 mb-2" />
                <span className="text-sm font-medium text-gray-700">Python</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img src="/logos/plotly.svg" alt="Plotly" className="w-12 h-12 mb-2" />
                <span className="text-sm font-medium text-gray-700">Plotly</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img src="/logos/nltk.svg" alt="NLTK" className="w-12 h-12 mb-2" />
                <span className="text-sm font-medium text-gray-700">NLTK</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img src="/logos/langflow.svg" alt="Langflow" className="w-12 h-12 mb-2" />
                <span className="text-sm font-medium text-gray-700">Langflow</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img src="/logos/llama.svg" alt="Llama" className="w-12 h-12 mb-2" />
                <span className="text-sm font-medium text-gray-700">Llama</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img src="/logos/mistral.svg" alt="Mistral" className="w-12 h-12 mb-2" />
                <span className="text-sm font-medium text-gray-700">Mistral</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Journey Section */}
      <section id="case-studies" className="py-12 sm:py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Backing You Up At Every Stage Of Your Progress
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <CustomerJourneyCard 
              title="I'm A Startup"
              description="Remarkable ideas often stall without the right team to bring them to life"
              buttonText="Get Started"
              bgColor="bg-green-500"
              onButtonClick={() => setShowContactForm(true)}
            />
            <CustomerJourneyCard 
              title="I'm An Enterprise"
              description="Scaling without the right infrastructure and expertise can lead to costly bottlenecks"
              buttonText="Explore More"
              bgColor="bg-blue-500"
              onButtonClick={() => setShowContactForm(true)}
            />
            <CustomerJourneyCard 
              title="I Need A Rescue"
              description="A messy codebase and tech debt are suffocating your progress"
              buttonText="Need a Fix"
              bgColor="bg-red-500"
              onButtonClick={() => setShowContactForm(true)}
            />
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section id="about" className="py-12 sm:py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Engagement Models</h2>
            <p className="text-xl text-gray-600">
              Choose from flexible engagement models tailored to your needs, ensuring seamless collaboration 
              with time & material or dedicated teams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <EngagementCard 
              title="Product Development"
              description="Transforming your ideas into ready-to-launch products"
              features={["Early Growth Stage or Stealth Startup", "Product Development Roadmap", "MVP Development", "Prototypes / POC"]}
            />
            <EngagementCard 
              title="Managed IT Systems"
              description="Complete IT infrastructure management and support"
              features={["24/7 System Monitoring", "Infrastructure Management", "Security & Compliance", "Performance Optimization"]}
            />
            <EngagementCard 
              title="Team Augmentation"
              description="Scale your team with skilled developers"
              features={["Dedicated Developers", "Flexible Scaling", "Quick Onboarding", "Seamless Integration"]}
            />
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-12 sm:py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Expertise in Software Development Across Multiple Industries
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <IndustryCard 
              title="Healthcare"
              services={["Telemedicine Platforms", "Healthcare CRM", "Medical Billing Applications", "Patient Portals"]}
              icon="🏥"
            />
            <IndustryCard 
              title="Fintech"
              services={["Payment Gateways", "Digital Banking", "Lending Platforms", "Personal Finance Management"]}
              icon="💳"
            />
            <IndustryCard 
              title="Food & Grocery"
              services={["Grocery Delivery Apps", "Meal Kit Delivery Services", "Recipe And Cooking Apps", "Food Waste Management Apps"]}
              icon="🍕"
            />
            <IndustryCard 
              title="E-commerce"
              services={["Social Commerce", "Subscription-Based E-commerce", "Marketplace Platforms", "Digital Goods E-commerce"]}
              icon="🛒"
            />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="hire-developers" className="py-12 sm:py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Build Your Own Team - Hire Developer
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We've built our business by assembling a team of skilled developers, experts in the frameworks 
              and technologies driving modern solutions.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['All', 'Front-End', 'Back-End', 'Low/No Code', 'Database', 'DevOps', 'Mobile', 'AI & ML'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(/[^a-z]/g, ''))}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    activeTab === tab.toLowerCase().replace(/[^a-z]/g, '') 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <TechnologyGrid activeTab={activeTab} />
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <div className="text-2xl font-bold text-blue-400">CodePlex</div>
              </div>
               <p className="text-gray-400">
                 Software Development and Consulting Company helping businesses overcome every challenge.
               </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Product Engineering</li>
                <li>AI & Data Science</li>
                <li>DevOps & Cloud</li>
                <li>Blockchain</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Industries</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Healthcare</li>
                <li>Fintech</li>
                <li>E-commerce</li>
                <li>Food & Grocery</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3 text-gray-400">
                <div>
                  <p className="text-sm font-medium text-gray-300">Email</p>
                  <a href="mailto:sales@codeplexllc.com" className="hover:text-white transition-colors">
                    sales@codeplexllc.com
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Phone</p>
                  <a href="tel:+19294121996" className="hover:text-white transition-colors">
                    +1 (929) 412-1996
                  </a>
                </div>

              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CodePlex. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
              <button 
                onClick={() => {
                  setShowContactForm(false);
                  setIsMessageSent(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            {isMessageSent ? (
              <div className="text-center py-8">
                <div className="mb-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Message Sent Successfully!</h4>
                <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you soon.</p>
                <button 
                  onClick={() => {
                    setShowContactForm(false);
                    setIsMessageSent(false);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <div className="text-center text-sm text-gray-600">
                <p>This form is protected by reCAPTCHA Enterprise and the Google Privacy Policy and Terms of Service apply.</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => {
                    setShowContactForm(false);
                    setIsMessageSent(false);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting || !isRecaptchaLoaded}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceCard({ title, description, icon }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function CustomerJourneyCard({ title, description, buttonText, bgColor, onButtonClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-center"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <button 
        onClick={onButtonClick}
        className={`${bgColor} text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base font-medium min-h-[44px] touch-manipulation`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
}

function EngagementCard({ title, description, features }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function IndustryCard({ title, services, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {services.map((service, index) => (
          <li key={index} className="text-sm text-gray-600">
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechnologyGrid({ activeTab }) {
  const technologies = {
    all: ['HTML', 'CSS', 'JavaScript', 'React JS', 'Vue JS', 'Angular', 'Node.js', 'Python', 'Java', 'PHP', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Android', 'iOS', 'TensorFlow'],
    frontend: ['HTML', 'CSS', 'JavaScript', 'React JS', 'Vue JS', 'Angular', 'Meteor JS', 'Nuxt JS', 'WebGL'],
    backend: ['Node.js', 'Python', 'Elixir', 'Ruby', 'Java', 'PHP', 'Golang', 'C#', 'C++', 'Rust', 'Nest.js', '.Net Core'],
    lownocode: ['Shopify', 'WordPress', 'Strapi', 'bubble.io', 'builder.io', 'Zoho', 'Zapier', 'Webflow', 'Wix'],
    database: ['Firebase', 'MongoDB', 'PostgreSQL', 'CouchDB', 'SQLite', 'MS-SQL', 'AWS DynamoDB', 'Oracle', 'MySQL', 'Redis'],
    devops: ['AWS', 'GCP', 'Azure', 'IBM Cloud', 'Digital Ocean', 'Oracle Cloud', 'Puppet', 'Kubernetes', 'Docker', 'Jenkins', 'Chef', 'Terraform'],
    mobile: ['Android', 'Kotlin', 'Swift', 'Objective-C', 'React Native', 'Ionic', 'Flutter', 'iOS', 'PWA'],
    aiml: ['TensorFlow', 'Keras', 'PyTorch', 'LISP', 'NTKL', 'Spacy', 'OpenAI', 'Plotly', 'Matplotlib', 'Pandas', 'OpenCV', 'NumPy', 'Scikit-learn', 'Mistral', 'DeepSeek', 'Llamas', 'Langflow']
  };

  // Technology logo mapping
  const techLogos = {
    // Frontend Technologies
    'HTML': '/logos/html.svg',
    'CSS': '/logos/css.svg',
    'JavaScript': '/logos/javascript.svg',
    'React JS': '/logos/react.svg',
    'Vue JS': '/logos/vue.svg',
    'Angular': '/logos/angular.svg',
    'Meteor JS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/meteor/meteor-original.svg',
    'Nuxt JS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg',
    'WebGL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg',
    
    // Backend Technologies
    'Node.js': '/logos/nodejs.svg',
    'Python': '/logos/python.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
    'Elixir': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elixir/elixir-original.svg',
    'Ruby': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg',
    'Golang': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg',
    'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    'Rust': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg',
    'Nest.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
    '.Net Core': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg',
    
    // Low/No Code
    'Shopify': '/logos/shopify.svg',
    'WordPress': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg',
    'Strapi': '/logos/strapi.svg',
    'Webflow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webflow/webflow-original.svg',
    'bubble.io': '/logos/bubble.svg',
    'builder.io': '/logos/builder.svg',
    'Zoho': '/logos/zoho.svg',
    'Zapier': 'https://cdn.worldvectorlogo.com/logos/zapier.svg',
    'Wix': '/logos/wix.svg',
    
    // Databases
    'MongoDB': '/logos/mongodb.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
    'SQLite': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
    'Oracle': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg',
    'CouchDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/couchdb/couchdb-original.svg',
    'MS-SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg',
    'AWS DynamoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dynamodb/dynamodb-original.svg',
    
    // DevOps & Cloud
    'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg',
    'GCP': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
    'Azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
    'Jenkins': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg',
    'Terraform': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg',
    'IBM Cloud': '/logos/ibm-cloud.svg',
    'Digital Ocean': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/digitalocean/digitalocean-original.svg',
    'Oracle Cloud': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg',
    'Puppet': '/logos/puppet.svg',
    'Chef': '/logos/chef.svg',
    
    // Mobile
    'Android': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
    'iOS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg',
    'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    'Ionic': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ionic/ionic-original.svg',
    'Swift': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg',
    'Kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    'Objective-C': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/objectivec/objectivec-plain.svg',
    'PWA': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg',
    
    // AI & ML
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
    'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
    'OpenCV': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
    'Keras': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg',
    'Matplotlib': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg',
    'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
    'OpenAI': 'https://cdn.worldvectorlogo.com/logos/openai-2.svg',
    'Spacy': 'https://upload.wikimedia.org/wikipedia/commons/8/88/SpaCy_logo.svg',
    'LISP': '/logos/lisp.svg',
    'NTKL': '/logos/nltk.svg',
    'Plotly': '/logos/plotly.svg',
    'DeepSeek': '/logos/deepseek.svg',
    'Mistral': '/logos/mistral.svg',
    'Llamas': '/logos/llama.svg',
    'Langflow': '/logos/langflow.svg'
  };

  const currentTechs = technologies[activeTab] || technologies.all;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {currentTechs.map((tech, index) => (
        <motion.div
          key={tech}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors flex flex-col items-center space-y-2"
        >
          {techLogos[tech] && (
            <img 
              src={techLogos[tech]} 
              alt={`${tech} logo`}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <span className="text-sm font-medium text-gray-700">{tech}</span>
        </motion.div>
      ))}
    </div>
  );
}
