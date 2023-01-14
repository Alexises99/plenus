import { SquareColor } from '@/types';
import { getSquareColor } from '@/utils/colors';

export class Square {
  color: SquareColor;
  star?: boolean;
  center?: boolean;
  right: Square;
  left: Square;
  bottom: Square;
  top: Square;
  reveal: boolean;

  constructor({ bottom, color, left, right, top, center, star }: Square) {
    this.color = color;
    this.center = center;
    this.star = star;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.top = top;
    this.reveal = false;
  }

  get getColor() {
    return getSquareColor(this.color);
  }

  private checkNext() {}

  canReveal() {
    if (this.right.color === this.color && this.reveal) return true;
    if (this.left.color === this.color && this.reveal) return true;
    if (this.top.color === this.color && this.reveal) return true;
    if (this.bottom.color === this.color && this.reveal) return true;

    return false;
  }
}
