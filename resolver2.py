import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

# Add import if missing
if 'lucide-react' not in content:
    content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { Github, Linkedin } from "lucide-react";')

# Add social icons next to Get in Touch button
social_buttons = """
                <div className="flex items-center gap-4 ml-2">
                  <a
                    href="https://github.com/muzammil5539"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? "text-ai-text-muted hover:text-ai-cyan hover:bg-ai-cyan/10"
                        : "text-gray-500 hover:text-cyan-600 hover:bg-cyan-50"
                    }`}
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mnk539/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? "text-ai-text-muted hover:text-ai-blue hover:bg-ai-blue/10"
                        : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
"""

pattern = r'(<Link\s+href="#contact".*?Get in Touch\s+</Link>)'
replacement = r'\1' + '\n' + social_buttons

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(new_content)

print("Social links added.")
