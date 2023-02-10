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
    render(<Dice active children={testNumber} />)

    const number = screen.getByText(testNumber)

    expect(number).toBeInTheDocument()
  })

  it('renders dice unchanged', () => {
    const { container } = render(<Dice active children={testNumber} />)
    expect(container).toMatchSnapshot()
  })

  it('active dice renders background color', () => {
    const { container } = render(<Dice active children={testNumber} />)

    expect(container.getElementsByClassName('bg-green-400')).toHaveLength(2)
  })

  it('not active dice not renders background color', () => {
    const { container } = render(<Dice children={testNumber} />)

    expect(container.getElementsByClassName('bg-green-400')).toHaveLength(0)
  })
})
