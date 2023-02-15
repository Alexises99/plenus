import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Dice from '@/components/Dices/Dice'

// const dice: DiceData = {
//   diceColor: 'red',
//   diceNumber: 2
// }

const testNumber = 1

describe('Dice', () => {
  it('renders something', () => {
    render(<Dice active>{testNumber}</Dice>)

    const number = screen.getByText(testNumber)

    expect(number).toBeInTheDocument()
  })

  it('renders dice unchanged', () => {
    const { container } = render(<Dice active>{testNumber}</Dice>)
    expect(container).toMatchSnapshot()
  })
})
