import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // In Navbar.jsx, replace your old function with this one

const scrollToSection = (href) => {
  const element = document.querySelector(href);
  if (element) {
    // 1. Get the navbar's height
    const navHeight = navRef.current ? navRef.current.offsetHeight : 0;
    
    // 2. Calculate the element's position from the top of the page
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    
    // 3. Calculate the final position, subtracting the navbar's height
    const offsetPosition = elementPosition - navHeight;

    // 4. Tell the browser to scroll to that exact spot
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  
  // Notice we have completely removed the setIsMobileMenuOpen() line.
  // The menu will now stay open until the user closes it.
};

  return (
    <motion.nav ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'h-16 bg-glass-black backdrop-blur-lg border-b border-white/10' 
          : 'h-20 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            
            <span className="text-xl font-bold">VortexTech</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative text-white hover:text-vortex-orange transition-colors duration-300 group"
                whileHover={{ scale: 1.05 }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vortex-orange transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-vortex-orange transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-glass-black backdrop-blur-lg border-b border-white/10 overflow-hidden"
      >
        <div className="px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left text-white hover:text-vortex-orange transition-colors duration-300"
            >
              {item.name}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar