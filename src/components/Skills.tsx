"use client";

const skillsData = {
  "AI & Machine Learning": {
    skills: ["TensorFlow", "PyTorch", "Deep Learning", "Computer Vision", "CNN", "RNN", "Transfer Learning"],
  },
  "Programming & Tools": {
    skills: ["Python", "OpenCV", "NumPy", "MATLAB", "C++", "Java"],
  },
  "Domain Expertise": {
    skills: ["Medical Imaging", "Image Segmentation", "Pattern Recognition", "3D Segmentation", "Edge Detection", "Morphological Operations"],
  },
  "Frameworks & Libraries": {
    skills: ["Scikit-learn", "LangChain", "Streamlit", "Google Colab", "MongoDB", "MySQL"],
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-16 bg-gray-50"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Academic Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Technical Competencies
          </h2>
          <div className="w-20 h-0.5 bg-blue-900 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            A comprehensive overview of technical skills and expertise acquired through academic coursework and research projects
          </p>
        </div>

        {/* Academic Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillsData).map(([category, data]) => (
            <div key={category} className="bg-white border-2 border-gray-300 shadow-sm">
              {/* Category Header */}
              <div className="bg-gray-100 border-b border-gray-300 p-4">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                  {category}
                </h3>
              </div>
              
              {/* Skills List */}
              <div className="p-5">
                <div className="grid grid-cols-1 gap-3">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700 font-medium">{skill}</span>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-900 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}