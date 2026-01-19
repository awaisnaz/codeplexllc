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
              <a href="/" className="block" aria-label="CodePlex Home">
                <img
                  src="/codeplex-logo.png"
                  alt="CodePlex"
                  className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                />
              </a>
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
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  Book Appointment
                </button>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-blue-700 bg-white border border-blue-300 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
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
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
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
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
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
              iconType="rocket"
            />
            <ServiceCard 
              title="Data & Artificial Intelligence"
              description="Leverage AI and data analytics to drive business insights"
              iconType="ai"
            />
            <ServiceCard 
              title="DevOps & CloudOps"
              description="Streamline deployment and infrastructure management"
              iconType="cloud"
            />
            <ServiceCard 
              title="Blockchain & Web 3.0"
              description="Build decentralized applications and smart contracts"
              iconType="blockchain"
            />
            <ServiceCard 
              title="Emerging Technologies"
              description="Stay ahead with cutting-edge technology solutions"
              iconType="lightning"
            />
            <ServiceCard 
              title="Hire Developers"
              description="Access skilled developers for your projects"
              iconType="users"
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
              iconType="brain"
            />
            <ServiceCard 
              title="Natural Language Processing"
              description="Text analysis, sentiment analysis, chatbots, and language understanding systems"
              iconType="chat"
            />
            <ServiceCard 
              title="Computer Vision"
              description="Image recognition, object detection, facial recognition, and visual analytics"
              iconType="eye"
            />
            <ServiceCard 
              title="AI-Powered Automation"
              description="Intelligent process automation and workflow optimization using AI"
              iconType="gear"
            />
            <ServiceCard 
              title="Data Science & Analytics"
              description="Advanced data analysis, statistical modeling, and business intelligence"
              iconType="chart"
            />
            <ServiceCard 
              title="AI Integration"
              description="Seamlessly integrate AI capabilities into existing applications and systems"
              iconType="link"
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
              iconType="healthcare"
            />
            <IndustryCard 
              title="Fintech"
              services={["Payment Gateways", "Digital Banking", "Lending Platforms", "Personal Finance Management"]}
              iconType="fintech"
            />
            <IndustryCard 
              title="Food & Grocery"
              services={["Grocery Delivery Apps", "Meal Kit Delivery Services", "Recipe And Cooking Apps", "Food Waste Management Apps"]}
              iconType="food"
            />
            <IndustryCard 
              title="E-commerce"
              services={["Social Commerce", "Subscription-Based E-commerce", "Marketplace Platforms", "Digital Goods E-commerce"]}
              iconType="ecommerce"
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

      {/* Companies We've Worked With Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Glimpse of Codeplex AI's Experiences
            </h2>
          </div>
          
          <div className="space-y-8">
            {/* Row 1: Orenda, Luxebot, Myant */}
            <div className="grid md:grid-cols-3 gap-8">
              <CompanyExperienceCard 
                logo="/logos/orenda.png"
                industry="Fintech"
                location="UK"
                description="Orenda Finance, a UK embedded-finance company, deployed Node.js/Next.js apps on AWS Lambda, API Gateway, and S3 using NPM and Terraform IaC. Multitenant AI platforms integrated Retell insights, open banking, FX, and ML fraud detection for payments, cards, payroll across 190+ countries. CloudWatch/Sentry ensured logging and alerting."
              />
              <CompanyExperienceCard 
                logo="/logos/luxebot.png"
                industry="Marketing Platform"
                location="USA"
                description="Luxebot AI deployed Next.js/React (MERN) apps on Vercel with mobile-responsive UIs, MongoDB, BetterAuth, and Google SSO. Integrated Retell AI/ElevenLabs for voice orchestration, OpenAI/SageMaker for AI/ML, and n8n automation. Multitenent Voice AI agents autonomously called leads, qualified prospects, and booked meetings for real estate/service businesses."
              />
              <CompanyExperienceCard 
                logo="/logos/myant.png"
                industry="Healthtech"
                location="Canada"
                description="Myant deployed Node.js, React/Next.js (MERN), FastAPI, and Python microservices on AWS (ECS Fargate, Lambda, DynamoDB, S3, OpenSearch, SQS) with Serverless IaC, GitHub Actions CI/CD, and CloudWatch/Sentry. Agentic AI (OpenAI, SageMaker, n8n) powered IoT/health-tech for remote ECG/vitals monitoring, ML anomaly detection, and scalable multi-tenant dashboards."
              />
            </div>

            {/* Row 2: TTDLAL, Teknikality, Digiteum */}
            <div className="grid md:grid-cols-3 gap-8">
              <CompanyExperienceCard 
                logo="/logos/ttdlal.png"
                industry="Servicetech"
                location="USA"
                description="TTDLAL's Node.js/AWS backend (ECS Fargate, SAM, API Gateway, RDS/DynamoDB) powered a gig-economy marketplace with iOS/Android apps and Twilio SMS/push notifications. It connects customers with vetted professionals (plumbers, electricians), enabling booking, dynamic pricing, real-time map tracking, verification, ratings, and admin dashboards."
              />
              <CompanyExperienceCard 
                logo="/logos/teknikality.png"
                industry="Autotech"
                location="UK"
                description="Teknikality built Node.js/Express and MEVN (Vue/Quasar) apps with Parse Server, Firebase, Google Cloud/AWS, Tailwind CSS / MUI, Webpack, and Docker. Secure SPAs / PWAs integrated JWT/OAuth auth, Google/RapidAPI services, real-time vehicle maintenance alerts, MOT reminders, garage network coordination, and SEO/ads campaigns (Google/Microsoft/Reddit Ads)."
              />
              <CompanyExperienceCard 
                logo="/logos/digiteum.png"
                industry="Cleantech"
                location="USA"
                description="Digiteum built Node.js, React, MongoDB, MERN/Next.js, and Python powered scalable web apps for renewable energy solutions. Features included solar integration with real-time monitoring, energy metering, smart grid automation, geospatial dashboards, demand forecasting, and AI analytics—optimizing cleantech management and ensuring regulatory compliance."
              />
            </div>

            {/* Row 3: Intuz, Simform, Door3 */}
            <div className="grid md:grid-cols-3 gap-8">
              <CompanyExperienceCard 
                logo="/logos/intuz.png"
                industry="IoT Monitoring Platform"
                location="USA"
                description="Intuz developed real-time IoT platform using Angular and Django for dashboards visualizing telemetry from GPS trackers, trucks, ships, and RM devices on Google Maps. Secure APIs ingested MQTT/encrypted data, enabled remote relay controls (e.g., vehicle ignition cutoff), MQTT/HTTP pipelines, alerting, audit trails, and multi-tenant auth for fleet/industrial monitoring."
              />
              <CompanyExperienceCard 
                logo="/logos/simform.png"
                industry="Geospatial Analytics"
                location="USA"
                description="Simform developed MERN geospatial analytics platform ingested and visualized real-time location data on interactive maps using MongoDB GeoJSON/2dsphere indexes for fast proximity/polygon queries. Node/Express REST API powered map layers, filters, and workflows. React dashboards featured heatmaps, clusters, and time-series overlays for asset tracking, site selection, and spatial KPIs."
              />
              <CompanyExperienceCard 
                logo="/logos/door3.png"
                industry="Edtech"
                location="USA"
                description="Door3 developed Angular / Node.js EdTech platform backed by PostgreSQL delivered a multi-role learning environment for students, instructors, and administrators. Node/Express RESTful APIs enabled course authoring, quizzes, progress tracking, and analytics dashboards, using relational schemas, constraints, and optimized PostgreSQL queries for reliable, scalable data management."
              />
            </div>

            {/* Row 4: Azilen, DesignLi, Orbus */}
            <div className="grid md:grid-cols-3 gap-8">
              <CompanyExperienceCard 
                logo="/logos/azilen.png"
                industry="HR Platform"
                location="USA"
                description="Azilen developed Angular / Node.js / PostgreSQL HR platform centralized employee records, attendance, leave, payroll, and performance data. Secure auth and role-based dashboards enabled self-service for HR, managers, and staff. Automated workflows handled leave approvals and payroll calculations; normalized schemas ensured real-time reporting and compliance."
              />
              <CompanyExperienceCard 
                logo="/logos/designli.png"
                industry="Real Estate Tech"
                location="USA"
                description="PropTech platform using Angular, Node.js, and PostgreSQL enabled property listing, search, and management with advanced filters, maps, and lead tracking. Secure authentication and role-based access served agents, owners, and buyers. RESTful APIs with relational schemas ensured robust performance, data integrity, and transaction handling."
              />
              <CompanyExperienceCard 
                logo="/logos/orbus.png"
                industry="Tech Consultancy"
                location="UK"
                description="Node.js, React, MongoDB, MERN, Angular, TypeScript, Python, Java, and C# drove enterprise e-commerce, payments, and cloud apps. AI initiatives included face recognition, smart grids, energy metering, and ML leaf disease detection. Node/Express APIs, D3.js/Three.js visuals, and CI/CD optimized deployments."
              />
            </div>
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
                  <a href="tel:+19294080219" className="hover:text-white transition-colors">
                    +1 (929) 408-0219
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
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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

