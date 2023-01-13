import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import Square from '@/components/GameBoard/Square';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="bg-slate-800 w-screen h-screen flex justify-center items-center">
      <section className="w-3/4 max-w-5xl grid grid-cols-15 grid-rows-7 gap-1">
        <Square color="green" />
        <Square color="green" />
        <Square color="green" />
        <Square color="yellow" />
        <Square color="yellow" />
        <Square color="yellow" />
        <Square color="yellow" />
        <Square color="green" />
        <Square color="blue" />
        <Square color="blue" />
        <Square color="blue" />
        <Square color="orange" />
        <Square color="yellow" />
        <Square color="yellow" />
        <Square color="yellow" />
        <Square color="orange" />
      </section>
    </main>
  );
}
