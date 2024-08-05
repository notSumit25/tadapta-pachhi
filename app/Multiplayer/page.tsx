"use client";
import SocketSingleton from "@/socket";
import { useState } from "react";
const socket = SocketSingleton.getInstance();
export default function page() {
  const [roomId, setRoomId] = useState<string>("");
  const handleCreateRoom = () => {
    const id = socket.id;
    setRoomId(id ?? "");
    socket.emit("createRoom", id);
  };
  const handleJoinRoom = () => {
    socket.emit("joinRoom", roomId,socket.id);
  };
  const handleStartGame = () => {
    socket.emit("startGame", roomId);
  };
  socket.on("startGame", (id: string) => {
    if (id === socket.id) {
      console.log("Game Started");
    }
  });
  return (
    <div>
        { roomId ? roomId :
            <div>
        <button onClick={handleCreateRoom} className="px-2 py-2 bg-teal-300">
          Create Room
        </button>
        <input
          className="border text-black px-2 py-1"
          placeholder="Enter Room id"
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
          type="text"
          />
        <button className="px-2 py-2 bg-teal-300" onClick={handleJoinRoom}>
          Join Room
        </button>
      </div>
        }
        {
            
            roomId === socket.id && <div>
                <button onClick={handleStartGame}>
                    Start Game
                </button>
            </div>
        }
    </div>
  );
}
