import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectsData } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [index])

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="glass-morphism rounded-2xl p-6 h-full border-2 border-transparent hover:border-vortex-blue/50 transition-all duration-500 overflow-hidden relative">
        {/* Animated blue stripe border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-2xl border-2 border-vortex-blue stripe-animation">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-vortex-blue/20 to-transparent animate-stripe-move"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-4">
            <div className="w-full h-48 rounded-xl mb-6 overflow-hidden">
            <img 
                src={project.image} 
                alt={`Screenshot of the ${project.title} project`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            </div>

          {/* Project Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-white group-hover:text-vortex-blue transition-colors duration-300">
                {project.title}
              </h3>
              <span className="text-xs px-3 py-1 bg-vortex-orange/20 text-vortex-orange rounded-full">
                {project.category}
              </span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              {project.description}
            </p>

            {/* Quote */}
            <blockquote className="border-l-2 border-vortex-blue pl-4 italic text-vortex-blue text-sm">
              "{project.quote}"
            </blockquote>

            {/* Technologies */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-400">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="text-xs px-2 py-1 bg-white/10 rounded-md text-gray-300 hover:bg-vortex-blue/20 hover:text-vortex-blue transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-vortex-blue/5 blur-xl"></div>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const sectionRef = useRef()
  const titleRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className=" scroll-target min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-vortex-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-vortex-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-vortex-orange to-vortex-blue mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our most innovative and groundbreaking solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6">
            Interested in collaborating on the next breakthrough project?
          </p>
          <motion.button
            onClick={() => {
              const contactSection = document.querySelector('#contact')
              if (contactSection) {
                contactSection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                })
              }
            }}
            className="px-8 py-3 bg-transparent border-2 border-vortex-blue text-white font-semibold rounded-lg hover:bg-vortex-blue/10 hover:scale-105 transition-all duration-300 stripe-animation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Let's Build Something Amazing
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects