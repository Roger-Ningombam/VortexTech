import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Linkedin, Twitter, Facebook, Send, Mail, Phone } from 'lucide-react'
import CTAButton from './UI/CTAButton'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const sectionRef = useRef()
  const titleRef = useRef()
  const formRef = useRef()

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

      // Form animation
      gsap.fromTo('.contact-form > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Social links animation
      gsap.fromTo('.social-links > *',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.social-links',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000)
    }, 2000)
  }

  const socialLinks = [
    { 
      icon: Instagram, 
      label: 'Instagram', 
      href: '#',
      color: 'hover:text-pink-500'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      href: '#',
      color: 'hover:text-blue-500'
    },
    { 
      icon: Twitter, 
      label: 'Twitter/X', 
      href: '#',
      color: 'hover:text-sky-500'
    },
    { 
      icon: Facebook, 
      label: 'Facebook', 
      href: '#',
      color: 'hover:text-blue-600'
    }
  ]

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-vortex-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-vortex-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-vortex-orange to-vortex-blue mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your vision into reality? Let's start a conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="contact-form">
            <div className="glass-morphism rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send us a message
              </h3>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
                >
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-vortex-orange font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-vortex-orange focus:ring-1 focus:ring-vortex-orange transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-vortex-orange font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-vortex-orange focus:ring-1 focus:ring-vortex-orange transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-vortex-orange font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-vortex-orange focus:ring-1 focus:ring-vortex-orange transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <CTAButton
                  text={isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  variant="orange"
                  disabled={isSubmitting}
                  className="w-full justify-center"
                />
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className="glass-morphism rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Direct Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-vortex-orange/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-vortex-orange" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-semibold">hello@vortextech.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-vortex-blue/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-vortex-blue" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-semibold">+91 XXX XXX XXXX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-morphism rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Follow Us
              </h3>
              <div className="social-links grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group ${social.color}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <social.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="glass-morphism rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Office Hours
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-vortex-orange">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-vortex-blue">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-white/10 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Vortex Tech. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact