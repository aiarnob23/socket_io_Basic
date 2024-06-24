import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/socketProvider/SocketProvider";

const Room = () => {
  const socket = useSocket();
  const [room, setRoom] = useState("");
  const [selfSocketId, setSelfSocketId] = useState("");
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  //functions
  const handleRoomDetails = useCallback(
    async ({ room, socketId }) => {
      setRoom(room);
      setSelfSocketId(socketId);
    },
    []
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("chat-message", { room, message });
    }
  };

    const handleReceiveMessage = useCallback((message) => {
      setMessageHistory(messageHistory=>[...messageHistory, message]);
  }, []);
    
    
    console.log(messageHistory);

  //useEffects
  useEffect(() => {
    socket.on("joinedRoomsDetailsPass", handleRoomDetails);
    socket.on("receiveChatMessage", handleReceiveMessage);
    return () => {
      socket.off("joinedRoomsDetailsPass", handleRoomDetails);
      socket.off("receiveChatMessage", handleReceiveMessage);
    };
  }, [handleRoomDetails, handleReceiveMessage]);

  //return body
  return (
    <div>
      <h4>Room No: {room}</h4>
      <form onSubmit={handleSendMessage} action="">
        <input
          type="text"
          name="message"
          id="message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h4>Message History:</h4>
        {messageHistory.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Room;
