import React from 'react'
import { motion } from 'framer-motion'

const CTAButton = ({ 
  text, 
  onClick, 
  className = '', 
  variant = 'orange',
  disabled = false 
}) => {
  const baseClasses = "relative px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg overflow-hidden group"
  
  const variantClasses = {
    orange: "bg-transparent border-2 border-vortex-orange hover:scale-105 hover:shadow-lg hover:shadow-vortex-orange/50",
    blue: "bg-transparent border-2 border-vortex-blue hover:scale-105 hover:shadow-lg hover:shadow-vortex-blue/50"
  }

  const stripeColor = variant === 'orange' ? 'vortex-orange' : 'vortex-blue'

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className} stripe-animation`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated stripe overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div 
          className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-stripe-move`}
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)`,
            animation: 'stripe-move 2s linear infinite'
          }}
        ></div>
      </div>
      
      {/* Button text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm bg-${stripeColor}/20`}
        style={{
          background: variant === 'orange' 
            ? 'rgba(255, 107, 53, 0.2)' 
            : 'rgba(79, 156, 249, 0.2)'
        }}
      ></div>
    </motion.button>
  )
}

export default CTAButton