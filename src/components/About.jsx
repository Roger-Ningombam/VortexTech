import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef()
  const titleRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Content stagger animation
      gsap.fromTo('.about-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="scroll-target min-h-screen py-20 relative overflow-hidden"
      style={{
    backgroundImage: `
        radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 10%),
        radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 10%)
    `,
    backgroundRepeat: 'no-repeat'
}}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-vortex-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-vortex-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            About Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-vortex-orange to-vortex-blue mx-auto"></div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center about-content">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Philosophy Container */}
            <div className="glass-morphism rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-vortex-orange mb-6">
                THE VORTEX PHILOSOPHY
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                At VortexTech, we believe in the symbiotic relationship between human ingenuity and artificial intelligence. We are creators of innovative experiences that transcend traditional boundaries, where cutting-edge technology meets transformative vision.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Our mission is to be at the forefront of digital transformation, continuously pushing the boundaries of what's possible in the realms of AI, quantum computing, and immersive technologies.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We are a collective of visionary developers, designers, and innovators committed to excellence, sustainability, and responsible innovation for our clients and the world.
              </p>
            </div>

            {/* Photo Container */}
            <div className="glass-morphism rounded-2xl p-4 overflow-hidden">
              <img 
                src="/src/assets/vortex-img.png" 
                alt="VortexTech Team or Office" 
                className="w-full h-64 object-cover rounded-lg"
                placeholder="Add your photo here - could be team photo, office space, or technology showcase"
              />
              {/* Optional caption */}
              <div className="text-center mt-4 text-sm text-gray-400">
                Combining the creativity of human with the speed of AI
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="glass-morphism rounded-2xl p-8">
              <p className="text-gray-300 leading-relaxed mb-8">
                Our approach is rooted in deep collaboration and a seasoned understanding. We harmonize human creativity with artificial intelligence, creating experiences that redefine industries and transform lives.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-vortex-orange mb-2">500+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-vortex-blue mb-2">50+</div>
                  <div className="text-sm text-gray-400">Global Clients</div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-vortex-orange mb-2">99%</div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-vortex-blue mb-2">24/7</div>
                  <div className="text-sm text-gray-400">Support Available</div>
                </div>
              </div>
            </div>

            {/* Technology Showcase */}
            <div className="glass-morphism rounded-2xl p-8">
              <h4 className="text-xl font-semibold text-vortex-blue mb-4">
                Technologies We Master
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  'Artificial Intelligence',
                  'Quantum Computing', 
                  'Blockchain',
                  'IoT Solutions',
                  'Cloud Architecture',
                  'Machine Learning',
                  '3D Visualization',
                  'AR/VR Development'
                ].map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20 hover:border-vortex-orange/50 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About