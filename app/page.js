"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative">
        {/* Hero Section - More dramatic */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl sm:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-gradient">
            AI & Fullstack Solutions
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Transforming ideas into innovative solutions with AI and cutting-edge development
          </motion.p>
          <motion.div 
            className="flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="https://www.linkedin.com/in/awais-nazir-ch/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-blue-500/30 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              Connect on LinkedIn
            </a>
            <a
              href="#contact"
              onClick={handleContactClick}
              className="group relative border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 py-4 rounded-lg transition-all duration-300 text-lg font-semibold overflow-hidden"
            >
              <span className="absolute inset-0 w-0 bg-blue-500/20 transition-all duration-300 group-hover:w-full"></span>
              <span className="relative">Get in Touch</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Skills Sections - With animations */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid md:grid-cols-3 gap-10 mb-20"
        >
          <SkillSection
            title="AI Expertise"
            skills={[
              "AI Agents & MCP Servers",
              "LLMs (OpenAI, Anthropic, Gemini)",
              "Vector Databases",
              "RAG Systems",
              "MLOps & Fine-tuning",
              "Voice AI & Chatbots"
            ]}
            delay={0}
          />
          <SkillSection
            title="Full Stack"
            skills={[
              "NextJS & MERN Stack",
              "Python & FastAPI",
              "TypeScript & JavaScript",
              "MongoDB & PostgreSQL",
              "REST APIs & WebSockets",
              "UI/UX & Tailwind CSS"
            ]}
            delay={0.2}
          />
          <SkillSection
            title="DevOps"
            skills={[
              "AWS, GCP, Azure",
              "Docker & Kubernetes",
              "CI/CD Pipelines",
              "Infrastructure as Code",
              "Security & Monitoring",
              "Microservices Architecture"
            ]}
            delay={0.4}
          />
        </motion.div>

        {/* Services Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <ServiceCard
              title="AI Development & Consulting"
              description="From LLMs and RAG systems to computer vision and NLP, we deliver cutting-edge AI solutions that keep you ahead of the curve. Our expertise spans across custom AI development, implementation, and optimization."
              features={[
                "Custom AI Solutions Development",
                "LLM & RAG Implementation",
                "AI Integration & Optimization",
                "Scalable AI Architecture"
              ]}
            />
            <ServiceCard
              title="Full Stack Development"
              description="End-to-end software development services delivering innovative solutions for businesses of all sizes. We transform your concepts into robust, scalable applications."
              features={[
                "Custom Software Development",
                "Mobile & Web Applications",
                "Enterprise Solutions",
                "Cloud Infrastructure"
              ]}
            />
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
          className="text-center p-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl shadow-xl relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book a free consultation today and discover how we can accelerate your business goals
          </p>
          <motion.div 
            className="flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <a
              href="#contact"
              onClick={handleContactClick}
              className="group relative bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-blue-500/30 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              Schedule Consultation
            </a>
          </motion.div>
        </motion.div>
      </main>

      {/* Add Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 p-8 rounded-2xl max-w-md w-full mx-4 relative"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Contact Us
            </h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    subject: e.target.subject.value,
                    message: e.target.message.value,
                    to: 'awais.nazir@codeplexllc.com'
                  }),
                });

                if (response.ok) {
                  alert('Message sent successfully!');
                  setIsModalOpen(false);
                } else {
                  throw new Error('Failed to send message');
                }
              } catch (error) {
                alert('Error sending message. Please try again.');
                console.error('Error:', error);
              }
            }}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Subject</label>
                <input 
                  type="text"
                  name="subject"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea 
                  name="message"
                  rows="4"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                Send Email
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
}

function SkillSection({ title, skills, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-8 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl hover:from-gray-800/40 hover:to-gray-900/40 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 relative">
        {title}
      </h2>
      <ul className="space-y-3 relative">
        {skills.map((skill, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + index * 0.1 }}
            className="text-gray-300 flex items-center group cursor-pointer"
          >
            <span className="mr-3 text-blue-400 text-lg group-hover:scale-125 transition-transform duration-300">•</span>
            <span className="group-hover:text-blue-400 transition duration-300">{skill}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function ServiceCard({ title, description, features }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl hover:from-gray-800/40 hover:to-gray-900/40 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 relative">
        {title}
      </h3>
      <p className="text-gray-300 mb-6 relative">
        {description}
      </p>
      <ul className="space-y-3 relative">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-gray-300 flex items-center group cursor-pointer"
          >
            <span className="mr-3 text-blue-400 text-lg group-hover:scale-125 transition-transform duration-300">•</span>
            <span className="group-hover:text-blue-400 transition duration-300">{feature}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
