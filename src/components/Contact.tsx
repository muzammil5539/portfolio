"use client";
import { useTheme } from "@/context/ThemeContext";
import { useForm, ValidationError } from "@formspree/react";
import { useState, useEffect } from "react";

export default function Contact() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [scrollY, setScrollY] = useState(0);

  const [state, handleSubmit] = useForm("mldbdoaj");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (state.succeeded) {
    return (
      <section
        id="contact"
        className="py-24 relative overflow-hidden holographic-bg"
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-2xl mx-auto perspective-container">
            <div className="bg-gray-900/90 backdrop-blur-md rounded-lg p-12 border border-cyan-400/50 
              neon-glow depth-shadow-intense layer-3">
              
              {/* Success Animation */}
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-30"></div>
                <div className="absolute inset-2 bg-green-400 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold mb-4 text-white">
                Message <span className="gradient-text text-glow">Sent!</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Thank you for reaching out! Your message has been successfully transmitted 
                through the digital void. I'll get back to you shortly.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden holographic-bg"
    >
      {/* Animated Background Elements */}
      <div 
        className="absolute inset-0 geometric-pattern opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.05}px) translateZ(-20px)`
        }}
      ></div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 border border-pink-500/20 rotate-3d"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-green-400/20 rotate-3d" 
          style={{ animationDelay: '5s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 perspective-container">
          <div className="layer-2">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Get in <span className="gradient-text text-glow">Touch</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to collaborate on cutting-edge AI projects? Let's connect and build 
              the future of technology together.
            </p>
            
            {/* Animated Divider */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="w-3 h-3 border-2 border-cyan-400 rotate-45 animate-pulse"></div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 neon-glow"></div>
              <div className="w-3 h-3 border-2 border-pink-500 rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative group perspective-container">
            {/* Floating Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 
              rounded-lg blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            
            {/* Main Form Container */}
            <div className="relative rounded-lg p-8 transition-all duration-500 ease-out
              bg-gray-900/90 backdrop-blur-md border border-cyan-400/30
              card-3d depth-shadow hover:depth-shadow-intense layer-3">
              
              {/* Background Pattern */}
              <div className="absolute inset-0 geometric-pattern opacity-5 rounded-lg"></div>
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name Field */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-3 text-cyan-400 text-glow"
                    >
                      Name <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300
                        bg-gray-800/50 border-cyan-400/30 text-white placeholder:text-gray-500
                        focus:border-cyan-400 focus:bg-gray-800/70 focus:outline-none 
                        focus:ring-2 focus:ring-cyan-400/20 hover:border-cyan-400/50"
                        placeholder="Your full name"
                        required
                      />
                      <div className="absolute inset-0 rounded-lg bg-cyan-400/5 opacity-0 
                        hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-3 text-cyan-400 text-glow"
                    >
                      Email <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300
                        bg-gray-800/50 border-cyan-400/30 text-white placeholder:text-gray-500
                        focus:border-cyan-400 focus:bg-gray-800/70 focus:outline-none 
                        focus:ring-2 focus:ring-cyan-400/20 hover:border-cyan-400/50"
                        placeholder="your.email@example.com"
                        required
                      />
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                        className="text-pink-500 text-sm mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="relative">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-3 text-cyan-400 text-glow"
                  >
                    Subject <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300
                      bg-gray-800/50 border-cyan-400/30 text-white placeholder:text-gray-500
                      focus:border-cyan-400 focus:bg-gray-800/70 focus:outline-none 
                      focus:ring-2 focus:ring-cyan-400/20 hover:border-cyan-400/50"
                      placeholder="e.g., AI Project Collaboration"
                      required
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-3 text-cyan-400 text-glow"
                  >
                    Message <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300
                      bg-gray-800/50 border-cyan-400/30 text-white placeholder:text-gray-500
                      focus:border-cyan-400 focus:bg-gray-800/70 focus:outline-none 
                      focus:ring-2 focus:ring-cyan-400/20 hover:border-cyan-400/50 resize-none"
                      placeholder="Tell me about your project, ideas, or just say hello! I'm excited to hear from you..."
                      required
                    ></textarea>
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="text-pink-500 text-sm mt-2"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="px-12 py-4 rounded-lg font-bold text-lg transition-all duration-300
                    bg-gradient-to-r from-cyan-500 to-blue-600 text-black
                    hover:from-cyan-400 hover:to-blue-500 btn-3d neon-glow
                    transform hover:scale-105 shadow-lg disabled:opacity-50 
                    disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {state.submitting ? (
                      <span className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        Transmitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        Send Message
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>

                {/* Form Note */}
                <p className="text-center text-gray-400 text-sm">
                  All fields marked with <span className="text-pink-500">*</span> are required. 
                  Your data is encrypted and secure.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full float-3d opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}