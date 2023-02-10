import { ReactNode } from 'react'

interface DiceProps {
  children: ReactNode
  active?: boolean
}

export default function Dice({ active = false, children }: DiceProps) {
  if (active) {
    return (
      <div className="border-2 rounded-full w-20 h-20 flex justify-center items-center cursor-pointer bg-green-400">
        <span className="text-3xl font-bold text-white flex justify-center items-center bg-green-400">
          {children}
        </span>
      </div>
    )
  } else {
    return (
      <div className="border-2 rounded-full w-20 h-20 flex justify-center items-center cursor-pointer">
        <span className="text-3xl font-bold text-white flex justify-center items-center">
          {children}
        </span>
      </div>
    )
  }
}
