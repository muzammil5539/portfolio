"use client";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [state, handleSubmit] = useForm("mldbdoaj");

  if (state.succeeded) {
    return (
      <section
        id="contact"
        className={`py-24 relative overflow-hidden transition-colors duration-300 ${
          isDarkMode ? "bg-ai-navy-light" : "bg-gray-50"
        }`}
      >
        <div className={`absolute inset-0 bg-grid-pattern bg-grid ${isDarkMode ? "opacity-20" : "opacity-10"}`}></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className={`p-12 rounded-2xl border ${
              isDarkMode ? "glass-card" : "bg-white border-gray-200 shadow-lg"
            }`}>
              <div className={`w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full ${
                isDarkMode ? "bg-ai-green/10 border border-ai-green/30" : "bg-green-50 border border-green-200"
              }`}>
                <svg
                  className={`w-10 h-10 ${isDarkMode ? "text-ai-green" : "text-green-600"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}>
                Message Sent!
              </h2>
              <p className={`text-lg ${isDarkMode ? "text-ai-text-muted" : "text-gray-600"}`}>
                Thank you for reaching out! Your message has been successfully
                sent. I&apos;ll get back to you shortly.
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
      className={`py-20 md:py-28 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-ai-navy-light" : "bg-gray-50"
      }`}
    >
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-grid-pattern bg-grid ${isDarkMode ? "opacity-20" : "opacity-10"}`}></div>
      <div className={`absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl ${
        isDarkMode ? "bg-ai-purple/5" : "bg-purple-200/30"
      }`}></div>
      <div className={`absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl ${
        isDarkMode ? "bg-ai-cyan/5" : "bg-cyan-200/30"
      }`}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`h-px w-12 bg-gradient-to-r from-transparent ${isDarkMode ? "to-ai-cyan" : "to-cyan-500"}`}></div>
            <span className={`text-sm font-medium tracking-wider uppercase ${isDarkMode ? "text-ai-cyan" : "text-cyan-600"}`}>Contact</span>
            <div className={`h-px w-12 bg-gradient-to-l from-transparent ${isDarkMode ? "to-ai-cyan" : "to-cyan-500"}`}></div>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}>
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-ai-text-muted" : "text-gray-600"}`}>
            Ready to collaborate on cutting-edge AI projects? Let&apos;s connect
            and build the future of technology together.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            isDarkMode ? "glass-card" : "bg-white border-gray-200 shadow-lg"
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}
                  >
                    Name <span className={isDarkMode ? "text-ai-cyan" : "text-cyan-600"}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 ${
                      isDarkMode 
                        ? "bg-ai-navy border-ai-slate text-ai-text placeholder-ai-text-dim focus:border-ai-cyan focus:ring-ai-cyan/50" 
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/50"
                    }`}
                    placeholder="Your full name"
                    required
                  />
                </div>
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}
                  >
                    Email <span className={isDarkMode ? "text-ai-cyan" : "text-cyan-600"}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 ${
                      isDarkMode 
                        ? "bg-ai-navy border-ai-slate text-ai-text placeholder-ai-text-dim focus:border-ai-cyan focus:ring-ai-cyan/50" 
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/50"
                    }`}
                    placeholder="your.email@example.com"
                    required
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-2"
                  />
                </div>
              </div>
              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}
                >
                  Subject <span className={isDarkMode ? "text-ai-cyan" : "text-cyan-600"}>*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 ${
                    isDarkMode 
                      ? "bg-ai-navy border-ai-slate text-ai-text placeholder-ai-text-dim focus:border-ai-cyan focus:ring-ai-cyan/50" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/50"
                  }`}
                  placeholder="e.g., AI Project Collaboration"
                  required
                />
              </div>
              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}
                >
                  Message <span className={isDarkMode ? "text-ai-cyan" : "text-cyan-600"}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 resize-none ${
                    isDarkMode 
                      ? "bg-ai-navy border-ai-slate text-ai-text placeholder-ai-text-dim focus:border-ai-cyan focus:ring-ai-cyan/50" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/50"
                  }`}
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  required
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-red-400 text-sm mt-2"
                />
              </div>
              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-ai-cyan to-ai-blue px-8 py-4 font-semibold rounded-lg hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode ? "text-ai-navy" : "text-white"
                  }`}
                >
                  {state.submitting ? (
                    <>
                      <div className={`w-5 h-5 border-2 rounded-full animate-spin ${
                        isDarkMode ? "border-ai-navy/30 border-t-ai-navy" : "border-white/30 border-t-white"
                      }`}></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              {/* Form Note */}
              <p className={`text-center text-xs sm:text-sm mt-4 ${isDarkMode ? "text-ai-text-dim" : "text-gray-500"}`}>
                All fields marked with <span className={isDarkMode ? "text-ai-cyan" : "text-cyan-600"}>*</span>{" "}
                are required. Your data is encrypted and secure.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
