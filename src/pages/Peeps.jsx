import Baymax from "../assets/ProfilePic/Baymax.jpg";
import Snoopy from "../assets/ProfilePic/Snoopy.jpg";
import Spiderman from "../assets/ProfilePic/spiderman.jpg";
import Spongebob from "../assets/ProfilePic/Spongebob.jpg";
import Sidebar from "../components/ChatComponent/Sidebar";
import ChatRoom from "../components/ChatComponent/ChatRoom";
import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { CHAT_ACTION } from "../shared/constants/socket.constant";
import useAuthStore from "../stores/authStore";
import { userTyping } from "../socket/handlers/chatHandler.js";

function Peeps() {
  const [rooms, setRooms] = useState(["Room 1", "Room 2", "Room 3"]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [roomToDelete, setRoomToDelete] = useState(null);

  const token = useAuthStore(state => state.token);

  const createRoom = () => {
    if (newRoomName.trim() === "") return;
    setRooms([...rooms, newRoomName]);
    setNewRoomName("");
    setIsCreateModalOpen(false);
  };
  
  const removeRoom = (index) => {
    const updated = [...rooms];
    updated.splice(index, 1);
    setRooms(updated);
  };

  const messages = [
    { user: "Baymax", img: Baymax, time: "10:10", text: "Good Morning", position: "start" },
    { user: "Spiderman", img: Spiderman, time: "12:34", text: "Hello!", position: "start" },
    { user: "Snoopy", img: Snoopy, time: "12:45", text: "Hi! 🙋‍♂️", position: "end", footer: "Seen by 2" },
    { user: "Spongebob", img: Spongebob, time: "12:45", text: "Afternoon!", position: "start" },
  ];
  
    const [messageInput, setMessageInput] = useState('');
    const [isTyping, setIsTyping] =useState(false);

  // Socket useEffect : start
  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on(CHAT_ACTION.CHAT_SYNC, (data) => {
      console.log(`Server re
        sponse with ${data.message}`);
    });

    socket.on(CHAT_ACTION.CHAT_TYPING, (data)=>{
      if(data.status){
        console.log(`User ${data.userName} is Typing`);
        setIsTyping(true);
        return;
      }

      console.log(`User ${data.name} is not Typing `);
      setIsTyping(false);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message, 'Error code :');
      console.log(err);
    });

    return () => {
      socket.off(CHAT_ACTION.CHAT_SYNC);
      socket.off(CHAT_ACTION.CHAT_TYPING);

      socket.off('connect_error');

      socket.disconnect();
    };
  }, []);

  // // Socket useEffect : chat status
  useEffect(() => {

    const input = messageInput
    userTyping(input);

    return () => {
    }

  }, [messageInput]);

  // Socket useEffect : start
  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on(CHAT_ACTION.CHAT_SYNC, (data) => {
      console.log(`Server response with ${data.message}`);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message, 'Error code :');
      console.log(err);
    });

    return () => {
      socket.off(CHAT_ACTION.CHAT_SYNC);
      socket.off('connect_error');

      socket.disconnect();
    };
  }, []);

  // // Socket useEffect : chat status
  useEffect(() => {

    const input = messageInput
    userTyping(input);

    return () => {
    }

  }, [messageInput]);

  return (
    <div className="min-h-screen bg-[#F2EBBF] flex justify-center pt-20 pb-20">
      <div className="flex items-center w-2/3 gap-5">
        <Sidebar
          rooms={rooms}
          setRooms={setRooms}
          isCreateModalOpen={isCreateModalOpen}
          setIsCreateModalOpen={setIsCreateModalOpen}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          newRoomName={newRoomName}
          setNewRoomName={setNewRoomName}
          roomToDelete={roomToDelete}
          setRoomToDelete={setRoomToDelete}
          createRoom={createRoom}
          removeRoom={removeRoom}
        />
        <ChatRoom messages={messages} />
      </div>
    </div>
  );
}

export default Peeps;
