"use client";
import { useTheme } from "@/context/ThemeContext";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";

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
        className={`py-24 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div
              className={`rounded-lg p-12 shadow-lg ${
                isDarkMode
                  ? "bg-gray-800 shadow-gray-900/30"
                  : "bg-white shadow-gray-200/50"
              }`}
            >
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2
                className={`text-4xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Message Sent!
              </h2>
              <p
                className={`text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
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
      className={`py-16 md:py-24 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Get in Touch
          </h2>
          <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto"></div>
          <p
            className={`text-base sm:text-xl mt-6 mb-0 max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Ready to collaborate on cutting-edge AI projects? Let&apos;s connect
            and build the future of technology together.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div
            className={`rounded-xl p-4 sm:p-8 shadow-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-3xl ${
              isDarkMode
                ? "bg-gray-800/80 shadow-gray-900/50 border-gray-700/50 hover:bg-gray-800/90"
                : "bg-white/80 shadow-gray-200/50 border-gray-200/50 hover:bg-white/90"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-blue-600"
                  >
                    Name <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 backdrop-blur-sm ${
                      isDarkMode
                        ? "bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-900/70"
                        : "bg-gray-50/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:bg-white/70"
                    } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Your full name"
                    required
                  />
                </div>
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-blue-600"
                  >
                    Email <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 backdrop-blur-sm ${
                      isDarkMode
                        ? "bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-900/70"
                        : "bg-gray-50/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:bg-white/70"
                    } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
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
              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2 text-blue-600"
                >
                  Subject <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 backdrop-blur-sm ${
                    isDarkMode
                      ? "bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-900/70"
                      : "bg-gray-50/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:bg-white/70"
                  } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="e.g., AI Project Collaboration"
                  required
                />
              </div>
              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-blue-600"
                >
                  Message <span className="text-pink-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 backdrop-blur-sm resize-none ${
                    isDarkMode
                      ? "bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-900/70"
                      : "bg-gray-50/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:bg-white/70"
                  } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
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
              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full sm:w-auto px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed btn-3d transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  {state.submitting ? (
                    <span className="flex items-center gap-3 justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Transmitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3 justify-center">
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
                    </span>
                  )}
                </button>
              </div>
              {/* Form Note */}
              <p
                className={`text-center text-xs sm:text-sm mt-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                All fields marked with <span className="text-pink-500">*</span>{" "}
                are required. Your data is encrypted and secure.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
