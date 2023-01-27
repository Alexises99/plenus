import { GameBoard } from '@/components/GameBoard/GameBoard'

export default function Home() {
  return (
    <main className="bg-slate-800 w-screen h-screen flex flex-col">
      <GameBoard />
    </main>
  )
}
