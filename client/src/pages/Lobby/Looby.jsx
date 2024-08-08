import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/socketProvider/SocketProvider";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(
    (e) => {
      e.preventDefault();
      if (room.trim()) {
        socket.emit("join-room", room);
      }
    },
    [socket, room]
  );

  const handleNavigateRoom = useCallback(
    (data) => {
      const { room, socketId } = data;
      navigate(`room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("joinRoomNavigate", handleNavigateRoom);
    return () => {
      socket.off("joinRoomNavigate", handleNavigateRoom);
    };
  }, [socket, handleNavigateRoom]);

  return (
    <div className="container flex justify-center flex-col items-center h-screen mx-auto">
      <h2 className="text-5xl text-gray-700 my-5 font-semibold">Welcome to online chat</h2>
      <div>
        <form onSubmit={handleJoinRoom}>
          <input
            type="text"
            className="border-4 border-green-300 rounded-lg mx-2 my-2 py-2 px-5"
            name="room"
            value={room}
            placeholder="Enter a room code"
            id="room"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button className="text-3xl font-semibold text-green-700" type="submit">
            Join 
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lobby;
