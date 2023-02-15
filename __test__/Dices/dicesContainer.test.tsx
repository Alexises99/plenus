import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DicesContainer from '@/components/Dices/DicesContainer'
import { dicesTestData } from './dice.data'
import { getSquareColor } from '@/utils/colors'

describe('Dices Container', () => {
  it('Renders pair of dices', () => {
    const [dice] = dicesTestData
    const { diceColor, diceNumber } = dice
    render(
      <DicesContainer
        activeDice
        selectedDice={-1}
        dices={[dice]}
        handleSelectedDice={jest.fn()}
        restMovements={0}
        rollDices={jest.fn}
      />
    )

    const renderedNumber = screen.getByText(diceNumber)
    const renderedColor = screen.getByTestId('dice-color')

    expect(renderedNumber).toBeInTheDocument()
    expect(renderedColor).toBeInTheDocument()
    expect(renderedColor.className).toContain(getSquareColor(diceColor))
  })

  it('Renders two pair of dices', () => {
    const [dice_1, dice_2] = dicesTestData
    const { diceColor: dice_1Color, diceNumber: dice_1Number } = dice_1
    const { diceColor: dice_2Color, diceNumber: dice_2Number } = dice_2

    render(
      <DicesContainer
        activeDice
        selectedDice={-1}
        dices={dicesTestData}
        handleSelectedDice={jest.fn()}
        restMovements={0}
        rollDices={jest.fn}
      />
    )

    const renderedNumberDice1 = screen.getByText(dice_1Number)
    const renderedNumberDice2 = screen.getByText(dice_2Number)

    const renderedColors = screen.getAllByTestId('dice-color')

    expect(renderedNumberDice1).toBeInTheDocument()
    expect(renderedNumberDice2).toBeInTheDocument()
    expect(renderedColors).toHaveLength(2)
    expect(renderedColors.at(0)?.className).toContain(
      getSquareColor(dice_1Color)
    )
    expect(renderedColors.at(1)?.className).toContain(
      getSquareColor(dice_2Color)
    )
  })

  it('Shows correct restMovements', () => {
    render(
      <DicesContainer
        activeDice={false}
        selectedDice={-1}
        dices={dicesTestData}
        handleSelectedDice={jest.fn()}
        restMovements={2}
        rollDices={jest.fn}
      />
    )

    const restMovementsElement = screen.getByRole('status')
    expect(restMovementsElement).toHaveTextContent('2')
  })
})
