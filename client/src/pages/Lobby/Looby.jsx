import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/socketProvider/SocketProvider";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  //room joining function
  const handleJoinRoom = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("join-room", room);
    },
    [socket, room]
  );



  const handleNavigateRoom = useCallback((data) => {
    const { room, socketId } = data;
    navigate(`room/${room}`);
  }
  ,[navigate])

  //useEffects
  useEffect(() => {
    socket.on("joinRoomNavigate", handleNavigateRoom);
    return () => {
      socket.off("joinRoomNavigate", handleNavigateRoom);
    };
  }, [handleNavigateRoom]);

  //return body
  return (
    <div>
      <form onSubmit={handleJoinRoom} action="">
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
