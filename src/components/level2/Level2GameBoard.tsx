"use client";

import { useState } from "react";
import { useMarbleGameStore } from "@/store/marbleGameStore";
import { Button } from "@heroui/button";
import PlayGround from "./PlayGround";

const GameBoard = () => {
  const {
    playerMarbles,
    computerMarbles,
    phase,
    message,
    isGameOver,
    updateState,
    resetGame,
  } = useMarbleGameStore();

  const [guessParity, setGuessParity] = useState<"even" | "odd">("even");
  const [guessAmount, setGuessAmount] = useState(1);
  const [playerHide, setPlayerHide] = useState(1);

  // 🧠 Player guesses computer’s hand (corrected logic)
  const handlePlayerGuess = () => {
    const compHidden = Math.floor(Math.random() * Math.min(computerMarbles, 5)) + 1;
    const parity = compHidden % 2 === 0 ? "even" : "odd";
    const correct = guessParity === parity;

    let newPlayer = playerMarbles;
    let newComputer = computerMarbles;

    if (correct) {
      newPlayer += guessAmount;
      newComputer -= guessAmount;
    } else {
      newPlayer -= compHidden;
      newComputer += compHidden;
    }

    const gameOver = newPlayer <= 0 || newComputer <= 0;

    updateState({
      playerMarbles: newPlayer,
      computerMarbles: newComputer,
      phase: gameOver ? "game-over" : "computer-guess",
      isGameOver: gameOver,
      message: correct
        ? `✅ You guessed right! You win ${guessAmount} marbles from the computer.`
        : `❌ You guessed wrong! You give ${compHidden} marbles to the computer.`,
    });

    setGuessAmount(1);
  };

  // 🤖 Computer guesses player's hand (corrected logic)
  const handleComputerGuess = () => {
    const compGuess: "even" | "odd" = Math.random() > 0.5 ? "even" : "odd";
    const compBet = Math.floor(Math.random() * Math.min(computerMarbles, 5)) + 1;
    const parity = playerHide % 2 === 0 ? "even" : "odd";
    const correct = compGuess === parity;

    let newPlayer = playerMarbles;
    let newComputer = computerMarbles;

    if (correct) {
      newComputer += compBet;
      newPlayer -= compBet;
    } else {
      newComputer -= playerHide;
      newPlayer += playerHide;
    }

    const gameOver = newPlayer <= 0 || newComputer <= 0;

    updateState({
      playerMarbles: newPlayer,
      computerMarbles: newComputer,
      phase: gameOver ? "game-over" : "player-guess",
      isGameOver: gameOver,
      message: correct
        ? `🤖 Computer guessed ${compGuess} correctly and wins ${compBet} marbles.`
        : `🤖 Computer guessed ${compGuess} incorrectly. You win ${playerHide} marbles!`,
    });

    setPlayerHide(1);
  };

  return (
    <PlayGround>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🎱 Marble Game</h2>

        <div className="flex justify-between mb-4 text-lg font-medium">
          <span className="text-blue-600 dark:text-blue-300">You: {playerMarbles}</span>
          <span className="text-red-600 dark:text-red-300">Computer: {computerMarbles}</span>
        </div>

        <p className="mb-4 text-gray-700 dark:text-gray-200">{message}</p>

        {phase === "game-over" ? (
          <>
            <p className="text-xl font-bold mb-4">
              {playerMarbles <= 0 ? "💀 You lost!" : "🏆 You won!"}
            </p>
            <Button onClick={resetGame}>Restart Game</Button>
          </>
        ) : phase === "player-guess" ? (
          <>
            <label className="block text-white mb-1">💭 How many marbles do you bet?</label>
            <input
              type="number"
              min={1}
              max={Math.min(playerMarbles, 5)}
              value={guessAmount}
              onChange={(e) => setGuessAmount(Math.max(1, Math.min(5, +e.target.value)))}
              className="w-full px-2 py-1 rounded border mb-3"
            />

            <label className="block text-white mb-1">🤔 Guess if the computer's hand is:</label>
            <div className="flex justify-center gap-4 mb-4">
              <Button
                onClick={() => setGuessParity("odd")}
                className={guessParity === "odd" ? "bg-blue-600 text-white" : ""}
              >
                Odd
              </Button>
              <Button
                onClick={() => setGuessParity("even")}
                className={guessParity === "even" ? "bg-blue-600 text-white" : ""}
              >
                Even
              </Button>
            </div>

            <Button onClick={handlePlayerGuess}>Submit Guess</Button>
          </>
        ) : (
          <>
            <label className="block text-white mb-1">🙈 Hide how many marbles?</label>
            <input
              type="number"
              min={1}
              max={Math.min(playerMarbles, 5)}
              value={playerHide}
              onChange={(e) =>
                setPlayerHide(Math.max(1, Math.min(5, +e.target.value)))
              }
              className="w-full px-2 py-1 rounded border mb-4"
            />
            <Button onClick={handleComputerGuess}>Confirm Hide</Button>
          </>
        )}
      </div>
    </PlayGround>
  );
};

export default GameBoard;