function ServiceCard({ title, description, iconType }) {
  const getIcon = () => {
    switch(iconType) {
      case 'rocket':
        return (
          <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
          </svg>
        );
      case 'ai':
        return (
          <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        );
      case 'cloud':
        return (
          <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          </svg>
        );
      case 'blockchain':
        return (
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
        );
      case 'lightning':
        return (
          <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-12 h-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        );
      case 'brain':
        return (
          <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
        );
      case 'chat':
        return (
          <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'eye':
        return (
          <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'gear':
        return (
          <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        );
      case 'link':
        return (
          <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="mb-4 flex justify-center">{getIcon()}</div>
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

function IndustryCard({ title, services, iconType }) {
  const getIndustryIcon = () => {
    switch(iconType) {
      case 'healthcare':
        return (
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        );
      case 'fintech':
        return (
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        );
      case 'food':
        return (
          <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
          </svg>
        );
      case 'ecommerce':
        return (
          <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="mb-4">{getIndustryIcon()}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {services.map((service, index) => (
          <li key={index} className="text-sm text-gray-600 flex items-start">
            <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompanyExperienceCard({ logo, industry, location, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mb-4 p-2">
          <img src={logo} alt={`${industry} logo`} className="w-full h-full object-contain" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          {industry} | {location}
        </h3>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed text-left">
        {description}
      </p>
    </motion.div>
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
