import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DicePair } from '@/components/Dices/DicesPair'
import { dicesTestData } from './dice.data'
import { getSquareColor } from '@/utils/colors'

describe('Dice Pair', () => {
  const [dice] = dicesTestData
  const { diceColor, diceNumber } = dice

  it('renders correct color and number', () => {
    render(<DicePair dice={dice} activeDice handleSelectedDice={jest.fn()} />)

    const renderedNumber = screen.getByText(diceNumber)
    const renderedColor = screen.getByTestId('dice-color')

    expect(renderedNumber).toBeInTheDocument()
    expect(renderedColor).toBeInTheDocument()
    expect(renderedColor.className).toContain(getSquareColor(diceColor))
  })

  it('clic on dice-pair calls selectDice', () => {
    const mockSelectDice = jest.fn()

    render(
      <DicePair dice={dice} activeDice handleSelectedDice={mockSelectDice} />
    )

    const parent = screen.getByTestId('dice-pair')
    fireEvent.click(parent)

    expect(mockSelectDice.mock.calls).toHaveLength(1)
  })
})
