'use client'

import { useState } from 'react'
import { motion, PanInfo } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

interface Pet {
  id: string
  name: string
  breed: string
  age: number
  gender: string
  preferences: string[]
  personality: string
  images: string[]
  location: string
  owner: string
}

interface SwipeCardProps {
  pet: Pet
  onSwipe: (direction: 'left' | 'right', petId: string) => void
  isTop: boolean
  isLoading: boolean
}

const SwipeCard = ({ pet, onSwipe, isTop, isLoading }: SwipeCardProps) => {
  const [exitX, setExitX] = useState(0)

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100
    
    if (info.offset.x > threshold) {
      setExitX(1000)
      onSwipe('right', pet.id)
    } else if (info.offset.x < -threshold) {
      setExitX(-1000)
      onSwipe('left', pet.id)
    }
  }

  const getPreferenceColor = (preference: string) => {
    switch (preference) {
      case 'playdate':
        return 'bg-blue-100 text-blue-800'
      case 'adoption':
        return 'bg-green-100 text-green-800'
      case 'breeding':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      className={`absolute inset-0 bg-white rounded-2xl shadow-lg overflow-hidden cursor-grab active:cursor-grabbing ${
        isTop ? 'z-20' : 'z-10'
      }`}
      drag={isTop && !isLoading ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileDrag={{ rotate: exitX > 0 ? 10 : exitX < 0 ? -10 : 0 }}
      style={{
        scale: isTop ? 1 : 0.95,
        opacity: isTop ? 1 : 0.8,
      }}
    >
      <div className="relative h-full">
        {/* Pet Image */}
        <div className="relative h-2/3">
          <Image
            src={pet.images[0]}
            alt={pet.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          
          {/* Swipe indicators */}
          <motion.div
            className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg opacity-0"
            animate={{ opacity: exitX > 50 ? 1 : 0 }}
          >
            LIKE
          </motion.div>
          <motion.div
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg opacity-0"
            animate={{ opacity: exitX < -50 ? 1 : 0 }}
          >
            PASS
          </motion.div>
        </div>

        {/* Pet Info */}
        <div className="p-4 h-1/3 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">{pet.name}</h3>
            <span className="text-gray-600">{pet.age} years</span>
          </div>
          
          <p className="text-gray-700 mb-2">{pet.breed} • {pet.gender}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {pet.preferences.map((pref) => (
              <Badge
                key={pref}
                variant="secondary"
                className={getPreferenceColor(pref)}
              >
                {pref}
              </Badge>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {pet.personality}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{pet.location}</span>
            <span>Owner: {pet.owner}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SwipeCard
