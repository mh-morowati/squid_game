"use client"
import { useMarbleGameStore } from "@/store/marbleGameStore"
import { Button } from "@heroui/button"
import { useState } from "react"
import Finish from "./Finish"


const LevelTwo = () => {

 const {
    playerMarbles,
    computerMarbles,
    phase,
    message,
    updateState,
  } = useMarbleGameStore()

  const [guessParity, setGuessParity] = useState<"زوج" | "فرد">("زوج")
  const [guessAmount, setGuessAmount] = useState(1)
  const [playerHide, setPlayerHide] = useState(1)

  // 🧠 Player guesses computer’s hand (corrected logic)
  const handlePlayerGuess = () => {
    const compHidden = Math.floor(Math.random() * Math.min(computerMarbles, 5)) + 1
    const parity = compHidden % 2 === 0 ? "زوج" : "فرد"
    const correct = guessParity === parity

    let newPlayer = playerMarbles
    let newComputer = computerMarbles

    if (correct) {
      newPlayer += guessAmount
      newComputer -= guessAmount
    } else {
      newPlayer -= guessAmount
      newComputer += guessAmount
    }

    const gameOver = newPlayer <= 0 || newComputer <= 0

    updateState({
      playerMarbles: newPlayer,
      computerMarbles: newComputer,
      phase: gameOver ? "game-over" : "computer-guess",
      isGameOver: gameOver,
      message: correct
        ? `شما درست حدس زدید و ${guessAmount}تیله از حریف برنده شدید✅`
        : `شما اشتباه حدس زدید و ${guessAmount} تیله به حریف باختید❌`,
    })

    setGuessAmount(1)
  }

  // 🤖 Computer guesses player's hand (corrected logic)
  const handleComputerGuess = () => {
    const compGuess: "زوج" | "فرد" = Math.random() > 0.5 ? "زوج" : "فرد"
    const compBet = Math.floor(Math.random() * Math.min(computerMarbles, 5)) + 1
    const parity = playerHide % 2 === 0 ? "زوج" : "فرد"
    const correct = compGuess === parity

    let newPlayer = playerMarbles
    let newComputer = computerMarbles

    if (correct) {
      newComputer += compBet
      newPlayer -= compBet
    } else {
      newComputer -= compBet
      newPlayer += compBet
    }

    const gameOver = newPlayer <= 0 || newComputer <= 0

    updateState({
      playerMarbles: newPlayer,
      computerMarbles: newComputer,
      phase: gameOver ? "game-over" : "player-guess",
      isGameOver: gameOver,
      message: correct
        ? `حریف به درستی ${compGuess} حدس زد و ${compBet} تیله از شما برنده شد🤖`
        : ` حریف ${compGuess} حدس زد و ${compBet}  تیله به شما باخت 🤖`,
    })

    setPlayerHide(1)
    }
    
    return (<div className="bg-violet-300 h-[100vh] w-[100vw] absolute">
        <div
            className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl text-center"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                🎱 Marble Game
            </h2>

        <div className="flex justify-between mb-4 text-lg font-medium">
                <span className="text-blue-600 dark:text-blue-300">
                    شما: {Math.min(Math.max(0, playerMarbles), 20)}
          </span>
                <span className="text-red-600 dark:text-red-300">
                    حریف: {Math.min(Math.max(0, computerMarbles), 20)}
          </span>
        </div>

        <p className="mb-4 text-gray-700 dark:text-gray-200">{message}</p>

        {phase === "game-over" ? (
         <Finish/>
        ) : phase === "player-guess" ? (
          <>
            <label className="block mb-1">چه تعداد تیله شرط میذارید💭</label>
              <div className="flex justify-center gap-3 mb-4">
  {Array.from({ length: 5 }, (_, i) => {
    const count = i + 1
    const isActive = count <= guessAmount

    return (
      <div
        key={count}
        onClick={() => count <= playerMarbles && setGuessAmount(count)}
        className={`w-10 h-10 rounded-full cursor-pointer transition duration-200 ${
          isActive ? 'bg-blue-600 scale-105 shadow-md' : 'bg-blue-200'
        }`}
        title={`تیله${count}`}
      />
    )
  })}
</div>

            <label className="block mb-1">حدس بزنید دست حریف🤔</label>
            <div className="flex justify-center gap-4 mb-4">
              <Button
                onClick={() => setGuessParity("فرد")}
                className={guessParity === "فرد" ? "bg-blue-600" : ""}
              >
                فرد
              </Button>
              <Button
                onClick={() => setGuessParity("زوج")}
                className={guessParity === "زوج" ? "bg-blue-600" : ""}
              >
                زوج
              </Button>
            </div>

            <Button onClick={handlePlayerGuess}>Submit Guess</Button>
          </>
        ) : (
          <>
            <label className="block mb-1">چه تعداد تیله مخفی میکنی🙈</label>
                   <div className="flex justify-center gap-3 mb-4">
  {Array.from({ length: 5 }, (_, i) => {
    const count = i + 1
    const isActive = count <= playerHide

    return (
      <div
        key={count}
        onClick={() => count <= playerMarbles && setPlayerHide(count)}
        className={`w-10 h-10 rounded-full cursor-pointer transition duration-200 ${
          isActive ? 'bg-blue-600 scale-105 shadow-md' : 'bg-blue-200'
        }`}
        title={`${count}تیله`}
      />
    )
  })}
</div>


            <Button onClick={handleComputerGuess}>Confirm Hide</Button>
          </>
        )}
      </div>
            </div>)
}

export default LevelTwo
