import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    
    // Background gradient animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to('body', {
      background: 'radial-gradient(ellipse at top, #0f172a 0%, #000000 50%, #1e1b4b 100%)',
      duration: 10,
      ease: 'none'
    })
    .to('body', {
      background: 'radial-gradient(ellipse at bottom, #1e1b4b 0%, #000000 50%, #0f172a 100%)',
      duration: 10,
      ease: 'none'
    })

  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background particles/elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-vortex-orange rounded-full opacity-50 animate-ping"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-vortex-blue rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"></div>
      </div>
      
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </div>
  )
}

export default App