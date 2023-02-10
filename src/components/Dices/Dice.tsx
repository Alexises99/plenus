import { ReactNode } from 'react'

interface DiceProps {
  children: ReactNode
  active: boolean
}

export default function Dice({ active, children }: DiceProps) {
  return (
    <div
      className={`border-2 rounded-full w-20 h-20 flex justify-center items-center cursor-pointer ${
        active && 'border-green-400'
      }`}
    >
      <span
        className={`text-3xl font-bold text-white flex justify-center items-center ${
          active && 'text-green-400'
        }`}
      >
        {children}
      </span>
    </div>
  )
}
