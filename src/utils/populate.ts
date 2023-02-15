export function toLetters(num: number): string {
  let mod = num % 26,
    pow = (num / 26) | 0,
    out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z')
  return pow ? toLetters(pow) + out : out
}
