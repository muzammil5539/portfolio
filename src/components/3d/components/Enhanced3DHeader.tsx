"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../hooks/use3d-animations';
import { useReducedMotion, useKeyboardNavigation } from '../hooks/useAccessibility';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

function ParticleTrail({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          initial={{ 
            x: Math.random() * 100, 
            y: Math.random() * 20,
            scale: 0 
          }}
          animate={{ 
            x: Math.random() * 100, 
            y: Math.random() * 20,
            scale: [0, 1, 0] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            delay: i * 0.2 
          }}
        />
      ))}
    </motion.div>
  );
}

function Enhanced3DNavItem({ item, isActive, onClick }: {
  item: { name: string; href: string };
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={item.href}
        onClick={onClick}
        className={`
          relative block px-4 py-2 text-sm font-medium transition-all duration-300
          ${isActive 
            ? 'text-blue-600' 
            : 'text-gray-700 hover:text-blue-600'
          }
        `}
      >
        {/* 3D Background Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0"
          animate={{ 
            opacity: isHovered || isActive ? 0.1 : 0,
            scale: isHovered ? 1.05 : 1,
            rotateX: isHovered ? 5 : 0,
            rotateY: isHovered ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        
        {/* Text with 3D effect */}
        <motion.span
          className="relative z-10"
          animate={{ 
            y: isHovered ? -1 : 0,
            textShadow: isHovered ? '0 2px 4px rgba(0,0,0,0.1)' : '0 0 0 rgba(0,0,0,0)'
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {item.name}
        </motion.span>
        
        {/* Particle Trail Effect */}
        <ParticleTrail isActive={isHovered} />
        
        {/* Active Indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-1/2 w-8 h-0.5 bg-blue-600 rounded-full"
              initial={{ scaleX: 0, x: '-50%' }}
              animate={{ scaleX: 1, x: '-50%' }}
              exit={{ scaleX: 0, x: '-50%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </AnimatePresence>
      </Link>
    </motion.li>
  );
}

export default function Enhanced3DHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const prefersReducedMotion = useReducedMotion();
  
  useKeyboardNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['about', 'projects', 'experience', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      {!prefersReducedMotion && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
          style={{ scaleX: scrollProgress }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress }}
        />
      )}
      
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/20' 
            : 'bg-white/50 backdrop-blur-sm'
          }
        `}
        initial={prefersReducedMotion ? {} : { y: -100 }}
        animate={prefersReducedMotion ? {} : { y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        role="banner"
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with 3D effect */}
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
                  animate={{ 
                    rotateX: isScrolled ? 0 : 10,
                    rotateY: isScrolled ? 0 : -10,
                    boxShadow: isScrolled 
                      ? '0 4px 20px rgba(0,0,0,0.1)'
                      : '0 10px 40px rgba(0,0,0,0.2)'
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="text-white font-bold text-lg">M</span>
                </motion.div>
                <div>
                  <motion.h1 
                    className="text-xl font-bold text-gray-900"
                    animate={{ 
                      y: isScrolled ? 0 : 2,
                      textShadow: isScrolled 
                        ? '0 0 0 rgba(0,0,0,0)'
                        : '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    Muzammil Nawaz Khan
                  </motion.h1>
                  <motion.p 
                    className="text-sm text-gray-600"
                    animate={{ opacity: isScrolled ? 0.7 : 1 }}
                  >
                    Computer Engineering Graduate
                  </motion.p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ul className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <Enhanced3DNavItem
                    key={item.name}
                    item={item}
                    isActive={activeSection === item.href.slice(1)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
                <motion.li
                  whileHover={{ scale: 1.05, rotateX: 5 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Link
                    href="/certification-journey"
                    className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Certifications
                  </Link>
                </motion.li>
              </ul>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                className="w-6 h-0.5 bg-current mb-1"
                animate={{ 
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0 
                }}
              />
              <motion.div
                className="w-6 h-0.5 bg-current mb-1"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-current"
                animate={{ 
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0 
                }}
              />
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="md:hidden mt-4 p-4 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200/20"
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`
                          block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${activeSection === item.href.slice(1)
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                          }
                        `}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <Link
                      href="/certification-journey"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium text-center"
                    >
                      Certifications
                    </Link>
                  </motion.li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}