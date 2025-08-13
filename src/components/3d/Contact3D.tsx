"use client";
import React, { useState, Suspense } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useForm, ValidationError } from "@formspree/react";
import { useWebGLSupport } from './hooks';
import Contact from '../Contact';
import Scene3D from './Scene3D';
import FlyingPlane from './FlyingPlane';

function FloatingPlaneSection({ isSubmitting, onSubmit }: { 
  isSubmitting: boolean; 
  onSubmit: () => void;
}) {
  const [isFlying, setIsFlying] = useState(false);
  
  // Trigger plane flight when form is being submitted
  React.useEffect(() => {
    if (isSubmitting && !isFlying) {
      setIsFlying(true);
    }
  }, [isSubmitting, isFlying]);

  const handleFlightComplete = () => {
    setIsFlying(false);
    onSubmit();
  };

  return (
    <div className="absolute top-4 right-4 w-32 h-24 pointer-events-none">
      <Scene3D 
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="w-full h-full"
        lights={true}
      >
        <FlyingPlane 
          isFlying={isFlying}
          onFlightComplete={handleFlightComplete}
        />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
      </Scene3D>
    </div>
  );
}

export default function Contact3D() {
  const { isDarkMode } = useTheme();
  const { hasWebGL, isLowEndDevice } = useWebGLSupport();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [state, handleSubmit] = useForm("mldbdoaj");
  const [showPlane, setShowPlane] = useState(false);

  // Fallback to original Contact for unsupported devices
  if (!hasWebGL || isLowEndDevice) {
    return <Contact />;
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setShowPlane(true);
    await handleSubmit(e);
  };

  const handlePlaneSubmit = () => {
    // Additional logic after plane flight if needed
  };

  // Success state with 3D elements
  if (state.succeeded) {
    return (
      <section
        id="contact"
        className={`py-24 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"} relative`}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div
              className={`rounded-lg p-12 shadow-lg relative overflow-hidden ${
                isDarkMode
                  ? "bg-gray-800 shadow-gray-900/30"
                  : "bg-white shadow-gray-200/50"
              }`}
            >
              {/* Success plane animation */}
              <div className="absolute top-4 right-4 w-20 h-16">
                <Scene3D 
                  camera={{ position: [0, 0, 6], fov: 45 }}
                  className="w-full h-full"
                  lights={true}
                >
                  <FlyingPlane isFlying={false} />
                  <ambientLight intensity={0.6} />
                </Scene3D>
              </div>
              
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
                Message Delivered! ✈️
              </h2>
              <p
                className={`text-xl mb-6 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Your message has taken flight and reached me successfully. I&apos;ll get back to you soon!
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Thank you for reaching out. I typically respond within 24-48 hours.
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
      className={`py-16 md:py-24 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"} relative`}
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

        <div className="max-w-4xl mx-auto">
          <div
            className={`rounded-lg p-6 md:p-8 shadow-lg backdrop-blur-sm border relative overflow-hidden ${
              isDarkMode
                ? "bg-gray-800/80 border-gray-700 shadow-gray-900/30"
                : "bg-white/80 border-gray-200 shadow-gray-200/50"
            }`}
          >
            {/* 3D Plane Animation */}
            {hasWebGL && !isLowEndDevice && showPlane && (
              <Suspense fallback={null}>
                <FloatingPlaneSection 
                  isSubmitting={state.submitting}
                  onSubmit={handlePlaneSubmit}
                />
              </Suspense>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Full Name *
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
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="text-pink-500 text-sm mt-2"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Email Address *
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

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Subject *
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
                  placeholder="What's this about?"
                  required
                />
                <ValidationError
                  prefix="Subject"
                  field="subject"
                  errors={state.errors}
                  className="text-pink-500 text-sm mt-2"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Message *
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
                      Taking Flight...
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