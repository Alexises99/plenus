import { SquareColor } from '@/types';

const tailwindColorsSquare: Record<SquareColor, string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500'
};

export function getSquareColor(color: SquareColor) {
  return tailwindColorsSquare[color];
}
