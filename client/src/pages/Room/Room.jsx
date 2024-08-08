import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/socketProvider/SocketProvider";

const Room = () => {
  const socket = useSocket();
  const [room, setRoom] = useState("");
  const [selfSocketId, setSelfSocketId] = useState("");
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const messageEndRef = useRef(null);

  const handleRoomDetails = useCallback(async ({ room, socketId }) => {
    setRoom(room);
    setSelfSocketId(socketId);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat-message", { room, message });
      setMessageHistory((prevHistory) => [
        ...prevHistory,
        { self: true, text: message },
      ]);
      setMessage(""); // Clear the message input field after sending
    }
  };

  const handleReceiveMessage = useCallback((message) => {
    setMessageHistory((messageHistory) => [
      ...messageHistory,
      { self: false, text: message },
    ]);
  }, []);

  useEffect(() => {
    socket.on("joinedRoomsDetailsPass", handleRoomDetails);
    socket.on("receiveChatMessage", handleReceiveMessage);
    return () => {
      socket.off("joinedRoomsDetailsPass", handleRoomDetails);
      socket.off("receiveChatMessage", handleReceiveMessage);
    };
  }, [socket, handleRoomDetails, handleReceiveMessage]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageHistory]);

  return (
    <div className="container mx-auto flex justify-center items-center h-screen flex-col mt-6">
      <h4>Room No: {room}</h4>
      <div className="h-[500px] flex-col flex justify-center items-center w-[50%] ">
        <h4 className="my-6 text-2xl font-semibold text-[#03346E]">Conversation:</h4>
        <div className="border-4 rounded-lg p-6 border-green-400">
          {messageHistory.map((msg, index) => (
            <p
              className={
                msg.self == true
                  ? "text-white bg-blue-600 rounded-lg px-2 w-[200px] my-1 ml-[400px]"
                  : "text-black w-[200px] rounded-lg px-2 my-1 bg-gray-300"
              }
              key={index}
            >
              {msg.text}
            </p>
          ))}
          <div ref={messageEndRef} />
          <div className="mt-8 flex justify-center items-center">
            <div>
              <form onSubmit={handleSendMessage}>
                <input
                  className="border-4 p-2 rounded-lg mr-3"
                  type="text"
                  name="message"
                  id="message"
                  placeholder="type message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
