import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSwipeable } from 'react-swipeable'
import { servicesData } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(2) // Start with center card
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [cardSpacing, setCardSpacing] = useState(300)
  const sectionRef = useRef()
  const carouselRef = useRef()
  const [direction, setDirection] = useState(0);



  // GSAP scroll animations
  useEffect(() => {
    const updateSpacing = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setCardSpacing(260);        
      } else if (width >= 1024){
        setCardSpacing(240);
      } else if (width >= 768){
        setCardSpacing(280);
      } else {
        setCardSpacing(220);
      }
    };

    updateSpacing(); // Set the initial spacing on load
    window.addEventListener('resize', updateSpacing);

    const ctx = gsap.context(() => {
      gsap.fromTo('.services-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '.services-title',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    },
    
    sectionRef)
    
    return () => {
      window.removeEventListener('resize', updateSpacing);
      ctx.revert()}
  }, [])

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
      onSwipedLeft: () => navigate((currentIndex + 1)),
      onSwipedRight: () => navigate((currentIndex - 1)),
      trackMouse: true
  })

  const getCardPosition = (index) => {
    const diff = index - currentIndex
    const totalCards = servicesData.length
    
    // Normalize diff to handle circular array
    let normalizedDiff = diff
    if (Math.abs(diff) > totalCards / 2) {
      normalizedDiff = diff > 0 ? diff - totalCards : diff + totalCards
    }
    
    return normalizedDiff
  }

  const navigate = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    
    // This is the fix: it wraps the index around
    const newIndex = (index + servicesData.length) % servicesData.length;
    
    setCurrentIndex(newIndex);
};
  const cardVariants = {
  // This defines the card's position when it's visible on screen
  animate: (custom) => ({
      x: custom.position * cardSpacing,
      scale: custom.isCenter ? 1.1 : 0.8,
      rotateY: custom.position * 15,
      opacity: custom.isCenter ? 1 : 0.6,
      y: custom.isCenter ? -20 : 0,
      zIndex: 5 - Math.abs(custom.position), // This is fine for visible cards
      transition: { type: "spring", stiffness: 400, damping: 50 }
  }),
  // This is where the card goes when it leaves the screen
  exit: (custom) => ({
      x: custom.direction > 0 ? -500 : 500, // Moves off-screen
      opacity: 0,
      scale: 0.8,
      zIndex: 10, // <--- THIS IS THE FIX. Add this line.
      transition: { duration: 0.2 }
  })
};
  return (
    <section 
      id="services" 
      ref={sectionRef}
      className=" scroll-target min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-20 w-80 h-80 bg-vortex-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-20 w-96 h-96 bg-vortex-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16 services-title">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-vortex-orange to-vortex-blue mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge solutions designed to propel your business into the future
          </p>
        </div>

        {/* 3D Rotating Carousel */}
        <div 
          ref={carouselRef}
          {...swipeHandlers}
          className="carousel-container relative h-80 md:h-[500px] perspective-1000"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence>
              {servicesData.map((service, index) => {
                const position = getCardPosition(index)
                const isCenter = position === 0
                const isVisible = Math.abs(position) <= 2
                
                if (!isVisible) return null

                return (
                  <motion.div
                      key={service.id}
                      className="services-card absolute w-40 h-60 md:w-80 md:h-96 cursor-pointer"
                      custom={{ 
                          position: position, 
                          isCenter: isCenter,
                          direction 
                      }}
                      variants={cardVariants}
                      animate="animate"
                      exit="exit"
                      onClick={() => navigate(index)}
                      whileHover={{ 
                          scale: isCenter ? 1.15 : 0.85,
                          y: isCenter ? -10 : -5
                      }}
                  >
                    <div className={`glass-morphism rounded-2xl p-4 md:p-6 h-full border-2 transition-all duration-300 ${
                      isCenter 
                        ? 'border-vortex-orange shadow-lg shadow-vortex-orange/20' 
                        : 'border-white/10 hover:border-vortex-blue/50'
                    }`}>
                      <div className="text-center space-y-2 md:space-y-4">
                        <div className="text-3xl md:text-4xl mb-2 md:mb-4">{service.icon}</div>
                        <h3 className={`text-lg md:text-xl font-bold ${
                          isCenter ? 'text-vortex-orange' : 'text-white'
                        }`}>
                          {service.title}
                        </h3>
                        <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {service.features.map((feature, idx) => (
                            <div 
                              key={idx}
                              className="text-[10px] px-2 py-0.5 md:text-xs md:px-3 md:py-1 bg-white/10 rounded-full text-gray-400"
                            >
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center space-x-6 mt-12">
          {/* Carousel Indicators */}
          <div className="flex space-x-2">
            {servicesData.map((_, index) => (
              <button
                key={index}
                onClick={() => navigate(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-vortex-orange scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services