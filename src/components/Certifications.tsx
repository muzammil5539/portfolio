"use client";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { certificates, Certificate } from "@/data/certificates";

export default function Certifications() {
  const { isDarkMode } = useTheme();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const openPDF = (cert: Certificate) => {
    // Open PDF in new tab
    window.open(cert.pdfUrl, '_blank');
  };

  const openModal = (cert: Certificate) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  return (
    <section
      id="certifications"
      className={`py-20 md:py-28 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-ai-charcoal" : "bg-white"
      }`}
    >
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-grid-pattern bg-grid ${isDarkMode ? "opacity-10" : "opacity-5"}`}></div>
      <div className={`absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl ${
        isDarkMode ? "bg-ai-purple/5" : "bg-purple-200/30"
      }`}></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`h-px w-12 bg-gradient-to-r from-transparent ${isDarkMode ? "to-ai-cyan" : "to-cyan-500"}`}></div>
            <span className={`text-sm font-medium tracking-wider uppercase ${isDarkMode ? "text-ai-cyan" : "text-cyan-600"}`}>
              Credentials
            </span>
            <div className={`h-px w-12 bg-gradient-to-l from-transparent ${isDarkMode ? "to-ai-cyan" : "to-cyan-500"}`}></div>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}>
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-ai-text-muted" : "text-gray-600"}`}>
            Industry-recognized certifications validating expertise in AI, Machine Learning, and Software Development
          </p>
        </div>

        {/* Certificates Grid - Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl ${
                isDarkMode 
                  ? "glass-card border border-ai-slate/30 hover:border-ai-cyan/50" 
                  : "bg-white border border-gray-200 hover:border-cyan-400 shadow-lg"
              }`}
              onClick={() => openModal(cert)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Certificate Preview/Thumbnail */}
              <div className={`relative h-64 overflow-hidden ${
                isDarkMode ? "bg-gradient-to-br from-ai-navy to-ai-charcoal" : "bg-gradient-to-br from-gray-50 to-gray-100"
              }`}>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  {/* PDF Icon */}
                  <div className={`transition-transform duration-300 group-hover:scale-110 ${
                    isDarkMode ? "text-ai-cyan" : "text-cyan-600"
                  }`}>
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10,19L12,15H9V10H13V15L15,19H13L12,17L11,19H10Z" />
                    </svg>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDarkMode ? "bg-ai-navy/90" : "bg-white/90"
                }`}>
                  <div className="text-center">
                    <svg className={`w-16 h-16 mx-auto mb-2 ${isDarkMode ? "text-ai-cyan" : "text-cyan-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}>
                      Click to view certificate
                    </p>
                  </div>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 line-clamp-2 transition-colors ${
                  isDarkMode ? "text-ai-text group-hover:text-ai-cyan" : "text-gray-900 group-hover:text-cyan-600"
                }`}>
                  {cert.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-sm font-medium ${isDarkMode ? "text-ai-cyan" : "text-cyan-600"}`}>
                    {cert.issuer}
                  </span>
                  <span className={`text-sm ${isDarkMode ? "text-ai-text-muted" : "text-gray-500"}`}>
                    • {cert.date}
                  </span>
                </div>

                <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? "text-ai-text-muted" : "text-gray-600"}`}>
                  {cert.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {cert.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 text-xs font-medium rounded-md ${
                        isDarkMode 
                          ? "bg-ai-navy/80 text-ai-cyan border border-ai-cyan/20" 
                          : "bg-cyan-50 text-cyan-700 border border-cyan-200"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className={`px-2 py-1 text-xs font-medium ${isDarkMode ? "text-ai-text-muted" : "text-gray-500"}`}>
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* View Certificate Button */}
              <div className={`px-6 pb-6 pt-0`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openPDF(cert);
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-ai-cyan to-ai-blue text-ai-navy hover:shadow-glow-cyan"
                      : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg"
                  }`}
                >
                  Open in New Tab
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal with PDF Viewer */}
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className={`relative w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden flex flex-col ${
                isDarkMode ? "bg-ai-charcoal border border-ai-slate/50" : "bg-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`flex items-center justify-between p-4 border-b ${
                isDarkMode ? "border-ai-slate/30" : "border-gray-200"
              }`}>
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className={`text-lg font-bold truncate ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}>
                    {selectedCert.title}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? "text-ai-text-muted" : "text-gray-600"}`}>
                    {selectedCert.issuer} • {selectedCert.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openPDF(selectedCert)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? "bg-ai-navy hover:bg-ai-slate text-ai-cyan" 
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                    title="Open in new tab"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  <button
                    onClick={closeModal}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? "bg-ai-navy hover:bg-ai-slate text-ai-cyan" 
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                    title="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* PDF Viewer using iframe */}
              <div className={`flex-1 overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                <iframe
                  src={selectedCert.pdfUrl}
                  className="w-full h-full"
                  title={selectedCert.title}
                />
              </div>

              {/* Modal Footer with skills */}
              <div className={`p-4 border-t ${
                isDarkMode ? "border-ai-slate/30" : "border-gray-200"
              }`}>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        isDarkMode 
                          ? "bg-ai-navy text-ai-cyan border border-ai-cyan/20" 
                          : "bg-cyan-50 text-cyan-700 border border-cyan-200"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
