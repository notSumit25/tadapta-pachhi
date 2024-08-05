"use client";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { GameManager } from "./Managers/GameManager";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameManager = useRef<GameManager | null>(null);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        gameManager.current = new GameManager(
          context,
          canvas.height,
          canvas.width
        );
      }
    }
  }, []);

  useEffect(() => {
    if (startGame && gameManager.current) {
      gameManager.current.startGame();
    }
  }, [startGame]);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1>Flappy Bird</h1>
      <div className="flex flex-col justify-center items-center">
        <canvas
          ref={canvasRef}
          id="gameCanvas"
          width="800"
          height="600"
        ></canvas>
        <button className=" px-3 py-1 bg-teal-300 text-white rounded-lg select-none" onClick={() => setStartGame(true)}>
          Start Game
        </button>
      </div>
    </main>
  );
}
