import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import CTAButton from './UI/CTAButton'

const Hero = () => {
  const vortexRef = useRef(null) // Add null initialization

  // Slow forward spinning animation
  useEffect(() => {
    const vortexElement = vortexRef.current
    if (!vortexElement) {
      console.log('Vortex element not found')
      return
    }

    console.log('Starting slow vortex animation')
    let animationId
    let rotation = 0

    const animate = () => {
      rotation += 0.5 // Very slow forward rotation
      
      vortexElement.style.transform = `rotate(${rotation}deg)`
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      console.log('Cleaning up vortex animation')
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  const textVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  return (
    <section id="home" className="scroll-target relative h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
    style={{
        backgroundImage: `
            radial-gradient(circle at 0% 100%, rgba(255, 255, 255, 0.15) 0%, transparent 10%),
            radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.15) 0%, transparent 10%)
        `,
        backgroundRepeat: 'no-repeat'
    }}>
      {/* Gradient Light from Vortex Center */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[900px] md:h-[900px]"
          style={{
            background: 'radial-gradient(circle, rgba(231, 35, 35, 0.29) 0%, rgba(189, 188, 236, 0.58) 30%, rgba(74, 15, 193, 0.28) 60%, transparent 100%)',
            filter: 'blur(40px)'
          }}
        />
      </div>

      {/* Large Background Vortex - Enhanced */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <img
          ref={vortexRef}
          src="Votex_model.png"
          alt="Vortex Model"
          className="w-[900px] h-[900px] md:w-[1200px] md:h-[1200px] md:w-[1600px] md:h-[1600px] object-contain opacity-75"
          style={{
            filter: 'contrast(1.5) brightness(3) sharpness(1.5)',
            transformOrigin: 'center center',
            willChange: 'transform' // Optimize for animations
          }}
          onLoad={() => console.log('Vortex image loaded')} // Debug log
          onError={() => console.error('Vortex image failed to load')} // Debug log
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Main Headlines - Centered at top with mobile adjustments */}
          <div className="text-center mb-6 sm:mb-8 md:mb-1 mt-8 sm:mt-12 md:mt-0">
            <motion.h1
              variants={textVariants}
              className="hero-title text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2 sm:mb-3 md:mb-4 mx-2 sm:mx-4 md:mx-0"
              style={{
                background: 'linear-gradient(45deg, #3B82F6, #EF4444, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease-in-out infinite'
              }}
            >
              Pioneering the Digital Frontier.
            </motion.h1>
            
            <motion.p
              variants={textVariants}
              className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mx-2 sm:mx-4 md:mx-0"
            >
              Experience Innovation at Warp Speed.
            </motion.p>
          </div>

          {/* Main Content Area with Vortex and Side Text */}
          <div className="relative flex flex-col sm:flex-col md:flex-row items-center justify-between space-y-4 sm:space-y-6 md:space-y-0 mt-6 sm:mt-8 md:mt-0">
            {/* Left Content */}
            <motion.div
              variants={textVariants}
              className="w-full sm:w-full md:w-1/3 px-2 sm:px-4 md:pr-8 z-20 relative order-2 md:order-1"
            >
              <div className="relative p-3 sm:p-4 md:p-6 bg-gradient-to-r from-blue-600/20 to-transparent border-l-2 sm:border-l-3 md:border-l-4 border-blue-500 backdrop-blur-sm rounded-r-lg mx-2 sm:mx-3 md:mx-0">
                <p className="text-sm sm:text-base md:text-2xl text-white leading-relaxed text-left sm:text-left md:text-left font-medium">
                  Redefining possibilities with <span className="text-blue-400 font-bold">cutting-edge AI</span>, immersive experiences, and scalable software solutions.
                </p>
                <div className="absolute inset-0 bg-blue-500/10 rounded-r-lg animate-pulse"></div>
              </div>
            </motion.div>

            {/* Center Vortex Image */}
            <div className="w-full sm:w-full md:w-1/3 flex justify-center items-center relative z-10 order-1 md:order-2">
              {/* Small visible vortex for layout reference */}
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px] opacity-0">
                {/* Invisible placeholder to maintain layout */}
              </div>
            </div>

            {/* Right Content */}
            <motion.div
              variants={textVariants}
              className="w-full sm:w-full md:w-1/3 px-2 sm:px-4 md:pl-8 z-20 relative order-3 md:order-3"
            >
              <div className="relative p-3 sm:p-4 md:p-6 bg-gradient-to-l from-red-600/20 to-transparent border-r-2 sm:border-r-3 md:border-r-4 border-red-500 backdrop-blur-sm rounded-l-lg mx-2 sm:mx-3 md:mx-0">
                <p className="text-sm sm:text-base md:text-2xl text-white leading-relaxed text-right sm:text-right md:text-right font-medium break-words hyphens-auto">
                  This is where <span className="text-red-400 font-bold">groundbreaking ideas</span> meet flawless execution for transformative, real-world results.
                </p>
                <div className="absolute inset-0 bg-red-500/10 rounded-l-lg animate-pulse"></div>
              </div>
            </motion.div>
          </div>

          {/* CTA Button - Centered below with mobile spacing */}
          <div className="relative w-full flex justify-center mt-6 sm:mt-8 md:mt-0">
            <motion.div
              variants={textVariants}
              className="relative md:absolute bottom-0 md:bottom-[1px] z-30"
            >
              <CTAButton
                text="DISCOVER OUR SERVICES"
                onClick={() => {
                  const servicesSection = document.querySelector('#services')
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg"
              />
            </motion.div>
          </div>

        </motion.div>
      </div>

    </section>
  )
}

export default Hero