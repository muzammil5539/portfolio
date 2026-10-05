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
        className={`py-24 relative overflow-hidden transition-colors duration-300 bg-background-secondary`}
      >
        <div className={`absolute inset-0 bg-grid-pattern bg-grid opacity-10`}></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className={`p-12 rounded-2xl border bg-surface border-border shadow-lg`}>
              <div className={`w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-surface-hover border border-accent-blue/30`}>
                <svg
                  className={`w-10 h-10 text-accent-blue`}
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
              <h2 className={`text-3xl font-bold mb-4 text-foreground`}>
                Message Sent!
              </h2>
              <p className={`text-lg text-text-secondary`}>
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
      className={`py-20 md:py-28 relative overflow-hidden transition-colors duration-300 bg-background-secondary`}
    >
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-grid-pattern bg-grid opacity-10`}></div>
      <div className={`absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl bg-accent-cyan/20`}></div>
      <div className={`absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl bg-accent-cyan/20`}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`h-px w-12 bg-gradient-to-r from-transparent to-accent-blue`}></div>
            <span className={`text-sm font-medium tracking-wider uppercase text-accent-blue`}>Contact</span>
            <div className={`h-px w-12 bg-gradient-to-l from-transparent to-accent-blue`}></div>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground`}>
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto text-text-secondary`}>
            Ready to collaborate on cutting-edge AI projects? Let&apos;s connect
            and build the future of technology together.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className={`p-6 sm:p-8 rounded-2xl border bg-surface border-border shadow-lg`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 text-foreground`}
                  >
                    Name <span className="text-accent-blue">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 bg-surface border-border text-foreground placeholder:text-text-muted focus:border-accent-blue focus:ring-accent-blue/50`}
                    placeholder="Your full name"
                    required
                  />
                </div>
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 text-foreground`}
                  >
                    Email <span className="text-accent-blue">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 bg-surface border-border text-foreground placeholder:text-text-muted focus:border-accent-blue focus:ring-accent-blue/50`}
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
                  className={`block text-sm font-medium mb-2 text-foreground`}
                >
                  Subject <span className="text-accent-blue">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 bg-surface border-border text-foreground placeholder:text-text-muted focus:border-accent-blue focus:ring-accent-blue/50`}
                  placeholder="e.g., AI Project Collaboration"
                  required
                />
              </div>
              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 text-foreground`}
                >
                  Message <span className="text-accent-blue">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 resize-none bg-surface border-border text-foreground placeholder:text-text-muted focus:border-accent-blue focus:ring-accent-blue/50`}
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
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ai-cyan px-8 py-4 font-semibold rounded-lg hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-on-accent`}
                >
                  {state.submitting ? (
                    <>
                      <div className={`w-5 h-5 border-2 rounded-full animate-spin border-on-accent/30 border-t-on-accent`}></div>
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
              <p className={`text-center text-xs sm:text-sm mt-4 text-text-secondary`}>
                All fields marked with <span className="text-accent-blue">*</span>{" "}
                are required. Your data is encrypted and secure.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
