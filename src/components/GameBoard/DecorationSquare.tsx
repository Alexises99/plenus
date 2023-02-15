import { toLetters } from '@/utils/populate'
import { ReactNode } from 'react'

interface DecorationSquareProps {
  middle: boolean
  children: ReactNode
}

function DecorationSquare({ middle, children }: DecorationSquareProps) {
  return (
    <div className="aspect-square rounded-md bg-slate-50 justify-center items-center flex">
      <span
        className={`font-bold text-xl lg:text-3xl ${
          middle ? 'text-red-500' : 'text-black'
        }`}
      >
        {children}
      </span>
    </div>
  )
}

export default DecorationSquare
