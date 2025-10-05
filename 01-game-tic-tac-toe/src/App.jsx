import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti';
import { WinnerModal } from './components/WinnerModal'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinner, checkEndGame } from './utils/utils'
import { saveGameToStorage, resetGameStorage } from './logic/storage'
import './App.css'

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // no actualizar si ya hay algo
    if (board[index] || winner) return

    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Guardar partida
    saveGameToStorage({ board: newBoard, turn: newTurn })

    // revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti() // efecto de confeti
      setWinner(newWinner) // update state asynchronous
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  useEffect(() => {
    console.log('cambio el tablero')
  }, [board, winner, turn])

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <button className='clsButton' onClick={resetGame}>
        Reiniciar el juego
      </button>
      <section>
        <WinnerModal winner={winner} resetGame={resetGame} />
      </section>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square 
                key={index} 
                index={index}
                udpateBoard={updateBoard} >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
    </main>
  )
}

export default App
