import { GameContainer } from '@/components/GameContainer'

export default function Home() {
  return (
    <main className="bg-zinc-900 h-screen flex flex-col justify-center md:flex-row">
      <GameContainer />
    </main>
  )
}
