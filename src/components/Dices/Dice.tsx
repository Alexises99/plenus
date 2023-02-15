import { ReactNode } from 'react'

interface DiceProps {
  children: ReactNode
  active?: boolean
}

export default function Dice({ active = false, children }: DiceProps) {
  if (active) {
    return (
      <div className="border-2 rounded-full aspect-square h-8 lg:h-20 flex justify-center items-center cursor-pointer">
        <span className="text-xl lg:text-3xl font-bold text-white flex justify-center items-center w-full">
          {children}
        </span>
      </div>
    )
  } else {
    return (
      <div className="border-2 rounded-full aspect-square h-12 lg:h-20 flex justify-center items-center cursor-pointer">
        <span className="text-xl lg:text-3xl font-bold text-white flex justify-center items-center w-full">
          {children}
        </span>
      </div>
    )
  }
}
