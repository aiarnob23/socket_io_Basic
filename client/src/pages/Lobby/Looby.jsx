import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/socketProvider/SocketProvider";

const Lobby = () => {
  const [room, setRoom] = useState("");

  const socket = useSocket();

  //room joining function
  const handleJoinRoom = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("join-room", room);
    },
    [socket, room]
  );

  const handleRcvdMsg = async (data) => {
    console.log(data);
  };

  //
  useEffect(() => {
    socket.on("msg", handleRcvdMsg);
    return () => {
      socket.off("msg", handleRcvdMsg);
    };
  }, [handleRcvdMsg]);

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
