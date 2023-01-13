import { SquareColor } from '@/types';
import { getSquareColor } from '@/utils/colors';

interface SquareProps {
  color: SquareColor;
  star?: boolean;
}

export default function Square({ color, star }: SquareProps) {
  const realColor = getSquareColor(color);
  return (
    <div className={`aspect-square rounded-md ${getSquareColor(color)}`}></div>
  );
}
