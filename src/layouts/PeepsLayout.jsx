import { useEffect,useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { ChevronDown, Plus, SendHorizontal, Trash2, X } from "lucide-react";

import  Baymax  from "../assets/ProfilePic/Baymax.jpg";
import Snoopy from "../assets/ProfilePic/Snoopy.jpg";
import Spiderman from "../assets/ProfilePic/spiderman.jpg";
import Spongebob from "../assets/ProfilePic/Spongebob.jpg"

function PeepsLayout() {
    const groupId = useParams().groupId, channelId = useParams().channelId;
    console.log(groupId,' ',channelId);
    const [rooms, setRooms] = useState(["Room 1", "Room 2", "Room 3"]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [roomToDelete, setRoomToDelete] = useState(null);

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

    useEffect(() => {

    }, []);

    return (
        <div className="min-h-screen bg-[#F2EBBF] flex justify-center pt-20 pb-20">
            <div className="flex items-center w-2/3 gap-5">
                {/* แถบซ้าย */}
                <div className="w-1/4 h-[80vh] flex">
                    <div className="flex flex-col items-end pt-20 gap-5">
                        <div className="h-[5vh] w-[2vw] bg-[#F3B562] rounded-l-4xl"></div>
                        <div className="h-[5vh] w-[2vw] bg-[#F3B562] rounded-l-4xl"></div>
                        <div className="h-[5vh] w-[4vw] bg-[#F06060] rounded-l-4xl"></div>
                        <div className="h-[5vh] w-[2vw] bg-[#F3B562] rounded-l-4xl"></div>
                    </div>
                    <div className="bg-white w-full h-full rounded-l-3xl pt-7 relative">
                        <div className="bg-[#8CBEB2] rounded-r-2xl h-[5vh] w-7/8 flex items-center justify-center">
                            <h1 className="text-white font-semibold">Group's Name</h1>
                        </div>

                        <div className="mt-5 space-y-2">
                            <div className="flex items-center gap-2 text-gray-700 font-medium">
                                <ChevronDown size={16} />
                                <p>Channel</p>
                            </div>

                            {/* ปุ่มเปิด Modal Create Room */}
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="flex items-center gap-1 mt-3 text-green-700 hover:text-green-900 text-sm cursor-pointer"
                            >
                                <Plus className="h-4" />
                                Create Room
                            </button>

                            {/* รายการห้อง */}
                            {rooms.map((room, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between px-2 py-1 bg-[#8CBEB2] hover:bg-[#F3B562] text-white"
                                >
                                    <p className="text-sm flex items-center gap-1">{room}</p>
                                    <button
                                        onClick={() => {
                                            setRoomToDelete(index);
                                            setIsDeleteModalOpen(true);
                                        }}
                                        className="hover:text-[#F06060]"
                                    >
                                        <Trash2 className="h-4 cursor-pointer" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modal: Create Room */}
                {isCreateModalOpen && (
                    <div className="fixed inset-0 bg-[#5C4B51]/50 flex items-center justify-center z-50">
                        <div className="bg-white w-96 p-6 rounded-xl shadow-lg relative">
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-lg font-semibold mb-4 text-center">
                                Create New Room
                            </h2>
                            <input
                                type="text"
                                value={newRoomName}
                                onChange={(e) => setNewRoomName(e.target.value)}
                                placeholder="Enter room name"
                                className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#8CBEB2]"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="text-[#8CBEB2] hover:text-[#F3B562]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={createRoom}
                                    className="bg-[#8CBEB2] text-white px-4 py-1 rounded hover:bg-[#F3B562]"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal: Delete Room Confirmation */}
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 bg-[#5C4B51]/50 flex items-center justify-center z-50">
                        <div className="bg-white w-96 p-6 rounded-xl shadow-lg relative">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-lg font-semibold mb-4 text-center">
                                Are you sure you want to delete{" "}
                                <span className="text-[#F06060] font-bold">
                                    {rooms[roomToDelete]}
                                </span>
                                ?
                            </h2>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="text-[#8CBEB2] hover:text-[#F3B562]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        removeRoom(roomToDelete);
                                        setIsDeleteModalOpen(false);
                                    }}
                                    className="bg-[#8CBEB2] text-white px-4 py-1 rounded hover:bg-[#F3B562]"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* แถบขวา */}
                <div className="bg-white w-3/4 h-[80vh] rounded-r-3xl">
                    <div className="h-full flex flex-col justify-end items-end pb-5">
                        {/* แชตบับเบิ้ล */}
                        <div className="h-[60vh] w-full flex flex-col gap-3 px-4">
                            {/* ฝั่งซ้าย
              <div className="flex justify-start pl-5">
                <div className="bg-[#F06060] w-2/5 h-[16vh] flex rounded-4xl justify-center p-3">
                  <p className="text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </p>
                </div>
              </div>

              {/* ฝั่งขวา */}
                            {/* <div className="flex justify-end pr-5">
                <div className="bg-[#8CBEB2] w-2/5 h-[16vh] flex rounded-4xl justify-center p-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                </div>
              </div> */}

                            {/* person1 */}
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={Baymax} alt="User Avatar" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Baymax
                                    <time className="text-xs opacity-50">10:10</time>
                                </div>
                                <div className="chat-bubble rounded-xl bg-[#F3B761] text-lg">
                                    Good Morning
                                </div>
                            </div>

                            {/* person2 */}
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={Spiderman} alt="User Avatar" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Spiderman
                                    <time className="text-xs opacity-50">12:34</time>
                                </div>
                                <div className="chat-bubble rounded-xl bg-[#F3B761] text-lg">
                                    Hello!
                                </div>
                            </div>

                            {/* person3 */}
                            <div className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={Snoopy} alt="User Avatar" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Snoopy
                                    <time className="text-xs opacity-50">12:45</time>
                                </div>
                                <div className="chat-bubble rounded-xl bg-[#b9dfd6] text-lg">
                                    Hi! 🙋‍♂️
                                </div>
                                <div className="chat-footer opacity-50">Seen by 2</div>
                            </div>

                            {/* person1 */}
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={Spongebob} alt="User Avatar" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Spongebob
                                    <time className="text-xs opacity-50">12:45</time>
                                </div>
                                <div className="chat-bubble rounded-xl bg-[#F3B761] text-lg">
                                    Afternoon!
                                </div>
                            </div>
                        </div>

                        {/* text area */}
                        <div className="w-11/12 h-[8vh] bg-[#F3B562] rounded-l-4xl flex items-center justify-center gap-2 pl-4">
                            <textarea
                                type="text"
                                placeholder="Type here..."
                                className="h-[6vh] w-6/7 resize-none"
                            />
                            <div className="bg-[#F2EBBF] rounded-full h-9 w-9 flex justify-center items-center">
                                <button type="submit">
                                    <SendHorizontal className="text-[#5C4B51] cursor-pointer" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PeepsLayout