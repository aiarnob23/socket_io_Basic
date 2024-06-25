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
    <div>
      <form onSubmit={handleJoinRoom}>
        <input
          type="text"
          className="border-2 rounded-lg mx-2 my-2 px-5"
          name="room"
          value={room}
          id="room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
};

export default Lobby;
