"use client";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";

export default function Contact() {
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
        className="py-24 bg-ai-navy-light relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-12">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-ai-green/10 border border-ai-green/30">
                <svg
                  className="w-10 h-10 text-ai-green"
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
              <h2 className="text-3xl font-bold text-ai-text mb-4">
                Message Sent!
              </h2>
              <p className="text-ai-text-muted text-lg">
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
      className="py-20 md:py-28 bg-ai-navy-light relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-ai-cyan"></div>
            <span className="text-ai-cyan text-sm font-medium tracking-wider uppercase">Contact</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-ai-cyan"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ai-text mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-ai-text-muted text-lg max-w-2xl mx-auto">
            Ready to collaborate on cutting-edge AI projects? Let&apos;s connect
            and build the future of technology together.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-ai-text"
                  >
                    Name <span className="text-ai-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-ai-navy border border-ai-slate rounded-lg text-ai-text placeholder-ai-text-dim focus:border-ai-cyan focus:outline-none focus:ring-1 focus:ring-ai-cyan/50 transition-all"
                    placeholder="Your full name"
                    required
                  />
                </div>
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-ai-text"
                  >
                    Email <span className="text-ai-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-ai-navy border border-ai-slate rounded-lg text-ai-text placeholder-ai-text-dim focus:border-ai-cyan focus:outline-none focus:ring-1 focus:ring-ai-cyan/50 transition-all"
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
                  className="block text-sm font-medium mb-2 text-ai-text"
                >
                  Subject <span className="text-ai-cyan">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-ai-navy border border-ai-slate rounded-lg text-ai-text placeholder-ai-text-dim focus:border-ai-cyan focus:outline-none focus:ring-1 focus:ring-ai-cyan/50 transition-all"
                  placeholder="e.g., AI Project Collaboration"
                  required
                />
              </div>
              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-ai-text"
                >
                  Message <span className="text-ai-cyan">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-ai-navy border border-ai-slate rounded-lg text-ai-text placeholder-ai-text-dim focus:border-ai-cyan focus:outline-none focus:ring-1 focus:ring-ai-cyan/50 transition-all resize-none"
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-ai-cyan to-ai-blue text-ai-navy px-8 py-4 font-semibold rounded-lg hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-ai-navy/30 border-t-ai-navy rounded-full animate-spin"></div>
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
              <p className="text-center text-xs sm:text-sm text-ai-text-dim mt-4">
                All fields marked with <span className="text-ai-cyan">*</span>{" "}
                are required. Your data is encrypted and secure.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
